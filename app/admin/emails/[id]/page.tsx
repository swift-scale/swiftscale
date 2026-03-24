"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Archive,
  Trash2,
  RotateCcw,
  MoreVertical,
  Printer,
  Forward,
  Paperclip,
  FileText,
  XCircle,
  ChevronDown,
  Minimize2,
  Star,
  Reply,
  X,
  Users,
  CornerUpLeft,
  Share,
  Download
} from "lucide-react";
import { toast } from "sonner";
import ComposePopup from "@/components/admin/ComposePopup";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type Attachment = { url: string; publicId: string; filename: string; size: number; resourceType: string };
type Reply = { body: string; senderAlias: string; fromEmail?: string; sentAt: string; attachments?: Attachment[] };
type Message = {
  id: string; name: string; email: string; service: string; details: string;
  status: "new" | "read" | "replied" | "archived" | "deleted" | "draft";
  time: string; fullDate: string; replies: Reply[];
  cc?: string[]; bcc?: string[];
  draft?: {
    body: string; subject: string; to: string[]; cc: string[]; bcc: string[];
    senderAlias: string; attachments: Attachment[];
  };
};

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-600 border-blue-200",
  read: "bg-slate-500/10 text-slate-500 border-slate-200",
  replied: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  archived: "bg-amber-500/10 text-amber-600 border-amber-200",
  deleted: "bg-rose-500/10 text-rose-600 border-rose-200",
};

// ─── Recipient Chip Input ─────────────────────────────────────────────────────
function ChipInput({
  label, chips, onChange, placeholder
}: { label: string; chips: string[]; onChange: (chips: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const add = (val: string) => {
    const v = val.trim();
    if (v && !chips.includes(v)) onChange([...chips, v]);
    setInput("");
  };

  const remove = (chip: string) => onChange(chips.filter(c => c !== chip));

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      e.preventDefault();
      add(input);
    } else if (e.key === "Backspace" && !input && chips.length) {
      remove(chips[chips.length - 1]);
    }
  };

  return (
    <div className="flex items-start gap-2 px-4 py-2 border-b border-slate-100 min-h-[38px]" onClick={() => inputRef.current?.focus()}>
      <span className="text-[10px] font-black uppercase text-slate-400 w-8 shrink-0 mt-2">{label}</span>
      <div className="flex flex-wrap gap-1.5 flex-1 items-center">
        {chips.map(chip => (
          <span key={chip} className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold rounded-full px-2.5 py-0.5">
            {chip}
            <button type="button" onClick={() => remove(chip)} className="hover:text-rose-500">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => input.trim() && add(input)}
          placeholder={chips.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] border-none outline-none bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 py-1"
        />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function EmailDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [message, setMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inline composer state
  const [showComposer, setShowComposer] = useState(false);
  const [composerMode, setComposerMode] = useState<"reply" | "reply-all" | "forward">("reply");
  const [toChips, setToChips] = useState<string[]>([]);
  const [ccChips, setCcChips] = useState<string[]>([]);
  const [bccChips, setBccChips] = useState<string[]>([]);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [replySender, setReplySender] = useState("contact");
  const [showHistory, setShowHistory] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [lastSavedDraft, setLastSavedDraft] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Compose popup for forwarding from toolbar
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeContext, setComposeContext] = useState<any>(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchMessage = async () => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, { cache: 'no-store' });
      const data = await response.json();
      if (data.success) {
        const found = data.data;
        setMessage({
          id: found._id,
          name: `${found.firstName} ${found.lastName}`,
          email: found.email,
          service: found.service,
          details: found.details,
          status: found.status ?? "new",
          time: new Date(found.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          fullDate: new Date(found.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
          cc: found.cc || [],
          bcc: found.bcc || [],
          replies: (found.replies || []).map((r: any) => ({
            body: r.body,
            senderAlias: r.senderAlias,
            fromEmail: r.fromEmail,
            attachments: r.attachments || [],
            cc: r.cc || [],
            bcc: r.bcc || [],
            smtpMessageId: r.smtpMessageId,
            sentAt: new Date(r.sentAt).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
          })),
          draft: found.draft
        });
        
        // Load draft if it exists
        if (found.draft && !showComposer) {
          setToChips(found.draft.to || []);
          setCcChips(found.draft.cc || []);
          setBccChips(found.draft.bcc || []);
          setSubject(found.draft.subject || "");
          setBody(found.draft.body || "");
          setReplySender(found.draft.senderAlias || "contact");
          setAttachments(found.draft.attachments || []);
          setShowCc((found.draft.cc?.length || 0) > 0);
          setShowBcc((found.draft.bcc?.length || 0) > 0);
          setShowComposer(true);
        }

        if (found.status === "new" || !found.status) updateStatus(found._id, "read");
      }
    } catch { toast.error("Failed to load email"); }
    finally { setIsLoading(false); }
  };

  // ── Draft AutoSave Logic ───────────────────────────────────────────────────
  const saveDraft = async (forceId?: string) => {
    if (!showComposer) return;
    const currentMsgId = forceId || (id as string);
    
    // Don't save if nothing changed
    const draftString = JSON.stringify({ toChips, ccChips, bccChips, subject, body, attachments, replySender });
    if (draftString === lastSavedDraft) return;

    setIsSavingDraft(true);
    try {
      await fetch("/api/admin/messages/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId: currentMsgId,
          to: toChips,
          cc: ccChips,
          bcc: bccChips,
          subject,
          body,
          senderAlias: replySender,
          attachments
        })
      });
      setLastSavedDraft(draftString);
    } catch (err) {
      console.error("Draft save failed", err);
    } finally {
      setIsSavingDraft(false);
    }
  };

  const discardDraft = async () => {
    if (!confirm("Are you sure you want to discard this draft?")) return;
    setIsLoading(true);
    try {
      await fetch(`/api/admin/messages/drafts?id=${id}`, { method: "DELETE" });
      setShowComposer(false);
      setBody("");
      setSubject("");
      setAttachments([]);
      toast.success("Draft discarded");
    } catch {
      toast.error("Failed to discard draft");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showComposer) {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        saveDraft();
      }, 1500); // Auto-save after 1.5s of no typing
    }
    return () => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current); };
  }, [toChips, ccChips, bccChips, subject, body, attachments, replySender, showComposer]);

  useEffect(() => { if (id) fetchMessage(); }, [id]);

  // ── Status Update ─────────────────────────────────────────────────────────
  const updateStatus = async (msgId: string, status: Message["status"]) => {
    try {
      const res = await fetch(`/api/admin/messages/${msgId}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setMessage(prev => prev ? { ...prev, status } : null);
        if (status === "deleted" || status === "archived") {
          toast.success(`Email ${status}`); router.push("/admin/emails");
        }
      }
    } catch { toast.error("Failed to update status"); }
  };

  // ── Open Composer ─────────────────────────────────────────────────────────
  const openComposer = (mode: "reply" | "reply-all" | "forward") => {
    if (!message) return;
    setComposerMode(mode);
    setBody("");
    setAttachments([]);
    setShowHistory(false);
    if (mode === "reply") {
      setToChips([message.email]);
      setCcChips([]); setBccChips([]);
      setShowCc(false); setShowBcc(false);
      setSubject(message.service.startsWith("Re:") ? message.service : `Re: ${message.service}`);
    } else if (mode === "reply-all") {
      setToChips([message.email]);
      setCcChips(message.cc || []); 
      setBccChips([]);
      setShowCc((message.cc?.length ?? 0) > 0); 
      setShowBcc(false);
      setSubject(message.service.startsWith("Re:") ? message.service : `Re: ${message.service}`);
    } else {
      setToChips([]);
      setCcChips([]); setBccChips([]);
      setSubject(`Fwd: ${message.service}`);
      setBody(`\n\n---------- Forwarded message ---------\nFrom: ${message.name} <${message.email}>\nDate: ${message.fullDate}\nSubject: ${message.service}\n\n${message.details}`);
    }
    setShowComposer(true);
  };

  // ── File Upload ──────────────────────────────────────────────────────────
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    const MAX = 2 * 1024 * 1024;
    for (const file of files) {
      if (file.size > MAX) { toast.error(`"${file.name}" exceeds the 2 MB limit`); continue; }
      setUploadingFiles(prev => [...prev, file.name]);
      try {
        const fd = new FormData(); fd.append("file", file);
        const res = await fetch("/api/admin/messages/upload-attachment", { method: "POST", body: fd });
        const data = await res.json();
        if (data.success) { setAttachments(prev => [...prev, data.attachment]); toast.success(`"${file.name}" uploaded`); }
        else toast.error(data.message || `Failed to upload "${file.name}"`);
      } catch { toast.error(`Upload failed for "${file.name}"`); }
      finally { setUploadingFiles(prev => prev.filter(n => n !== file.name)); }
    }
  };

  // ── Send ──────────────────────────────────────────────────────────────────
  const handleSend = async () => {
    const safeToChips = toChips || [];
    if (safeToChips.length === 0) { toast.error("Add at least one recipient"); return; }
    if (!body.trim() && composerMode !== "forward") { toast.error("Please enter a message"); return; }
    setIsSending(true);
    try {
      const allTo = toChips.join(", ");
      const res = await fetch("/api/admin/messages/send", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId: message?.id,
          to: allTo,
          cc: ccChips.join(", ") || undefined,
          bcc: bccChips.join(", ") || undefined,
          subject, body, senderAlias: replySender, attachments
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Email sent successfully");
        setShowComposer(false);
        setBody(""); setAttachments([]);
        fetchMessage();
      } else toast.error(data.message || "Failed to send email");
    } catch { toast.error("An error occurred"); }
    finally { setIsSending(false); }
  };

  // ─────────────────────────────────────────────────────────────────────────
  if (isLoading) return (
    <div className="h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 animate-pulse">Loading conversation...</div>
    </div>
  );

  if (!message) return (
    <div className="h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-4">
      <p className="text-sm font-black text-slate-400">Email not found</p>
      <Button variant="outline" onClick={() => router.push("/admin/emails")}>Back to Inbox</Button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-0 px-4 pb-20">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between py-3 border-b border-slate-100 mb-6 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/emails")} className="rounded-xl h-9 w-9 text-slate-500 hover:text-slate-900">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50" onClick={() => updateStatus(message.id, "archived")} title="Archive">
            <Archive className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50" onClick={() => updateStatus(message.id, "deleted")} title="Delete">
            <Trash2 className="h-5 w-5" />
          </Button>
          <div className="h-5 w-[1px] bg-slate-100 mx-1" />
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-500 hover:text-primary hover:bg-primary/5" title="Refresh conversation" onClick={fetchMessage}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-500 hover:bg-slate-100" onClick={async () => {
             const syncPromise = fetch('/api/admin/messages/sync').then(r => r.json());
             toast.promise(syncPromise, {
              loading: 'Syncing inbox...',
              success: (data) => `Synced ${data.syncedCount || 0} emails`,
              error: 'Sync failed'
            });
            await syncPromise;
            fetchMessage();
          }} title="Sync inbox now">
             <Star className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ── Subject ── */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">{message.service}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn("text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border", statusColors[message.status])}>{message.status}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">• {message.replies.length + 1} messages in thread</span>
          </div>
        </div>
      </div>

      {/* ── Thread ── */}
      <div className="space-y-6 relative">
        {/* Timeline Line */}
        {message.replies.length > 0 && (
          <div className="absolute left-[30px] top-10 bottom-10 w-[2px] bg-slate-100 -z-10" />
        )}

        {/* Original message */}
        {(() => {
          const isOutbound = message.name.includes("Outbound");
          return (
            <MessageCard
              avatar={isOutbound ? "SS" : message.name.split(" ").map(n => n[0]).join("")}
              avatarBg={isOutbound ? "bg-primary text-white" : "bg-blue-600 text-white"}
              senderName={isOutbound ? "SwiftScale Admin" : message.name}
              senderEmail={isOutbound ? "contact@swiftscaleinc.com" : message.email}
              toEmail={isOutbound ? message.email : "me"}
              date={message.fullDate}
              body={message.details}
              isAdmin={isOutbound}
              onReply={() => openComposer("reply")}
              onForward={() => {
                setComposeContext({
                  email: "", subject: `Fwd: ${message.service}`, name: "", id: message.id,
                  bodyPrefix: `\n\n---------- Forwarded message ---------\nFrom: ${isOutbound ? "SwiftScale Admin" : message.name} <${isOutbound ? "contact@swiftscaleinc.com" : message.email}>\nDate: ${message.fullDate}\nSubject: ${message.service}\n\n${message.details}`
                });
                setIsComposeOpen(true);
              }}
            />
          );
        })()}

        {/* Replies */}
        {message.replies.map((reply, idx) => {
          const isCustomer = reply.senderAlias === "Customer" || reply.senderAlias === "User" || reply.senderAlias === "Direct";
          return (
            <MessageCard
              key={idx}
              avatar={isCustomer ? message.name.split(" ").map(n => n[0]).join("") : "SS"}
              avatarBg={isCustomer ? "bg-blue-600 text-white" : "bg-primary text-white"}
              senderName={isCustomer ? message.name : `SwiftScale ${reply.senderAlias}`}
              senderEmail={isCustomer ? (reply.fromEmail || message.email) : `${reply.senderAlias}@swiftscaleinc.com`}
              toEmail={isCustomer ? "me" : message.name}
              date={reply.sentAt}
              body={reply.body}
              isAdmin={!isCustomer}
              attachments={reply.attachments}
              onReply={() => openComposer("reply")}
              onForward={() => {
                setComposeContext({
                  email: "", subject: `Fwd: ${message.service}`, name: "", id: undefined,
                  bodyPrefix: `\n\n---------- Forwarded message ---------\nFrom: ${isCustomer ? message.name : `SwiftScale ${reply.senderAlias}`}\nDate: ${reply.sentAt}\n\n${reply.body}`
                });
                setIsComposeOpen(true);
              }}
            />
          );
        })}

        {/* ── Inline Composer ── */}
        {showComposer ? (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl mt-6 overflow-hidden">
            {/* Composer header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-black text-white text-[10px] shrink-0 shadow-md">SS</div>
              {/* Reply mode selector */}
              <div className="relative">
                <Select value={composerMode} onValueChange={(v: any) => openComposer(v)}>
                  <SelectTrigger className="h-8 border-none shadow-none bg-white rounded-lg text-[11px] font-black text-slate-700 focus:ring-1 focus:ring-primary/20 w-[130px] px-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl bg-white border-slate-100 shadow-xl">
                    <SelectItem value="reply" className="text-[11px] font-bold"><Reply className="w-3 h-3 inline mr-2 text-slate-400" />Reply</SelectItem>
                    <SelectItem value="reply-all" className="text-[11px] font-bold"><Users className="w-3 h-3 inline mr-2 text-slate-400" />Reply All</SelectItem>
                    <SelectItem value="forward" className="text-[11px] font-bold"><Forward className="w-3 h-3 inline mr-2 text-slate-400" />Forward</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">From:</span>
                <Select value={replySender} onValueChange={setReplySender}>
                  <SelectTrigger className="h-8 border-none shadow-none bg-white rounded-lg text-[10px] font-black uppercase text-slate-700 focus:ring-1 focus:ring-primary/20 w-[120px] px-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl bg-white border-slate-100 shadow-xl">
                    {["contact", "support", "hr", "info", "business"].map(a => (
                      <SelectItem key={a} value={a} className="text-[10px] font-black uppercase">{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50" onClick={() => setShowComposer(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* To field */}
            <ChipInput label="To" chips={toChips} onChange={setToChips} placeholder="Recipients" />

            {/* CC / BCC toggle */}
            {!showCc && !showBcc && (
              <div className="px-4 py-1.5 flex gap-3 bg-slate-50/20 border-b border-slate-50">
                <button type="button" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors" onClick={() => setShowCc(true)}>Cc</button>
                <button type="button" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors" onClick={() => setShowBcc(true)}>Bcc</button>
              </div>
            )}
            {showCc && <ChipInput label="Cc" chips={ccChips} onChange={setCcChips} placeholder="Cc recipients" />}
            {showBcc && <ChipInput label="Bcc" chips={bccChips} onChange={setBccChips} placeholder="Bcc recipients" />}

            {/* Subject */}
            <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-3">
               <span className="text-[10px] font-black uppercase text-slate-400 w-8 shrink-0">Sub</span>
               <input 
                value={subject} 
                onChange={e => setSubject(e.target.value)}
                className="flex-1 border-none outline-none bg-transparent text-sm font-bold text-slate-900"
                placeholder="Subject"
               />
            </div>

            {/* Body */}
            <div className="px-4 pt-4 pb-2">
              <Textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Write your response..."
                className="min-h-[180px] border-none shadow-none ring-0 focus-visible:ring-0 text-sm font-medium text-slate-900 placeholder:text-slate-400 resize-none bg-transparent p-0 leading-relaxed"
              />

              {/* History - Always Visible */}
              <div className="mt-8 pl-5 border-l-4 border-slate-100/50 text-[13px] text-slate-500 space-y-5 font-medium">
                <div className="relative">
                  <div className="absolute -left-[24px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-900" />
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2 px-2 pb-1 border-b border-slate-100">{message.name} — {message.fullDate}</p>
                  <p className="whitespace-pre-wrap leading-relaxed px-2">{message.details}</p>
                </div>
                {(message.replies || []).map((r, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[24px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-900" />
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2 px-2 pb-1 border-b border-slate-100">
                      {r.senderAlias === "Customer" || r.senderAlias === "User" || r.senderAlias === "Direct" 
                        ? message.name 
                        : `SwiftScale ${r.senderAlias}`} — {r.sentAt}
                    </p>
                    <p className="whitespace-pre-wrap leading-relaxed px-2">{r.body}</p>
                  </div>
                ))}
              </div>

              {/* Attachments */}
              {(attachments.length > 0 || uploadingFiles.length > 0) && (
                <div className="mt-6 space-y-2 border-t border-slate-100 pt-4">
                  {uploadingFiles.map(n => (
                    <div key={n} className="flex items-center gap-2 text-[10px] text-slate-400 font-bold animate-pulse">
                      <FileText className="w-3.5 h-3.5" /> Uploading {n}...
                    </div>
                  ))}
                  {attachments.map(att => (
                    <div key={att.publicId} className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                           <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-bold text-slate-700 truncate">{att.filename}</span>
                          <span className="text-[9px] text-slate-400 font-black">{(att.size / 1024).toFixed(0)} KB • Cloudinary</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl" onClick={() => setAttachments(prev => prev.filter(a => a.publicId !== att.publicId))}>
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer toolbar */}
            <div className="flex items-center gap-3 px-4 py-4 mt-2 border-t border-slate-100 bg-slate-50/30">
              <Button
                onClick={handleSend}
                disabled={isSending || !toChips || toChips.length === 0 || uploadingFiles.length > 0}
                className="rounded-full h-11 px-10 bg-primary hover:bg-primary/90 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20"
              >
                {isSending ? "Sending..." : "Send"}
              </Button>
              
              {isSavingDraft && (
                <span className="text-[10px] font-black text-slate-400 uppercase animate-pulse">Saving draft...</span>
              )}
              {!isSavingDraft && lastSavedDraft && (
                <span className="text-[10px] font-bold text-slate-300 uppercase">Draft saved</span>
              )}
              {/* Attach */}
              <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFiles} />
              <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full text-slate-400 hover:text-primary hover:bg-primary/5 transition-all" title="Attach (max 2 MB)" onClick={() => fileRef.current?.click()} disabled={uploadingFiles.length > 0}>
                <Paperclip className="w-5 h-5" />
              </Button>
              {attachments.length > 0 && (
                <span className="text-[10px] font-black text-slate-400 bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-sm">{attachments.length} file{attachments.length > 1 ? "s" : ""}</span>
              )}
              <div className="ml-auto">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-300 hover:text-rose-500 hover:bg-rose-900/10" onClick={discardDraft} title="Discard Draft">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          /* Bottom action bar */
          <div className="flex items-center gap-4 py-10">
            <Button onClick={() => openComposer("reply")} variant="outline" className="rounded-full px-8 h-12 text-[12px] font-black uppercase tracking-widest border-2 border-slate-100 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all gap-3 shadow-sm">
              <Reply className="w-4 h-4" /> Reply
            </Button>
            <Button onClick={() => openComposer("forward")} variant="outline" className="rounded-full px-8 h-12 text-[12px] font-black uppercase tracking-widest border-2 border-slate-100 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all gap-3 shadow-sm">
              <Forward className="w-4 h-4" /> Forward
            </Button>
          </div>
        )}
      </div>

      {/* Compose popup for forwarded messages from toolbar */}
      {isComposeOpen && (
        <ComposePopup
          isOpen={isComposeOpen}
          onClose={() => { setIsComposeOpen(false); fetchMessage(); }}
          replyTo={composeContext}
        />
      )}
    </div>
  );
}

// ─── Message Card Component ──────────────────────────────────────────────────
// ─── Message Card Component ──────────────────────────────────────────────────
function MessageCard({
  avatar, avatarBg, senderName, senderEmail, toEmail, date, body, isAdmin, attachments, onReply, onForward
}: {
  avatar: string; avatarBg: string; senderName: string; senderEmail: string; toEmail: string;
  date: string; body: string; isAdmin: boolean; attachments?: Attachment[];
  onReply: () => void; onForward: () => void;
}) {
  return (
    <div className={cn(
      "bg-white border rounded-[2.5rem] shadow-sm overflow-hidden transition-all duration-300",
      isAdmin ? "border-blue-100" : "border-slate-100"
    )}>
      {/* Card header */}
      <div className="flex items-center gap-4 px-8 py-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center font-black text-base shrink-0 shadow-lg shadow-black/5", avatarBg)}>
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-slate-900">{senderName}</span>
            <span className="text-[12px] text-slate-400 font-bold truncate tracking-tight">&lt;{senderEmail}&gt;</span>
          </div>
          <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mt-0.5">to {toEmail}</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-[11px] text-slate-400 font-black uppercase tracking-tighter">{date}</span>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 hover:bg-slate-100 gap-2 transition-all px-4" 
              onClick={onReply}
            >
              <Reply className="w-4 h-4" /> REPLY
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 hover:bg-slate-100 gap-2 transition-all px-4" 
              onClick={onForward}
            >
              <Forward className="w-4 h-4" /> FORWARD
            </Button>
          </div>
        </div>
      </div>

      {/* Card body - Always Mapped (Full View) */}
      <div className="px-8 pb-8 pt-0 ml-16">
        <div className="text-[15px] text-slate-700 leading-relaxed font-medium whitespace-pre-wrap p-4 bg-slate-50/30 rounded-[2rem] border border-slate-50/50">
          {body}
        </div>
        
        {/* Attachments */}
        {attachments && attachments.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {attachments.map((att, i) => (
              <a 
                key={i} 
                href={att.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 bg-white border border-slate-100 hover:border-primary/30 hover:shadow-md rounded-2xl px-5 py-3 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10">
                   <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-slate-700 truncate max-w-[180px]">{att.filename}</span>
                  <span className="text-[10px] text-slate-400 font-black uppercase">{(att.size / 1024).toFixed(0)} KB • Cloudinary</span>
                </div>
                <Download className="w-4 h-4 ml-2 text-slate-300 group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

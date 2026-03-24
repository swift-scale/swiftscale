"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { X, Minimize2, Maximize2, Send, Paperclip, Minus, FileText, XCircle, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

interface Attachment {
  url: string;
  publicId: string;
  filename: string;
  size: number;
  resourceType: string;
}

interface ComposePopupProps {
  isOpen: boolean;
  onClose: () => void;
  replyTo?: {
    id?: string;
    email: string;
    subject: string;
    name: string;
    bodyPrefix?: string;
  } | null;
}

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
    <div className="flex items-start gap-2 px-4 py-1.5 border-b border-slate-100 min-h-[38px]" onClick={() => inputRef.current?.focus()}>
      <span className="text-[10px] font-black uppercase text-slate-400 w-12 shrink-0 mt-2">{label}</span>
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

export default function ComposePopup({ isOpen, onClose, replyTo }: ComposePopupProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [toChips, setToChips] = useState<string[]>([]);
  const [ccChips, setCcChips] = useState<string[]>([]);
  const [bccChips, setBccChips] = useState<string[]>([]);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [senderAlias, setSenderAlias] = useState("contact");
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [lastSavedDraft, setLastSavedDraft] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentMsgIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (replyTo) {
      setToChips(replyTo.email ? [replyTo.email] : []);
      setSubject(replyTo.subject.startsWith("Re:") || replyTo.subject.startsWith("Fwd:") ? replyTo.subject : `Re: ${replyTo.subject}`);
      setBody(replyTo.bodyPrefix || "");
      currentMsgIdRef.current = replyTo.id || null;
      setIsMinimized(false);
    } else {
      currentMsgIdRef.current = null;
      setToChips([]);
      setSubject("");
      setBody("");
    }
    setCcChips([]);
    setBccChips([]);
    setShowCc(false);
    setShowBcc(false);
    setAttachments([]);
    setLastSavedDraft("");
  }, [replyTo, isOpen]); 

  // ── Draft Engine ──────────────────────────────────────────────────────────
  const saveDraft = async () => {
    if (!isOpen) return;

    const draftString = JSON.stringify({ toChips, ccChips, bccChips, subject, body, attachments, senderAlias });
    if (draftString === lastSavedDraft) return;
    
    // Safety check for undefined arrays
    const safeToChips = toChips || [];
    if (!body && !subject && safeToChips.length === 0) return; // Don't save empty drafts

    setIsSavingDraft(true);
    try {
      const res = await fetch("/api/admin/messages/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId: currentMsgIdRef.current,
          to: toChips.join(", "),
          cc: ccChips.join(", "),
          bcc: bccChips.join(", "),
          subject: subject || "(No Subject)",
          body,
          senderAlias,
          attachments
        })
      });
      const data = await res.json();
      if (data.success && data.messageId && !currentMsgIdRef.current) {
        currentMsgIdRef.current = data.messageId;
      }
      setLastSavedDraft(draftString);
    } catch (err) {
      console.error("Draft save failed", err);
    } finally {
      setIsSavingDraft(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        saveDraft();
      }, 2000); 
    }
    return () => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current); };
  }, [toChips, ccChips, bccChips, subject, body, attachments, senderAlias, isOpen]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = ""; 

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`"${file.name}" exceeds the 2 MB limit`);
        continue;
      }

      setUploadingFiles(prev => [...prev, file.name]);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/messages/upload-attachment", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          setAttachments(prev => [...prev, data.attachment]);
          toast.success(`"${file.name}" uploaded`);
        } else {
          toast.error(data.message || `Failed to upload "${file.name}"`);
        }
      } catch {
        toast.error(`Upload failed for "${file.name}"`);
      } finally {
        setUploadingFiles(prev => prev.filter(n => n !== file.name));
      }
    }
  };

  const removeAttachment = (publicId: string) => {
    setAttachments(prev => prev.filter(a => a.publicId !== publicId));
  };

  const handleSend = async () => {
    const safeToChips = toChips || [];
    if (safeToChips.length === 0 || !subject || !body) {
      toast.error("Please fill in recipient, subject and body");
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch("/api/admin/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messageId: replyTo?.id || null,
          to: toChips.join(", "),
          cc: ccChips.join(", "),
          bcc: bccChips.join(", "),
          subject,
          body,
          senderAlias,
          attachments,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Email sent successfully");
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        onClose();
        setBody("");
        setAttachments([]);
      } else {
        toast.error(data.message || "Failed to send email");
      }
    } catch (error) {
      toast.error("An error occurred while sending");
    } finally {
      setIsSending(false);
    }
  };

  const discardDraft = async () => {
    if (currentMsgIdRef.current) {
       await fetch(`/api/admin/messages/drafts?id=${currentMsgIdRef.current}`, { method: "DELETE" });
    }
    onClose();
    toast.success("Draft discarded");
  };

  const containerClasses = `
    fixed z-[100] transition-all duration-300 ease-in-out shadow-2xl border border-slate-200 bg-white flex flex-col rounded-t-[1.5rem]
    ${(isMinimized || !isMaximized) ? "bottom-0 right-4 md:right-10 w-full max-w-lg" : "inset-4 md:inset-10 rounded-[2rem]"}
    ${isMinimized ? "h-14 overflow-hidden" : isMaximized ? "h-[calc(100vh-80px)]" : "h-[620px]"}
  `;

  if (!isOpen) return null;

  return (
    <div className={containerClasses} id="compose-popup">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white rounded-t-[1.5rem] cursor-pointer" 
           onClick={() => { if (isMinimized) setIsMinimized(false); }}>
        <h3 className="text-xs font-black uppercase tracking-widest">{replyTo ? `Reply to ${replyTo.name}` : "New Message"}</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg" onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); setIsMinimized(false); }}>
            {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-400 hover:bg-rose-900/20 rounded-lg" onClick={(e) => { e.stopPropagation(); onClose(); }}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <>
          <div className="p-0 space-y-0 flex-1 flex flex-col overflow-hidden bg-white">
            {/* Alias Selection */}
            <div className="border-b border-slate-100 px-4 py-2 flex items-center gap-2 group bg-slate-50/50">
              <span className="text-[10px] font-black uppercase text-slate-400 w-12 shrink-0">From</span>
              <Select value={senderAlias} onValueChange={setSenderAlias}>
                <SelectTrigger className="flex-1 border-none shadow-none focus:ring-0 h-8 text-[11px] font-bold uppercase tracking-tight px-0 bg-transparent text-slate-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-slate-100 shadow-xl bg-white">
                  {["contact", "support", "hr", "info", "business"].map(a => (
                    <SelectItem key={a} value={a} className="text-[11px] font-bold uppercase cursor-pointer text-slate-900 focus:bg-slate-100 hover:bg-slate-100">{a}@swiftscaleinc.com</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Recipients */}
            <ChipInput label="To" chips={toChips} onChange={setToChips} placeholder="Recipients" />
            
            {!showCc && !showBcc && (
              <div className="px-4 py-1.5 flex gap-3 border-b border-slate-50">
                <button type="button" className="text-[10px] font-black uppercase text-slate-400 hover:text-primary transition-colors" onClick={() => setShowCc(true)}>Add Cc</button>
                <button type="button" className="text-[10px] font-black uppercase text-slate-400 hover:text-primary transition-colors" onClick={() => setShowBcc(true)}>Add Bcc</button>
              </div>
            )}
            
            {showCc && <ChipInput label="Cc" chips={ccChips} onChange={setCcChips} placeholder="Cc recipients" />}
            {showBcc && <ChipInput label="Bcc" chips={bccChips} onChange={setBccChips} placeholder="Bcc recipients" />}

            {/* Subject */}
            <div className="border-b border-slate-100 px-4 py-2 flex items-center gap-2 group">
              <span className="text-[10px] font-black uppercase text-slate-400 w-12 shrink-0">Subject</span>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 w-full border-none shadow-none ring-0 focus-visible:ring-0 text-sm font-bold h-9 px-0 bg-transparent text-slate-900 placeholder:text-slate-400"
                placeholder="Message Subject"
              />
            </div>

            <ScrollArea className="flex-1 px-4 py-2">
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border-none shadow-none ring-0 focus-visible:ring-0 text-sm font-medium min-h-[220px] p-0 resize-none leading-relaxed bg-transparent text-slate-900 placeholder:text-slate-400"
                placeholder="Type your message here..."
              />

              {/* Attached files list */}
              {(attachments.length > 0 || uploadingFiles.length > 0) && (
                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  {uploadingFiles.map(name => (
                    <div key={name} className="flex items-center gap-2 text-[10px] text-slate-400 font-bold animate-pulse">
                      <FileText className="w-3.5 h-3.5" /> Uploading {name}...
                    </div>
                  ))}
                  {attachments.map(att => (
                    <div key={att.publicId} className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-[11px] font-bold text-slate-700 truncate">{att.filename}</span>
                        <span className="text-[9px] text-slate-400 shrink-0">{(att.size / 1024).toFixed(0)} KB</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-5 w-5 text-slate-400 hover:text-rose-500 shrink-0" onClick={() => removeAttachment(att.publicId)}>
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleSend}
                disabled={isSending || !toChips || toChips.length === 0 || uploadingFiles.length > 0}
                className="rounded-full h-10 px-8 bg-primary hover:bg-primary/90 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                {isSending ? "Sending..." : <><Send className="w-3.5 h-3.5 mr-2" /> Send</>}
              </Button>
              {isSavingDraft && (
                <span className="text-[9px] font-black text-slate-400 uppercase animate-pulse">Saving...</span>
              )}
              {!isSavingDraft && lastSavedDraft && (
                <span className="text-[9px] font-bold text-slate-300 uppercase">Draft saved</span>
              )}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5"
                title="Attach file (max 2 MB each)"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingFiles.length > 0}
              >
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
            {attachments.length > 0 && (
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter bg-slate-100 px-3 py-1 rounded-lg">
                {attachments.length} attachment{attachments.length > 1 ? "s" : ""}
              </span>
            )}
            <div className="ml-auto">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-400 hover:text-rose-500" onClick={discardDraft} title="Discard">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

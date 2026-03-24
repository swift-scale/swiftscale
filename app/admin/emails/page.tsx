"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  MailWarning, 
  Inbox, 
  Archive, 
  Send, 
  RotateCcw,
  Star,
  Clock,
  Trash2,
  ChevronRight,
  Filter,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import ComposePopup from "@/components/admin/ComposePopup";

type Reply = {
  body: string;
  senderAlias: string;
  sentAt: string;
};

type Message = {
  id: string;
  name: string;
  email: string;
  service: string;
  details: string;
  status: "new" | "read" | "replied" | "archived" | "deleted" | "draft";
  time: string;
  fullDate: string;
  replies: Reply[];
  hasDraft?: boolean;
};

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  read: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  replied: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  archived: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  deleted: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  draft: "bg-rose-500/10 text-rose-600 border-rose-500/30",
};

export default function EmailsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages");
      const data = await response.json();
      if (data.success) {
        const mapped: Message[] = data.data.map((m: any) => ({
          id: m._id,
          name: `${m.firstName} ${m.lastName}`,
          email: m.email,
          service: m.service,
          details: m.details,
          status: m.status ?? "new",
          time: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          fullDate: new Date(m.createdAt).toLocaleDateString("en-IN", {
            day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
          }),
          replies: (m.replies || []).map((r: any) => ({
            ...r,
            sentAt: new Date(r.sentAt).toLocaleString("en-IN", {
              day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
            })
          })),
          hasDraft: !!m.draft?.body || !!m.draft?.subject || m.status === 'draft'
        }));
        setMessages(mapped);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load emails");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const updateStatus = async (id: string, status: Message["status"], e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
        toast.success(`Email ${status}`);
        window.dispatchEvent(new Event('messagesUpdate'));
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const syncEmails = async () => {
    setIsSyncing(true);
    const toastId = toast.loading("Syncing newest emails...");
    try {
      const res = await fetch("/api/admin/messages/sync");
      const data = await res.json();
      if (data.success) {
        toast.success(`Synced ${data.syncedCount} new email(s)`, { id: toastId });
        fetchMessages(); // refresh UI entirely!
        window.dispatchEvent(new Event('messagesUpdate'));
      } else {
        toast.error(data.message || "Failed to sync emails", { id: toastId });
      }
    } catch {
      toast.error("A network error occurred during sync", { id: toastId });
    } finally {
      setIsSyncing(false);
    }
  };

  const filtered = messages.filter(m => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.service.toLowerCase().includes(search.toLowerCase());
    
    if (filterStatus === "all") return matchSearch && m.status !== "deleted" && m.status !== "archived" && m.status !== "draft";
    if (filterStatus === "new") return matchSearch && m.status === "new";
    if (filterStatus === "replied") return matchSearch && (m.status === "replied" || m.name.includes("Outbound"));
    if (filterStatus === "drafts") return matchSearch && m.hasDraft;
    if (filterStatus === "archived") return matchSearch && m.status === "archived";
    if (filterStatus === "deleted") return matchSearch && m.status === "deleted";
    
    return matchSearch;
  });

  const FOLDERS = [
    { id: "all", label: "Inbox", icon: Inbox },
    { id: "new", label: "Unread", icon: Star },
    { id: "replied", label: "Sent", icon: Send },
    { id: "drafts", label: "Drafts", icon: Clock },
    { id: "archived", label: "Archive", icon: Archive },
    { id: "deleted", label: "Trash", icon: Trash2 },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      {/* Page Title & Actions */}
      <div className="flex items-end justify-between px-2">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Swiftscale CRM</p>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 leading-none">Inbox</h2>
        </div>
        <div className="flex items-center gap-3">
           <Button
             variant="outline"
             onClick={syncEmails}
             disabled={isSyncing}
             className="rounded-2xl h-12 px-6 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 border-slate-200"
           >
             <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} /> 
             {isSyncing ? "Syncing..." : "Sync Emails"}
           </Button>
           <Button 
            onClick={() => setIsComposeOpen(true)}
            className="rounded-2xl h-12 px-8 bg-primary hover:bg-primary/90 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20"
           >
             <Send className="w-4 h-4 mr-2" /> Compose
           </Button>
        </div>
      </div>

      <Card className="flex-1 flex overflow-hidden bg-white border-slate-100 shadow-xl shadow-blue-500/5 rounded-[2.5rem]">
        {/* Sidebar Nav */}
        <div className="w-16 lg:w-64 border-r border-slate-100 flex flex-col bg-slate-50/20 py-6">
          <nav className="flex-1 space-y-1 px-3">
            {FOLDERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all ${
                  filterStatus === f.id
                    ? "bg-primary/10 text-primary font-bold shadow-sm"
                    : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-900"
                }`}
              >
                <f.icon className="w-5 h-5 shrink-0" />
                <span className="hidden lg:inline text-sm">{f.label}</span>
                {f.id === "all" && messages.filter(m => m.status === "new").length > 0 && (
                  <span className="hidden lg:flex ml-auto bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {messages.filter(m => m.status === "new").length}
                  </span>
                )}
                {f.id === "drafts" && messages.filter(m => m.hasDraft).length > 0 && (
                  <span className="hidden lg:flex ml-auto bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {messages.filter(m => m.hasDraft).length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* List Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* List Header */}
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <Input
                placeholder="Search mail..."
                className="pl-12 bg-slate-50 border-transparent text-slate-900 h-11 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-medium text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-xl text-slate-400" onClick={fetchMessages}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl text-slate-400">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="divide-y divide-slate-50">
              {isLoading ? (
                <div className="p-20 text-center space-y-4">
                  <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Synchronizing database...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="p-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mx-auto">
                    <Inbox className="w-8 h-8" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">No communication history</p>
                </div>
              ) : (
                filtered.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => router.push(`/admin/emails/${msg.id}`)}
                    className={`group flex items-center gap-6 p-6 cursor-pointer transition-all hover:bg-slate-50/80 border-l-4 ${
                      msg.status === "new" ? "border-l-primary bg-blue-50/10" : "border-l-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-4 shrink-0">
                      <Star className={`h-4 w-4 ${msg.status === "new" ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                      <Avatar className="h-11 w-11 rounded-2xl shadow-sm border-2 border-white">
                        <AvatarFallback className={`${msg.status === "new" ? "bg-primary text-white" : "bg-slate-100 text-slate-500"} font-black text-xs rounded-2xl`}>
                          {msg.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div className="md:col-span-1">
                        <p className={`text-sm ${msg.status === "new" ? "font-black" : "font-bold"} text-slate-900 truncate`}>{msg.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium truncate shrink-0">{msg.email}</p>
                      </div>
                      
                      <div className="md:col-span-2">
                        <p className={`text-sm ${msg.status === "new" ? "font-bold text-slate-800" : "text-slate-500 font-medium"} truncate`}>
                          {msg.hasDraft && <span className="text-rose-600 font-black mr-2 uppercase text-[10px]">Draft</span>}
                          <span className="text-primary/70 mr-2">[{msg.service}]</span>
                          {msg.details}
                        </p>
                      </div>

                      <div className="md:col-span-1 flex items-center justify-end gap-3">
                        <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap hidden group-hover:hidden md:block">
                          {msg.time}
                        </span>
                        
                        {/* Quick Actions Hidden by Default */}
                        <div className="hidden group-hover:flex items-center gap-1 transition-all">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-blue-50 hover:text-primary" onClick={(e) => updateStatus(msg.id, "archived", e)}>
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-rose-50 hover:text-rose-500" onClick={(e) => updateStatus(msg.id, "deleted", e)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <ChevronRight className="h-4 w-4 text-slate-300 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </Card>

      {isComposeOpen && (
        <ComposePopup isOpen={isComposeOpen} onClose={() => { setIsComposeOpen(false); fetchMessages(); }} />
      )}
    </div>
  );
}

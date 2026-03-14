"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MailCheck, MailWarning, Inbox, Archive, CheckCircle, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";

type Message = {
  id: string;
  name: string;
  email: string;
  service: string;
  details: string;
  status: "new" | "read" | "replied" | "archived";
  time: string;
  fullDate: string;
};

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  read: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  replied: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  archived: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

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
        }));
        setMessages(mapped);
        if (mapped.length > 0 && !selectedId) setSelectedId(mapped[0].id);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const updateStatus = async (id: string, status: Message["status"]) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
        toast.success(`Marked as ${status}`);
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filtered = messages.filter(m => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || m.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const selected = messages.find(m => m.id === selectedId);

  const stats = [
    { label: "New", value: messages.filter(m => m.status === "new").length, icon: MailWarning, tone: "text-blue-500" },
    { label: "Total", value: messages.length, icon: MailCheck, tone: "text-emerald-500" },
    { label: "Replied", value: messages.filter(m => m.status === "replied").length, icon: CheckCircle, tone: "text-primary" },
  ];

  return (
    <div className="space-y-8 flex flex-col">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Customer Relations</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">Messages</h2>
          <p className="text-slate-400 text-sm font-medium">All inbound contact form queries.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="bg-white rounded-[2rem] border border-slate-100 p-6 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">{item.label}</p>
              <p className="text-3xl font-black text-slate-900 mt-1">{item.value}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <item.icon className={`h-5 w-5 ${item.tone}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Panel */}
      <Card className="flex-1 flex overflow-hidden bg-white border-slate-100 shadow-sm rounded-[2.5rem] min-h-[650px]">
        {/* Sidebar */}
        <div className="w-full lg:w-2/5 border-r border-slate-100 flex flex-col bg-slate-50/30">
          {/* Search & Filter */}
          <div className="p-6 border-b border-slate-100 bg-white space-y-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <Input
                placeholder="Search by name or email..."
                className="pl-12 bg-slate-50 border-transparent text-slate-900 h-11 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-medium text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "new", "read", "replied", "archived"].map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full transition-all ${
                    filterStatus === s
                      ? "bg-primary text-white shadow-md"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {isLoading ? (
                <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading...</div>
              ) : filtered.length === 0 ? (
                <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">No messages found</div>
              ) : (
                filtered.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedId(msg.id)}
                    className={`w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all duration-200 ${
                      selectedId === msg.id
                        ? "bg-white shadow-md border border-slate-100"
                        : "border border-transparent hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <Avatar className="h-10 w-10 rounded-xl shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary font-black text-xs rounded-xl">
                        {msg.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-black text-slate-900 truncate">{msg.name}</span>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${statusColors[msg.status]}`}>
                          {msg.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-medium truncate">{msg.service}</p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{msg.details}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Detail Panel */}
        <div className="flex-1 flex flex-col bg-white">
          {selected ? (
            <>
              {/* Detail Header */}
              <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 rounded-2xl">
                    <AvatarFallback className="bg-slate-100 text-slate-900 font-black text-sm rounded-2xl">
                      {selected.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{selected.name}</h3>
                    <p className="text-[11px] text-slate-400 font-medium">{selected.email}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${statusColors[selected.status]}`}>
                  {selected.status}
                </span>
              </div>

              {/* Message Body */}
              <ScrollArea className="flex-1 p-8">
                <div className="space-y-6 max-w-2xl">
                  {/* Meta cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Email", value: selected.email },
                      { label: "Service", value: selected.service },
                      { label: "Received", value: selected.fullDate },
                      { label: "Status", value: selected.status },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-slate-50 rounded-2xl p-4">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                        <p className="text-xs font-bold text-slate-800 capitalize">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Message */}
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Message</p>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{selected.details}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {selected.status !== "read" && (
                      <Button size="sm" variant="outline" className="rounded-xl text-xs font-black border-slate-200" onClick={() => updateStatus(selected.id, "read")}>
                        <Mail className="w-3.5 h-3.5 mr-1.5" /> Mark as Read
                      </Button>
                    )}
                    {selected.status !== "replied" && (
                      <Button size="sm" className="rounded-xl text-xs font-black bg-primary hover:bg-primary/90" onClick={() => updateStatus(selected.id, "replied")}>
                        <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Mark as Replied
                      </Button>
                    )}
                    {selected.status !== "archived" && (
                      <Button size="sm" variant="outline" className="rounded-xl text-xs font-black border-amber-200 text-amber-600 hover:bg-amber-50" onClick={() => updateStatus(selected.id, "archived")}>
                        <Archive className="w-3.5 h-3.5 mr-1.5" /> Archive
                      </Button>
                    )}
                    <a
                      href={`mailto:${selected.email}?subject=Re: Your enquiry — SwiftScale`}
                      className="inline-flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600"
                    >
                      <Mail className="w-3.5 h-3.5" /> Reply via Email
                    </a>
                  </div>
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200">
                <Inbox className="w-8 h-8" />
              </div>
              <p className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-300">Select a message to view details</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

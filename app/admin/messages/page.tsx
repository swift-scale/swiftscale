"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Search, Info, MessageSquarePlus, MailCheck, MailWarning } from "lucide-react";

const MOCK_CONVERSATIONS = [
  { id: "1", name: "Alice Williams", lastMessage: "Can you help me with my order?", time: "10:30 AM", unread: 2 },
  { id: "2", name: "Bob Johnson", lastMessage: "Thanks for the update!", time: "Yesterday", unread: 0 },
  { id: "3", name: "Charlie Brown", lastMessage: "I need a refund for my last purchase.", time: "Tuesday", unread: 1 },
  { id: "4", name: "Diana Prince", lastMessage: "When will the premium widget be back in stock?", time: "Monday", unread: 0 },
];

export default function MessagesPage() {
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/admin/messages");
        const data = await response.json();
        if (data.success) {
          const mapped = data.data.map((m: any) => ({
            id: m._id,
            name: `${m.firstName} ${m.lastName}`,
            lastMessage: m.details,
            time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            unread: m.status === 'new' ? 1 : 0,
            email: m.email,
            service: m.service
          }));
          setMessages(mapped);
          if (mapped.length > 0) setSelectedId(mapped[0].id);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const filteredConversations = messages.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedMessage = messages.find(m => m.id === selectedId);

  return (
    <div className="space-y-12 flex flex-col">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Customer Relations</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">Inbound Console</h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            Prioritize and respond to high‑value conversations in real time.
          </p>
        </div>
        <Button className="bg-primary text-white hover:bg-primary/90 rounded-2xl h-12 px-8 font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(36,27,235,0.25)] transition-all">
          <MessageSquarePlus className="mr-2 h-4 w-4" /> New Message
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Open Threads", value: messages.filter(m => m.unread > 0).length.toString(), icon: MailWarning, tone: "text-amber-500" },
          { label: "Total Recieved", value: messages.length.toString(), icon: MailCheck, tone: "text-emerald-500" },
          { label: "Avg. Response", value: "14m", icon: Info, tone: "text-primary" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-[2rem] border border-slate-100 p-8 flex items-center justify-between shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">{item.label}</p>
              <p className="text-3xl font-black text-slate-900 mt-2">{item.value}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <item.icon className={`h-5 w-5 ${item.tone}`} />
            </div>
          </div>
        ))}
      </div>

      <Card className="flex-1 flex overflow-hidden bg-white border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[3rem] min-h-[650px]">
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 border-r border-slate-100 flex flex-col bg-slate-50/30">
          <div className="p-8 border-b border-slate-100 bg-white">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <Input
                placeholder="Search messages..."
                className="pl-12 bg-slate-50 border-transparent text-slate-900 h-12 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {isLoading ? (
                <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Messages...</div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-8 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">No Messages Found</div>
              ) : (
                filteredConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedId(conv.id)}
                    className={`w-full flex items-start gap-4 p-5 rounded-[2rem] text-left transition-all duration-300 group ${
                      selectedId === conv.id 
                        ? "bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-slate-100" 
                        : "border-transparent hover:bg-white hover:shadow-lg"
                    }`}
                  >
                    <Avatar className="h-12 w-12 rounded-2xl border-none">
                      <AvatarFallback className="bg-primary/10 text-primary font-black text-xs rounded-2xl">
                        {conv.name.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest truncate">{conv.name}</span>
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-2">{conv.time}</span>
                      </div>
                      <p className={`text-[11px] font-medium leading-relaxed truncate ${conv.unread > 0 ? "text-slate-600 font-bold" : "text-slate-400"}`}>
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 group-hover:animate-ping" />
                    )}
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedMessage ? (
            <>
              {/* Chat Header */}
              <div className="h-24 px-10 border-b border-slate-50 flex items-center justify-between bg-white">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 rounded-2xl">
                    <AvatarFallback className="bg-slate-50 text-slate-900 font-black text-xs rounded-2xl">
                      {selectedMessage.name.split(" ").map((n: string) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-slate-900 tracking-tight truncate">
                      {selectedMessage.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">{selectedMessage.service}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{selectedMessage.email}</p>
                   <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary hover:bg-slate-50 rounded-2xl h-12 w-12">
                     <Info className="w-5 h-5" />
                   </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-10 bg-slate-50/20">
                <div className="space-y-10">
                  <div className="flex flex-col gap-2 max-w-[70%]">
                    <div className="bg-white border border-slate-100 text-slate-600 p-6 rounded-[2rem] rounded-tl-none text-xs font-medium leading-relaxed shadow-sm">
                      {selectedMessage.lastMessage}
                    </div>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-4">{selectedMessage.time}</span>
                  </div>
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-8 border-t border-slate-100 bg-white">
                <form className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-[2rem] p-3 text-slate-900 focus-within:bg-white focus-within:border-primary/20 focus-within:shadow-xl transition-all duration-500" onSubmit={(e) => e.preventDefault()}>
                  <Input 
                    placeholder="Secure message response..." 
                    className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-xs font-black placeholder:text-slate-300 h-12 px-6" 
                  />
                  <Button size="icon" type="submit" className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 w-12 shrink-0 shadow-[0_10px_20px_rgba(36,27,235,0.25)]">
                    <Send className="h-5 w-5" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
              <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200">
                <MessageSquarePlus className="w-10 h-10" />
              </div>
              <p className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-300">Select a transmission to view details</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}


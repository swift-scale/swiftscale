"use client";

import { useState } from "react";
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
  const [selectedId, setSelectedId] = useState(MOCK_CONVERSATIONS[0].id);

  const filteredConversations = MOCK_CONVERSATIONS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 flex flex-col">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-foreground/40">Customer Inbox</p>
          <h2 className="text-4xl font-display font-bold tracking-tight text-foreground">Messages</h2>
          <p className="text-muted-foreground mt-2">
            Prioritize and respond to high‑value conversations in real time.
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <MessageSquarePlus className="mr-2 h-4 w-4" /> New Message
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Open Threads", value: "18", icon: MailWarning, tone: "text-amber-400" },
          { label: "Resolved Today", value: "42", icon: MailCheck, tone: "text-emerald-500" },
          { label: "Avg. Response", value: "14m", icon: Info, tone: "text-accent" },
        ].map((item) => (
          <div key={item.label} className="glass-panel rounded-2xl border border-border p-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/40">{item.label}</p>
              <p className="text-2xl font-display font-bold text-foreground mt-2">{item.value}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-card/40 flex items-center justify-center">
              <item.icon className={`h-5 w-5 ${item.tone}`} />
            </div>
          </div>
        ))}
      </div>

      <Card className="flex-1 flex overflow-hidden bg-card/60 border-border/60 shadow-xl backdrop-blur min-h-[520px]">
        {/* Sidebar */}
        <div className="w-full lg:w-1/3 border-r border-border/50 flex flex-col bg-background/70">
          <div className="p-4 border-b border-border/50">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-10 bg-muted/50 border-border text-foreground focus:border-accent focus:ring-accent/20 h-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-3 space-y-2">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedId(conv.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 border ${
                    selectedId === conv.id 
                      ? "bg-card/60 border-border/60" 
                      : "border-transparent hover:bg-card/40"
                  }`}
                >
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback className="bg-muted/50 text-foreground/80 font-medium">
                      {conv.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground truncate">{conv.name}</span>
                      <span className="text-xs text-foreground/40 whitespace-nowrap ml-2">{conv.time}</span>
                    </div>
                    <p className={`text-sm truncate ${conv.unread > 0 ? "text-foreground/80 font-medium" : "text-muted-foreground"}`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="h-5 w-5 rounded-full bg-accent text-foreground text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-[0_0_10px_rgba(var(--accent),0.5)]">
                      {conv.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background/30">
          {/* Chat Header */}
          <div className="h-16 px-6 border-b border-border/50 flex items-center justify-between bg-card backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-border">
                <AvatarFallback className="bg-muted text-foreground font-medium">
                  {MOCK_CONVERSATIONS.find(c => c.id === selectedId)?.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground leading-tight">
                  {MOCK_CONVERSATIONS.find(c => c.id === selectedId)?.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <p className="text-[11px] text-foreground/50 font-medium uppercase tracking-wider">Online</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-foreground/50 hover:text-foreground hover:bg-card/40 rounded-full">
              <Info className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-1 max-w-[75%]">
                <div className="bg-card/40 border border-border/60 text-foreground/90 p-4 rounded-2xl rounded-tl-sm text-sm shadow-sm">
                  Hi, I have a question about my recent order. The tracking says delivered but I haven't received it.
                </div>
                <span className="text-[11px] text-foreground/40 ml-1 mt-1 font-medium">10:25 AM</span>
              </div>
              
              <div className="flex flex-col gap-1 max-w-[75%] self-end items-end ml-auto">
                <div className="bg-accent text-foreground p-4 rounded-2xl rounded-tr-sm text-sm shadow-[0_4px_15px_rgba(var(--accent),0.2)]">
                  Hello! I'm sorry to hear that. Could you please provide your order number so I can check the status for you?
                </div>
                <span className="text-[11px] text-foreground/40 mr-1 mt-1 font-medium">10:28 AM</span>
              </div>

              <div className="flex flex-col gap-1 max-w-[75%]">
                <div className="bg-card/40 border border-border/60 text-foreground/90 p-4 rounded-2xl rounded-tl-sm text-sm shadow-sm">
                  Yes, it's ORD-7352.
                </div>
                <span className="text-[11px] text-foreground/40 ml-1 mt-1 font-medium">10:30 AM</span>
              </div>
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border/50 bg-card backdrop-blur-sm">
            <form className="flex items-center gap-3 bg-background border border-border rounded-2xl p-2 pr-2 shadow-inner focus-within:border-primary transition-colors" onSubmit={(e) => e.preventDefault()}>
              <Input 
                placeholder="Type your message..." 
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-foreground h-10 px-3 placeholder:text-muted-foreground/70" 
              />
              <Button size="icon" type="submit" className="bg-primary hover:bg-primary/90 text-foreground rounded-xl h-10 w-10 shrink-0">
                <Send className="h-4 w-4 ml-0.5" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}

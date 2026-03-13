import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Search, Info } from "lucide-react";

const MOCK_CONVERSATIONS = [
  { id: "1", name: "Alice Williams", lastMessage: "Can you help me with my order?", time: "10:30 AM", unread: 2 },
  { id: "2", name: "Bob Johnson", lastMessage: "Thanks for the update!", time: "Yesterday", unread: 0 },
  { id: "3", name: "Charlie Brown", lastMessage: "I need a refund for my last purchase.", time: "Tuesday", unread: 1 },
  { id: "4", name: "Diana Prince", lastMessage: "When will the premium widget be back in stock?", time: "Monday", unread: 0 },
];

export default function Messages() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(MOCK_CONVERSATIONS[0].id);

  const filteredConversations = MOCK_CONVERSATIONS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 h-[calc(100vh-120px)] flex flex-col">
      <div>
        <h2 className="text-3xl font-display font-bold tracking-tight text-white">Messages</h2>
        <p className="text-muted-foreground mt-1">
          Communicate with your customers and users.
        </p>
      </div>

      <Card className="flex-1 flex overflow-hidden bg-card border-white/5 shadow-xl">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-white/5 flex flex-col bg-background/50">
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-10 bg-white/5 border-white/10 text-white focus:border-accent focus:ring-accent/20 h-10"
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
                      ? "bg-white/10 border-white/10" 
                      : "border-transparent hover:bg-white/5"
                  }`}
                >
                  <Avatar className="h-10 w-10 border border-white/10">
                    <AvatarFallback className="bg-white/5 text-white/80 font-medium">
                      {conv.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white truncate">{conv.name}</span>
                      <span className="text-xs text-white/40 whitespace-nowrap ml-2">{conv.time}</span>
                    </div>
                    <p className={`text-sm truncate ${conv.unread > 0 ? "text-white/80 font-medium" : "text-muted-foreground"}`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="h-5 w-5 rounded-full bg-accent text-white text-[10px] flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-[0_0_10px_rgba(var(--accent),0.5)]">
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
          <div className="h-16 px-6 border-b border-white/5 flex items-center justify-between bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-white/10">
                <AvatarFallback className="bg-white/10 text-white font-medium">
                  {MOCK_CONVERSATIONS.find(c => c.id === selectedId)?.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-white leading-tight">
                  {MOCK_CONVERSATIONS.find(c => c.id === selectedId)?.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <p className="text-[11px] text-white/50 font-medium uppercase tracking-wider">Online</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/5 rounded-full">
              <Info className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-1 max-w-[75%]">
                <div className="bg-white/5 border border-white/10 text-white/90 p-4 rounded-2xl rounded-tl-sm text-sm shadow-sm">
                  Hi, I have a question about my recent order. The tracking says delivered but I haven't received it.
                </div>
                <span className="text-[11px] text-white/40 ml-1 mt-1 font-medium">10:25 AM</span>
              </div>
              
              <div className="flex flex-col gap-1 max-w-[75%] self-end items-end ml-auto">
                <div className="bg-accent text-white p-4 rounded-2xl rounded-tr-sm text-sm shadow-[0_4px_15px_rgba(var(--accent),0.2)]">
                  Hello! I'm sorry to hear that. Could you please provide your order number so I can check the status for you?
                </div>
                <span className="text-[11px] text-white/40 mr-1 mt-1 font-medium">10:28 AM</span>
              </div>

              <div className="flex flex-col gap-1 max-w-[75%]">
                <div className="bg-white/5 border border-white/10 text-white/90 p-4 rounded-2xl rounded-tl-sm text-sm shadow-sm">
                  Yes, it's ORD-7352.
                </div>
                <span className="text-[11px] text-white/40 ml-1 mt-1 font-medium">10:30 AM</span>
              </div>
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-card/50 backdrop-blur-sm">
            <form className="flex items-center gap-3 bg-background border border-white/10 rounded-2xl p-2 pr-2 shadow-inner focus-within:border-white/20 transition-colors" onSubmit={(e) => e.preventDefault()}>
              <Input 
                placeholder="Type your message..." 
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-white h-10 px-3 placeholder:text-white/30" 
              />
              <Button size="icon" type="submit" className="bg-accent hover:bg-accent/90 text-white rounded-xl h-10 w-10 shrink-0">
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
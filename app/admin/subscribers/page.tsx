"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, Users, UserCheck, UserMinus, Trash2, Download } from "lucide-react";
import { toast } from "sonner";

type Subscriber = {
  _id: string;
  email: string;
  status: "active" | "unsubscribed";
  source: string;
  subscribedAt: string;
  unsubscribedAt?: string;
};

type Stats = {
  total: number;
  active: number;
  unsubscribed: number;
};

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  unsubscribed: "bg-slate-100 text-slate-500 border-slate-200",
};

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, unsubscribed: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSubscribers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/subscribers?status=${filterStatus}`);
      const data = await res.json();
      if (data.success) {
        setSubscribers(data.data);
        setStats(data.stats);
      }
    } catch {
      toast.error("Failed to load subscribers.");
    } finally {
      setIsLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Remove ${email} permanently?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/subscribers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setSubscribers(prev => prev.filter(s => s._id !== id));
        setStats(prev => ({
          ...prev,
          total: prev.total - 1,
          active: prev.active, // re-fetch for accuracy
        }));
        toast.success("Subscriber removed.");
      }
    } catch {
      toast.error("Failed to remove subscriber.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Email", "Status", "Source", "Subscribed At", "Unsubscribed At"];
    const rows = subscribers.map(s => [
      s.email,
      s.status,
      s.source,
      new Date(s.subscribedAt).toLocaleDateString("en-IN"),
      s.unsubscribedAt ? new Date(s.unsubscribedAt).toLocaleDateString("en-IN") : "",
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `swiftscale-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Newsletter</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">Subscribers</h2>
          <p className="text-slate-400 text-sm font-medium">Manage your newsletter audience.</p>
        </div>
        <Button
          onClick={handleExportCSV}
          variant="outline"
          className="rounded-2xl h-11 px-6 font-black text-xs uppercase tracking-widest border-slate-200 hover:bg-slate-50"
        >
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total", value: stats.total, icon: Users, tone: "text-primary" },
          { label: "Active", value: stats.active, icon: UserCheck, tone: "text-emerald-500" },
          { label: "Unsubscribed", value: stats.unsubscribed, icon: UserMinus, tone: "text-slate-400" },
        ].map(item => (
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

      {/* Table Card */}
      <Card className="bg-white border-slate-100 shadow-sm rounded-[2.5rem] overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <Input
              placeholder="Search by email..."
              className="pl-12 bg-slate-50 border-transparent text-slate-900 h-11 rounded-2xl focus:bg-white focus:border-primary/20 transition-all text-sm font-medium"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 shrink-0">
            {["all", "active", "unsubscribed"].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-full transition-all ${
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

        {/* Table */}
        <ScrollArea className="h-[500px]">
          {isLoading ? (
            <div className="p-16 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">No subscribers found</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 py-4 px-6">Email</th>
                  <th className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 py-4 px-4">Status</th>
                  <th className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 py-4 px-4">Source</th>
                  <th className="text-left text-[10px] font-black uppercase tracking-widest text-slate-400 py-4 px-4">Subscribed</th>
                  <th className="py-4 px-6" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(sub => (
                  <tr key={sub._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <td className="py-4 px-6 font-medium text-slate-800">{sub.email}</td>
                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${STATUS_STYLES[sub.status]}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500 text-xs font-medium capitalize">{sub.source}</td>
                    <td className="py-4 px-4 text-slate-400 text-xs font-medium">
                      {new Date(sub.subscribedAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(sub._id, sub.email)}
                        disabled={deletingId === sub._id}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                        aria-label={`Remove ${sub.email}`}
                      >
                        {deletingId === sub._id ? (
                          <span className="w-4 h-4 border-2 border-slate-200 border-t-red-400 rounded-full animate-spin inline-block" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </ScrollArea>

        {!isLoading && (
          <div className="px-6 py-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
            Showing {filtered.length} of {subscribers.length} subscribers
          </div>
        )}
      </Card>
    </div>
  );
}

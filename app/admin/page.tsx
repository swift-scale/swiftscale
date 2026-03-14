"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Eye,
  MousePointerClick,
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Instagram,
  Facebook,
  ExternalLink,
  MessageSquare,
  LayoutList,
  Activity,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const engagementStats = [
    {
      title: "Global Views",
      value: stats?.totalViews?.toLocaleString() || "124,563",
      trend: "+ 15.5%",
      trendType: "up",
      icon: Eye,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50/50"
    },
    {
      title: "Active Services",
      value: stats?.totalServices?.toString() || "0",
      trend: "+ 2",
      trendType: "up",
      icon: LayoutList,
      iconColor: "text-indigo-500",
      bgColor: "bg-indigo-50"
    },
    {
      title: "New Messages",
      value: stats?.newMessages?.toString() || "0",
      trend: (stats?.newMessages || 0) > 0 ? "Action Required" : "0.00%",
      trendType: (stats?.newMessages || 0) > 0 ? "up" : "down",
      icon: MessageSquare,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Conversion",
      value: (stats?.conversionRate || "3.8") + "%",
      trend: "+ 0.4%",
      trendType: "up",
      icon: Target,
      iconColor: "text-violet-500",
      bgColor: "bg-violet-50"
    }
  ];

  return (
    <div className="space-y-10 pb-10">
      {/* Summary Engagement */}
      <div className="space-y-6">
        <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase tracking-[0.2em]">Live Intelligence</h3>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {engagementStats.map((stat) => (
            <Card key={stat.title} className="bg-white border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.title}</CardTitle>
                <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="text-3xl font-black text-slate-900 tracking-tighter mb-4">
                  {isLoading ? "..." : stat.value}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">vs Last month</span>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black ${
                    stat.trendType === 'up' ? 'text-emerald-500 bg-emerald-50' : 'text-rose-500 bg-rose-50'
                  }`}>
                    {stat.trendType === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.trend}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* All Impressions & Conversions */}
        <Card className="lg:col-span-2 bg-white border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] rounded-[2rem] overflow-hidden">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-black text-slate-900">Conversion Matrix</CardTitle>
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[8px] text-slate-400 font-bold italic">i</div>
              </div>
              <div className="flex items-center gap-6">
                {[
                  { label: "Views", color: "bg-blue-400" },
                  { label: "Conversions", color: "bg-indigo-400" },
                  { label: "Messages", color: "bg-blue-600" }
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${l.color}`} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="h-[300px] w-full relative">
              <div className="absolute inset-0 flex items-end justify-between px-2 opacity-10">
                {[
                  72, 45, 88, 34, 91, 56, 78, 23, 67, 45, 
                  89, 12, 56, 78, 34, 90, 45, 67, 23, 56,
                  78, 34, 89, 12, 45, 67, 23, 56, 78, 34,
                  90, 45, 67, 23, 56, 78, 34, 89, 12, 45
                ].map((height, i) => (
                  <div key={i} className="w-1 bg-slate-200" style={{ height: `${height}%` }} />
                ))}
              </div>
              <svg className="w-full h-full text-primary/10" viewBox="0 0 1000 300" preserveAspectRatio="none">
                <path d="M0 250 Q 250 150 500 220 T 1000 100 L 1000 300 L 0 300 Z" fill="currentColor" />
                <path d="M0 250 Q 250 150 500 220 T 1000 100" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary" />
              </svg>
            </div>
            <div className="flex justify-between mt-8 px-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
              <span>July</span>
              <span>August</span>
              <span>September</span>
              <span>October</span>
              <span>November</span>
              <span>December</span>
            </div>
          </CardContent>
        </Card>

        {/* Viewer Behavior */}
        <Card className="bg-white border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] rounded-[2rem] overflow-hidden flex flex-col">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-black text-slate-900">Operational Pulse</CardTitle>
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[8px] text-slate-400 font-bold italic">i</div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-300">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-4xl font-black text-slate-900 tracking-tighter mb-8">98.2%</div>
            <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { label: "Health", color: "bg-blue-600" },
                { label: "Latency", color: "bg-blue-200" },
                { label: "Uptime", color: "bg-slate-100" }
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2 whitespace-nowrap">
                  <div className={`w-2 h-2 rounded-full ${l.color}`} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{l.label}</span>
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0 flex-1 flex flex-col justify-end">
            <div className="h-[200px] flex items-end justify-between gap-2 mb-6">
              {[20, 35, 45, 80, 55, 65, 75].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                  <div className="w-full flex flex-col-reverse rounded-full overflow-hidden" style={{ height: '100%' }}>
                    <div className="bg-slate-50 w-full" style={{ height: `${100-height}%` }} />
                    <div className="bg-blue-600 w-full rounded-full" style={{ height: `${height * 0.4}%` }} />
                    <div className="bg-blue-400 w-full" style={{ height: `${height * 0.3}%` }} />
                    <div className="bg-blue-200 w-full" style={{ height: `${height * 0.3}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Portfolio Linkage Section (Quick Overview) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase tracking-[0.2em]">Operational Snapshots</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-primary">Live Monitoring Active</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              platform: "System",
              status: "Active",
              title: "Global Content Delivery Network",
              image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
              logo: Activity
            },
            {
              platform: "Security",
              status: "Active",
              title: "Encrypted Inbound Channel",
              image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
              logo: ShieldCheck
            },
            {
              platform: "Core",
              status: "Optimal",
              title: "Business Logic Engine",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
              logo: Target
            }
          ].map((camp, i) => (
            <Card key={i} className="bg-white border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden group hover:shadow-xl transition-all p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                    <camp.logo className="h-3 w-3" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-900">{camp.platform}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        camp.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'
                      }`}>{camp.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-sm font-black text-slate-900 tracking-tight mb-4 group-hover:text-primary transition-colors">{camp.title}</h4>
              
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden">
                <img src={camp.image} alt={camp.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <Button className="w-full bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest h-10 rounded-xl hover:bg-white/90">
                    Audit Status <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

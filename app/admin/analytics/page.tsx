import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  MousePointerClick,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Intelligence</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">Market Intelligence</h2>
          <p className="text-slate-400 text-sm font-medium max-w-xl">
            Deep insights across traffic, engagement, and conversion metrics.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="h-10 px-6 rounded-xl border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">7d</Button>
          <Button variant="outline" className="h-10 px-6 rounded-xl border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">30d</Button>
          <Button className="bg-primary text-white hover:bg-primary/90 rounded-xl h-10 px-6 font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(36,27,235,0.25)] transition-all">90d</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Views", value: "124,563", icon: BarChartIcon, trend: "+14%", iconColor: "text-primary" },
          { title: "Bounce Rate", value: "32.4%", icon: TrendingUp, trend: "-2.1%", iconColor: "text-rose-500" },
          { title: "Avg. Session", value: "4m 12s", icon: Clock, trend: "+18s", iconColor: "text-primary" },
          { title: "Conversion", value: "3.8%", icon: MousePointerClick, trend: "+0.4%", iconColor: "text-emerald-500" },
        ].map((item) => (
          <Card key={item.title} className="bg-white border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] overflow-hidden transition-all hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-8 pb-4">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{item.title}</CardTitle>
              <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center">
                <item.icon className={`h-4 w-4 ${item.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="text-3xl font-black text-slate-900 tracking-tighter">{item.value}</div>
              <p className="flex items-center text-[10px] mt-3 font-black uppercase tracking-widest">
                <span className={item.trend.includes("+") ? "text-emerald-500" : "text-rose-500"}>
                  {item.trend}
                </span>
                <span className="text-slate-300 ml-1.5">vs prev month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="traffic" className="space-y-10">
        <TabsList className="bg-slate-50 border border-slate-100 p-1.5 rounded-2xl h-14">
          <TabsTrigger value="traffic" className="rounded-xl h-full px-8 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">Traffic</TabsTrigger>
          <TabsTrigger value="demographics" className="rounded-xl h-full px-8 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">Demographics</TabsTrigger>
          <TabsTrigger value="devices" className="rounded-xl h-full px-8 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all">Devices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traffic" className="focus-visible:ring-0">
          <Card className="bg-white border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] overflow-hidden">
            <CardHeader className="p-10 pb-0">
              <CardTitle className="text-xl font-black text-slate-900">Traffic Distribution</CardTitle>
              <CardDescription className="text-slate-400 font-medium">Real-time visitor signals over the last 30 operational days.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 pt-6">
              <div className="h-[400px] w-full flex items-end justify-between px-2 pb-8">
                {Array.from({ length: 30 }).map((_, i) => {
                  const height = 20 + Math.random() * 80;
                  return (
                    <div key={i} className="w-full mx-1 group relative flex items-end h-full">
                      <div 
                        className="bg-slate-50 group-hover:bg-primary transition-all duration-500 rounded-full w-full" 
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {Math.floor(height * 1.5)}K
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="focus-visible:ring-0">
          <div className="grid gap-10 md:grid-cols-2">
            <Card className="bg-white border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] p-4">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-xl font-black text-slate-900">Top Geographies</CardTitle>
                <CardDescription className="text-slate-400 font-medium">Regional user density Breakdown.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  {[
                    { country: "United States", percentage: 45 },
                    { country: "United Kingdom", percentage: 15 },
                    { country: "Germany", percentage: 12 },
                    { country: "Canada", percentage: 8 },
                    { country: "Australia", percentage: 5 },
                  ].map((item) => (
                    <div key={item.country} className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                        <span className="text-slate-900">{item.country}</span>
                        <span className="text-slate-400">{item.percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] p-4">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-xl font-black text-slate-900">Referral Sources</CardTitle>
                <CardDescription className="text-slate-400 font-medium">Inbound traffic origin points.</CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-8">
                  {[
                    { source: "Direct Access", percentage: 40 },
                    { source: "Organic Search", percentage: 35 },
                    { source: "Social Media", percentage: 12 },
                    { source: "Email Pipeline", percentage: 8 },
                    { source: "Referral Link", percentage: 5 },
                  ].map((item) => (
                    <div key={item.source} className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                        <span className="text-slate-900">{item.source}</span>
                        <span className="text-slate-400">{item.percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="focus-visible:ring-0">
          <Card className="bg-white border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] p-20 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Technical Device Audit</h3>
              <p className="text-slate-400 font-medium">Metrics for operational system usage and device distribution are currently being calibrated.</p>
              <Button variant="outline" className="mt-8 rounded-xl h-12 px-8 font-black text-[10px] uppercase tracking-widest border-slate-200">Request Audit</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

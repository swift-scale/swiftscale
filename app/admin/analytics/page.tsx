import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Users, 
  MousePointerClick,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-white">Analytics</h2>
          <p className="text-muted-foreground mt-1">
            Detailed insights into your platform's performance.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-white/5 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Total Views</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <BarChartIcon className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-white">124,563</div>
            <p className="flex items-center text-xs mt-2 font-medium text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +14% <span className="text-muted-foreground ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-white/5 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Bounce Rate</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-white">32.4%</div>
            <p className="flex items-center text-xs mt-2 font-medium text-rose-500">
              <ArrowDownRight className="mr-1 h-3 w-3" /> -2.1% <span className="text-muted-foreground ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-white/5 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Avg. Session</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <Clock className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-white">4m 12s</div>
            <p className="flex items-center text-xs mt-2 font-medium text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +18s <span className="text-muted-foreground ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-white/5 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Conversion Rate</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
              <MousePointerClick className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-white">3.8%</div>
            <p className="flex items-center text-xs mt-2 font-medium text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +0.4% <span className="text-muted-foreground ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
          <TabsTrigger value="traffic" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-white">Traffic</TabsTrigger>
          <TabsTrigger value="demographics" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-white">Demographics</TabsTrigger>
          <TabsTrigger value="devices" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-white">Devices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traffic" className="space-y-4">
          <Card className="bg-card border-white/5 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Traffic Overview</CardTitle>
              <CardDescription>
                Visitor traffic over the last 30 days.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[350px] w-full flex items-end justify-between px-4 pb-4">
                {/* Simulated Chart */}
                {Array.from({ length: 30 }).map((_, i) => {
                  const height = 20 + Math.random() * 80;
                  return (
                    <div key={i} className="w-full mx-[2px] group relative flex items-end h-full">
                      <div 
                        className="bg-primary/20 group-hover:bg-primary transition-colors rounded-t-sm w-full" 
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card border-white/5 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Top Countries</CardTitle>
                <CardDescription>Where your users are located.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {[
                    { country: "United States", percentage: 45 },
                    { country: "United Kingdom", percentage: 15 },
                    { country: "Germany", percentage: 12 },
                    { country: "Canada", percentage: 8 },
                    { country: "Australia", percentage: 5 },
                  ].map((item) => (
                    <div key={item.country} className="flex items-center">
                      <div className="w-32 font-semibold text-sm text-white/90">{item.country}</div>
                      <div className="flex-1 ml-4">
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm font-medium text-white/70">
                        {item.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-white/5 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Top Sources</CardTitle>
                <CardDescription>How users are finding you.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {[
                    { source: "Direct", percentage: 40 },
                    { source: "Google", percentage: 35 },
                    { source: "Twitter", percentage: 12 },
                    { source: "Facebook", percentage: 8 },
                    { source: "Referral", percentage: 5 },
                  ].map((item) => (
                    <div key={item.source} className="flex items-center">
                      <div className="w-32 font-semibold text-sm text-white/90">{item.source}</div>
                      <div className="flex-1 ml-4">
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm font-medium text-white/70">
                        {item.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card className="bg-card border-white/5 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">Device Breakdown</CardTitle>
              <CardDescription>
                Usage by device type and operating system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-dashed border-2 border-white/10 rounded-xl bg-white/[0.02]">
                <p className="text-muted-foreground font-medium">Detailed device metrics visualization would go here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

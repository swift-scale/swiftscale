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
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-foreground/40">Intelligence</p>
          <h2 className="text-4xl font-display font-bold tracking-tight text-foreground">Analytics</h2>
          <p className="text-muted-foreground mt-2">
            Deep insights across traffic, engagement, and conversion.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="border-border/60 text-foreground hover:bg-card/60">7d</Button>
          <Button variant="outline" className="border-border/60 text-foreground hover:bg-card/60">30d</Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">90d</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/60 border-border/60 shadow-lg backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">Total Views</CardTitle>
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <BarChartIcon className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">124,563</div>
            <p className="flex items-center text-xs mt-2 font-medium text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +14% <span className="text-muted-foreground ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/60 border-border/60 shadow-lg backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">Bounce Rate</CardTitle>
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">32.4%</div>
            <p className="flex items-center text-xs mt-2 font-medium text-rose-500">
              <ArrowDownRight className="mr-1 h-3 w-3" /> -2.1% <span className="text-muted-foreground ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/60 border-border/60 shadow-lg backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">Avg. Session</CardTitle>
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <Clock className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">4m 12s</div>
            <p className="flex items-center text-xs mt-2 font-medium text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +18s <span className="text-muted-foreground ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/60 border-border/60 shadow-lg backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground/70">Conversion Rate</CardTitle>
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <MousePointerClick className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-foreground">3.8%</div>
            <p className="flex items-center text-xs mt-2 font-medium text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +0.4% <span className="text-muted-foreground ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList className="bg-card/40 border border-border/60 p-1 rounded-xl">
          <TabsTrigger value="traffic" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground">Traffic</TabsTrigger>
          <TabsTrigger value="demographics" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground">Demographics</TabsTrigger>
          <TabsTrigger value="devices" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground">Devices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traffic" className="space-y-4">
          <Card className="bg-card/60 border-border/60 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-foreground">Traffic Overview</CardTitle>
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
            <Card className="bg-card/60 border-border/60 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle className="text-foreground">Top Countries</CardTitle>
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
                      <div className="w-32 font-semibold text-sm text-foreground/90">{item.country}</div>
                      <div className="flex-1 ml-4">
                        <div className="h-2 w-full bg-card/40 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm font-medium text-foreground/70">
                        {item.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/60 border-border/60 shadow-lg backdrop-blur">
              <CardHeader>
                <CardTitle className="text-foreground">Top Sources</CardTitle>
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
                      <div className="w-32 font-semibold text-sm text-foreground/90">{item.source}</div>
                      <div className="flex-1 ml-4">
                        <div className="h-2 w-full bg-card/40 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm font-medium text-foreground/70">
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
          <Card className="bg-card/60 border-border/60 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-foreground">Device Breakdown</CardTitle>
              <CardDescription>
                Usage by device type and operating system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-dashed border-2 border-border/60 rounded-xl bg-card/40">
                <p className="text-muted-foreground font-medium">Detailed device metrics visualization would go here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

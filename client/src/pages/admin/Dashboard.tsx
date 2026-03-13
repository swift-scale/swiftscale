import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Eye,
  MousePointerClick,
  Users,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Traffic",
      value: "124,563",
      description: "+14.2% from last month",
      icon: Eye,
      trend: "up"
    },
    {
      title: "Conversion Rate",
      value: "4.3%",
      description: "+1.1% from last month",
      icon: MousePointerClick,
      trend: "up"
    },
    {
      title: "Active Leads",
      value: "842",
      description: "+12% from last month",
      icon: Users,
      trend: "up"
    },
    {
      title: "Bounce Rate",
      value: "32.4%",
      description: "-2.4% from last month",
      icon: TrendingUp,
      trend: "down"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-foreground/40">Admin Overview</p>
          <h2 className="text-4xl font-display font-bold tracking-tight text-foreground">Command Center</h2>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Monitor growth, ops health, and live customer activity in one glance.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="border-border/60 text-foreground hover:bg-card/60">
            Export Snapshot
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card/60 border-border/60 shadow-lg backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70">
                {stat.title}
              </CardTitle>
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold text-foreground">{stat.value}</div>
              <p className="flex items-center text-xs mt-2 font-medium">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-rose-500" />
                )}
                <span className={stat.trend === "up" ? "text-emerald-500" : "text-rose-500"}>
                  {stat.description.split(" ")[0]}
                </span>
                <span className="text-muted-foreground ml-1">
                  {stat.description.split(" ").slice(1).join(" ")}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card/60 border-border/60 shadow-lg flex flex-col backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Traffic Overview</CardTitle>
            <CardDescription>
              Website visitors over the current year.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2 flex-1 flex flex-col justify-end">
            <div className="h-[250px] flex items-end justify-between px-4 pb-4">
              {[40, 30, 45, 60, 55, 75, 65, 80, 70, 90, 85, 100].map((height, i) => (
                <div key={i} className="w-full mx-1 group relative flex items-end h-full">
                  <div 
                    className="bg-primary/20 group-hover:bg-primary transition-colors rounded-t-sm w-full" 
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between px-4 text-xs font-medium text-foreground/40">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/60 border-border/60 shadow-lg flex flex-col backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Inquiries</CardTitle>
            <CardDescription>
              Latest contact form submissions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-6">
              {[
                { name: "TechCorp Inc.", subject: "Enterprise Training", time: "2 hours ago", status: "New" },
                { name: "Sarah Chen", subject: "BI Consulting", time: "4 hours ago", status: "In Progress" },
                { name: "Global Retail", subject: "E-Commerce Setup", time: "Yesterday", status: "Resolved" },
                { name: "Marcus Johnson", subject: "Cloud Migration", time: "Yesterday", status: "New" },
              ].map((inquiry, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-foreground/70 font-medium group-hover:bg-muted transition-colors">
                    {inquiry.name.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground leading-none">{inquiry.name}</p>
                      <span className="text-xs text-foreground/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {inquiry.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{inquiry.subject}</p>
                  </div>
                  <div className="shrink-0">
                    {inquiry.status === "New" ? (
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    ) : inquiry.status === "Resolved" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="bg-card/60 border-border/60 shadow-lg backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">System Health</CardTitle>
            <CardDescription>Live infrastructure signals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-foreground/80">
            <div className="flex items-center justify-between">
              <span>API Uptime</span>
              <span className="text-emerald-500 font-semibold">99.98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Error Rate</span>
              <span className="text-amber-400 font-semibold">0.12%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Queue Health</span>
              <span className="text-emerald-500 font-semibold">Stable</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 border-border/60 shadow-lg backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Security</CardTitle>
            <CardDescription>Credential and access status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-foreground/80">
            <div className="flex items-center justify-between">
              <span>MFA Coverage</span>
              <span className="text-emerald-500 font-semibold">94%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Open Alerts</span>
              <span className="text-amber-400 font-semibold">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Audit</span>
              <span className="text-foreground/60">2 days ago</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 border-border/60 shadow-lg backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Ops Pulse</CardTitle>
            <CardDescription>Deployments and SLA.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-foreground/80">
            <div className="flex items-center justify-between">
              <span>Deployments</span>
              <span className="text-foreground font-semibold">18 this week</span>
            </div>
            <div className="flex items-center justify-between">
              <span>SLA Status</span>
              <span className="text-emerald-500 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" /> Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Incidents</span>
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" /> 1 Open
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

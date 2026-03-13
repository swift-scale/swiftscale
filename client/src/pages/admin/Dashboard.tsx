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
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Clock
} from "lucide-react";

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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-bold tracking-tight text-white">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">
          Monitor your platform's performance and recent activities.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-white/5 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                {stat.title}
              </CardTitle>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-display font-bold text-white">{stat.value}</div>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card border-white/5 shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle className="text-white">Traffic Overview</CardTitle>
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
            <div className="flex justify-between px-4 text-xs font-medium text-white/40">
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
        
        <Card className="col-span-3 bg-card border-white/5 shadow-lg flex flex-col">
          <CardHeader>
            <CardTitle className="text-white">Recent Inquiries</CardTitle>
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
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 font-medium group-hover:bg-white/10 transition-colors">
                    {inquiry.name.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white leading-none">{inquiry.name}</p>
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {inquiry.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{inquiry.subject}</p>
                  </div>
                  <div className="shrink-0">
                    {inquiry.status === "New" ? (
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
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
    </div>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Globe, Lock, Bell, Save, ShieldCheck, Activity } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-foreground/40">Configuration</p>
          <h2 className="text-4xl font-display font-bold tracking-tight text-foreground">Settings</h2>
          <p className="text-muted-foreground mt-2">
            Control platform identity, security posture, and notification channels.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="border-border/60 text-foreground hover:bg-card/60">
            Audit Logs
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Save All Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Security Score", value: "92%", icon: ShieldCheck, tone: "text-emerald-500" },
          { label: "Active Admins", value: "8", icon: Activity, tone: "text-accent" },
          { label: "Alerts Enabled", value: "6", icon: Bell, tone: "text-primary" },
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

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-card/40 border border-border/60 p-1 rounded-xl w-full max-w-md grid grid-cols-3 h-auto">
          <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground py-2.5 flex gap-2">
            <Globe className="w-4 h-4" /> General
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground py-2.5 flex gap-2">
            <Lock className="w-4 h-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground py-2.5 flex gap-2">
            <Bell className="w-4 h-4" /> Alerts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card className="bg-card/60 border-border/60 shadow-lg max-w-3xl backdrop-blur">
            <CardHeader className="border-b border-border/60 pb-6 mb-6">
              <CardTitle className="text-foreground">Site Information</CardTitle>
              <CardDescription>
                Update your site's basic information and branding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name" className="text-foreground/80">Site Name</Label>
                <Input 
                  id="site-name" 
                  defaultValue="Swiftscale Enterprise" 
                  className="bg-card/40 border-border/60 text-foreground focus:border-accent focus:ring-accent/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description" className="text-foreground/80">Description</Label>
                <Textarea 
                  id="site-description" 
                  defaultValue="Building the next generation of scalable SaaS solutions." 
                  className="bg-card/40 border-border/60 text-foreground min-h-[100px] focus:border-accent focus:ring-accent/20"
                />
              </div>
              <div className="pt-4 flex justify-end">
                <Button className="bg-accent hover:bg-accent/90 text-foreground font-semibold">
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-card/60 border-border/60 shadow-lg max-w-3xl backdrop-blur">
            <CardHeader className="border-b border-border/60 pb-6 mb-6">
              <CardTitle className="text-foreground">Security Settings</CardTitle>
              <CardDescription>
                Manage your account's security preferences and access controls.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-foreground text-base">Two-Factor Authentication (2FA)</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your admin account.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-accent" />
              </div>
              
              <div className="h-px bg-card/40 w-full" />
              
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-foreground text-base">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after 30 minutes of inactivity.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-accent" />
              </div>

              <div className="h-px bg-card/40 w-full" />
              
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-foreground text-base">Require Password Reset</Label>
                  <p className="text-sm text-muted-foreground">
                    Force all staff accounts to reset their passwords on next login.
                  </p>
                </div>
                <Button variant="destructive" size="sm" className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-0">
                  Execute Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-card/60 border-border/60 shadow-lg max-w-3xl backdrop-blur">
            <CardHeader className="border-b border-border/60 pb-6 mb-6">
              <CardTitle className="text-foreground">Notification Preferences</CardTitle>
              <CardDescription>
                Choose what administrative alerts you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-foreground text-base">New Inquiries</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive an email when someone submits the contact form.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-accent" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-foreground text-base">Weekly Report</Label>
                  <p className="text-sm text-muted-foreground">
                    A summary of traffic and engagement sent every Monday.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-accent" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-foreground text-base">Critical System Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Important security and infrastructure notifications.
                  </p>
                </div>
                <Switch defaultChecked disabled className="data-[state=checked]:bg-accent opacity-50 cursor-not-allowed" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

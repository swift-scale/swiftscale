import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Globe, Lock, Bell, Save } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-bold tracking-tight text-white">Settings</h2>
        <p className="text-muted-foreground mt-1">
          Manage your platform preferences and security.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl w-full max-w-md grid grid-cols-3 h-auto">
          <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-white py-2.5 flex gap-2">
            <Globe className="w-4 h-4" /> General
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-white py-2.5 flex gap-2">
            <Lock className="w-4 h-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-card data-[state=active]:text-white py-2.5 flex gap-2">
            <Bell className="w-4 h-4" /> Alerts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card className="bg-card border-white/5 shadow-lg max-w-3xl">
            <CardHeader className="border-b border-white/5 pb-6 mb-6">
              <CardTitle className="text-white">Site Information</CardTitle>
              <CardDescription>
                Update your site's basic information and branding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name" className="text-white/80">Site Name</Label>
                <Input 
                  id="site-name" 
                  defaultValue="Swiftscale Enterprise" 
                  className="bg-white/5 border-white/10 text-white focus:border-accent focus:ring-accent/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description" className="text-white/80">Description</Label>
                <Textarea 
                  id="site-description" 
                  defaultValue="Building the next generation of scalable SaaS solutions." 
                  className="bg-white/5 border-white/10 text-white min-h-[100px] focus:border-accent focus:ring-accent/20"
                />
              </div>
              <div className="pt-4 flex justify-end">
                <Button className="bg-accent hover:bg-accent/90 text-white font-semibold">
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-card border-white/5 shadow-lg max-w-3xl">
            <CardHeader className="border-b border-white/5 pb-6 mb-6">
              <CardTitle className="text-white">Security Settings</CardTitle>
              <CardDescription>
                Manage your account's security preferences and access controls.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-white text-base">Two-Factor Authentication (2FA)</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your admin account.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-accent" />
              </div>
              
              <div className="h-px bg-white/5 w-full" />
              
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-white text-base">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after 30 minutes of inactivity.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-accent" />
              </div>

              <div className="h-px bg-white/5 w-full" />
              
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-white text-base">Require Password Reset</Label>
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
          <Card className="bg-card border-white/5 shadow-lg max-w-3xl">
            <CardHeader className="border-b border-white/5 pb-6 mb-6">
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription>
                Choose what administrative alerts you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-white text-base">New Inquiries</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive an email when someone submits the contact form.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-accent" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-white text-base">Weekly Report</Label>
                  <p className="text-sm text-muted-foreground">
                    A summary of traffic and engagement sent every Monday.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-accent" />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-white text-base">Critical System Alerts</Label>
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
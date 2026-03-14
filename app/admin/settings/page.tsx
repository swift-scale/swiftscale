"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Globe, Lock, Bell, Save, ShieldCheck, Activity } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Configuration</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">System Parameters</h2>
          <p className="text-slate-400 text-sm font-medium max-w-xl">
            Control platform identity, security posture, and operational notification channels.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="h-10 px-6 rounded-xl border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
            Audit Logs
          </Button>
          <Button className="bg-primary text-white hover:bg-primary/90 rounded-xl h-10 px-6 font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(36,27,235,0.25)] transition-all">
            Save All Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Security Score", value: "92%", icon: ShieldCheck, tone: "text-emerald-500" },
          { label: "Active Admins", value: "8", icon: Activity, tone: "text-primary" },
          { label: "Alerts Enabled", value: "6", icon: Bell, tone: "text-primary" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-[2rem] border border-slate-100 p-8 flex items-center justify-between shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">{item.label}</p>
              <p className="text-3xl font-black text-slate-900 mt-2">{item.value}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
              <item.icon className={`h-5 w-5 ${item.tone}`} />
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="general" className="space-y-10">
        <TabsList className="bg-slate-50 border border-slate-100 p-1.5 rounded-2xl h-14 w-full max-w-lg grid grid-cols-3">
          <TabsTrigger value="general" className="rounded-xl h-full text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all flex gap-2">
            <Globe className="w-3.5 h-3.5" /> General
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl h-full text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all flex gap-2">
            <Lock className="w-3.5 h-3.5" /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-xl h-full text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all flex gap-2">
            <Bell className="w-3.5 h-3.5" /> Alerts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="focus-visible:ring-0">
          <Card className="bg-white border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] max-w-4xl overflow-hidden">
            <CardHeader className="p-10 border-b border-slate-50">
              <CardTitle className="text-xl font-black text-slate-900">Site Information</CardTitle>
              <CardDescription className="text-slate-400 font-medium">
                Update your site's basic information and branding assets.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="space-y-3">
                <Label htmlFor="site-name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Platform Identity</Label>
                <Input 
                  id="site-name" 
                  defaultValue="Swiftscale Enterprise" 
                  className="bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold placeholder:text-slate-300"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="site-description" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Meta Description</Label>
                <Textarea 
                  id="site-description" 
                  defaultValue="Building the next generation of scalable SaaS solutions." 
                  className="bg-slate-50 border-transparent text-slate-900 min-h-[120px] rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-medium py-5 px-6 leading-relaxed"
                />
              </div>
              <div className="pt-4 flex justify-end">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-xl h-12 px-8 font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(36,27,235,0.25)]">
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="focus-visible:ring-0">
          <Card className="bg-white border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] max-w-4xl overflow-hidden">
            <CardHeader className="p-10 border-b border-slate-50">
              <CardTitle className="text-xl font-black text-slate-900">Security Pulse</CardTitle>
              <CardDescription className="text-slate-400 font-medium">
                Manage your account's security preferences and platform access controls.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="flex items-center justify-between gap-10">
                <div className="space-y-1">
                  <Label className="text-sm font-black text-slate-900 tracking-tight">Multi-Factor Authentication</Label>
                  <p className="text-xs text-slate-400 font-medium">
                    Add an extra cryptographic layer of security to your admin account.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-primary" />
              </div>
              
              <div className="h-px bg-slate-50 w-full" />
              
              <div className="flex items-center justify-between gap-10">
                <div className="space-y-1">
                  <Label className="text-sm font-black text-slate-900 tracking-tight">Auto-Timeout Protocol</Label>
                  <p className="text-xs text-slate-400 font-medium">
                    Automatically terminate session after 30 minutes of inactivity.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-primary" />
              </div>

              <div className="h-px bg-slate-50 w-full" />
              
              <div className="flex items-center justify-between gap-10">
                <div className="space-y-1">
                  <Label className="text-sm font-black text-slate-900 tracking-tight">System-Wide Password Reset</Label>
                  <p className="text-xs text-slate-400 font-medium">
                    Force all staff accounts to re-authenticate and refresh credentials.
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="h-10 px-6 rounded-xl border border-rose-100 text-rose-500 hover:bg-rose-50 font-black text-[10px] uppercase tracking-widest transition-colors">
                  Execute Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="focus-visible:ring-0">
          <Card className="bg-white border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] max-w-4xl overflow-hidden">
            <CardHeader className="p-10 border-b border-slate-50">
              <CardTitle className="text-xl font-black text-slate-900">Push Notifications</CardTitle>
              <CardDescription className="text-slate-400 font-medium">
                Choose what administrative and system alerts you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="flex items-center justify-between gap-10">
                <div className="space-y-1">
                  <Label className="text-sm font-black text-slate-900 tracking-tight">Operational Inquiries</Label>
                  <p className="text-xs text-slate-400 font-medium">
                    Immediate notification for new CRM submission packets.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-primary" />
              </div>
              <div className="flex items-center justify-between gap-10">
                <div className="space-y-1">
                  <Label className="text-sm font-black text-slate-900 tracking-tight">Performance Digest</Label>
                  <p className="text-xs text-slate-400 font-medium">
                    Consolidated traffic and conversion report sent every Monday.
                  </p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-primary" />
              </div>
              <div className="flex items-center justify-between gap-10">
                <div className="space-y-1">
                  <Label className="text-sm font-black text-slate-900 tracking-tight">Critical Infrastructure Alerts</Label>
                  <p className="text-xs text-slate-400 font-medium italic">
                    Security and system vitals (System Mandatory).
                  </p>
                </div>
                <Switch defaultChecked disabled className="data-[state=checked]:bg-primary opacity-50 cursor-not-allowed" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

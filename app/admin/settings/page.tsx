"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Globe, Lock, Bell, Save, ShieldCheck, Activity, Linkedin, Twitter, Instagram, Facebook, Github, Mail, Phone, MapPin, Target, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<any>({
    companyName: "Swiftscale",
    tagline: "Smart Solutions, Swift Scale",
    contact: {
      email: "contact@swiftscale.com",
      phone: "+1 (555) 000-0000",
      address: "123 Innovation Drive, Tech City, TC 10101"
    },
    socials: {
      linkedin: "",
      twitter: "",
      instagram: "",
      facebook: "",
      github: ""
    },
    about: {
      description: "",
      vision: "",
      mission: ""
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings/company");
      const data = await res.json();
      if (data.success) {
        setSettings(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const toastId = toast.loading("Saving configuration...");
    try {
      const res = await fetch("/api/admin/settings/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Settings updated successfully", { id: toastId });
      } else {
        toast.error(data.message || "Failed to update settings", { id: toastId });
      }
    } catch (err) {
      toast.error("An error occurred during save", { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (category: string | null, field: string, value: string) => {
    if (category) {
      setSettings((prev: any) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value
        }
      }));
    } else {
      setSettings((prev: any) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Activity className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
            Configuration
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">
            System Parameters
          </h2>
          <p className="text-slate-400 text-sm font-medium max-w-xl">
            Control platform identity, branding assets, and organizational core values.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="h-10 px-6 rounded-xl border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all"
          >
            Audit Logs
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary text-white hover:bg-primary/90 rounded-xl h-10 px-6 font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(36,27,235,0.25)] transition-all"
          >
            {isSaving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-10">
        <TabsList className="bg-slate-50 border border-slate-100 p-1.5 rounded-2xl h-14 w-full max-w-lg grid grid-cols-3">
          <TabsTrigger
            value="general"
            className="rounded-xl h-full text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all flex gap-2"
          >
            <Globe className="w-3.5 h-3.5" /> Identity
          </TabsTrigger>
          <TabsTrigger
            value="hq"
            className="rounded-xl h-full text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all flex gap-2"
          >
            <MapPin className="w-3.5 h-3.5" /> Head Quarters
          </TabsTrigger>
          <TabsTrigger
            value="socials"
            className="rounded-xl h-full text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all flex gap-2"
          >
            <Linkedin className="w-3.5 h-3.5" /> Socials
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="focus-visible:ring-0 space-y-8">
          {/* Identity Card */}
          <Card className="bg-white border-slate-100 shadow-[0_20px_60px_-15px_rgba(36,27,235,0.05)] rounded-[3rem] max-w-4xl overflow-hidden">
            <CardHeader className="p-10 border-b border-slate-50">
              <CardTitle className="text-xl font-black text-slate-900">
                Site Information
              </CardTitle>
              <CardDescription className="text-slate-400 font-medium font-display">
                Update your site&apos;s basic information and branding assets.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company Name</Label>
                  <Input
                    value={settings.companyName}
                    onChange={(e) => updateField(null, "companyName", e.target.value)}
                    className="bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tagline</Label>
                  <Input
                    value={settings.tagline}
                    onChange={(e) => updateField(null, "tagline", e.target.value)}
                    className="bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">About the company</Label>
                <Textarea
                  value={settings.about.description}
                  onChange={(e) => updateField("about", "description", e.target.value)}
                  className="bg-slate-50 border-transparent text-slate-900 min-h-[120px] rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-medium py-5 px-6 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 ml-1 mb-1">
                    <Target className="w-3 h-3 text-primary" />
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mission Statement</Label>
                  </div>
                  <Textarea
                    value={settings.about.mission}
                    onChange={(e) => updateField("about", "mission", e.target.value)}
                    className="bg-slate-50 border-transparent text-slate-900 min-h-[100px] rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-medium py-4 px-6 border-l-4 border-l-primary"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 ml-1 mb-1">
                    <Eye className="w-3 h-3 text-primary" />
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vision Statement</Label>
                  </div>
                  <Textarea
                    value={settings.about.vision}
                    onChange={(e) => updateField("about", "vision", e.target.value)}
                    className="bg-slate-50 border-transparent text-slate-900 min-h-[100px] rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-medium py-4 px-6 border-l-4 border-l-primary"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hq" className="focus-visible:ring-0">
          <Card className="bg-white border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] max-w-4xl overflow-hidden">
            <CardHeader className="p-10 border-b border-slate-50">
              <CardTitle className="text-xl font-black text-slate-900">
                Contact & Location
              </CardTitle>
              <CardDescription className="text-slate-400 font-medium">
                Manage global support channels and physical address coordinates.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-black mb-1">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-sm tracking-tight uppercase tracking-widest">Support Email</span>
                  </div>
                  <Input
                    value={settings.contact.email}
                    onChange={(e) => updateField("contact", "email", e.target.value)}
                    placeholder="e.g. hello@swiftscale.com"
                    className="bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-900 font-black mb-1">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-sm tracking-tight uppercase tracking-widest">Global Phone</span>
                  </div>
                  <Input
                    value={settings.contact.phone}
                    onChange={(e) => updateField("contact", "phone", e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 text-slate-900 font-black mb-1">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm tracking-tight uppercase tracking-widest">Principal Address</span>
                </div>
                <Textarea
                  value={settings.contact.address}
                  onChange={(e) => updateField("contact", "address", e.target.value)}
                  placeholder="Full physical location details..."
                  className="bg-slate-50 border-transparent text-slate-900 min-h-[100px] rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold py-5"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="socials" className="focus-visible:ring-0">
          <Card className="bg-white border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] max-w-4xl overflow-hidden">
            <CardHeader className="p-10 border-b border-slate-50">
              <CardTitle className="text-xl font-black text-slate-900">
                Digital Footprint
              </CardTitle>
              <CardDescription className="text-slate-400 font-medium">
                Configure your social media links for footer and contact visibility.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 group">
                <div className="flex items-center gap-3 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em]">LinkedIn URL</Label>
                </div>
                <Input
                  value={settings.socials.linkedin}
                  onChange={(e) => updateField("socials", "linkedin", e.target.value)}
                  placeholder="https://linkedin.com/company/swiftscale"
                  className="bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-3 group">
                <div className="flex items-center gap-3 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em]">Twitter / X</Label>
                </div>
                <Input
                  value={settings.socials.twitter}
                  onChange={(e) => updateField("socials", "twitter", e.target.value)}
                  className="bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-3 group">
                <div className="flex items-center gap-3 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em]">Instagram</Label>
                </div>
                <Input
                  value={settings.socials.instagram}
                  onChange={(e) => updateField("socials", "instagram", e.target.value)}
                  className="bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-3 group">
                <div className="flex items-center gap-3 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em]">Facebook</Label>
                </div>
                <Input
                  value={settings.socials.facebook}
                  onChange={(e) => updateField("socials", "facebook", e.target.value)}
                  className="bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-3 group">
                <div className="flex items-center gap-3 text-slate-400 group-focus-within:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em]">Github Repo</Label>
                </div>
                <Input
                  value={settings.socials.github}
                  onChange={(e) => updateField("socials", "github", e.target.value)}
                  className="bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-medium"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="pt-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
          Swiftscale Enterprise Infrastructure
        </p>
      </div>
    </div>
  );
}

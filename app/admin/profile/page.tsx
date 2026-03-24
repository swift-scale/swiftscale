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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  MapPin,
  Camera,
  Shield,
  Save,
  Key,
  Briefcase,
  Building,
  ExternalLink,
  Loader2,
  Edit3,
  X,
  ShieldCheck,
  Smartphone,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    title: "",
    avatar: "",
    name: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVerifyingOtp && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVerifyingOtp, resendTimer]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      if (data.success) {
        setUserData({
          firstName: data.data.firstName || "",
          lastName: data.data.lastName || "",
          email: data.data.email || "",
          department: data.data.department || "",
          title: data.data.title || "",
          avatar: data.data.avatar || "",
          name: data.data.name || "",
        });
      } else {
        toast.error(data.message || "Failed to load profile");
      }
    } catch (err) {
      toast.error("An error occurred while loading profile");
    } finally {
      setIsInitialLoading(false);
    }
  };

  const notifyProfileUpdate = () => {
    window.dispatchEvent(new Event("profileUpdate"));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userData,
          ...passwords,
          otp: isVerifyingOtp ? otp : undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(
          isVerifyingOtp
            ? "Password changed successfully"
            : "Profile updated successfully",
        );
        setUserData({
          firstName: data.data.firstName || "",
          lastName: data.data.lastName || "",
          email: data.data.email || "",
          department: data.data.department || "",
          title: data.data.title || "",
          avatar: data.data.avatar || "",
          name: data.data.name || "",
        });
        setPasswords({ currentPassword: "", newPassword: "" });
        setOtp("");
        setIsEditing(false);
        setIsVerifyingOtp(false);
        notifyProfileUpdate();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("An error occurred while saving profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOtp = async () => {
    if (!passwords.currentPassword || !passwords.newPassword) {
      toast.error("Please fill in both current and new passwords");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/profile/password/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: passwords.currentPassword }),
      });

      const data = await res.json();
      if (data.success) {
        setIsVerifyingOtp(true);
        setResendTimer(30); // Start 30s countdown
        toast.success("Verification code sent to your email");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("An error occurred while requesting OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarClick = () => {
    if (!isEditing) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image must be within 2 MB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/profile/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setUserData((prev) => ({ ...prev, avatar: data.url }));
        toast.success("Preview updated. Click Save to commit.");
      } else {
        setUploadError(data.message || "Upload failed");
      }
    } catch (err) {
      setUploadError("An error occurred during upload");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const key = id === "currentPass" ? "currentPassword" : "newPassword";
    setPasswords((prev) => ({ ...prev, [key]: value }));
  };

  if (isInitialLoading) {
    return (
      <div className="h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
          Synchronizing Identity...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
            Identity
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">
            Your Profile
          </h2>
          <p className="text-slate-400 text-sm font-medium max-w-xl">
            Manage your personal identity and professional representation within
            the platform.
          </p>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-primary text-white hover:bg-primary/90 rounded-2xl h-14 px-8 font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(36,27,235,0.25)] transition-all flex gap-3"
          >
            <Edit3 className="w-4 h-4" /> Edit Profile
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                fetchProfile();
              }}
              className="border-slate-200 text-slate-400 hover:text-rose-500 rounded-2xl h-14 px-8 font-black text-[10px] uppercase tracking-widest transition-all flex gap-3"
            >
              <X className="w-4 h-4" /> Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-emerald-500 text-white hover:bg-emerald-600 rounded-2xl h-14 px-8 font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(16,185,129,0.25)] transition-all flex gap-3"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}{" "}
              Commit Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Avatar & Summary */}
        <div className="space-y-8">
          <Card className="bg-white border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700" />
            <CardContent className="p-10 -mt-20">
              <div className="flex flex-col items-center">
                <div
                  className={`relative group ${isEditing ? "cursor-pointer" : ""}`}
                  onClick={handleAvatarClick}
                >
                  <Avatar
                    className={`h-32 w-32 border-4 border-white shadow-2xl rounded-[2.5rem] transition-all ${isEditing ? "group-hover:opacity-80" : ""}`}
                  >
                    <AvatarImage
                      src={
                        userData.avatar ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                          (userData.name || "AD")
                      }
                    />
                    <AvatarFallback className="bg-primary/5 text-primary text-2xl font-black">
                      {userData.firstName?.[0]}
                      {userData.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                      <button className="absolute bottom-0 right-0 p-3 bg-white border border-slate-100 shadow-xl rounded-2xl transition-all text-primary scale-100 active:scale-95">
                        {isUploading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Camera className="w-5 h-5" />
                        )}
                      </button>
                    </>
                  )}
                </div>

                {uploadError && (
                  <p className="mt-4 text-[10px] font-black text-rose-500 uppercase tracking-widest animate-in fade-in slide-in-from-top-1 duration-300 text-center">
                    {uploadError}
                  </p>
                )}

                <div className="mt-8 text-center space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 leading-none">
                    {userData.name || "Administrator"}
                  </h3>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-4 py-1.5 bg-blue-50/50 rounded-full inline-block">
                    {userData.title || "Administrator"}
                  </p>
                </div>

                <div className="w-full mt-10 space-y-4 pt-10 border-t border-slate-50">
                  <div className="flex items-center gap-4 text-slate-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs font-bold truncate">
                      {userData.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold">Cloud Terminal 01</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-xs font-bold">
                      {userData.department || "Admin Unit"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Forms */}
        <div className="lg:col-span-2 space-y-10">
          <Card
            className={`bg-white border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] overflow-hidden transition-all ${isEditing ? "ring-2 ring-primary/10 border-primary/20" : ""}`}
          >
            <CardHeader className="p-10 border-b border-slate-50">
              <CardTitle className="text-xl font-black text-slate-900">
                Personal Information
              </CardTitle>
              <CardDescription className="text-slate-400 font-medium">
                Update your professional details and how you appear on the
                platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10">
              <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="firstName"
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                    >
                      Given Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <Input
                        id="firstName"
                        value={userData.firstName || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-slate-50 border-transparent text-slate-900 h-14 pl-12 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="lastName"
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                    >
                      Family Name
                    </Label>
                    <Input
                      id="lastName"
                      value={userData.lastName || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                  >
                    Primary Gateway (Email)
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <Input
                      id="email"
                      value={userData.email || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-slate-50 border-transparent text-slate-900 h-14 pl-12 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="department"
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                    >
                      Operational Sphere
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <Input
                        id="department"
                        value={userData.department || ""}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="bg-slate-50 border-transparent text-slate-900 h-14 pl-12 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="title"
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                    >
                      Designation
                    </Label>
                    <Input
                      id="title"
                      value={userData.title || ""}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold disabled:opacity-50"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="pt-6 flex justify-end">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-primary text-white hover:bg-primary/90 rounded-2xl h-14 px-10 font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(36,27,235,0.25)] transition-all flex gap-3"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}{" "}
                      Commit Changes
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <Card
            className={`bg-white border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] overflow-hidden border-l-4 border-l-rose-500 transition-all ${isEditing ? "opacity-50 pointer-events-none" : ""}`}
          >
            <CardHeader className="p-10 border-b border-slate-50">
              <CardTitle className="text-xl font-black text-rose-500">
                Change Password
              </CardTitle>
              <CardDescription className="text-slate-400 font-medium">
                Verify your identity via email OTP to update access credentials.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              {!isVerifyingOtp ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="currentPass"
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                    >
                      Current Password
                    </Label>
                    <div className="relative">
                      <Key className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <Input
                        id="currentPass"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwords.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        className="bg-slate-50 border-transparent text-slate-900 h-14 pl-12 pr-12 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold placeholder:text-slate-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="newPass"
                      className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1"
                    >
                      New Password
                    </Label>
                    <div className="relative">
                      <Key className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <Input
                        id="newPass"
                        type={showNewPassword ? "text" : "password"}
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        className="bg-slate-50 border-transparent text-slate-900 h-14 pl-12 pr-12 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold placeholder:text-slate-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <Button
                      onClick={handleRequestOtp}
                      disabled={
                        isLoading ||
                        !passwords.currentPassword ||
                        !passwords.newPassword
                      }
                      className="bg-rose-500 text-white hover:bg-rose-600 rounded-2xl h-14 px-8 font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(244,63,94,0.25)] transition-all flex gap-3"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ShieldCheck className="w-4 h-4" />
                      )}{" "}
                      Send Verification OTP
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="max-w-md mx-auto space-y-6 py-6 text-center">
                  <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                    <Smartphone className="w-10 h-10 text-rose-500" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-slate-900">
                      Enter Verification Code
                    </h4>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      We've sent a 6-digit cryptographic code to
                      <br />
                      <span className="text-rose-500 font-bold">
                        {userData.email}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="0 0 0 0 0 0"
                      maxLength={6}
                      className="bg-slate-50 border-2 border-slate-100 text-slate-900 h-20 text-center text-3xl font-black rounded-[2rem] focus:bg-white focus:border-rose-500/20 transition-all tracking-[0.5em] placeholder:text-slate-200"
                    />
                  </div>

                  <div className="py-2">
                    {resendTimer > 0 ? (
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Resend available in <span className="text-rose-500">{resendTimer}s</span>
                      </p>
                    ) : (
                      <button
                        onClick={handleRequestOtp}
                        disabled={isLoading}
                        className="text-[10px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-[0.2em] underline underline-offset-4 decoration-2 decoration-rose-200 hover:decoration-rose-500 transition-all"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="ghost"
                      onClick={() => setIsVerifyingOtp(false)}
                      className="flex-1 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isLoading || otp.length !== 6}
                      className="flex-[2] bg-rose-500 text-white hover:bg-rose-600 rounded-2xl h-14 font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(244,63,94,0.25)]"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Verify & Update"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  MoreHorizontal,
  LayoutList,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOCK_SERVICES = [
  // Training
  {
    id: "1",
    title: "BI Master Program",
    category: "Training",
    status: "Active",
    visiblity: "Website & Menu",
  },
  {
    id: "2",
    title: "Full Stack Master",
    category: "Training",
    status: "Active",
    visiblity: "Website & Menu",
  },
  {
    id: "3",
    title: "UI/UX Master",
    category: "Training",
    status: "Active",
    visiblity: "Website & Menu",
  },
  {
    id: "4",
    title: "Data Science",
    category: "Training",
    status: "Active",
    visiblity: "Website & Menu",
  },

  // E-Commerce
  {
    id: "5",
    title: "Registration",
    category: "E-Commerce",
    status: "Active",
    visiblity: "Website & Menu",
  },
  {
    id: "6",
    title: "Sponsored Ads",
    category: "E-Commerce",
    status: "Active",
    visiblity: "Website & Menu",
  },
  {
    id: "7",
    title: "Logistics",
    category: "E-Commerce",
    status: "Active",
    visiblity: "Website & Menu",
  },
  {
    id: "8",
    title: "Warehousing",
    category: "E-Commerce",
    status: "Active",
    visiblity: "Website & Menu",
  },

  // IT Services
  {
    id: "9",
    title: "App/Web Dev",
    category: "IT Services",
    status: "Active",
    visiblity: "Website & Menu",
  },
  {
    id: "10",
    title: "Digital Marketing",
    category: "IT Services",
    status: "Active",
    visiblity: "Website & Menu",
  },
  {
    id: "11",
    title: "Cybersecurity",
    category: "IT Services",
    status: "Active",
    visibility: "Website & Menu",
  },
  {
    id: "12",
    title: "Cloud & DevOps",
    category: "IT Services",
    status: "Active",
    visibility: "Website & Menu",
  },

  // Consulting
  {
    id: "13",
    title: "Payroll Management",
    category: "Consulting",
    status: "Active",
    visibility: "Website & Menu",
  },
  {
    id: "14",
    title: "Growth Strategy",
    category: "Consulting",
    status: "Active",
    visibility: "Website & Menu",
  },
  {
    id: "15",
    title: "IT Infra Roles",
    category: "Consulting",
    status: "Active",
    visibility: "Website & Menu",
  },
];

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/admin/services");
        const data = await response.json();
        if (data.success) {
          setServices(data.data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Content Management</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">Services Portfolio</h2>
          <p className="text-slate-400 text-sm font-medium max-w-xl">
            Curate what appears on the website and keep every vertical aligned with your roadmap.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="h-10 px-6 rounded-xl border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
            Review Visibility
          </Button>
          <Button className="bg-primary text-white hover:bg-primary/90 rounded-xl h-10 px-6 font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(36,27,235,0.25)] transition-all">
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Total Services", value: "15", icon: Sparkles, tone: "text-primary" },
          { label: "Visible on Site", value: "15", icon: Eye, tone: "text-primary" },
          { label: "Approval Ready", value: "12", icon: ShieldCheck, tone: "text-emerald-500" },
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

      <div className="space-y-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search services..."
              className="pl-12 bg-slate-50 border-transparent text-slate-900 h-14 rounded-2xl focus:bg-white focus:border-primary/20 transition-all font-bold placeholder:text-slate-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Training", "E-Commerce", "IT Services"].map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                className={`h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  cat === "All" 
                    ? "bg-slate-900 text-white shadow-lg" 
                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-50 hover:bg-transparent h-16">
                <TableHead className="w-[80px]"></TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Service Title</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Visibility</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</TableHead>
                <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-400 pr-10">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length === 0 ? (
                <TableRow key="empty">
                  <TableCell
                    colSpan={6}
                    className="text-center h-48 text-slate-400 font-medium"
                  >
                    No services discovered in the current scope.
                  </TableCell>
                </TableRow>
              ) : (
                filteredServices.map((service) => (
                  <TableRow
                    key={service._id || service.id}
                    className="border-slate-50 hover:bg-slate-50/30 transition-colors h-24"
                  >
                    <TableCell className="pl-6">
                      <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-white transition-colors">
                        <LayoutList className="h-5 w-5 text-primary" />
                      </div>
                    </TableCell>
                    <TableCell className="font-black text-slate-900 text-base">
                      {service.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-slate-50 text-slate-900 border border-slate-100 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                      >
                        {service.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {service.visibility}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          service.status === "Active"
                            ? "bg-emerald-500/5 text-emerald-500 border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                            : "bg-slate-50 text-slate-400 border-none px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
                        }
                      >
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-10">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-900"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48 bg-white border-slate-100 rounded-2xl shadow-xl p-2"
                        >
                          <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-4 py-3">Operations</DropdownMenuLabel>
                          <DropdownMenuItem className="rounded-xl px-4 py-3 text-xs font-bold text-slate-600 focus:bg-slate-50 focus:text-primary cursor-pointer">
                            Edit Service
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl px-4 py-3 text-xs font-bold text-slate-600 focus:bg-slate-50 focus:text-primary cursor-pointer">
                            Hide from Menu
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-50 my-2 mx-2" />
                          <DropdownMenuItem className="rounded-xl px-4 py-3 text-xs font-bold text-rose-500 focus:bg-rose-50 cursor-pointer">
                            Delete Service
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

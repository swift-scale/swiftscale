import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, LayoutList, CheckCircle2, Sparkles, ShieldCheck, Eye } from "lucide-react";
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
  { id: "1", title: "BI Master Program", category: "Training", status: "Active", visiblity: "Website & Menu" },
  { id: "2", title: "Full Stack Master", category: "Training", status: "Active", visiblity: "Website & Menu" },
  { id: "3", title: "UI/UX Master", category: "Training", status: "Active", visiblity: "Website & Menu" },
  { id: "4", title: "Data Science", category: "Training", status: "Active", visiblity: "Website & Menu" },
  
  // E-Commerce
  { id: "5", title: "Registration", category: "E-Commerce", status: "Active", visiblity: "Website & Menu" },
  { id: "6", title: "Sponsored Ads", category: "E-Commerce", status: "Active", visiblity: "Website & Menu" },
  { id: "7", title: "Logistics", category: "E-Commerce", status: "Active", visiblity: "Website & Menu" },
  { id: "8", title: "Warehousing", category: "E-Commerce", status: "Active", visiblity: "Website & Menu" },
  
  // IT Services
  { id: "9", title: "App/Web Dev", category: "IT Services", status: "Active", visiblity: "Website & Menu" },
  { id: "10", title: "Digital Marketing", category: "IT Services", status: "Active", visiblity: "Website & Menu" },
  { id: "11", title: "Cybersecurity", category: "IT Services", status: "Active", visiblity: "Website & Menu" },
  { id: "12", title: "Cloud & DevOps", category: "IT Services", status: "Active", visiblity: "Website & Menu" },
  
  // Consulting
  { id: "13", title: "Payroll Management", category: "Consulting", status: "Active", visiblity: "Website & Menu" },
  { id: "14", title: "Growth Strategy", category: "Consulting", status: "Active", visiblity: "Website & Menu" },
  { id: "15", title: "IT Infra Roles", category: "Consulting", status: "Active", visiblity: "Website & Menu" },
];

export default function Services() {
  const [search, setSearch] = useState("");
  
  const filteredServices = MOCK_SERVICES.filter(service => 
    service.title.toLowerCase().includes(search.toLowerCase()) || 
    service.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-foreground/40">Content Management</p>
          <h2 className="text-4xl font-display font-bold tracking-tight text-foreground">Services Library</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Curate what appears on the website and keep every offer aligned with your growth roadmap.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="border-border/60 text-foreground hover:bg-card/60">
            Review Visibility
          </Button>
          <Button className="bg-accent hover:bg-accent/90 text-foreground font-semibold">
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Services", value: "15", icon: Sparkles, tone: "text-accent" },
          { label: "Visible on Site", value: "15", icon: Eye, tone: "text-primary" },
          { label: "Approval Ready", value: "12", icon: ShieldCheck, tone: "text-emerald-500" },
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

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-10 bg-card/60 border-border text-foreground h-10 focus:border-accent focus:ring-accent/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="border-border/60 text-foreground hover:bg-card/60">All</Button>
          <Button variant="outline" className="border-border/60 text-foreground/70 hover:text-foreground hover:bg-card/60">Training</Button>
          <Button variant="outline" className="border-border/60 text-foreground/70 hover:text-foreground hover:bg-card/60">E-Commerce</Button>
          <Button variant="outline" className="border-border/60 text-foreground/70 hover:text-foreground hover:bg-card/60">IT Services</Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/60 overflow-hidden shadow-lg backdrop-blur">
        <Table>
          <TableHeader className="bg-card/40">
            <TableRow className="border-border/60 hover:bg-transparent">
              <TableHead className="w-[50px] text-foreground/60"></TableHead>
              <TableHead className="text-foreground/60 font-medium">Service Title</TableHead>
              <TableHead className="text-foreground/60 font-medium">Category</TableHead>
              <TableHead className="text-foreground/60 font-medium">Visibility</TableHead>
              <TableHead className="text-foreground/60 font-medium">Status</TableHead>
              <TableHead className="text-right text-foreground/60 font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length === 0 ? (
              <TableRow className="border-border/60">
                <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                  No services found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredServices.map((service) => (
                <TableRow key={service.id} className="border-border/60 hover:bg-card/40 transition-colors">
                  <TableCell>
                    <div className="h-8 w-8 rounded-lg bg-card/40 flex items-center justify-center">
                      <LayoutList className="h-4 w-4 text-foreground/70" />
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">{service.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-card/40 border-border/60 text-foreground/80 hover:bg-card/60">
                      {service.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {service.visiblity}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={service.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-card/40 border-border/60 text-foreground/60"}
                    >
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-card/60 text-foreground/70 hover:text-foreground">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border/60 text-foreground">
                        <DropdownMenuLabel className="text-foreground/60">Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="focus:bg-card/60 cursor-pointer">Edit Service</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-card/60 cursor-pointer">Hide from Menu</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-card/60" />
                        <DropdownMenuItem className="focus:bg-red-500/20 text-red-400 cursor-pointer">Delete Service</DropdownMenuItem>
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
  );
}

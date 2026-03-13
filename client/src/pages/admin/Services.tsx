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
import { Search, Plus, MoreHorizontal, LayoutList, CheckCircle2 } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-white">Services Content</h2>
          <p className="text-muted-foreground mt-1">
            Manage the services shown on the website and navigation menu.
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-white font-semibold">
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-10 bg-card border-white/5 text-white h-10 focus:border-accent focus:ring-accent/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-card overflow-hidden shadow-lg">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-[50px] text-white/60"></TableHead>
              <TableHead className="text-white/60 font-medium">Service Title</TableHead>
              <TableHead className="text-white/60 font-medium">Category</TableHead>
              <TableHead className="text-white/60 font-medium">Visibility</TableHead>
              <TableHead className="text-white/60 font-medium">Status</TableHead>
              <TableHead className="text-right text-white/60 font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length === 0 ? (
              <TableRow className="border-white/5">
                <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                  No services found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredServices.map((service) => (
                <TableRow key={service.id} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                  <TableCell>
                    <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <LayoutList className="h-4 w-4 text-white/70" />
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-white">{service.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-white/80 hover:bg-white/10">
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
                      className={service.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-white/5 border-white/10 text-white/60"}
                    >
                      {service.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10 text-white/70 hover:text-white">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10 text-white">
                        <DropdownMenuLabel className="text-white/60">Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">Edit Service</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">Hide from Menu</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
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
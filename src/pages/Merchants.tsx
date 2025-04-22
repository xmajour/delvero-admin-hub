
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  Star,
  Phone,
  FileText,
  MapPin,
  Store,
  Filter,
  SlidersHorizontal,
  DownloadCloud,
  Plus,
  ChartPie,
  Edit,
  Eye,
  Trash,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

// Merchant interface for strong typing
interface Merchant {
  id: number;
  name: string;
  location: string;
  phone: string;
  orders: number;
  rating: number;
  lastOrder: string;
  status: string;
  email: string;
  joinDate: string;
  totalRevenue: string;
  category: string;
}

const Merchants = () => {
  // --- Demo merchant data ---
  const [merchants, setMerchants] = useState<Merchant[]>([
    {
      id: 1,
      name: "Delicious Bites Restaurant",
      location: "Manhattan, NY",
      phone: "+1 (555) 123-7890",
      orders: 342,
      rating: 4.7,
      lastOrder: "5 minutes ago",
      status: "active",
      email: "contact@deliciousbites.com",
      joinDate: "Jun 12, 2023",
      totalRevenue: "$15,345.80",
      category: "Restaurant",
    },
    {
      id: 2,
      name: "Fresh Groceries Market",
      location: "Brooklyn, NY",
      phone: "+1 (555) 234-5678",
      orders: 189,
      rating: 4.5,
      lastOrder: "32 minutes ago",
      status: "active",
      email: "info@freshgroceries.com",
      joinDate: "Aug 3, 2023",
      totalRevenue: "$8,927.50",
      category: "Grocery",
    },
    {
      id: 3,
      name: "Gourmet Bakery",
      location: "Queens, NY",
      phone: "+1 (555) 345-6789",
      orders: 257,
      rating: 4.8,
      lastOrder: "1 hour ago",
      status: "active",
      email: "orders@gourmetbakery.com",
      joinDate: "Apr 22, 2023",
      totalRevenue: "$12,520.75",
      category: "Bakery",
    },
    {
      id: 4,
      name: "Quick Pharmacy",
      location: "Bronx, NY",
      phone: "+1 (555) 456-7890",
      orders: 102,
      rating: 4.2,
      lastOrder: "3 hours ago",
      status: "active",
      email: "help@quickpharmacy.com",
      joinDate: "Oct 7, 2023",
      totalRevenue: "$5,643.20",
      category: "Pharmacy",
    },
    {
      id: 5,
      name: "Tech Gadgets Store",
      location: "Manhattan, NY",
      phone: "+1 (555) 567-8901",
      orders: 67,
      rating: 4.4,
      lastOrder: "Yesterday",
      status: "inactive",
      email: "sales@techgadgets.com",
      joinDate: "Nov 15, 2023",
      totalRevenue: "$9,831.60",
      category: "Electronics",
    },
    {
      id: 6,
      name: "Healthy Meals Prep",
      location: "Staten Island, NY",
      phone: "+1 (555) 678-9012",
      orders: 143,
      rating: 4.6,
      lastOrder: "1 day ago",
      status: "inactive",
      email: "hello@healthymeals.com",
      joinDate: "Jul 21, 2023",
      totalRevenue: "$7,276.30",
      category: "Meal Prep",
    },
  ]);

  // --- UI and form state ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("active");
  const [loading, setLoading] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedMerchant, setEditedMerchant] = useState<Merchant | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMerchant, setNewMerchant] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    category: "",
    status: "active",
  });

  const { toast } = useToast();

  // Pie chart data
  const activeCount = merchants.filter((m) => m.status === "active").length;
  const inactiveCount = merchants.filter((m) => m.status === "inactive").length;
  const pieData = [
    { name: "Active", value: activeCount },
    { name: "Inactive", value: inactiveCount },
  ];
  const COLORS = ["#9b87f5", "#E5DEFF"]; // Primary purple & soft purple

  // --- Filter and search logic ---
  const filteredMerchants = merchants.filter(merchant => 
    (selectedTab === "all" || merchant.status === selectedTab) &&
    (merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     merchant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
     merchant.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
     merchant.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // --- Merchant profile handlers ---
  const handleViewProfile = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setEditedMerchant({ ...merchant });
    setIsEditMode(false);
    setIsProfileOpen(true);
  };

  const handleEditDetails = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedMerchant(selectedMerchant);
  };

  const handleSaveChanges = async () => {
    if (!editedMerchant) return;

    const updatedMerchants = merchants.map((merchant) =>
      merchant.id === editedMerchant.id ? editedMerchant : merchant
    );

    setMerchants(updatedMerchants);
    setSelectedMerchant(editedMerchant);
    setIsEditMode(false);

    toast({
      title: "Success",
      description: "Merchant details updated (UI only)",
    });
  };

  const handleDeleteMerchant = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedMerchant) return;

    const updatedMerchants = merchants.filter((merchant) => merchant.id !== selectedMerchant.id);

    setMerchants(updatedMerchants);
    setIsDeleteDialogOpen(false);
    setIsProfileOpen(false);

    toast({
      title: "Success",
      description: "Merchant deleted (UI only)",
    });
  };

  const handleAddMerchant = () => {
    setIsAddDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMerchant({
      ...newMerchant,
      [name]: value,
    });
  };

  const handleCreateMerchant = async () => {
    const newId = merchants.length > 0 ? Math.max(...merchants.map((m) => m.id)) + 1 : 1;

    const merchantToAdd = {
      id: newId,
      name: newMerchant.name,
      email: newMerchant.email,
      phone: newMerchant.phone,
      location: newMerchant.location,
      category: newMerchant.category,
      status: newMerchant.status,
      orders: 0,
      rating: 0,
      lastOrder: "Never",
      joinDate: new Date().toLocaleDateString(),
      totalRevenue: "$0.00",
    };

    setMerchants([...merchants, merchantToAdd]);
    setIsAddDialogOpen(false);
    setNewMerchant({
      name: "",
      email: "",
      phone: "",
      location: "",
      category: "",
      status: "active",
    });

    toast({
      title: "Success",
      description: "New merchant added (UI only)",
    });
  };

  const handleEditMerchantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedMerchant) return;

    const { name, value } = e.target;
    setEditedMerchant({
      ...editedMerchant,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Merchants</h1>
          <p className="text-muted-foreground">
            Manage partner merchants and track their performance
          </p>
        </div>
        <Button onClick={handleAddMerchant} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Merchant
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <ChartPie className="h-5 w-5 text-primary" />
              Merchant Revenue
            </CardTitle>
            <div className="text-xs text-muted-foreground">Last 30 days</div>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/2] bg-muted/30 rounded-md flex items-center justify-center border">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={68}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value, entry, index) => (
                      <span className="text-xs font-medium">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Store className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Merchants</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {merchants.length}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Store className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Merchants</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {activeCount}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                    <Star className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Avg. Rating</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {(merchants.reduce((acc, merchant) => acc + merchant.rating, 0) / merchants.length).toFixed(1)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList>
              <TabsTrigger value="active" className="flex gap-2">
                <Store className="h-4 w-4" />
                <span>Active</span>
              </TabsTrigger>
              <TabsTrigger value="inactive" className="flex gap-2">
                <Store className="h-4 w-4" />
                <span>Inactive</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="flex gap-2">
                <Store className="h-4 w-4" />
                <span>All</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="w-full sm:w-auto flex gap-2">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search merchants..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <DownloadCloud className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab}>
          <TabsContent value="active" className="m-0">
            <Card>
              <CardContent className="p-6">
                {loading ? (
                  <div className="py-6 text-center">Loading merchants...</div>
                ) : (
                  <div className="grid gap-4">
                    {filteredMerchants.length > 0 ? (
                      filteredMerchants.map((merchant) => (
                        <div key={merchant.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-500 font-medium">
                              {merchant.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {merchant.name}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {merchant.location}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <Badge variant="outline" className="mr-1">{merchant.category}</Badge>
                                {merchant.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              <span className="text-sm">{merchant.rating}</span>
                            </div>
                            <div className="hidden md:block">
                              <Badge variant="outline" className="gap-1">
                                <FileText className="h-3 w-3" />
                                {merchant.orders} orders
                              </Badge>
                            </div>
                            <div className="hidden md:block text-xs text-muted-foreground">
                              Last order: {merchant.lastOrder}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewProfile(merchant)}>
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-muted-foreground">
                        No active merchants found matching your search
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inactive" className="m-0">
            <Card>
              <CardContent className="p-6">
                {loading ? (
                  <div className="py-6 text-center">Loading merchants...</div>
                ) : (
                  <div className="grid gap-4">
                    {filteredMerchants.length > 0 ? (
                      filteredMerchants.map((merchant) => (
                        <div key={merchant.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 font-medium">
                              {merchant.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {merchant.name}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {merchant.location}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <Badge variant="outline" className="mr-1">{merchant.category}</Badge>
                                {merchant.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              <span className="text-sm">{merchant.rating}</span>
                            </div>
                            <div className="hidden md:block">
                              <Badge variant="outline" className="gap-1">
                                <FileText className="h-3 w-3" />
                                {merchant.orders} orders
                              </Badge>
                            </div>
                            <div className="hidden md:block text-xs text-muted-foreground">
                              Inactive since: 5 days ago
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewProfile(merchant)}>
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-muted-foreground">
                        No inactive merchants found matching your search
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="m-0">
            <Card>
              <CardContent className="p-6">
                {loading ? (
                  <div className="py-6 text-center">Loading merchants...</div>
                ) : (
                  <div className="grid gap-4">
                    {filteredMerchants.length > 0 ? (
                      filteredMerchants.map((merchant) => (
                        <div key={merchant.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                          <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-full ${merchant.status === "active" ? "bg-purple-100 dark:bg-purple-900/20 text-purple-500" : "bg-gray-200 dark:bg-gray-800 text-gray-500"} flex items-center justify-center font-medium`}>
                              {merchant.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {merchant.name}
                                <Badge variant={merchant.status === "active" ? "default" : "secondary"} className="text-xs">
                                  {merchant.status === "active" ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {merchant.location}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <Badge variant="outline" className="mr-1">{merchant.category}</Badge>
                                {merchant.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              <span className="text-sm">{merchant.rating}</span>
                            </div>
                            <div className="hidden md:block">
                              <Badge variant="outline" className="gap-1">
                                <FileText className="h-3 w-3" />
                                {merchant.orders} orders
                              </Badge>
                            </div>
                            <div className="hidden md:block text-xs text-muted-foreground">
                              Revenue: {merchant.totalRevenue}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewProfile(merchant)}>
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-muted-foreground">
                        No merchants found matching your search
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* --- Add Merchant Dialog --- */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Merchant</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-name" className="text-right font-medium">Name</Label>
              <Input
                id="new-name"
                name="name"
                value={newMerchant.name}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Merchant name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-email" className="text-right font-medium">Email</Label>
              <Input
                id="new-email"
                name="email"
                type="email"
                value={newMerchant.email}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="contact@merchant.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-phone" className="text-right font-medium">Phone</Label>
              <Input
                id="new-phone"
                name="phone"
                value={newMerchant.phone}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-location" className="text-right font-medium">Location</Label>
              <Input
                id="new-location"
                name="location"
                value={newMerchant.location}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="City, State"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-category" className="text-right font-medium">Category</Label>
              <Input
                id="new-category"
                name="category"
                value={newMerchant.category}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Restaurant, Bakery, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateMerchant} disabled={!newMerchant.name || !newMerchant.email}>
              Create Merchant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Merchant Profile/Card Dialog --- */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Merchant" : "Merchant Profile"}</DialogTitle>
          </DialogHeader>
          {selectedMerchant && (
            <div className="space-y-6">
              {isEditMode ? (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right font-medium">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={editedMerchant?.name || ""}
                      onChange={handleEditMerchantChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right font-medium">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={editedMerchant?.email || ""}
                      onChange={handleEditMerchantChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right font-medium">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={editedMerchant?.phone || ""}
                      onChange={handleEditMerchantChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right font-medium">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={editedMerchant?.location || ""}
                      onChange={handleEditMerchantChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right font-medium">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={editedMerchant?.category || ""}
                      onChange={handleEditMerchantChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`h-16 w-16 rounded-full ${selectedMerchant.status === "active" ? "bg-purple-100 dark:bg-purple-900/20 text-purple-500" : "bg-gray-200 dark:bg-gray-800 text-gray-500"} flex items-center justify-center text-2xl font-medium`}>
                      {selectedMerchant.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{selectedMerchant.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={selectedMerchant.status === "active" ? "default" : "secondary"}>
                          {selectedMerchant.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">Joined: {selectedMerchant.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedMerchant.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{selectedMerchant.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedMerchant.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Store className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedMerchant.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Performance Information</h4>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Orders:</span>
                          <Badge variant="outline" className="gap-1">
                            <FileText className="h-3 w-3" />
                            {selectedMerchant.orders}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Rating:</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                            <span className="text-sm">{selectedMerchant.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Last Order:</span>
                          <span className="text-sm">{selectedMerchant.lastOrder}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Revenue:</span>
                          <span className="text-sm font-medium">{selectedMerchant.totalRevenue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Orders</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted py-6 text-center">
                        <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Order history will be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
                {isEditMode ? (
                  <>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveChanges}>
                        Save Changes
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setIsProfileOpen(false)}>
                        Close
                      </Button>
                      <Button variant="default" onClick={handleEditDetails}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Details
                      </Button>
                    </div>
                    <Button variant="destructive" onClick={handleDeleteMerchant}>
                      <Trash className="h-4 w-4 mr-2" />
                      Delete Merchant
                    </Button>
                  </>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* --- Delete Confirmation Dialog --- */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the merchant and all associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Merchants;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Star, Phone, FileText, MapPin, User, Filter, SlidersHorizontal, DownloadCloud, Edit, Eye, History, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Rider interface for strong typing.
interface Rider {
  id: number;
  name: string;
  location: string;
  phone: string;
  rides: number;
  lastRide: string;
  status: string;
  email: string;
  joinDate: string;
  totalSpent: string;
}

const Riders = () => {
  // --- Demo rider data (static). ---
  // In your future database/API integration, fetch and update this data from your backend.
  const [riders, setRiders] = useState<Rider[]>([
    {
      id: 1,
      name: "James Wilson",
      location: "Manhattan, NY",
      phone: "+1 (555) 111-2222",
      rides: 24,
      lastRide: "Today, 10:24 AM",
      status: "active",
      email: "james.wilson@example.com",
      joinDate: "Jan 15, 2024",
      totalSpent: "$485.80",
    },
    {
      id: 2,
      name: "Sophia Thompson",
      location: "Brooklyn, NY",
      phone: "+1 (555) 333-4444",
      rides: 15,
      lastRide: "Yesterday, 2:15 PM",
      status: "active",
      email: "sophia.t@example.com",
      joinDate: "Feb 3, 2024",
      totalSpent: "$227.50",
    },
    {
      id: 3,
      name: "Noah Garcia",
      location: "Queens, NY",
      phone: "+1 (555) 555-6666",
      rides: 32,
      lastRide: "Today, 9:30 AM",
      status: "active",
      email: "noah.g@example.com",
      joinDate: "Nov 22, 2023",
      totalSpent: "$690.75",
    },
    {
      id: 4,
      name: "Olivia Kim",
      location: "Bronx, NY",
      phone: "+1 (555) 777-8888",
      rides: 3,
      lastRide: "2 days ago",
      status: "inactive",
      email: "olivia.kim@example.com",
      joinDate: "Mar 7, 2024",
      totalSpent: "$63.20",
    },
    {
      id: 5,
      name: "Ethan Martinez",
      location: "Manhattan, NY",
      phone: "+1 (555) 999-0000",
      rides: 19,
      lastRide: "Today, 11:45 AM",
      status: "active",
      email: "ethan.m@example.com",
      joinDate: "Dec 12, 2023",
      totalSpent: "$351.60",
    },
    {
      id: 6,
      name: "Ava Johnson",
      location: "Staten Island, NY",
      phone: "+1 (555) 123-4567",
      rides: 7,
      lastRide: "3 days ago",
      status: "inactive",
      email: "ava.j@example.com",
      joinDate: "Apr 2, 2024",
      totalSpent: "$96.30",
    },
  ]);

  // --- UI and form state ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("active");
  const [loading, setLoading] = useState(false); // Set loading to false (no async fetch here)
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedRider, setEditedRider] = useState<Rider | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRider, setNewRider] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "active",
  });

  const { toast } = useToast();

  // --- Filter and search logic (front-end only) ---
  // If you add a backend: move search and filter logic into your backend query.
  const filteredRiders = riders.filter((rider) =>
    (selectedTab === "all" || rider.status === selectedTab) &&
    (rider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rider.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rider.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // --- Rider card/profile handlers ---
  const handleViewProfile = (rider: Rider) => {
    setSelectedRider(rider);
    setEditedRider({ ...rider });
    setIsEditMode(false);
    setIsProfileOpen(true);
  };

  const handleEditDetails = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedRider(selectedRider);
  };

  const handleSaveChanges = async () => {
    if (!editedRider) return;

    // Dummy update - in the future, POST or PATCH to your backend here.
    const updatedRiders = riders.map((rider) =>
      rider.id === editedRider.id ? editedRider : rider
    );

    setRiders(updatedRiders);
    setSelectedRider(editedRider);
    setIsEditMode(false);

    toast({
      title: "Success",
      description: "Rider details updated (UI only)",
    });
  };

  const handleDeleteRider = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRider) return;

    // Remove in-memory only. Connect this to a backend call as needed.
    const updatedRiders = riders.filter((rider) => rider.id !== selectedRider.id);

    setRiders(updatedRiders);
    setIsDeleteDialogOpen(false);
    setIsProfileOpen(false);

    toast({
      title: "Success",
      description: "Rider deleted (UI only)",
    });
  };

  const handleAddRider = () => {
    setIsAddDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRider({
      ...newRider,
      [name]: value,
    });
  };

  const handleCreateRider = async () => {
    const newId = riders.length > 0 ? Math.max(...riders.map((r) => r.id)) + 1 : 1;

    const riderToAdd = {
      id: newId,
      name: newRider.name,
      email: newRider.email,
      phone: newRider.phone,
      location: newRider.location,
      status: newRider.status,
      rides: 0,
      lastRide: "Never",
      joinDate: new Date().toLocaleDateString(),
      totalSpent: "$0.00",
    };

    setRiders([...riders, riderToAdd]);
    setIsAddDialogOpen(false);
    setNewRider({
      name: "",
      email: "",
      phone: "",
      location: "",
      status: "active",
    });

    toast({
      title: "Success",
      description: "New rider added (UI only)",
    });
  };

  const handleEditRiderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedRider) return;

    const { name, value } = e.target;
    setEditedRider({
      ...editedRider,
      [name]: value,
    });
  };

  // ---- UI Rendering ----
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Riders</h1>
          <p className="text-muted-foreground">
            Manage your riders and view their ride history.
          </p>
        </div>
        <Button onClick={handleAddRider} className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Add Rider
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Rider Overview
            </CardTitle>
            <div className="text-xs text-muted-foreground">Last 30 days</div>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/2] bg-muted/30 rounded-md flex items-center justify-center border">
              <p className="text-muted-foreground">
                (Placeholder) Rider growth chart – insert your chart here.
              </p>
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
                    <User className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Riders</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {riders.length}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Riders</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {riders.filter((r) => r.status === "active").length}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Today's Rides</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {riders.filter((r) => r.lastRide.includes("Today")).length}
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
                <User className="h-4 w-4" />
                <span>Active</span>
              </TabsTrigger>
              <TabsTrigger value="inactive" className="flex gap-2">
                <User className="h-4 w-4" />
                <span>Inactive</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="flex gap-2">
                <User className="h-4 w-4" />
                <span>All</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="w-full sm:w-auto flex gap-2">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search riders..."
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
                  <div className="py-6 text-center">Loading riders...</div>
                ) : (
                  <div className="grid gap-4">
                    {filteredRiders.length > 0 ? (
                      filteredRiders.map((rider) => (
                        <div key={rider.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 font-medium">
                              {rider.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {rider.name}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {rider.location}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {rider.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end">
                              <Badge variant="outline" className="gap-1">
                                <FileText className="h-3 w-3" />
                                {rider.rides} rides
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                Joined: {rider.joinDate}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last ride: {rider.lastRide}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewProfile(rider)}>
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-muted-foreground">
                        No riders found matching your search
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
                  <div className="py-6 text-center">Loading riders...</div>
                ) : (
                  <div className="grid gap-4">
                    {filteredRiders.length > 0 ? (
                      filteredRiders.map((rider) => (
                        <div key={rider.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 font-medium">
                              {rider.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {rider.name}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {rider.location}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {rider.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end">
                              <Badge variant="outline" className="gap-1">
                                <FileText className="h-3 w-3" />
                                {rider.rides} rides
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                Joined: {rider.joinDate}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last ride: {rider.lastRide}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewProfile(rider)}>
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-muted-foreground">
                        No inactive riders found matching your search
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
                  <div className="py-6 text-center">Loading riders...</div>
                ) : (
                  <div className="grid gap-4">
                    {filteredRiders.length > 0 ? (
                      filteredRiders.map((rider) => (
                        <div key={rider.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                          <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-full ${rider.status === "active" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-500" : "bg-gray-200 dark:bg-gray-800 text-gray-500"} flex items-center justify-center font-medium`}>
                              {rider.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {rider.name}
                                <Badge variant={rider.status === "active" ? "default" : "secondary"} className="text-xs">
                                  {rider.status === "active" ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {rider.location}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {rider.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end">
                              <Badge variant="outline" className="gap-1">
                                <FileText className="h-3 w-3" />
                                {rider.rides} rides
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                Joined: {rider.joinDate}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last ride: {rider.lastRide}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewProfile(rider)}>
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-muted-foreground">
                        No riders found matching your search
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* --- Rider Profile/Card Dialog --- */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Rider" : "Rider Profile"}</DialogTitle>
          </DialogHeader>
          {selectedRider && (
            <div className="space-y-6">
              {isEditMode ? (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right font-medium">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={editedRider?.name || ""}
                      onChange={handleEditRiderChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="email" className="text-right font-medium">Email</label>
                    <Input
                      id="email"
                      name="email"
                      value={editedRider?.email || ""}
                      onChange={handleEditRiderChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="phone" className="text-right font-medium">Phone</label>
                    <Input
                      id="phone"
                      name="phone"
                      value={editedRider?.phone || ""}
                      onChange={handleEditRiderChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="location" className="text-right font-medium">Location</label>
                    <Input
                      id="location"
                      name="location"
                      value={editedRider?.location || ""}
                      onChange={handleEditRiderChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`h-16 w-16 rounded-full ${selectedRider.status === "active" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-500" : "bg-gray-200 dark:bg-gray-800 text-gray-500"} flex items-center justify-center text-2xl font-medium`}>
                      {selectedRider.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{selectedRider.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={selectedRider.status === "active" ? "default" : "secondary"}>
                          {selectedRider.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">Joined: {selectedRider.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedRider.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{selectedRider.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedRider.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Ride Information</h4>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Rides:</span>
                          <Badge variant="outline" className="gap-1">
                            <FileText className="h-3 w-3" />
                            {selectedRider.rides}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Last Ride:</span>
                          <span className="text-sm">{selectedRider.lastRide}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Spent:</span>
                          <span className="text-sm font-medium">{selectedRider.totalSpent}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Rides</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted py-6 text-center">
                        <FileText className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Ride history will be displayed here (add live rides table/API here)</p>
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
                    <Button variant="destructive" onClick={handleDeleteRider}>
                      <Trash className="h-4 w-4 mr-2" />
                      Delete Rider
                    </Button>
                  </>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* --- Add Rider Dialog (modal) --- */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Rider</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-name" className="text-right font-medium">Name</label>
              <Input
                id="new-name"
                name="name"
                value={newRider.name}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Rider name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-email" className="text-right font-medium">Email</label>
              <Input
                id="new-email"
                name="email"
                type="email"
                value={newRider.email}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="rider@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-phone" className="text-right font-medium">Phone</label>
              <Input
                id="new-phone"
                name="phone"
                value={newRider.phone}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-location" className="text-right font-medium">Location</label>
              <Input
                id="new-location"
                name="location"
                value={newRider.location}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="City, State"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRider} disabled={!newRider.name || !newRider.email}>
              Create Rider
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Delete Confirmation Dialog --- */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the rider and all associated data. This action cannot be undone.
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

export default Riders;

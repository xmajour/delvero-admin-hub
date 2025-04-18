
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Star, Phone, FileText, MapPin, User, Filter, SlidersHorizontal, DownloadCloud, Edit, Eye, History, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Customer {
  id: number;
  name: string;
  location: string;
  phone: string;
  orders: number;
  lastOrder: string;
  status: string;
  email: string;
  joinDate: string;
  totalSpent: string;
}

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("active");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "active"
  });

  const { toast } = useToast();

  // Fetch customers from the database
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // In a real implementation, this would be a fetch to your API
        // For now we'll use mock data as a placeholder
        const mockCustomers = [
          {
            id: 1,
            name: "Emma Wilson",
            location: "Manhattan, NY",
            phone: "+1 (555) 111-2222",
            orders: 12,
            lastOrder: "Today, 10:24 AM",
            status: "active",
            email: "emma.wilson@example.com",
            joinDate: "Jan 15, 2024",
            totalSpent: "$345.80",
          },
          {
            id: 2,
            name: "Michael Brown",
            location: "Brooklyn, NY",
            phone: "+1 (555) 333-4444",
            orders: 5,
            lastOrder: "Yesterday, 2:15 PM",
            status: "active",
            email: "michael.b@example.com",
            joinDate: "Feb 3, 2024",
            totalSpent: "$127.50",
          },
          {
            id: 3,
            name: "Sophia Garcia",
            location: "Queens, NY",
            phone: "+1 (555) 555-6666",
            orders: 18,
            lastOrder: "Today, 9:30 AM",
            status: "active",
            email: "sophia.g@example.com",
            joinDate: "Nov 22, 2023",
            totalSpent: "$520.75",
          },
          {
            id: 4,
            name: "David Kim",
            location: "Bronx, NY",
            phone: "+1 (555) 777-8888",
            orders: 2,
            lastOrder: "2 days ago",
            status: "inactive",
            email: "david.kim@example.com",
            joinDate: "Mar 7, 2024",
            totalSpent: "$43.20",
          },
          {
            id: 5,
            name: "Olivia Martinez",
            location: "Manhattan, NY",
            phone: "+1 (555) 999-0000",
            orders: 7,
            lastOrder: "Today, 11:45 AM",
            status: "active",
            email: "olivia.m@example.com",
            joinDate: "Dec 12, 2023",
            totalSpent: "$231.60",
          },
          {
            id: 6,
            name: "James Johnson",
            location: "Staten Island, NY",
            phone: "+1 (555) 123-4567",
            orders: 3,
            lastOrder: "3 days ago",
            status: "inactive",
            email: "james.j@example.com",
            joinDate: "Apr 2, 2024",
            totalSpent: "$76.30",
          },
        ];
        setCustomers(mockCustomers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load customers. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchCustomers();
  }, [toast]);

  const filteredCustomers = customers.filter(customer => 
    (selectedTab === "all" || customer.status === selectedTab) &&
    (customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleViewProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditedCustomer({...customer});
    setIsEditMode(false);
    setIsProfileOpen(true);
  };

  const handleEditDetails = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedCustomer(selectedCustomer);
  };

  const handleSaveChanges = async () => {
    if (!editedCustomer) return;
    
    try {
      // In a real implementation, this would be a fetch to your API
      // For now we'll update the local state
      const updatedCustomers = customers.map(customer => 
        customer.id === editedCustomer.id ? editedCustomer : customer
      );
      
      setCustomers(updatedCustomers);
      setSelectedCustomer(editedCustomer);
      setIsEditMode(false);
      
      toast({
        title: "Success",
        description: "Customer details updated successfully",
      });
    } catch (error) {
      console.error("Error updating customer:", error);
      toast({
        title: "Error",
        description: "Failed to update customer details. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCustomer = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCustomer) return;
    
    try {
      // In a real implementation, this would be a fetch to your API
      // For now we'll update the local state
      const updatedCustomers = customers.filter(customer => customer.id !== selectedCustomer.id);
      
      setCustomers(updatedCustomers);
      setIsDeleteDialogOpen(false);
      setIsProfileOpen(false);
      
      toast({
        title: "Success",
        description: "Customer deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast({
        title: "Error",
        description: "Failed to delete customer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddCustomer = () => {
    setIsAddDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value,
    });
  };

  const handleCreateCustomer = async () => {
    try {
      // In a real implementation, this would be a fetch to your API
      // For now we'll update the local state
      const newId = Math.max(...customers.map(c => c.id)) + 1;
      
      const customerToAdd = {
        id: newId,
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
        location: newCustomer.location,
        status: newCustomer.status,
        orders: 0,
        lastOrder: "Never",
        joinDate: new Date().toLocaleDateString(),
        totalSpent: "$0.00",
      };
      
      setCustomers([...customers, customerToAdd]);
      setIsAddDialogOpen(false);
      setNewCustomer({
        name: "",
        email: "",
        phone: "",
        location: "",
        status: "active"
      });
      
      toast({
        title: "Success",
        description: "New customer added successfully",
      });
    } catch (error) {
      console.error("Error adding customer:", error);
      toast({
        title: "Error",
        description: "Failed to add customer. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedCustomer) return;
    
    const { name, value } = e.target;
    setEditedCustomer({
      ...editedCustomer,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customers and view their order history
          </p>
        </div>
        <Button onClick={handleAddCustomer} className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Customer Overview
            </CardTitle>
            <div className="text-xs text-muted-foreground">Last 30 days</div>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/2] bg-muted/30 rounded-md flex items-center justify-center border">
              <p className="text-muted-foreground">
                Customer growth chart will be displayed here
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
                    <p className="text-sm font-medium">Total Customers</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {customers.length}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Customers</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {customers.filter(c => c.status === "active").length}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Today's Orders</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {customers.filter(c => c.lastOrder.includes("Today")).length}
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
                placeholder="Search customers..."
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
                  <div className="py-6 text-center">Loading customers...</div>
                ) : (
                  <div className="grid gap-4">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <div key={customer.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 font-medium">
                              {customer.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {customer.name}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {customer.location}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {customer.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end">
                              <Badge variant="outline" className="gap-1">
                                <FileText className="h-3 w-3" />
                                {customer.orders} orders
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                Joined: {customer.joinDate}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last order: {customer.lastOrder}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewProfile(customer)}>
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-muted-foreground">
                        No customers found matching your search
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
                  <div className="py-6 text-center">Loading customers...</div>
                ) : (
                  <div className="grid gap-4">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <div key={customer.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 font-medium">
                              {customer.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {customer.name}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {customer.location}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {customer.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end">
                              <Badge variant="outline" className="gap-1">
                                <FileText className="h-3 w-3" />
                                {customer.orders} orders
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                Joined: {customer.joinDate}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last order: {customer.lastOrder}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewProfile(customer)}>
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-muted-foreground">
                        No inactive customers found matching your search
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
                  <div className="py-6 text-center">Loading customers...</div>
                ) : (
                  <div className="grid gap-4">
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <div key={customer.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                          <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-full ${customer.status === "active" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-500" : "bg-gray-200 dark:bg-gray-800 text-gray-500"} flex items-center justify-center font-medium`}>
                              {customer.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {customer.name}
                                <Badge variant={customer.status === "active" ? "default" : "secondary"} className="text-xs">
                                  {customer.status === "active" ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {customer.location}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {customer.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end">
                              <Badge variant="outline" className="gap-1">
                                <FileText className="h-3 w-3" />
                                {customer.orders} orders
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                Joined: {customer.joinDate}
                              </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last order: {customer.lastOrder}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewProfile(customer)}>
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-muted-foreground">
                        No customers found matching your search
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Customer Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Customer" : "Customer Profile"}</DialogTitle>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="space-y-6">
              {isEditMode ? (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right font-medium">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={editedCustomer?.name || ""}
                      onChange={handleEditCustomerChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="email" className="text-right font-medium">Email</label>
                    <Input
                      id="email"
                      name="email"
                      value={editedCustomer?.email || ""}
                      onChange={handleEditCustomerChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="phone" className="text-right font-medium">Phone</label>
                    <Input
                      id="phone"
                      name="phone"
                      value={editedCustomer?.phone || ""}
                      onChange={handleEditCustomerChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="location" className="text-right font-medium">Location</label>
                    <Input
                      id="location"
                      name="location"
                      value={editedCustomer?.location || ""}
                      onChange={handleEditCustomerChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`h-16 w-16 rounded-full ${selectedCustomer.status === "active" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-500" : "bg-gray-200 dark:bg-gray-800 text-gray-500"} flex items-center justify-center text-2xl font-medium`}>
                      {selectedCustomer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{selectedCustomer.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={selectedCustomer.status === "active" ? "default" : "secondary"}>
                          {selectedCustomer.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">Joined: {selectedCustomer.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedCustomer.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">Order Information</h4>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Orders:</span>
                          <Badge variant="outline" className="gap-1">
                            <FileText className="h-3 w-3" />
                            {selectedCustomer.orders}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Last Order:</span>
                          <span className="text-sm">{selectedCustomer.lastOrder}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Total Spent:</span>
                          <span className="text-sm font-medium">{selectedCustomer.totalSpent}</span>
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
                    <Button variant="destructive" onClick={handleDeleteCustomer}>
                      <Trash className="h-4 w-4 mr-2" />
                      Delete Customer
                    </Button>
                  </>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-name" className="text-right font-medium">Name</label>
              <Input
                id="new-name"
                name="name"
                value={newCustomer.name}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Customer name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-email" className="text-right font-medium">Email</label>
              <Input
                id="new-email"
                name="email"
                type="email"
                value={newCustomer.email}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="customer@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-phone" className="text-right font-medium">Phone</label>
              <Input
                id="new-phone"
                name="phone"
                value={newCustomer.phone}
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
                value={newCustomer.location}
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
            <Button onClick={handleCreateCustomer} disabled={!newCustomer.name || !newCustomer.email}>
              Create Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the customer and all associated data. This action cannot be undone.
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

export default Customers;

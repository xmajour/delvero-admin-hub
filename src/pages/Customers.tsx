
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, Phone, FileText, MapPin, User, Filter, SlidersHorizontal, DownloadCloud } from "lucide-react";

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("active");

  // Mock data
  const customers = [
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

  const filteredCustomers = customers.filter(customer => 
    (selectedTab === "all" || customer.status === selectedTab) &&
    (customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">
          Manage your customers and view their order history
        </p>
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
                          <Badge variant="secondary" className="gap-1">
                            <Phone className="h-3 w-3" />
                            Call
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-muted-foreground">
                      No customers found matching your search
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inactive" className="m-0">
            <Card>
              <CardContent className="p-6">
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
                          <Badge variant="secondary" className="gap-1">
                            <Phone className="h-3 w-3" />
                            Call
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-muted-foreground">
                      No inactive customers found matching your search
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="m-0">
            <Card>
              <CardContent className="p-6">
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
                              <Badge variant={customer.status === "active" ? "success" : "secondary"} className="text-xs">
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
                          <Badge variant="secondary" className="gap-1">
                            <Phone className="h-3 w-3" />
                            Call
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-muted-foreground">
                      No customers found matching your search
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Customers;

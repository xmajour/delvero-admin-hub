
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Star, Phone, FileText, Truck, User } from "lucide-react";

const Tracking = () => {
  const [selectedTab, setSelectedTab] = useState("riders");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const riders = [
    {
      id: 1,
      name: "Alex Johnson",
      status: "Available",
      location: "Brooklyn, NY",
      phone: "+1 (555) 123-4567",
      rating: 4.9,
      orders: 127,
      online: true,
    },
    {
      id: 2,
      name: "Maya Patel",
      status: "On Delivery",
      location: "Queens, NY",
      phone: "+1 (555) 765-4321",
      rating: 4.7,
      orders: 89,
      online: true,
    },
    {
      id: 3,
      name: "Carlos Mendez",
      status: "On Delivery",
      location: "Manhattan, NY",
      phone: "+1 (555) 987-6543",
      rating: 4.8,
      orders: 216,
      online: true,
    },
    {
      id: 4,
      name: "Sarah Williams",
      status: "Available",
      location: "Bronx, NY",
      phone: "+1 (555) 234-5678",
      rating: 4.6,
      orders: 54,
      online: true,
    },
    {
      id: 5,
      name: "John Lee",
      status: "Offline",
      location: "Staten Island, NY",
      phone: "+1 (555) 876-5432",
      rating: 4.5,
      orders: 73,
      online: false,
    },
  ];

  const customers = [
    {
      id: 1,
      name: "Emma Wilson",
      location: "Manhattan, NY",
      phone: "+1 (555) 111-2222",
      orders: 12,
      lastOrder: "Today, 10:24 AM",
    },
    {
      id: 2,
      name: "Michael Brown",
      location: "Brooklyn, NY",
      phone: "+1 (555) 333-4444",
      orders: 5,
      lastOrder: "Yesterday, 2:15 PM",
    },
    {
      id: 3,
      name: "Sophia Garcia",
      location: "Queens, NY",
      phone: "+1 (555) 555-6666",
      orders: 18,
      lastOrder: "Today, 9:30 AM",
    },
    {
      id: 4,
      name: "David Kim",
      location: "Bronx, NY",
      phone: "+1 (555) 777-8888",
      orders: 2,
      lastOrder: "2 days ago",
    },
    {
      id: 5,
      name: "Olivia Martinez",
      location: "Manhattan, NY",
      phone: "+1 (555) 999-0000",
      orders: 7,
      lastOrder: "Today, 11:45 AM",
    },
  ];

  const filteredRiders = riders.filter(rider => 
    rider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rider.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500";
      case "On Delivery":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tracking</h1>
        <p className="text-muted-foreground">
          Monitor riders and customers in real-time
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              Live Location Map
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video bg-muted/30 rounded-md flex items-center justify-center border m-6">
              <p className="text-muted-foreground">
                Interactive map with real-time locations will be displayed here
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
                  <div className="h-8 w-8 rounded-md bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Truck className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Riders</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {riders.filter(r => r.online).length}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Customers</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {customers.filter(c => c.lastOrder.includes("Today")).length}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">In Progress</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {riders.filter(r => r.status === "On Delivery").length}
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
              <TabsTrigger value="riders" className="flex gap-2">
                <Truck className="h-4 w-4" />
                <span>Riders</span>
              </TabsTrigger>
              <TabsTrigger value="customers" className="flex gap-2">
                <User className="h-4 w-4" />
                <span>Customers</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="w-full sm:w-72">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or location..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <TabsContent value="riders" className="m-0">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4">
                {filteredRiders.length > 0 ? (
                  filteredRiders.map((rider) => (
                    <div key={rider.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {rider.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {rider.name}
                            <div className={`h-2 w-2 rounded-full ${getStatusColor(rider.status)}`} />
                            <span className="text-xs font-normal text-muted-foreground">{rider.status}</span>
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {rider.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span className="text-sm">{rider.rating}</span>
                        </div>
                        <Badge variant="outline" className="gap-1">
                          <FileText className="h-3 w-3" />
                          {rider.orders} orders
                        </Badge>
                        <Badge variant="secondary" className="gap-1">
                          <Phone className="h-3 w-3" />
                          Call
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-muted-foreground">
                    No riders found matching your search
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="m-0">
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
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="gap-1">
                          <FileText className="h-3 w-3" />
                          {customer.orders} orders
                        </Badge>
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
      </div>
    </div>
  );
};

export default Tracking;

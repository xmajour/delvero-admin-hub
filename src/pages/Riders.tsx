
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, Phone, FileText, MapPin, Truck, Filter, SlidersHorizontal, DownloadCloud } from "lucide-react";

const Riders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("online");

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
      email: "alex.j@delvero.com",
      joinDate: "Oct 15, 2023",
      earnings: "$1,275.80",
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
      email: "maya.p@delvero.com",
      joinDate: "Jan 5, 2024",
      earnings: "$945.50",
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
      email: "carlos.m@delvero.com",
      joinDate: "Aug 18, 2023",
      earnings: "$2,120.75",
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
      email: "sarah.w@delvero.com",
      joinDate: "Feb 12, 2024",
      earnings: "$640.20",
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
      email: "john.l@delvero.com",
      joinDate: "Nov 30, 2023",
      earnings: "$820.65",
    },
    {
      id: 6,
      name: "Lisa Thompson",
      status: "Offline",
      location: "Manhattan, NY",
      phone: "+1 (555) 345-6789",
      rating: 4.8,
      orders: 92,
      online: false,
      email: "lisa.t@delvero.com",
      joinDate: "Dec 10, 2023",
      earnings: "$955.40",
    },
  ];

  const filteredRiders = riders.filter(rider => 
    (selectedTab === "all" || 
     (selectedTab === "online" && rider.online) || 
     (selectedTab === "offline" && !rider.online)) &&
    (rider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     rider.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
     rider.email.toLowerCase().includes(searchQuery.toLowerCase()))
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
        <h1 className="text-3xl font-bold tracking-tight">Riders</h1>
        <p className="text-muted-foreground">
          Manage your delivery fleet and track performance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Rider Performance
            </CardTitle>
            <div className="text-xs text-muted-foreground">Last 30 days</div>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/2] bg-muted/30 rounded-md flex items-center justify-center border">
              <p className="text-muted-foreground">
                Delivery performance chart will be displayed here
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
                    <Truck className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">On Delivery</p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {riders.filter(r => r.status === "On Delivery").length}
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
                  {(riders.reduce((acc, rider) => acc + rider.rating, 0) / riders.length).toFixed(1)}
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
              <TabsTrigger value="online" className="flex gap-2">
                <Truck className="h-4 w-4" />
                <span>Online</span>
              </TabsTrigger>
              <TabsTrigger value="offline" className="flex gap-2">
                <Truck className="h-4 w-4" />
                <span>Offline</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="flex gap-2">
                <Truck className="h-4 w-4" />
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
          <TabsContent value="online" className="m-0">
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
                            <div className="text-xs text-muted-foreground">
                              {rider.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                            <span className="text-sm">{rider.rating}</span>
                          </div>
                          <div className="hidden md:block">
                            <Badge variant="outline" className="gap-1">
                              <FileText className="h-3 w-3" />
                              {rider.orders} orders
                            </Badge>
                          </div>
                          <div className="hidden md:block text-xs text-muted-foreground">
                            Earnings: {rider.earnings}
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
                      No online riders found matching your search
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offline" className="m-0">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4">
                  {filteredRiders.length > 0 ? (
                    filteredRiders.map((rider) => (
                      <div key={rider.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 font-medium">
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
                            <div className="text-xs text-muted-foreground">
                              {rider.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                            <span className="text-sm">{rider.rating}</span>
                          </div>
                          <div className="hidden md:block">
                            <Badge variant="outline" className="gap-1">
                              <FileText className="h-3 w-3" />
                              {rider.orders} orders
                            </Badge>
                          </div>
                          <div className="hidden md:block text-xs text-muted-foreground">
                            Last active: 2 days ago
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
                      No offline riders found matching your search
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
                  {filteredRiders.length > 0 ? (
                    filteredRiders.map((rider) => (
                      <div key={rider.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-full ${rider.online ? "bg-primary/10 text-primary" : "bg-gray-200 dark:bg-gray-800 text-gray-500"} flex items-center justify-center font-medium`}>
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
                            <div className="text-xs text-muted-foreground">
                              {rider.email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                            <span className="text-sm">{rider.rating}</span>
                          </div>
                          <div className="hidden md:block">
                            <Badge variant="outline" className="gap-1">
                              <FileText className="h-3 w-3" />
                              {rider.orders} orders
                            </Badge>
                          </div>
                          <div className="hidden md:block text-xs text-muted-foreground">
                            Joined: {rider.joinDate}
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
                      No riders found matching your search
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

export default Riders;

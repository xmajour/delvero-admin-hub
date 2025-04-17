
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, Phone, FileText, MapPin, Store, Filter, SlidersHorizontal, DownloadCloud } from "lucide-react";

const Merchants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("active");

  // Mock data
  const merchants = [
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
  ];

  const filteredMerchants = merchants.filter(merchant => 
    (selectedTab === "all" || merchant.status === selectedTab) &&
    (merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     merchant.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
     merchant.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
     merchant.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Merchants</h1>
        <p className="text-muted-foreground">
          Manage partner merchants and track their performance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Merchant Revenue
            </CardTitle>
            <div className="text-xs text-muted-foreground">Last 30 days</div>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/2] bg-muted/30 rounded-md flex items-center justify-center border">
              <p className="text-muted-foreground">
                Merchant revenue chart will be displayed here
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
                  {merchants.filter(m => m.status === "active").length}
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
                          <Badge variant="secondary" className="gap-1">
                            <Phone className="h-3 w-3" />
                            Call
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-muted-foreground">
                      No active merchants found matching your search
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
                          <Badge variant="secondary" className="gap-1">
                            <Phone className="h-3 w-3" />
                            Call
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-muted-foreground">
                      No inactive merchants found matching your search
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
                          <Badge variant="secondary" className="gap-1">
                            <Phone className="h-3 w-3" />
                            Call
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-muted-foreground">
                      No merchants found matching your search
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

export default Merchants;

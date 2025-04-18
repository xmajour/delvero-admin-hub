import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  Clock,
  Search,
  FilterIcon,
  ArrowUpDown,
  MoreHorizontal,
  MapPin,
  CheckCircle,
  AlertCircle,
  UserCircle,
  Truck,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for orders
const ordersMockData = [
  {
    id: "ORD-45678",
    customer: "Emma Wilson",
    rider: "Alex Johnson",
    pickup: "Manhattan Deli, NY",
    dropoff: "112 West 72nd St, NY",
    status: "In Progress",
    time: "10:24 AM",
    amount: "$23.50",
    date: "Today",
  },
  {
    id: "ORD-45677",
    customer: "Michael Brown",
    rider: "Maya Patel",
    pickup: "Brooklyn Cafe, NY",
    dropoff: "55 Water St, Brooklyn",
    status: "Delivered",
    time: "9:45 AM",
    amount: "$18.75",
    date: "Today",
  },
  {
    id: "ORD-45676",
    customer: "Sophia Garcia",
    rider: "Carlos Mendez",
    pickup: "Queens Bakery, NY",
    dropoff: "78-11 Roosevelt Ave, Queens",
    status: "Cancelled",
    time: "9:32 AM",
    amount: "$15.20",
    date: "Today",
  },
  {
    id: "ORD-45675",
    customer: "David Kim",
    rider: "Sarah Williams",
    pickup: "Bronx Diner, NY",
    dropoff: "1216 E Gun Hill Rd, Bronx",
    status: "Pending",
    time: "9:15 AM",
    amount: "$27.80",
    date: "Today",
  },
  {
    id: "ORD-45674",
    customer: "Olivia Martinez",
    rider: "John Lee",
    pickup: "Staten Island Pizza, NY",
    dropoff: "1281 Arthur Kill Rd, Staten Island",
    status: "In Progress",
    time: "8:55 AM",
    amount: "$21.40",
    date: "Today",
  },
  {
    id: "ORD-45673",
    customer: "William Johnson",
    rider: "Alex Johnson",
    pickup: "Manhattan Grill, NY",
    dropoff: "240 E 86th St, NY",
    status: "Delivered",
    time: "3:24 PM",
    amount: "$32.15",
    date: "Yesterday",
  },
  {
    id: "ORD-45672",
    customer: "Ava Thompson",
    rider: "Maya Patel",
    pickup: "Brooklyn Diner, NY",
    dropoff: "315 Flatbush Ave, Brooklyn",
    status: "Delivered",
    time: "2:15 PM",
    amount: "$19.95",
    date: "Yesterday",
  },
  {
    id: "ORD-45671",
    customer: "James Rodriguez",
    rider: "Carlos Mendez",
    pickup: "Queens Food Court, NY",
    dropoff: "61-35 Junction Blvd, Queens",
    status: "Delivered",
    time: "1:40 PM",
    amount: "$24.60",
    date: "Yesterday",
  },
];

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  
  // Filter orders based on search query and status
  const filteredOrders = ordersMockData.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.rider.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = 
      statusFilter === "all" || 
      order.status.toLowerCase() === statusFilter.toLowerCase();
      
    return matchesSearch && matchesStatus;
  });
  
  // Helper function to determine status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
          <CheckCircle className="h-3 w-3 mr-1" /> {status}
        </Badge>;
      case "In Progress":
        return <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
          <Clock className="h-3 w-3 mr-1" /> {status}
        </Badge>;
      case "Pending":
        return <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
          <Clock className="h-3 w-3 mr-1" /> {status}
        </Badge>;
      case "Cancelled":
        return <Badge variant="outline" className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
          <AlertCircle className="h-3 w-3 mr-1" /> {status}
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track delivery orders
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">357</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">312</div>
            <p className="text-xs text-muted-foreground">87.4% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">10.6% of total orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">1.9% of total orders</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
              <TabsTrigger value="thisWeek">This Week</TabsTrigger>
            </TabsList>
            <div className="flex flex-wrap gap-2">
              <div className="w-full sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8 w-full sm:w-[240px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase border-b">
                    <tr>
                      <th className="px-6 py-4 font-medium flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          Order ID <ArrowUpDown className="h-3 w-3" />
                        </Button>
                      </th>
                      <th className="px-6 py-4 font-medium">Customer</th>
                      <th className="px-6 py-4 font-medium">Rider</th>
                      <th className="px-6 py-4 font-medium">Pickup</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Time</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="px-6 py-4 font-medium">{order.id}</td>
                          <td className="px-6 py-4 flex items-center gap-2">
                            <UserCircle className="h-4 w-4 text-muted-foreground" />
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 flex items-center gap-2">
                            <Truck className="h-4 w-4 text-muted-foreground" />
                            {order.rider}
                          </td>
                          <td className="px-6 py-4 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" /> 
                            <span className="truncate max-w-[150px]">{order.pickup}</span>
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(order.status)}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {order.date}, {order.time}
                          </td>
                          <td className="px-6 py-4 font-medium">{order.amount}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowOrderDetails(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Track order</DropdownMenuItem>
                                  <DropdownMenuItem>Contact customer</DropdownMenuItem>
                                  <DropdownMenuItem>Contact rider</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-6 py-8 text-center text-muted-foreground">
                          No orders found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </div>

      <Dialog open={showOrderDetails} onOpenChange={setShowOrderDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Order ID</label>
                  <p className="font-medium">{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div>{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Customer</label>
                  <p>{selectedOrder.customer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rider</label>
                  <p>{selectedOrder.rider}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Pickup Location</label>
                  <p>{selectedOrder.pickup}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Dropoff Location</label>
                  <p>{selectedOrder.dropoff}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Time</label>
                  <p>{selectedOrder.date}, {selectedOrder.time}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Amount</label>
                  <p className="font-medium">{selectedOrder.amount}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;


import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell 
} from "recharts";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { BarChart3, Users, TrendingUp, TrendingDown, Activity, Database } from "lucide-react";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sample data for the charts
  const overviewData = [
    { name: "Jan", customers: 400, riders: 240, merchants: 180 },
    { name: "Feb", customers: 450, riders: 260, merchants: 190 },
    { name: "Mar", customers: 500, riders: 300, merchants: 220 },
    { name: "Apr", customers: 520, riders: 320, merchants: 230 },
    { name: "May", customers: 570, riders: 350, merchants: 250 },
    { name: "Jun", customers: 620, riders: 380, merchants: 270 },
  ];
  
  const customerData = [
    { name: "Active", value: 620, color: "#4f46e5" },
    { name: "Inactive", value: 210, color: "#94a3b8" },
    { name: "New", value: 180, color: "#10b981" },
  ];
  
  const riderData = [
    { name: "Active", value: 380, color: "#8b5cf6" },
    { name: "Inactive", value: 120, color: "#94a3b8" },
    { name: "New", value: 90, color: "#06b6d4" },
  ];
  
  const merchantData = [
    { name: "Active", value: 270, color: "#f59e0b" },
    { name: "Inactive", value: 80, color: "#94a3b8" },
    { name: "New", value: 60, color: "#ec4899" },
  ];
  
  const salesTrend = [
    { name: "Jan", sales: 2400, orders: 120 },
    { name: "Feb", sales: 2800, orders: 140 },
    { name: "Mar", sales: 3200, orders: 180 },
    { name: "Apr", sales: 3600, orders: 200 },
    { name: "May", sales: 4200, orders: 240 },
    { name: "Jun", sales: 4800, orders: 280 },
  ];
  
  const revenueByMerchant = [
    { name: "Merchant A", revenue: 8400 },
    { name: "Merchant B", revenue: 7600 },
    { name: "Merchant C", revenue: 5200 },
    { name: "Merchant D", revenue: 4800 },
    { name: "Merchant E", revenue: 3600 },
  ];
  
  const topRiders = [
    { id: 1, name: "John Doe", rides: 124, rating: 4.9, earnings: "$1,240" },
    { id: 2, name: "Jane Smith", rides: 118, rating: 4.8, earnings: "$1,180" },
    { id: 3, name: "Robert Johnson", rides: 103, rating: 4.7, earnings: "$1,030" },
    { id: 4, name: "Emily Davis", rides: 98, rating: 4.9, earnings: "$980" },
    { id: 5, name: "Michael Brown", rides: 92, rating: 4.6, earnings: "$920" },
  ];
  
  const topCustomers = [
    { id: 1, name: "Alice Wilson", orders: 32, spent: "$640" },
    { id: 2, name: "Bob Martinez", orders: 28, spent: "$560" },
    { id: 3, name: "Carol Taylor", orders: 26, spent: "$520" },
    { id: 4, name: "David Anderson", orders: 24, spent: "$480" },
    { id: 5, name: "Eva Garcia", orders: 22, spent: "$440" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          View detailed data and performance metrics for customers, riders, and merchants
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-indigo-500" />
              Customers
            </CardTitle>
            <CardDescription>Total customers registered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">830</div>
              <div className="text-sm text-green-500 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                12% 
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-purple-500" />
              Riders
            </CardTitle>
            <CardDescription>Active delivery riders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">380</div>
              <div className="text-sm text-green-500 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                8% 
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5 text-amber-500" />
              Merchants
            </CardTitle>
            <CardDescription>Registered merchants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">270</div>
              <div className="text-sm text-green-500 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                6% 
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="riders">Riders</TabsTrigger>
          <TabsTrigger value="merchants">Merchants</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                Growth Metrics
              </CardTitle>
              <CardDescription>
                Comparative growth of customers, riders, and merchants
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  customers: { color: "#4f46e5" },
                  riders: { color: "#8b5cf6" },
                  merchants: { color: "#f59e0b" }
                }}
              >
                <BarChart data={overviewData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Bar dataKey="customers" fill="var(--color-customers)" name="Customers" />
                  <Bar dataKey="riders" fill="var(--color-riders)" name="Riders" />
                  <Bar dataKey="merchants" fill="var(--color-merchants)" name="Merchants" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                Sales & Orders Trend
              </CardTitle>
              <CardDescription>
                Monthly sales and order volume
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  sales: { color: "#10b981" },
                  orders: { color: "#6366f1" }
                }}
              >
                <LineChart data={salesTrend} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="sales" stroke="var(--color-sales)" name="Sales ($)" />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="var(--color-orders)" name="Orders" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  Customer Distribution
                </CardTitle>
                <CardDescription>
                  Breakdown of customer status
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  Top Customers
                </CardTitle>
                <CardDescription>
                  Based on order volume and spending
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.orders}</TableCell>
                        <TableCell>{customer.spent}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="riders" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  Rider Distribution
                </CardTitle>
                <CardDescription>
                  Breakdown of rider status
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riderData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {riderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  Top Riders
                </CardTitle>
                <CardDescription>
                  Based on delivery volume and ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Rides</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Earnings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topRiders.map((rider) => (
                      <TableRow key={rider.id}>
                        <TableCell className="font-medium">{rider.name}</TableCell>
                        <TableCell>{rider.rides}</TableCell>
                        <TableCell>{rider.rating}</TableCell>
                        <TableCell>{rider.earnings}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="merchants" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-muted-foreground" />
                  Merchant Distribution
                </CardTitle>
                <CardDescription>
                  Breakdown of merchant status
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={merchantData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {merchantData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  Top Merchants by Revenue
                </CardTitle>
                <CardDescription>
                  Revenue generated by top merchants
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    revenue: { color: "#f59e0b" }
                  }}
                >
                  <BarChart 
                    layout="vertical" 
                    data={revenueByMerchant}
                    margin={{ top: 20, right: 30, left: 70, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <ChartTooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue ($)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;

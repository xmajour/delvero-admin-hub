
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart, 
  Pie, 
  Tooltip, 
  Legend, 
  Cell, 
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip 
} from "@/components/ui/chart";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { BarChart3, FileText, TrendingUp } from "lucide-react";

interface OrdersTabProps {
  orderData: {
    name: string;
    value: number;
    color: string;
  }[];
  orderTrend: {
    name: string;
    value: number;
  }[];
  ordersByCategory: {
    name: string;
    value: number;
  }[];
  topOrders: {
    id: number;
    orderId: string;
    customer: string;
    merchant: string;
    amount: string;
    status: string;
  }[];
}

const OrdersTab = ({ orderData, orderTrend, ordersByCategory, topOrders }: OrdersTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Order Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of order status
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {orderData.map((entry, index) => (
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
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              Orders by Category
            </CardTitle>
            <CardDescription>
              Distribution of orders by category
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                value: { color: "#10b981" }
              }}
            >
              <BarChart 
                layout="vertical" 
                data={ordersByCategory}
                margin={{ top: 20, right: 30, left: 70, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <ChartTooltip />
                <Legend />
                <Bar dataKey="value" fill="var(--color-value)" name="Orders" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              Order Volume Trend
            </CardTitle>
            <CardDescription>
              Monthly order volume
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                value: { color: "#0ea5e9" }
              }}
            >
              <LineChart data={orderTrend} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="var(--color-value)" name="Orders" />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Top Orders
            </CardTitle>
            <CardDescription>
              Recent high-value orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.merchant}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrdersTab;


import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  BarChart, 
  LineChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Bar, 
  Line
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip
} from "@/components/ui/chart";
import { BarChart3, TrendingUp } from "lucide-react";

interface OverviewTabProps {
  overviewData: {
    name: string;
    customers: number;
    riders: number;
    merchants: number;
  }[];
  salesTrend: {
    name: string;
    sales: number;
    orders: number;
  }[];
}

const OverviewTab = ({ overviewData, salesTrend }: OverviewTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default OverviewTab;

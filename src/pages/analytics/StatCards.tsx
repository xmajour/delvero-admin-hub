
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Users, Activity, Database, FileText, TrendingUp } from "lucide-react";

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-emerald-500" />
            Orders
          </CardTitle>
          <CardDescription>Total orders processed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold">775</div>
            <div className="text-sm text-green-500 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              15% 
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;

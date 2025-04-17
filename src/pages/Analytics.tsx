
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          View detailed data and performance metrics
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Analytics and reporting features will be implemented in the next update.</p>
          <p className="text-muted-foreground mt-2">
            This section will include detailed reports, visualizations, trends, and performance metrics.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react";

const Pricing = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pricing & Commission</h1>
        <p className="text-muted-foreground">
          Manage pricing models and commission rates
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5 text-muted-foreground" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Pricing and Commission management features will be implemented in the next update.</p>
          <p className="text-muted-foreground mt-2">
            This section will allow adjusting prices based on distance, weight, or service type and manage rider commissions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pricing;

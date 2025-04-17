
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const Payments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">
          Manage payment processing and financial operations
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Payment management features will be implemented in the next update.</p>
          <p className="text-muted-foreground mt-2">
            This section will include payment processing, rider payments, financial reports, and more.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;

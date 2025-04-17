
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react";

const Offers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Offers & Discounts</h1>
        <p className="text-muted-foreground">
          Manage promotional campaigns and discount codes
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
          <p>Offers and discount management features will be implemented in the next update.</p>
          <p className="text-muted-foreground mt-2">
            This section will allow creating and managing promotional campaigns, discount codes, and performance tracking.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Offers;

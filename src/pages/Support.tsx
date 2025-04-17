
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const Support = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customer Support</h1>
        <p className="text-muted-foreground">
          Manage customer inquiries and support tickets
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Customer support management features will be implemented in the next update.</p>
          <p className="text-muted-foreground mt-2">
            This section will include ticket management, customer communication, and issue resolution tools.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;

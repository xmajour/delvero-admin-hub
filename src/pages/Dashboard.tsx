
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  CircleCheckBig,
  AlertCircle,
  Star,
  Truck,
  Compass,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  // Mock data for dashboard
  const stats = [
    {
      title: "Current Orders",
      value: "58",
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Completed Today",
      value: "142",
      icon: CircleCheckBig,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Delayed Orders",
      value: "6",
      icon: AlertCircle,
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Satisfaction Score",
      value: "4.8/5",
      icon: Star,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  const riderData = [
    { id: 1, name: "Alex Johnson", status: "Available", orders: 26, rating: 4.9 },
    { id: 2, name: "Maya Patel", status: "On Delivery", orders: 31, rating: 4.7 },
    { id: 3, name: "Carlos Mendez", status: "On Delivery", orders: 18, rating: 4.8 },
    { id: 4, name: "Sarah Williams", status: "Available", orders: 22, rating: 4.6 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your delivery operations
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-full`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Map area */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-muted-foreground" />
              Live Delivery Map
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video bg-muted/30 rounded-md flex items-center justify-center border m-6">
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Interactive map will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Active riders */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              Active Riders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riderData.map((rider) => (
                <div key={rider.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                      {rider.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{rider.name}</p>
                      <div className="flex items-center gap-1">
                        <div className={`h-1.5 w-1.5 rounded-full ${
                          rider.status === "Available" ? "bg-green-500" : "bg-blue-500"
                        }`} />
                        <p className="text-xs text-muted-foreground">{rider.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">{rider.rating}</div>
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>City Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">New York</div>
                  <div className="text-sm font-medium">78%</div>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Los Angeles</div>
                  <div className="text-sm font-medium">63%</div>
                </div>
                <Progress value={63} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Chicago</div>
                  <div className="text-sm font-medium">85%</div>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Houston</div>
                  <div className="text-sm font-medium">72%</div>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "10:24 AM", message: "New order placed #45678" },
                { time: "09:45 AM", message: "Rider Carlos accepted delivery #45672" },
                { time: "09:32 AM", message: "Customer complaint resolved #45612" },
                { time: "09:15 AM", message: "New driver application received" },
                { time: "08:55 AM", message: "Daily report generated" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// This component is used as a placeholder for the MapPin icon
// It will be replaced by a real map implementation
function MapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default Dashboard;

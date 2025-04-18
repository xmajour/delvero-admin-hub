import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart3, CreditCard, MapPin, Package, Percent, Settings, Users, HelpCircle, Truck, HomeIcon, Store, User } from "lucide-react";
interface SidebarNavProps {
  collapsed: boolean;
  setCollapsed: () => void;
}
const navItems = [{
  title: "Dashboard",
  href: "/",
  icon: HomeIcon,
  color: "text-delvero-500"
}, {
  title: "Customers",
  href: "/customers",
  icon: User,
  color: "text-blue-500"
}, {
  title: "Riders",
  href: "/riders",
  icon: Truck,
  color: "text-green-500"
}, {
  title: "Merchants",
  href: "/merchants",
  icon: Store,
  color: "text-purple-500"
}, {
  title: "Orders",
  href: "/orders",
  icon: Package,
  color: "text-orange-500"
}, {
  title: "Pricing & Commission",
  href: "/pricing",
  icon: Percent,
  color: "text-purple-500"
}, {
  title: "Payments",
  href: "/payments",
  icon: CreditCard,
  color: "text-emerald-500"
}, {
  title: "Analytics",
  href: "/analytics",
  icon: BarChart3,
  color: "text-blue-500"
}, {
  title: "Support",
  href: "/support",
  icon: HelpCircle,
  color: "text-amber-500"
}, {
  title: "Offers",
  href: "/offers",
  icon: Percent,
  color: "text-rose-500"
}, {
  title: "Settings",
  href: "/settings",
  icon: Settings,
  color: "text-gray-500"
}];
export function SidebarNav({
  collapsed,
  setCollapsed
}: SidebarNavProps) {
  return <div className={cn("flex h-full flex-col border-r bg-sidebar text-sidebar-foreground")}>
      <div className="p-4 flex h-16 items-center border-b">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/86dd8452-5d5c-4ff8-a614-461d6d3fdce4.png" alt="Delvero Logo" className="h-7 w-7 text-delvero-500" />
          {!collapsed && <span className="font-bold text-xl">Delvero</span>}
        </div>
      </div>

      <div className="flex-1 overflow-auto scrollbar-thin py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => <NavLink key={index} to={item.href} className={({
          isActive
        }) => cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors", isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "transparent hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground")}>
              <item.icon className={cn("h-5 w-5", item.color)} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>)}
        </nav>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 rounded-full bg-muted">
            <Users className="h-5 w-5 absolute inset-0 m-auto text-muted-foreground" />
          </div>
          {!collapsed && <div className="flex flex-col">
              <span className="text-xs font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">
                admin@delvero.com
              </span>
            </div>}
        </div>
      </div>
    </div>;
}
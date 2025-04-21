
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Percent,
  DollarSign,
  ReceiptText,
  Calculator,
  ChartPie,
  Receipt,
  MapPin,
  Calendar,
} from "lucide-react";

const SECTIONS = [
  {
    icon: Calculator,
    title: "Manage Pricing Models",
    description:
      "Define how prices are calculated for services or products. Factors include order cost and additional fees for time, distance, surge pricing, or delivery specifics.",
    highlights: [
      "Base order cost setup",
      "Additional fees (time/distance/surge/delivery)",
    ],
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: Percent,
    title: "Set Commission Rates",
    description:
      "Adjust the percentage the platform takes as commission from completed orders. Flexible commission by vendor, contract, or promotional period.",
    highlights: [
      "Vendor/partner tier rates",
      "Campaign-based commissions",
    ],
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: ChartPie,
    title: "Dynamic Pricing Policies",
    description:
      "Change pricing based on current market conditions, such as high demand or low driver availability.",
    highlights: [
      "Automated price adjustments",
      "Demand-driven surges",
    ],
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
  },
  {
    icon: DollarSign,
    title: "Delivery Fees Management",
    description:
      "Set fees based on delivery distance, time, or special circumstances. Ensure competitiveness and profitability.",
    highlights: [
      "Distance & time-based fees",
      "Custom delivery charges",
    ],
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: ReceiptText,
    title: "Offers & Discounts",
    description:
      "Control platform offers or discounts for end users. Customize by geographic region, partner, or service type.",
    highlights: [
      "Location/service-type targeting",
      "Campaign setup & tracking",
    ],
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: MapPin,
    title: "Regional & Partner Customization",
    description:
      "Set pricing and commission models for specific regions or partners, like restaurant chains or driver groups.",
    highlights: [
      "Region or partner overrides",
      "Fine-grained access",
    ],
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
  },
  {
    icon: Receipt,
    title: "Invoicing & Financial Reporting",
    description:
      "Track platform finances, generate invoices, and prepare periodic reports on sales and commissions by vendor or partner.",
    highlights: [
      "Revenue/expense tracking",
      "Auto-generated reports",
    ],
    color: "text-gray-600",
    bg: "bg-gray-50 dark:bg-gray-900/20",
  },
];

const Pricing = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Pricing &amp; Commission Management
        </h1>
        <p className="text-muted-foreground max-w-2xl mt-2">
          Centralize all financial controls for your platform. Configure service pricing, manage commissions, create special offers, and leverage dynamic and customizable business rules across vendors and regions. Easily analyze sales and commission performance to inform your business decisions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {SECTIONS.map((section, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className={`p-2 rounded-full ${section.bg}`}>
                <section.icon className={`h-6 w-6 ${section.color}`} />
              </div>
              <div>
                <CardTitle className="text-lg">{section.title}</CardTitle>
                <CardDescription className="mt-1">{section.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="pl-3 list-disc text-muted-foreground space-y-1">
                {section.highlights.map((hl, hidx) => (
                  <li key={hidx}>{hl}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <ChartPie className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">
              Why This Page Matters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This page provides a unified interface for setting service prices, managing commissions and offers, and preparing reports, letting you adapt dynamically to market and regional trends.
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground space-y-1 text-sm">
              <li>Set base prices and add surcharges as needed.</li>
              <li>Easily change commission and offer policies.</li>
              <li>Customize based on region, vendor, or demand.</li>
              <li>Quickly generate detailed sales and commission reports.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;

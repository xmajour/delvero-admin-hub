
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
    title: "Add or Remove Pricing Model",
    description:
      "Configure and manage pricing for every service offered. Add, remove, or modify pricing models and set dynamic rules.",
    highlights: [
      "Add/remove services to pricing",
      "Flexible base cost and fee structures",
    ],
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: Percent,
    title: "Set or Remove Commission Rates",
    description:
      "Add, edit, or remove commission rates for all offered services, vendors, and campaigns. Enable flexible commissions for each service.",
    highlights: [
      "Add/remove commissions per vendor",
      "Time-limited or contract-based setup",
    ],
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: ChartPie,
    title: "Dynamic Pricing for All Services",
    description:
      "Adjust prices automatically based on demand or operational rules for all your services.",
    highlights: [
      "Enable/disable surcharges",
      "Automated dynamic pricing",
    ],
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
  },
  {
    icon: DollarSign,
    title: "Delivery Fees Management",
    description:
      "Manage, add or remove delivery fee rules associated with your services.",
    highlights: [
      "Easy delivery fee setup for each service",
      "Customizable tiered fee rules",
    ],
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    icon: ReceiptText,
    title: "Offers & Discounts",
    description:
      "Add or remove discount rules for any service, region, or campaign.",
    highlights: [
      "Custom, location, or service-based offers",
      "Simple campaign management",
    ],
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: MapPin,
    title: "Regional & Partner Customization",
    description:
      "Override or remove service pricing/commissions for regions, partner types, or special groups.",
    highlights: [
      "Region/partner rule management",
      "Easy overrides/removal",
    ],
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-900/20",
  },
  {
    icon: Receipt,
    title: "Invoicing & Financial Reports",
    description:
      "Track and report on sales, pricing, and commissions for all service types.",
    highlights: [
      "Revenue/expense insights by service",
      "Easy rule addition and removal",
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
          Add or remove service Pricing &amp; Commission for every offering—centralized financial controls, dynamic rules, campaign management, and robust reporting to suit your platform's diverse needs.
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
              This page lets you add or remove service pricing and commission models, giving you full flexibility to adapt platform revenue and management to changing needs.
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground space-y-1 text-sm">
              <li>Add/remove base prices or surcharges for every service offered.</li>
              <li>Quickly change or disable commission and offer policies as needed.</li>
              <li>Customize at any detail: region, vendor, demand, or service type.</li>
              <li>Generate and assess detailed financial performance on all rules.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;


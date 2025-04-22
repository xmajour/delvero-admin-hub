
import { useState } from "react";
import StatCards from "./analytics/StatCards";
import AnalyticsTabs from "./analytics/AnalyticsTabs";
import {
  overviewData,
  salesTrend,
  customerData,
  topCustomers,
  riderData,
  topRiders,
  merchantData,
  revenueByMerchant,
  orderData,
  orderTrend,
  ordersByCategory,
  topOrders
} from "./analytics/data/analyticsData";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          View detailed data and performance metrics for customers, riders, merchants, and orders
        </p>
      </div>
      
      <StatCards />
      
      <AnalyticsTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        overviewData={overviewData}
        salesTrend={salesTrend}
        customerData={customerData}
        topCustomers={topCustomers}
        riderData={riderData}
        topRiders={topRiders}
        merchantData={merchantData}
        revenueByMerchant={revenueByMerchant}
        orderData={orderData}
        orderTrend={orderTrend}
        ordersByCategory={ordersByCategory}
        topOrders={topOrders}
      />
    </div>
  );
};

export default Analytics;

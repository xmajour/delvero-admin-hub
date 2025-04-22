
import React from 'react';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import OverviewTab from './OverviewTab';
import CustomersTab from './CustomersTab';
import RidersTab from './RidersTab';
import MerchantsTab from './MerchantsTab';
import OrdersTab from './OrdersTab';

interface AnalyticsTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  overviewData: {
    name: string;
    customers: number;
    riders: number;
    merchants: number;
  }[];
  salesTrend: {
    name: string;
    sales: number;
    orders: number;
  }[];
  customerData: {
    name: string;
    value: number;
    color: string;
  }[];
  topCustomers: {
    id: number;
    name: string;
    orders: number;
    spent: string;
  }[];
  riderData: {
    name: string;
    value: number;
    color: string;
  }[];
  topRiders: {
    id: number;
    name: string;
    rides: number;
    rating: number;
    earnings: string;
  }[];
  merchantData: {
    name: string;
    value: number;
    color: string;
  }[];
  revenueByMerchant: {
    name: string;
    revenue: number;
  }[];
  orderData: {
    name: string;
    value: number;
    color: string;
  }[];
  orderTrend: {
    name: string;
    value: number;
  }[];
  ordersByCategory: {
    name: string;
    value: number;
  }[];
  topOrders: {
    id: number;
    orderId: string;
    customer: string;
    merchant: string;
    amount: string;
    status: string;
  }[];
}

const AnalyticsTabs = ({
  activeTab,
  setActiveTab,
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
}: AnalyticsTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-5 md:w-[700px]">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
        <TabsTrigger value="riders">Riders</TabsTrigger>
        <TabsTrigger value="merchants">Merchants</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <OverviewTab 
          overviewData={overviewData}
          salesTrend={salesTrend}
        />
      </TabsContent>
      
      <TabsContent value="customers" className="space-y-4">
        <CustomersTab 
          customerData={customerData}
          topCustomers={topCustomers}
        />
      </TabsContent>
      
      <TabsContent value="riders" className="space-y-4">
        <RidersTab 
          riderData={riderData}
          topRiders={topRiders}
        />
      </TabsContent>
      
      <TabsContent value="merchants" className="space-y-4">
        <MerchantsTab 
          merchantData={merchantData}
          revenueByMerchant={revenueByMerchant}
        />
      </TabsContent>
      
      <TabsContent value="orders" className="space-y-4">
        <OrdersTab 
          orderData={orderData}
          orderTrend={orderTrend}
          ordersByCategory={ordersByCategory}
          topOrders={topOrders}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTabs;

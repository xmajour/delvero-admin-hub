
export const overviewData = [
  { name: "Jan", customers: 400, riders: 240, merchants: 180 },
  { name: "Feb", customers: 450, riders: 260, merchants: 190 },
  { name: "Mar", customers: 500, riders: 300, merchants: 220 },
  { name: "Apr", customers: 520, riders: 320, merchants: 230 },
  { name: "May", customers: 570, riders: 350, merchants: 250 },
  { name: "Jun", customers: 620, riders: 380, merchants: 270 },
];

export const customerData = [
  { name: "Active", value: 620, color: "#4f46e5" },
  { name: "Inactive", value: 210, color: "#94a3b8" },
  { name: "New", value: 180, color: "#10b981" },
];

export const riderData = [
  { name: "Active", value: 380, color: "#8b5cf6" },
  { name: "Inactive", value: 120, color: "#94a3b8" },
  { name: "New", value: 90, color: "#06b6d4" },
];

export const merchantData = [
  { name: "Active", value: 270, color: "#f59e0b" },
  { name: "Inactive", value: 80, color: "#94a3b8" },
  { name: "New", value: 60, color: "#ec4899" },
];

export const salesTrend = [
  { name: "Jan", sales: 2400, orders: 120 },
  { name: "Feb", sales: 2800, orders: 140 },
  { name: "Mar", sales: 3200, orders: 180 },
  { name: "Apr", sales: 3600, orders: 200 },
  { name: "May", sales: 4200, orders: 240 },
  { name: "Jun", sales: 4800, orders: 280 },
];

export const revenueByMerchant = [
  { name: "Merchant A", revenue: 8400 },
  { name: "Merchant B", revenue: 7600 },
  { name: "Merchant C", revenue: 5200 },
  { name: "Merchant D", revenue: 4800 },
  { name: "Merchant E", revenue: 3600 },
];

export const topRiders = [
  { id: 1, name: "John Doe", rides: 124, rating: 4.9, earnings: "$1,240" },
  { id: 2, name: "Jane Smith", rides: 118, rating: 4.8, earnings: "$1,180" },
  { id: 3, name: "Robert Johnson", rides: 103, rating: 4.7, earnings: "$1,030" },
  { id: 4, name: "Emily Davis", rides: 98, rating: 4.9, earnings: "$980" },
  { id: 5, name: "Michael Brown", rides: 92, rating: 4.6, earnings: "$920" },
];

export const topCustomers = [
  { id: 1, name: "Alice Wilson", orders: 32, spent: "$640" },
  { id: 2, name: "Bob Martinez", orders: 28, spent: "$560" },
  { id: 3, name: "Carol Taylor", orders: 26, spent: "$520" },
  { id: 4, name: "David Anderson", orders: 24, spent: "$480" },
  { id: 5, name: "Eva Garcia", orders: 22, spent: "$440" },
];

export const orderData = [
  { name: "Completed", value: 580, color: "#10b981" },
  { name: "In Progress", value: 120, color: "#f59e0b" },
  { name: "Cancelled", value: 75, color: "#ef4444" },
];

export const orderTrend = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 140 },
  { name: "Mar", value: 180 },
  { name: "Apr", value: 200 },
  { name: "May", value: 240 },
  { name: "Jun", value: 280 },
];

export const ordersByCategory = [
  { name: "Food", value: 450 },
  { name: "Groceries", value: 300 },
  { name: "Electronics", value: 180 },
  { name: "Clothing", value: 150 },
  { name: "Other", value: 100 },
];

export const topOrders = [
  { id: 1, orderId: "#ORD-9385", customer: "Alice Wilson", merchant: "Merchant A", amount: "$86.50", status: "Completed" },
  { id: 2, orderId: "#ORD-9372", customer: "Bob Martinez", merchant: "Merchant C", amount: "$120.00", status: "Completed" },
  { id: 3, orderId: "#ORD-9368", customer: "Carol Taylor", merchant: "Merchant B", amount: "$95.75", status: "Completed" },
  { id: 4, orderId: "#ORD-9366", customer: "David Anderson", merchant: "Merchant E", amount: "$45.99", status: "Completed" },
  { id: 5, orderId: "#ORD-9364", customer: "Eva Garcia", merchant: "Merchant D", amount: "$78.25", status: "Completed" },
];

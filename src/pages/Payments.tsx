
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DollarSign, FileChartLine, Receipt, Wallet, Banknote } from "lucide-react";

const dummyStats = [
  {
    icon: <DollarSign className="h-6 w-6 text-vividPurple" />,
    label: "Total Payments",
    value: "$14,200",
  },
  {
    icon: <Receipt className="h-6 w-6 text-oceanBlue" />,
    label: "Order Transactions",
    value: "423",
  },
  {
    icon: <Wallet className="h-6 w-6 text-brightOrange" />,
    label: "Rider Payouts",
    value: "$2,450",
  },
  {
    icon: <Banknote className="h-6 w-6 text-softGreen" />,
    label: "Merchant Settlements",
    value: "$9,735",
  },
];

const dummyTransactions = [
  {
    id: "TXN-42356",
    user: "Sara Merchant",
    role: "Merchant",
    amount: "$500.00",
    status: "Completed",
    date: "2025-04-20",
  },
  {
    id: "TXN-42357",
    user: "Fred Rider",
    role: "Rider",
    amount: "$75.00",
    status: "Completed",
    date: "2025-04-21",
  },
  {
    id: "TXN-42358",
    user: "Amira Customer",
    role: "Customer",
    amount: "$35.00",
    status: "Refunded",
    date: "2025-04-19",
  },
];

const Payments = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Payments & Financial Management
        </h1>
        <p className="text-muted-foreground">
          Manage payment processing flows, generate reports, and review all payment transactions for merchants, customers, and riders.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyStats.map((stat) => (
          <Card key={stat.label} className="relative">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="p-2 rounded-lg bg-accent/50">
                {stat.icon}
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Financial Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileChartLine className="h-5 w-5 text-secondaryPurple" />
            Financial Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="secondary" className="w-full">Generate Daily Report</Button>
            <Button variant="secondary" className="w-full">Generate Weekly Report</Button>
            <Button variant="secondary" className="w-full">Generate Monthly Report</Button>
            <Button variant="outline" className="w-full">Download CSV</Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Generate and download comprehensive payment, settlement, and payout reports for merchants, riders, and customers.
          </p>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-brightBlue" />
            Recent Payment Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Latest 3 transactions for payments, payouts, and settlements</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Transaction ID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[100px] text-right">Amount</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[110px]">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                  <TableCell>{txn.user}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                        ${txn.role === "Merchant"
                          ? "bg-purple-100 text-purple-700"
                          : txn.role === "Rider"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-pink-100 text-pink-700"
                        }`}
                    >
                      {txn.role}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-right">{txn.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                        ${txn.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : txn.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {txn.status}
                    </span>
                  </TableCell>
                  <TableCell>{txn.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;

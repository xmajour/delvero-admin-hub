
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Payments & Financial Management
        </h1>
        <p className="text-muted-foreground">
          Manage payment processing flows, generate reports, and review all payment transactions for merchants, customers, and riders.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dummyStats.map((stat) => (
          <Card key={stat.label} className="flex flex-row items-center gap-2 overflow-hidden">
            <div className="p-4">{stat.icon}</div>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
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
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Button variant="secondary">Generate Daily Report</Button>
            <Button variant="secondary">Generate Weekly Report</Button>
            <Button variant="secondary">Generate Monthly Report</Button>
            <Button variant="outline">Download CSV</Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
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
                <TableHead>Transaction ID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.id}</TableCell>
                  <TableCell>{txn.user}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium 
                        ${txn.role === "Merchant"
                          ? "bg-softPurple text-secondaryPurple"
                          : txn.role === "Rider"
                          ? "bg-softGreen text-brightOrange"
                          : "bg-softPink text-magentaPink"
                        }`}
                    >
                      {txn.role}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono">{txn.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium 
                        ${txn.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : txn.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
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

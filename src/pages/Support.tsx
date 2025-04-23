import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, MessageSquare, Users, Activity, Database, Search, Edit, Trash2, Check, X } from "lucide-react";

const initCustomerTickets = [
  { id: 1, subject: "Payment not processed", customer: "Alice Wilson", status: "open", priority: "high", created: "2025-04-20", lastUpdate: "2025-04-21" },
  { id: 2, subject: "Order delivery delayed", customer: "Bob Martinez", status: "in-progress", priority: "medium", created: "2025-04-19", lastUpdate: "2025-04-21" },
  { id: 3, subject: "App crashes during checkout", customer: "Carol Taylor", status: "open", priority: "high", created: "2025-04-18", lastUpdate: "2025-04-20" },
  { id: 4, subject: "Incorrect item received", customer: "David Anderson", status: "in-progress", priority: "medium", created: "2025-04-17", lastUpdate: "2025-04-19" },
  { id: 5, subject: "Refund request", customer: "Eva Garcia", status: "resolved", priority: "low", created: "2025-04-15", lastUpdate: "2025-04-18" },
];

const initRiderTickets = [
  { id: 1, subject: "App navigation issues", rider: "John Doe", status: "open", priority: "high", created: "2025-04-20", lastUpdate: "2025-04-21" },
  { id: 2, subject: "Payment not received", rider: "Jane Smith", status: "in-progress", priority: "high", created: "2025-04-19", lastUpdate: "2025-04-21" },
  { id: 3, subject: "Vehicle breakdown assistance", rider: "Robert Johnson", status: "resolved", priority: "medium", created: "2025-04-18", lastUpdate: "2025-04-20" },
  { id: 4, subject: "Incorrect delivery address", rider: "Emily Davis", status: "in-progress", priority: "medium", created: "2025-04-17", lastUpdate: "2025-04-19" },
  { id: 5, subject: "Account verification issue", rider: "Michael Brown", status: "open", priority: "low", created: "2025-04-15", lastUpdate: "2025-04-18" },
];

const initMerchantTickets = [
  { id: 1, subject: "Menu items not displaying", merchant: "Merchant A", status: "open", priority: "high", created: "2025-04-20", lastUpdate: "2025-04-21" },
  { id: 2, subject: "Payment reconciliation", merchant: "Merchant B", status: "in-progress", priority: "medium", created: "2025-04-19", lastUpdate: "2025-04-21" },
  { id: 3, subject: "Order management system error", merchant: "Merchant C", status: "open", priority: "high", created: "2025-04-18", lastUpdate: "2025-04-20" },
  { id: 4, subject: "Promotional discount not applied", merchant: "Merchant D", status: "in-progress", priority: "low", created: "2025-04-17", lastUpdate: "2025-04-19" },
  { id: 5, subject: "Account verification pending", merchant: "Merchant E", status: "resolved", priority: "medium", created: "2025-04-15", lastUpdate: "2025-04-18" },
];

const Support = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [searchQuery, setSearchQuery] = useState("");

  const [customerTickets, setCustomerTickets] = useState(initCustomerTickets);
  const [editingCustomer, setEditingCustomer] = useState<number | null>(null);
  const [editValueCustomer, setEditValueCustomer] = useState<string>("");

  const [riderTickets, setRiderTickets] = useState(initRiderTickets);
  const [editingRider, setEditingRider] = useState<number | null>(null);
  const [editValueRider, setEditValueRider] = useState<string>("");

  const [merchantTickets, setMerchantTickets] = useState(initMerchantTickets);
  const [editingMerchant, setEditingMerchant] = useState<number | null>(null);
  const [editValueMerchant, setEditValueMerchant] = useState<string>("");

  const getStatusBadge = (status) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive">Open</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handleEdit = (type, id, val) => {
    if (type === "customer") {
      setEditingCustomer(id);
      setEditValueCustomer(val);
    } else if (type === "rider") {
      setEditingRider(id);
      setEditValueRider(val);
    } else if (type === "merchant") {
      setEditingMerchant(id);
      setEditValueMerchant(val);
    }
  };

  const handleEditChange = (type, val) => {
    if (type === "customer") setEditValueCustomer(val);
    if (type === "rider") setEditValueRider(val);
    if (type === "merchant") setEditValueMerchant(val);
  };

  const handleEditSave = (type, id) => {
    if (type === "customer") {
      setCustomerTickets(ts =>
        ts.map(t => t.id === id ? { ...t, subject: editValueCustomer } : t)
      );
      setEditingCustomer(null);
    } else if (type === "rider") {
      setRiderTickets(ts =>
        ts.map(t => t.id === id ? { ...t, subject: editValueRider } : t)
      );
      setEditingRider(null);
    } else if (type === "merchant") {
      setMerchantTickets(ts =>
        ts.map(t => t.id === id ? { ...t, subject: editValueMerchant } : t)
      );
      setEditingMerchant(null);
    }
  };

  const handleResolve = (type, id) => {
    if (type === "customer") {
      setCustomerTickets(ts =>
        ts.map(t => t.id === id ? { ...t, status: "resolved" } : t)
      );
    } else if (type === "rider") {
      setRiderTickets(ts =>
        ts.map(t => t.id === id ? { ...t, status: "resolved" } : t)
      );
    } else if (type === "merchant") {
      setMerchantTickets(ts =>
        ts.map(t => t.id === id ? { ...t, status: "resolved" } : t)
      );
    }
  };

  const handleReopen = (type, id) => {
    if (type === "customer") {
      setCustomerTickets(ts =>
        ts.map(t => t.id === id ? { ...t, status: "open" } : t)
      );
    } else if (type === "rider") {
      setRiderTickets(ts =>
        ts.map(t => t.id === id ? { ...t, status: "open" } : t)
      );
    } else if (type === "merchant") {
      setMerchantTickets(ts =>
        ts.map(t => t.id === id ? { ...t, status: "open" } : t)
      );
    }
  };

  const handleToggleStatus = (type, id) => {
    if (type === "customer") {
      setCustomerTickets(ts =>
        ts.map(t =>
          t.id === id
            ? { ...t, status: t.status === "resolved" ? "open" : "resolved", lastUpdate: (new Date()).toISOString().split("T")[0] }
            : t
        )
      );
    } else if (type === "rider") {
      setRiderTickets(ts =>
        ts.map(t =>
          t.id === id
            ? { ...t, status: t.status === "resolved" ? "open" : "resolved", lastUpdate: (new Date()).toISOString().split("T")[0] }
            : t
        )
      );
    } else if (type === "merchant") {
      setMerchantTickets(ts =>
        ts.map(t =>
          t.id === id
            ? { ...t, status: t.status === "resolved" ? "open" : "resolved", lastUpdate: (new Date()).toISOString().split("T")[0] }
            : t
        )
      );
    }
  };

  const getAllTickets = () => [
    ...customerTickets,
    ...riderTickets,
    ...merchantTickets,
  ];

  const openTicketsCount = getAllTickets().filter(t => t.status !== "resolved").length;
  const resolvedTodayCount = getAllTickets().filter(t => t.status === "resolved" && ["2025-04-18", "2025-04-20", "2025-04-21"].includes(t.lastUpdate)).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customer Support</h1>
        <p className="text-muted-foreground">
          Manage customer inquiries and support tickets
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search tickets..." 
          className="max-w-sm" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="h-5 w-5 text-indigo-500" />
              Open Tickets
            </CardTitle>
            <CardDescription>Total unresolved tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {openTicketsCount}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Check className="h-5 w-5 text-green-500" />
              Resolved Today
            </CardTitle>
            <CardDescription>Tickets closed today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {resolvedTodayCount}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <HelpCircle className="h-5 w-5 text-amber-500" />
              Average Response
            </CardTitle>
            <CardDescription>Average time to first response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.4h</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Customers</span>
          </TabsTrigger>
          <TabsTrigger value="riders" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Riders</span>
          </TabsTrigger>
          <TabsTrigger value="merchants" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Merchants</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                Customer Support Tickets
              </CardTitle>
              <CardDescription>
                Manage and resolve customer inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerTickets
                    .filter(ticket => 
                      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">
                        {editingCustomer === ticket.id ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              value={editValueCustomer}
                              onChange={e => handleEditChange("customer", e.target.value)}
                              onKeyDown={e => {
                                if (e.key === "Enter") handleEditSave("customer", ticket.id);
                                if (e.key === "Escape") setEditingCustomer(null);
                              }}
                              className="max-w-xs"
                              autoFocus
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditSave("customer", ticket.id)}
                              className="text-green-600"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setEditingCustomer(null)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          ticket.subject
                        )}
                      </TableCell>
                      <TableCell>{ticket.customer}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{ticket.lastUpdate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit("customer", ticket.id, ticket.subject)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleToggleStatus("customer", ticket.id)}
                            className={ticket.status === "resolved" ? "text-red-600" : "text-green-600"}
                            title={ticket.status === "resolved" ? "Reopen" : "Resolve"}
                          >
                            {ticket.status === "resolved" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button>New Ticket</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="riders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-muted-foreground" />
                Rider Support Tickets
              </CardTitle>
              <CardDescription>
                Manage and resolve rider inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Rider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {riderTickets
                    .filter(ticket => 
                      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      ticket.rider.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">
                        {editingRider === ticket.id ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              value={editValueRider}
                              onChange={e => handleEditChange("rider", e.target.value)}
                              onKeyDown={e => {
                                if (e.key === "Enter") handleEditSave("rider", ticket.id);
                                if (e.key === "Escape") setEditingRider(null);
                              }}
                              className="max-w-xs"
                              autoFocus
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditSave("rider", ticket.id)}
                              className="text-green-600"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setEditingRider(null)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          ticket.subject
                        )}
                      </TableCell>
                      <TableCell>{ticket.rider}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{ticket.lastUpdate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit("rider", ticket.id, ticket.subject)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleToggleStatus("rider", ticket.id)}
                            className={ticket.status === "resolved" ? "text-red-600" : "text-green-600"}
                            title={ticket.status === "resolved" ? "Reopen" : "Resolve"}
                          >
                            {ticket.status === "resolved" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button>New Ticket</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="merchants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-muted-foreground" />
                Merchant Support Tickets
              </CardTitle>
              <CardDescription>
                Manage and resolve merchant inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Last Update</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {merchantTickets
                    .filter(ticket => 
                      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      ticket.merchant.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">
                        {editingMerchant === ticket.id ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              value={editValueMerchant}
                              onChange={e => handleEditChange("merchant", e.target.value)}
                              onKeyDown={e => {
                                if (e.key === "Enter") handleEditSave("merchant", ticket.id);
                                if (e.key === "Escape") setEditingMerchant(null);
                              }}
                              className="max-w-xs"
                              autoFocus
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditSave("merchant", ticket.id)}
                              className="text-green-600"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setEditingMerchant(null)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          ticket.subject
                        )}
                      </TableCell>
                      <TableCell>{ticket.merchant}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{ticket.lastUpdate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit("merchant", ticket.id, ticket.subject)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleToggleStatus("merchant", ticket.id)}
                            className={ticket.status === "resolved" ? "text-red-600" : "text-green-600"}
                            title={ticket.status === "resolved" ? "Reopen" : "Resolve"}
                          >
                            {ticket.status === "resolved" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button>New Ticket</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;

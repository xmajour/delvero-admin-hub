
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Rule = {
  id: number;
  name: string;
  type: "Pricing" | "Commission";
  amount: number;
  percentage: number;
  applicableFor: "All" | "Merchants" | "Riders" | "Customers";
  note?: string;
  status: "Active" | "Inactive";
};

const Pricing = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState<"Pricing" | "Commission">("Pricing");
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState("");
  const [applicableFor, setApplicableFor] = useState<Rule["applicableFor"]>("All");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  const handleAdd = () => {
    if (!name.trim() || (!amount && !percentage)) return;
    
    setRules(prev => [
      ...prev,
      {
        id: Date.now(),
        name: name.trim(),
        type,
        amount: Number(amount) || 0,
        percentage: Number(percentage) || 0,
        applicableFor,
        note: note.trim() || undefined,
        status
      }
    ]);
    
    // Reset form
    setName("");
    setAmount("");
    setPercentage("");
    setNote("");
    setType("Pricing");
    setApplicableFor("All");
    setStatus("Active");
  };

  const handleRemove = (id: number) => {
    setRules(rs => rs.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Pricing & Commission Management
        </h1>
        <p className="text-muted-foreground">
          Configure pricing rules and commission structures for all services
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Create New Rule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Rule name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              
              <select 
                value={type} 
                onChange={e => setType(e.target.value as Rule["type"])}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Pricing">Pricing</option>
                <option value="Commission">Commission</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Fixed Amount"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
              
              <Input
                placeholder="Percentage"
                type="number"
                value={percentage}
                onChange={e => setPercentage(e.target.value)}
              />
              
              <select 
                value={applicableFor}
                onChange={e => setApplicableFor(e.target.value as Rule["applicableFor"])}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="All">All Users</option>
                <option value="Merchants">Merchants Only</option>
                <option value="Riders">Riders Only</option>
                <option value="Customers">Customers Only</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Notes (optional)"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
              
              <select 
                value={status}
                onChange={e => setStatus(e.target.value as Rule["status"])}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <Button onClick={handleAdd} disabled={!name.trim() || (!amount && !percentage)} className="w-full">
              <Plus className="h-4 w-4 mr-1" /> Add Rule
            </Button>
          </div>
          
          <hr className="my-6" />
          
          <div className="space-y-4">
            {rules.length === 0 ? (
              <p className="text-muted-foreground text-sm">No rules yet.</p>
            ) : (
              rules.map(rule => (
                <div key={rule.id} className="flex items-start justify-between bg-accent/50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{rule.name}</span>
                      <Badge variant="secondary">{rule.type}</Badge>
                      <Badge variant={rule.status === "Active" ? "default" : "secondary"}>
                        {rule.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4" />
                      {rule.amount > 0 && <span>${rule.amount}</span>}
                      {rule.percentage > 0 && <span>{rule.percentage}%</span>}
                      <Badge variant="outline">{rule.applicableFor}</Badge>
                    </div>
                    
                    {rule.note && (
                      <p className="text-sm text-muted-foreground">{rule.note}</p>
                    )}
                  </div>
                  
                  <Button size="icon" variant="destructive" onClick={() => handleRemove(rule.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pricing;

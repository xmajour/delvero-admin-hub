
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

type Rule = {
  id: number;
  name: string;
  type: "Pricing" | "Commission";
  amount: number;
  note?: string;
};

const Pricing = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState<"Pricing" | "Commission">("Pricing");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !amount || isNaN(Number(amount))) return;
    setRules(prev => [
      ...prev,
      {
        id: Date.now(),
        name: name.trim(),
        type,
        amount: Number(amount),
        note: note.trim() || undefined,
      }
    ]);
    setName("");
    setAmount("");
    setNote("");
    setType("Pricing");
  };

  const handleRemove = (id: number) => {
    setRules(rs => rs.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Pricing &amp; Commission Management
        </h1>
        <p className="text-muted-foreground">
          Add or remove Pricing &amp; Commission for all services we offer. Create, remove, and control rules for flexible management.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Pricing &amp; Commission</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:gap-4">
            <Input
              placeholder="Rule name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="md:w-1/4"
            />
            <select value={type} onChange={e => setType(e.target.value as Rule["type"])} className="px-2 py-2 border rounded-md md:w-1/4">
              <option value="Pricing">Pricing</option>
              <option value="Commission">Commission</option>
            </select>
            <Input
              placeholder="Amount"
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="md:w-1/4"
            />
            <Input
              placeholder="Notes (optional)"
              value={note}
              onChange={e => setNote(e.target.value)}
              className="md:w-1/4"
            />
            <Button onClick={handleAdd} disabled={!name.trim() || !amount}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
          <hr className="mb-3" />
          <ul className="space-y-3">
            {rules.length === 0 ? (
              <li className="text-muted-foreground text-sm">No rules yet.</li>
            ) : (
              rules.map(rule => (
                <li key={rule.id} className="flex items-center justify-between bg-accent/50 rounded px-4 py-2">
                  <div>
                    <span className="font-semibold">{rule.name}</span>{" "}
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs ml-2">{rule.type}</span>
                    <span className="ml-3 font-mono text-xs text-gray-700">{rule.amount}</span>
                    {rule.note && (
                      <span className="ml-4 text-muted-foreground text-xs">{rule.note}</span>
                    )}
                  </div>
                  <Button size="icon" variant="destructive" onClick={() => handleRemove(rule.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pricing;


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Calendar, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Offer = {
  id: number;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  amount: number;
  startDate: string;
  endDate: string;
};

const Offers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAdd = () => {
    if (!title.trim() || !amount || !startDate || !endDate) return;
    
    setOffers(prev => [
      ...prev,
      {
        id: Date.now(),
        title: title.trim(),
        description: desc.trim(),
        discountType,
        amount: Number(amount),
        startDate,
        endDate
      }
    ]);
    
    // Reset form
    setTitle("");
    setDesc("");
    setAmount("");
    setStartDate("");
    setEndDate("");
    setDiscountType("percentage");
  };

  const handleRemove = (id: number) => {
    setOffers(o => o.filter(ofr => ofr.id !== id));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Offers & Discounts</h1>
        <p className="text-muted-foreground">
          Create and manage promotional campaigns and discount codes
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Create New Offer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Offer title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <Input
                placeholder="Description (optional)"
                value={desc}
                onChange={e => setDesc(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select 
                value={discountType}
                onChange={e => setDiscountType(e.target.value as "percentage" | "fixed")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount</option>
              </select>
              
              <Input
                type="number"
                placeholder={discountType === "percentage" ? "Discount %" : "Amount"}
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />

              <Input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
              
              <Button 
                onClick={handleAdd} 
                disabled={!title.trim() || !amount || !startDate || !endDate}
                className="md:self-end"
              >
                <Plus className="h-4 w-4 mr-1" /> Create Offer
              </Button>
            </div>
          </div>
          
          <hr className="my-6" />
          
          <div className="space-y-4">
            {offers.length === 0 ? (
              <p className="text-muted-foreground text-sm">No offers yet.</p>
            ) : (
              offers.map(ofr => (
                <div key={ofr.id} className="flex items-start justify-between bg-accent/50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{ofr.title}</span>
                      <Badge variant="secondary">
                        {ofr.discountType === "percentage" ? `${ofr.amount}%` : `$${ofr.amount}`}
                      </Badge>
                    </div>
                    
                    {ofr.description && (
                      <p className="text-sm text-muted-foreground">{ofr.description}</p>
                    )}
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(ofr.startDate).toLocaleDateString()} - {new Date(ofr.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <Button size="icon" variant="destructive" onClick={() => handleRemove(ofr.id)}>
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

export default Offers;

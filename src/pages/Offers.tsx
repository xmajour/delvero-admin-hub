
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

type Offer = {
  id: number;
  title: string;
  description: string;
};

const Offers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    setOffers(prev => [
      ...prev,
      { id: Date.now(), title: title.trim(), description: desc.trim() }
    ]);
    setTitle("");
    setDesc("");
  };

  const handleRemove = (id: number) => {
    setOffers(o => o.filter(ofr => ofr.id !== id));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Offers & Discounts</h1>
        <p className="text-muted-foreground">
          Manage promotional campaigns and discount codes
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Offers &amp; Discounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex flex-col gap-2 mb-2">
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
            <Button onClick={handleAdd} disabled={!title.trim()}>
              <Plus className="h-4 w-4 mr-1" /> Add Offer
            </Button>
          </div>
          <hr className="mb-3" />
          <ul className="space-y-3">
            {offers.length === 0 ? (
              <li className="text-muted-foreground text-sm">No offers yet.</li>
            ) : (
              offers.map(ofr => (
                <li key={ofr.id} className="flex items-center justify-between bg-accent/50 rounded px-4 py-2">
                  <div>
                    <span className="font-semibold">{ofr.title}</span>
                    {ofr.description && (
                      <p className="text-xs text-muted-foreground mt-1">{ofr.description}</p>
                    )}
                  </div>
                  <Button size="icon" variant="destructive" onClick={() => handleRemove(ofr.id)}>
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

export default Offers;

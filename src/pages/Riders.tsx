
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Rider {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: "active" | "inactive";
}

const Riders = () => {
    const [riders] = useState<Rider[]>([
        { id: 1, name: "John Doe", email: "john@example.com", phone: "+1234567890", status: "active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1234567891", status: "inactive" },
    ]);

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Riders Management</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add New Rider
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Rider</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" placeholder="Enter rider name" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input id="email" type="email" placeholder="Enter email" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">Phone</Label>
                                <Input id="phone" type="tel" placeholder="Enter phone number" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button>Save Rider</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Riders List</CardTitle>
                    <CardDescription>
                        Manage your delivery riders and their account status.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of all registered riders.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {riders.map((rider) => (
                                <TableRow key={rider.id}>
                                    <TableCell className="font-medium">{rider.name}</TableCell>
                                    <TableCell>{rider.email}</TableCell>
                                    <TableCell>{rider.phone}</TableCell>
                                    <TableCell>
                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            rider.status === 'active' 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {rider.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="destructive" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Riders;

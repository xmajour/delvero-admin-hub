import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const Riders = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Riders</CardTitle>
                    <CardDescription>
                        Here are the current riders on the platform.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pl-6">
                    <Table>
                        <TableCaption>A list of your recent riders.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">INV002</TableCell>
                                <TableCell>Pending</TableCell>
                                <TableCell>PayPal</TableCell>
                                <TableCell className="text-right">$150.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">INV003</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">$300.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Merchant</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            {/*<Input id="name" className="col-span-3" />*/}
                        </div>
                    </div>
                    <DialogFooter>
                        {/*<Button type="submit">Save changes</Button>*/}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Riders;

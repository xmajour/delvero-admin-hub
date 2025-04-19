
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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

// تعريف نوع البيانات للسائق
interface Rider {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: "active" | "inactive";
}

const Riders = () => {
    // تعريف حالة السائقين والنموذج
    const [riders, setRiders] = useState<Rider[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const { toast } = useToast();

    // دالة لجلب بيانات السائقين من قاعدة البيانات
    const fetchRiders = async () => {
        try {
            const response = await fetch('YOUR_DATABASE_URL/riders');
            const data = await response.json();
            setRiders(data);
        } catch (error) {
            console.error('Error fetching riders:', error);
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء جلب بيانات السائقين",
                variant: "destructive",
            });
        }
    };

    // دالة لإضافة سائق جديد
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('YOUR_DATABASE_URL/riders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, status: 'active' }),
            });
            
            if (response.ok) {
                toast({
                    title: "تم بنجاح",
                    description: "تم إضافة السائق بنجاح",
                });
                setIsOpen(false);
                fetchRiders();
                setFormData({ name: '', email: '', phone: '' });
            }
        } catch (error) {
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء إضافة السائق",
                variant: "destructive",
            });
        }
    };

    // دالة لحذف سائق
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`YOUR_DATABASE_URL/riders/${id}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                toast({
                    title: "تم بنجاح",
                    description: "تم حذف السائق بنجاح",
                });
                fetchRiders();
            }
        } catch (error) {
            toast({
                title: "خطأ",
                description: "حدث خطأ أثناء حذف السائق",
                variant: "destructive",
            });
        }
    };

    // جلب البيانات عند تحميل الصفحة
    useEffect(() => {
        fetchRiders();
    }, []);

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">إدارة السائقين</h1>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            إضافة سائق جديد
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>إضافة سائق جديد</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">الاسم</Label>
                                    <Input 
                                        id="name" 
                                        placeholder="أدخل اسم السائق" 
                                        className="col-span-3"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">البريد الإلكتروني</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        placeholder="أدخل البريد الإلكتروني" 
                                        className="col-span-3"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="phone" className="text-right">رقم الهاتف</Label>
                                    <Input 
                                        id="phone" 
                                        type="tel" 
                                        placeholder="أدخل رقم الهاتف" 
                                        className="col-span-3"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">حفظ</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>قائمة السائقين</CardTitle>
                    <CardDescription>
                        إدارة السائقين وحالة حساباتهم
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>قائمة بجميع السائقين المسجلين</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>الاسم</TableHead>
                                <TableHead>البريد الإلكتروني</TableHead>
                                <TableHead>رقم الهاتف</TableHead>
                                <TableHead>الحالة</TableHead>
                                <TableHead className="text-right">الإجراءات</TableHead>
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
                                            {rider.status === 'active' ? 'نشط' : 'غير نشط'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="destructive" 
                                                size="icon"
                                                onClick={() => handleDelete(rider.id)}
                                            >
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

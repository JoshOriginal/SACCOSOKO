import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useOrders } from "@/hooks/useOrders";
import { getDemoSeller } from "@/data/demoSeller";
import { products as catalogProducts } from "@/data/products";
import { orderBelongsToSeller } from "@/lib/sellerOrders";
import { Plus, Minus, Pencil, PackageX } from "lucide-react";

interface SellerProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", minimumFractionDigits: 0 }).format(price);

const emptyForm = { name: "", category: "electronics", price: "", stock: "" };

const SellerProducts = () => {
  const seller = getDemoSeller();
  const { orders } = useOrders();
  const { toast } = useToast();

  // Local, demo-only copy of this seller's catalog slice. Changes here are
  // NOT written back to src/data/products.ts or Supabase.
  const [items, setItems] = useState<SellerProduct[]>(() =>
    catalogProducts
      .filter((p) => p.sellerId === seller.id)
      .map((p) => ({ id: p.id, name: p.name, category: p.category, price: p.price, stock: p.stock, image: p.images[0] }))
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const sellerOrders = orders.filter((o) => orderBelongsToSeller(o, seller.id));
  const unitsSold = (productId: number) =>
    sellerOrders.reduce((sum, o) => sum + o.items.filter((i) => i.productId === productId).reduce((s, i) => s + i.quantity, 0), 0);

  const openAddDialog = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (item: SellerProduct) => {
    setEditingId(item.id);
    setForm({ name: item.name, category: item.category, price: String(item.price), stock: String(item.stock) });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.price || !form.stock) {
      toast({ title: "Missing details", description: "Please fill in name, price and stock." });
      return;
    }

    if (editingId !== null) {
      setItems((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, name: form.name, category: form.category, price: Number(form.price), stock: Number(form.stock) } : p
        )
      );
      toast({ title: "Product updated", description: `${form.name} was updated (demo only — not saved to a database).` });
    } else {
      const newId = Math.max(0, ...items.map((p) => p.id), ...catalogProducts.map((p) => p.id)) + 1;
      setItems((prev) => [
        { id: newId, name: form.name, category: form.category, price: Number(form.price), stock: Number(form.stock), image: "/placeholder.svg" },
        ...prev,
      ]);
      toast({ title: "Product added", description: `${form.name} was added (demo only — not saved to a database).` });
    }
    setDialogOpen(false);
  };

  const adjustStock = (id: number, delta: number) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p)));
  };

  const stockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", className: "bg-destructive text-destructive-foreground" };
    if (stock <= 10) return { label: "Low Stock", className: "bg-brand-orange text-white" };
    return { label: "In Stock", className: "bg-primary text-primary-foreground" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage what {seller.businessName} sells on SACCO-SOKO.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={openAddDialog}>
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId !== null ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="p-name">Product Name</Label>
                <Input id="p-name" className="mt-2" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="p-category">Category</Label>
                <select
                  id="p-category"
                  className="w-full mt-2 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm"
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                >
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="sports">Sports</option>
                  <option value="baby">Baby & Kids</option>
                  <option value="beauty">Beauty</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="p-price">Price (KES)</Label>
                  <Input id="p-price" type="number" className="mt-2" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
                </div>
                <div>
                  <Label htmlFor="p-stock">Stock</Label>
                  <Input id="p-stock" type="number" className="mt-2" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-14 w-14 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <PackageX className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">No products yet</p>
              <p className="text-sm text-muted-foreground mt-1">Add your first product to start selling.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b border-border">
                    <th className="py-3 px-4 font-medium">Product</th>
                    <th className="py-3 px-4 font-medium">Category</th>
                    <th className="py-3 px-4 font-medium">Price</th>
                    <th className="py-3 px-4 font-medium">Stock</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Sales</th>
                    <th className="py-3 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const status = stockStatus(item.stock);
                    return (
                      <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3 min-w-[180px]">
                            <img src={item.image} alt={item.name} className="h-10 w-10 rounded-lg object-cover bg-muted shrink-0" />
                            <span className="font-medium text-foreground line-clamp-2">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground capitalize whitespace-nowrap">{item.category}</td>
                        <td className="py-3 px-4 text-foreground whitespace-nowrap">{formatPrice(item.price)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => adjustStock(item.id, -1)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-foreground">{item.stock}</span>
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => adjustStock(item.id, 1)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={status.className}>{status.label}</Badge>
                        </td>
                        <td className="py-3 px-4 text-foreground whitespace-nowrap">{unitsSold(item.id)} sold</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => openEditDialog(item)}>
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">
        Demo data — product changes here are local to this session and are not saved to a database.
      </p>
    </div>
  );
};

export default SellerProducts;

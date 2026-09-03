import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { getDemoSeller } from "@/data/demoSeller";
import { products as catalogProducts } from "@/data/products";
import { Minus, Plus, Boxes, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

interface InventoryRow {
  id: number;
  name: string;
  sku: string;
  stock: number;
  image: string;
}

const makeSku = (categoryCode: string, id: number) => `SKU-${categoryCode}-${String(id).padStart(4, "0")}`;

const CATEGORY_CODES: Record<string, string> = {
  electronics: "ELEC",
  fashion: "FASH",
  sports: "SPRT",
  baby: "BABY",
  beauty: "BEAU",
};

const SellerInventory = () => {
  const seller = getDemoSeller();
  const { toast } = useToast();

  // Local, demo-only inventory snapshot — not persisted to a database.
  const [rows, setRows] = useState<InventoryRow[]>(() =>
    catalogProducts
      .filter((p) => p.sellerId === seller.id)
      .map((p) => ({ id: p.id, name: p.name, sku: makeSku(CATEGORY_CODES[p.category] ?? "GEN", p.id), stock: p.stock, image: p.images[0] }))
  );

  const getStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", icon: XCircle, className: "bg-destructive text-destructive-foreground" };
    if (stock <= 10) return { label: "Low Stock", icon: AlertTriangle, className: "bg-brand-orange text-white" };
    return { label: "In Stock", icon: CheckCircle2, className: "bg-primary text-primary-foreground" };
  };

  const adjustStock = (id: number, delta: number) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, stock: Math.max(0, r.stock + delta) } : r)));
  };

  const restock = (id: number, name: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, stock: r.stock + 20 } : r)));
    toast({ title: "Stock updated", description: `${name} restocked by 20 units (demo only).` });
  };

  const totalUnits = rows.reduce((sum, r) => sum + r.stock, 0);
  const lowStockCount = rows.filter((r) => r.stock > 0 && r.stock <= 10).length;
  const outOfStockCount = rows.filter((r) => r.stock === 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
        <p className="text-muted-foreground mt-1">Stock levels across your product catalog.</p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Units</p>
            <p className="text-xl font-bold text-foreground mt-0.5">{totalUnits}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Low Stock</p>
            <p className="text-xl font-bold text-brand-orange mt-0.5">{lowStockCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Out of Stock</p>
            <p className="text-xl font-bold text-destructive mt-0.5">{outOfStockCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-14 w-14 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <Boxes className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">No inventory to show</p>
              <p className="text-sm text-muted-foreground mt-1">Products you add will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b border-border">
                    <th className="py-3 px-4 font-medium">Product</th>
                    <th className="py-3 px-4 font-medium">SKU</th>
                    <th className="py-3 px-4 font-medium">Current Stock</th>
                    <th className="py-3 px-4 font-medium">Stock Status</th>
                    <th className="py-3 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const status = getStatus(row.stock);
                    return (
                      <tr key={row.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3 min-w-[180px]">
                            <img src={row.image} alt={row.name} className="h-10 w-10 rounded-lg object-cover bg-muted shrink-0" />
                            <span className="font-medium text-foreground line-clamp-2">{row.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{row.sku}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => adjustStock(row.id, -1)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-foreground">{row.stock}</span>
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => adjustStock(row.id, 1)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`${status.className} gap-1`}>
                            <status.icon className="h-3 w-3" />
                            {status.label}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm" onClick={() => restock(row.id, row.name)}>
                            Restock +20
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
        Demo data — stock changes here are local to this session and are not saved to a database.
      </p>
    </div>
  );
};

export default SellerInventory;

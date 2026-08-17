import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Edit2, Trash2, Eye } from 'lucide-react';

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 3500, stock: 45, status: 'Active' },
    { id: 2, name: 'Smart Watch', category: 'Electronics', price: 8900, stock: 12, status: 'Active' },
    { id: 3, name: 'Coffee Maker', category: 'Home', price: 5200, stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Running Shoes', category: 'Fashion', price: 4800, stock: 28, status: 'Active' },
    { id: 5, name: 'Yoga Mat', category: 'Sports', price: 1500, stock: 67, status: 'Active' },
  ]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-secondary flex items-center gap-2">
              <Plus size={18} />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <Input placeholder="Enter product name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Input placeholder="Select category" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (KES)</label>
                <Input type="number" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <Input type="number" placeholder="0" />
              </div>
              <Button className="w-full bg-primary hover:bg-secondary">Add Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr className="text-sm text-gray-600">
                  <th className="text-left py-3 px-6 font-semibold">Product Name</th>
                  <th className="text-left py-3 px-6 font-semibold">Category</th>
                  <th className="text-left py-3 px-6 font-semibold">Price</th>
                  <th className="text-left py-3 px-6 font-semibold">Stock</th>
                  <th className="text-left py-3 px-6 font-semibold">Status</th>
                  <th className="text-left py-3 px-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{product.name}</td>
                    <td className="py-4 px-6 text-gray-700">{product.category}</td>
                    <td className="py-4 px-6 font-medium text-gray-900">KES {product.price.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 20 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock} units
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                          <Eye size={18} className="text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                          <Edit2 size={18} className="text-blue-600" />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm mb-2">Total Products</p>
            <p className="text-3xl font-bold text-gray-900">{products.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm mb-2">In Stock</p>
            <p className="text-3xl font-bold text-green-600">{products.filter(p => p.stock > 0).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm mb-2">Out of Stock</p>
            <p className="text-3xl font-bold text-red-600">{products.filter(p => p.stock === 0).length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

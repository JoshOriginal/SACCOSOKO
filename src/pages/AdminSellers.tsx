import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MoreHorizontal, Plus, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const sellers = [
  {
    id: 1,
    name: 'TechHub Kenya',
    owner: 'John Kamau',
    email: 'john@techhub.ke',
    phone: '+254 700 123 456',
    products: 45,
    sales: '₦2.4M',
    rating: 4.8,
    status: 'active',
    joinDate: '2023-01-15',
    commissionRate: 5,
  },
  {
    id: 2,
    name: 'Fashion Forward',
    owner: 'Sarah Ouma',
    email: 'sarah@fashionforward.ke',
    phone: '+254 700 234 567',
    products: 120,
    sales: '₦1.8M',
    rating: 4.5,
    status: 'active',
    joinDate: '2023-02-20',
    commissionRate: 5,
  },
  {
    id: 3,
    name: 'Home Essentials Ltd',
    owner: 'Peter Kipchoge',
    email: 'peter@homeessentials.ke',
    phone: '+254 700 345 678',
    products: 200,
    sales: '₦3.2M',
    rating: 4.7,
    status: 'active',
    joinDate: '2022-12-10',
    commissionRate: 5,
  },
  {
    id: 4,
    name: 'SportZone Kenya',
    owner: 'Grace Kariuki',
    email: 'grace@sportzone.ke',
    phone: '+254 700 456 789',
    products: 85,
    sales: '₦1.2M',
    rating: 4.3,
    status: 'pending',
    joinDate: '2024-01-05',
    commissionRate: 5,
  },
  {
    id: 5,
    name: 'Electronics Plus',
    owner: 'Michael Omondi',
    email: 'michael@electronicsplus.ke',
    phone: '+254 700 567 890',
    products: 0,
    sales: '₦0',
    rating: 0,
    status: 'suspended',
    joinDate: '2023-06-15',
    commissionRate: 5,
  },
];

export default function AdminSellers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSellers = sellers.filter(seller => {
    const matchSearch = seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || seller.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'suspended':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sellers Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor seller accounts</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-secondary gap-2">
              <Plus size={18} />
              Add Seller
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Seller</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <Input placeholder="Enter business name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                <Input placeholder="Enter owner name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input type="email" placeholder="Enter email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <Input placeholder="Enter phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
                <Input type="number" defaultValue="5" />
              </div>
              <Button className="w-full bg-primary hover:bg-secondary">Add Seller</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Sellers', value: sellers.length, color: 'orange' },
          { label: 'Active', value: sellers.filter(s => s.status === 'active').length, color: 'green' },
          { label: 'Pending', value: sellers.filter(s => s.status === 'pending').length, color: 'yellow' },
          { label: 'Suspended', value: sellers.filter(s => s.status === 'suspended').length, color: 'red' },
        ].map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className={`text-2xl font-bold mt-2 text-${stat.color}-600`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by seller name, owner, or email..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sellers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sellers List ({filteredSellers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Business</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Products</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Sales</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSellers.map((seller) => (
                  <tr key={seller.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{seller.name}</p>
                        <p className="text-xs text-gray-600">{seller.owner}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="text-gray-700">{seller.email}</p>
                        <p className="text-gray-600">{seller.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{seller.products}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{seller.sales}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">
                        {seller.rating > 0 ? `${seller.rating}/5.0` : 'N/A'}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(seller.status)}
                        {getStatusBadge(seller.status)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-2">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{seller.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-600">Owner</p>
                              <p className="font-medium">{seller.owner}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Email</p>
                              <p className="font-medium">{seller.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Phone</p>
                              <p className="font-medium">{seller.phone}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Products</p>
                                <p className="text-xl font-bold">{seller.products}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Sales</p>
                                <p className="text-xl font-bold">{seller.sales}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-2">Commission Rate</p>
                              <div className="flex items-center gap-2">
                                <Input type="number" defaultValue={seller.commissionRate} />
                                <span className="text-gray-600">%</span>
                              </div>
                            </div>
                            <div className="flex gap-2 pt-4">
                              {seller.status !== 'active' && (
                                <Button variant="outline" className="flex-1 text-green-600">
                                  Approve
                                </Button>
                              )}
                              {seller.status === 'active' && (
                                <Button variant="outline" className="flex-1 text-red-600">
                                  Suspend
                                </Button>
                              )}
                              <Button className="flex-1 bg-primary hover:bg-secondary">
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Seller Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle>Seller Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-sm text-gray-600">Total Commission Revenue</p>
              <p className="text-2xl font-bold text-primary mt-2">₦487,500</p>
              <p className="text-xs text-gray-500 mt-1">From 9.75M total sales</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600">Avg Seller Rating</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">4.6/5.0</p>
              <p className="text-xs text-gray-500 mt-1">From 3,400+ reviews</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-sm text-gray-600">Avg Products per Seller</p>
              <p className="text-2xl font-bold text-green-600 mt-2">110</p>
              <p className="text-xs text-gray-500 mt-1">Updated monthly</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

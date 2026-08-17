import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MoreVertical, Printer } from 'lucide-react';

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState([
    { id: 'ORD-001', date: '2024-12-20', customer: 'John Mwangi', email: 'john@email.com', amount: 15500, status: 'Delivered', items: 3 },
    { id: 'ORD-002', date: '2024-12-22', customer: 'Sarah Kipchoge', email: 'sarah@email.com', amount: 8900, status: 'Processing', items: 2 },
    { id: 'ORD-003', date: '2024-12-19', customer: 'David Omondi', email: 'david@email.com', amount: 12300, status: 'Shipped', items: 1 },
    { id: 'ORD-004', date: '2024-12-22', customer: 'Grace Kariuki', email: 'grace@email.com', amount: 6700, status: 'Pending', items: 4 },
    { id: 'ORD-005', date: '2024-12-21', customer: 'Peter Langat', email: 'peter@email.com', amount: 22100, status: 'Delivered', items: 5 },
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.includes(searchTerm) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-purple-100 text-purple-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { label: 'Total Orders', value: orders.length, color: 'text-blue-600' },
    { label: 'Pending', value: orders.filter(o => o.status === 'Pending').length, color: 'text-yellow-600' },
    { label: 'Processing', value: orders.filter(o => o.status === 'Processing').length, color: 'text-purple-600' },
    { label: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length, color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Manage and track all customer orders</p>
        </div>
        <Button className="bg-primary hover:bg-secondary flex items-center gap-2">
          <Printer size={18} />
          Export Orders
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 space-y-4 md:space-y-0 md:flex md:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              placeholder="Search by order ID, customer, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr className="text-sm text-gray-600">
                  <th className="text-left py-3 px-6 font-semibold">Order ID</th>
                  <th className="text-left py-3 px-6 font-semibold">Date</th>
                  <th className="text-left py-3 px-6 font-semibold">Customer</th>
                  <th className="text-left py-3 px-6 font-semibold">Items</th>
                  <th className="text-left py-3 px-6 font-semibold">Amount</th>
                  <th className="text-left py-3 px-6 font-semibold">Status</th>
                  <th className="text-left py-3 px-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{order.id}</td>
                    <td className="py-4 px-6 text-gray-700">{order.date}</td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{order.items}</td>
                    <td className="py-4 px-6 font-medium text-gray-900">KES {order.amount.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                        <MoreVertical size={18} className="text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredOrders.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-gray-500">No orders found matching your search</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

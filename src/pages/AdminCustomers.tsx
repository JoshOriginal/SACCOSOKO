import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Mail, Phone, MapPin, Shield } from 'lucide-react';

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Mwangi', email: 'john@email.com', phone: '+254 700 123 456', location: 'Nairobi', orders: 5, totalSpent: 45000, status: 'Active' },
    { id: 2, name: 'Sarah Kipchoge', email: 'sarah@email.com', phone: '+254 701 234 567', location: 'Mombasa', orders: 3, totalSpent: 28500, status: 'Active' },
    { id: 3, name: 'David Omondi', email: 'david@email.com', phone: '+254 702 345 678', location: 'Kisumu', orders: 8, totalSpent: 89200, status: 'Active' },
    { id: 4, name: 'Grace Kariuki', email: 'grace@email.com', phone: '+254 703 456 789', location: 'Nairobi', orders: 2, totalSpent: 12300, status: 'Inactive' },
    { id: 5, name: 'Peter Langat', email: 'peter@email.com', phone: '+254 704 567 890', location: 'Eldoret', orders: 12, totalSpent: 156700, status: 'Active' },
  ]);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.includes(searchTerm) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage and analyze customer information</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm mb-2">Total Customers</p>
            <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm mb-2">Active Customers</p>
            <p className="text-3xl font-bold text-green-600">{customers.filter(c => c.status === 'Active').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm mb-2">Avg. Orders</p>
            <p className="text-3xl font-bold text-blue-600">
              {(customers.reduce((sum, c) => sum + c.orders, 0) / customers.length).toFixed(1)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-primary">
              KES {(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 1000).toFixed(0)}K
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr className="text-sm text-gray-600">
                  <th className="text-left py-3 px-6 font-semibold">Customer</th>
                  <th className="text-left py-3 px-6 font-semibold">Contact</th>
                  <th className="text-left py-3 px-6 font-semibold">Location</th>
                  <th className="text-left py-3 px-6 font-semibold">Orders</th>
                  <th className="text-left py-3 px-6 font-semibold">Total Spent</th>
                  <th className="text-left py-3 px-6 font-semibold">Status</th>
                  <th className="text-left py-3 px-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{customer.name}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-700 flex items-center gap-1">
                          <Mail size={14} /> {customer.email}
                        </p>
                        <p className="text-sm text-gray-700 flex items-center gap-1">
                          <Phone size={14} /> {customer.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700 flex items-center gap-1">
                      <MapPin size={16} /> {customer.location}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900">{customer.orders}</td>
                    <td className="py-4 px-6 font-medium text-gray-900">KES {customer.totalSpent.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <Badge className={customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Button variant="outline" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={20} />
            Customer Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              <strong>Top Customer:</strong> Peter Langat with KES 156,700 in total purchases and 12 orders
            </p>
            <p className="text-sm text-gray-700">
              <strong>Average Order Value:</strong> KES {(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.orders, 0)).toFixed(0)}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Most Active Region:</strong> Nairobi with 2 active customers
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

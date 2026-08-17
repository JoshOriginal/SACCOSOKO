import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, Calendar } from 'lucide-react';

const monthlySalesData = [
  { month: 'Jan', revenue: 45000, orders: 320, returns: 15 },
  { month: 'Feb', revenue: 52000, orders: 380, returns: 18 },
  { month: 'Mar', revenue: 48000, orders: 350, returns: 16 },
  { month: 'Apr', revenue: 61000, orders: 420, returns: 22 },
  { month: 'May', revenue: 55000, orders: 390, returns: 19 },
  { month: 'Jun', revenue: 67000, orders: 450, returns: 24 },
];

const categoryPerformance = [
  { category: 'Electronics', sales: 125000, growth: 12.5 },
  { category: 'Fashion', sales: 98000, growth: 8.3 },
  { category: 'Home & Garden', sales: 76000, growth: 5.2 },
  { category: 'Sports', sales: 45000, growth: 15.8 },
];

const returnReasons = [
  { reason: 'Damaged on delivery', count: 45, percentage: 35 },
  { reason: 'Not as described', count: 32, percentage: 25 },
  { reason: 'Size/fit issue', count: 28, percentage: 22 },
  { reason: 'Changed mind', count: 15, percentage: 12 },
  { reason: 'Defective product', count: 8, percentage: 6 },
];

export default function AdminReports() {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('month');

  const generateReport = () => {
    // This would trigger report generation and download
    console.log(`Generating ${reportType} report for ${dateRange}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Export</h1>
          <p className="text-gray-600 mt-1">Generate and download business reports</p>
        </div>
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sales">Sales Report</TabsTrigger>
          <TabsTrigger value="returns">Returns Report</TabsTrigger>
          <TabsTrigger value="categories">Category Report</TabsTrigger>
          <TabsTrigger value="custom">Custom Report</TabsTrigger>
        </TabsList>

        {/* Sales Report */}
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sales Performance Report</CardTitle>
                <Button className="bg-primary hover:bg-secondary gap-2">
                  <Download size={18} />
                  Export as PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Input type="date" placeholder="From date" />
                  <Input type="date" placeholder="To date" />
                </div>
                <Button variant="outline">Apply Filter</Button>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Revenue', value: '₦328,000', change: '+12.5%' },
                  { label: 'Total Orders', value: '2,290', change: '+15.3%' },
                  { label: 'Avg Order Value', value: '₦143,150', change: '+5.2%' },
                  { label: 'Returns Rate', value: '4.8%', change: '-2.1%' },
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.change.includes('-') ? 'text-red-600' : 'text-green-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Revenue & Orders Trend</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#F97316"
                      strokeWidth={2}
                      name="Revenue"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="orders"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Top Products */}
              <Card className="border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Top 5 Products This Period</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { name: 'Samsung Galaxy S21', sales: 250, revenue: '₦125,000' },
                      { name: 'Nike Air Max', sales: 380, revenue: '₦95,000' },
                      { name: 'Sofa Set', sales: 120, revenue: '₦78,000' },
                      { name: 'iPad Pro', sales: 180, revenue: '₦72,000' },
                      { name: 'Summer Dress', sales: 420, revenue: '₦65,000' },
                    ].map((product, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{idx + 1}. {product.name}</p>
                          <p className="text-sm text-gray-600">{product.sales} sales</p>
                        </div>
                        <p className="font-bold text-primary">{product.revenue}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Returns Report */}
        <TabsContent value="returns" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Returns & Refunds Report</CardTitle>
                <Button className="bg-primary hover:bg-secondary gap-2">
                  <Download size={18} />
                  Export as CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Total Returns', value: 114, change: '+2.3%', color: 'orange' },
                  { label: 'Return Rate', value: '4.8%', change: '-0.5%', color: 'blue' },
                  { label: 'Refund Amount', value: '₦18,240', change: '+1.2%', color: 'red' },
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className={`text-2xl font-bold mt-2 text-${stat.color}-600`}>{stat.value}</p>
                    <p className="text-sm text-gray-600 mt-1">{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Return Reasons */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Return Reasons Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={returnReasons}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="reason" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Return Reasons Table */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Detailed Breakdown</h3>
                <div className="space-y-2">
                  {returnReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{reason.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{reason.count} returns</p>
                        <p className="text-sm text-gray-600">{reason.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Returns Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="returns"
                      stroke="#EF4444"
                      strokeWidth={2}
                      dot={{ fill: '#EF4444', r: 5 }}
                      name="Returns"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Category Report */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Category Performance Report</CardTitle>
                <Button className="bg-primary hover:bg-secondary gap-2">
                  <Download size={18} />
                  Export as Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Chart */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Sales by Category</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={categoryPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="category" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value) => value.toLocaleString()} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" fill="#F97316" name="Sales (₦)" />
                    <Bar yAxisId="right" dataKey="growth" fill="#3B82F6" name="Growth (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Category Details */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Category Rankings</h3>
                <div className="space-y-2">
                  {categoryPerformance.map((cat, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">#{idx + 1} {cat.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₦{cat.sales.toLocaleString()}</p>
                          <p className={`text-sm ${cat.growth > 10 ? 'text-green-600' : 'text-yellow-600'}`}>
                            {cat.growth > 0 ? '+' : ''}{cat.growth}% growth
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${(cat.sales / categoryPerformance[0].sales) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Custom Report */}
        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales Report</SelectItem>
                      <SelectItem value="inventory">Inventory Report</SelectItem>
                      <SelectItem value="customer">Customer Report</SelectItem>
                      <SelectItem value="seller">Seller Report</SelectItem>
                      <SelectItem value="payment">Payment Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <Input type="date" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <Input type="date" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <div className="flex gap-2">
                  {['PDF', 'Excel', 'CSV'].map((format) => (
                    <Button
                      key={format}
                      variant="outline"
                      className="hover:border-primary hover:text-primary"
                    >
                      {format}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Include Sections</label>
                <div className="space-y-2">
                  {['Summary', 'Detailed Data', 'Charts', 'Trends', 'Recommendations'].map((section) => (
                    <div key={section} className="flex items-center gap-2">
                      <input type="checkbox" id={section} defaultChecked className="rounded" />
                      <label htmlFor={section} className="text-sm text-gray-700">
                        {section}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button size="lg" className="w-full bg-primary hover:bg-secondary gap-2">
                <FileText size={18} />
                Generate Custom Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Generated Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { name: 'Monthly Sales Report - June 2024', date: '2024-07-01', size: '2.4 MB' },
              { name: 'Quarterly Analytics Report', date: '2024-06-30', size: '5.8 MB' },
              { name: 'Returns Analysis Report', date: '2024-06-15', size: '1.2 MB' },
              { name: 'Seller Performance Report', date: '2024-06-01', size: '3.1 MB' },
            ].map((report, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-sm text-gray-600">{report.date} • {report.size}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download size={16} />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

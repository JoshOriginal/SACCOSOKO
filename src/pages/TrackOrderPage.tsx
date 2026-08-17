import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertCircle, MapPin, Phone, Mail } from 'lucide-react';

export default function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderFound, setOrderFound] = useState(false);

  // Sample order data
  const sampleOrder = {
    orderNumber: 'ORD-2024-001234',
    trackingNumber: 'TRK-2024-5678910',
    status: 'In Transit',
    estimatedDelivery: '2024-12-25',
    orderDate: '2024-12-18',
    items: [
      { name: 'Wireless Headphones', quantity: 1, price: 3500 }
    ],
    totalAmount: 3500,
    timeline: [
      { step: 'Order Placed', date: '2024-12-18', time: '10:30 AM', completed: true },
      { step: 'Processing', date: '2024-12-18', time: '2:45 PM', completed: true },
      { step: 'Shipped from Warehouse', date: '2024-12-19', time: '8:00 AM', completed: true },
      { step: 'In Transit', date: '2024-12-23', time: 'Now', completed: true, current: true },
      { step: 'Out for Delivery', date: '2024-12-24', time: '--:-- AM', completed: false },
      { step: 'Delivered', date: '2024-12-25', time: '--:-- AM', completed: false }
    ],
    lastUpdate: 'Package is on the way to your delivery point',
    location: 'Nairobi Hub'
  };

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      setOrderFound(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Enter your tracking number or order number to see the status</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tracking Number
                  </label>
                  <Input
                    placeholder="e.g., TRK-2024-5678910"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or Order Number
                  </label>
                  <Input placeholder="e.g., ORD-2024-001234" />
                </div>
              </div>
              <Button 
                className="w-full bg-primary hover:bg-secondary"
                onClick={handleTrack}
              >
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Status Section */}
        {orderFound && (
          <>
            {/* Status Overview */}
            <Card className="mb-8 border-2 border-green-200">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Order Number</p>
                    <p className="text-lg font-semibold text-gray-900">{sampleOrder.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                    <p className="text-lg font-semibold text-gray-900">{sampleOrder.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Current Status</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500 hover:bg-blue-600">
                        {sampleOrder.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                    <p className="text-lg font-semibold text-gray-900">{sampleOrder.estimatedDelivery}</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 flex items-center gap-2">
                    <Clock size={16} />
                    {sampleOrder.lastUpdate}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Delivery Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {sampleOrder.timeline.map((event, index) => (
                    <div key={index} className="mb-6 relative">
                      <div className="flex gap-4">
                        {/* Timeline marker */}
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            event.completed ? 'bg-green-500' : event.current ? 'bg-blue-500' : 'bg-gray-300'
                          }`}>
                            {event.completed ? '✓' : event.current ? '→' : '○'}
                          </div>
                          {index < sampleOrder.timeline.length - 1 && (
                            <div className={`w-1 h-12 ${event.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          )}
                        </div>

                        {/* Timeline content */}
                        <div className="pb-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-semibold ${event.completed ? 'text-green-600' : event.current ? 'text-blue-600' : 'text-gray-600'}`}>
                              {event.step}
                            </h4>
                            {event.completed && (
                              <CheckCircle2 className="text-green-500" size={20} />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {event.date} at {event.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {sampleOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-3 border-b">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">KES {item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center text-lg">
                  <p className="font-semibold text-gray-900">Total:</p>
                  <p className="font-bold text-primary">KES {sampleOrder.totalAmount.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Location */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin size={20} />
                  Delivery Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Current Location</p>
                  <p className="text-lg font-semibold text-gray-900">{sampleOrder.location}</p>
                  <p className="text-sm text-gray-600 mt-2">Your package is being processed and will be delivered to your specified location</p>
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="text-primary" size={20} />
                      <h4 className="font-semibold text-gray-900">Call Us</h4>
                    </div>
                    <p className="text-sm text-gray-600">+254 (0) 123-456-789</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="text-primary" size={20} />
                      <h4 className="font-semibold text-gray-900">Email Us</h4>
                    </div>
                    <p className="text-sm text-gray-600">support@sacco-soko.ke</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="text-primary" size={20} />
                      <h4 className="font-semibold text-gray-900">Report Issue</h4>
                    </div>
                    <Button variant="outline" className="w-full text-xs mt-1">Contact Support</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Empty State */}
        {!orderFound && (
          <Card className="text-center py-12">
            <CardContent>
              <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 mb-2">Enter your tracking number to get started</p>
              <p className="text-sm text-gray-500">You can find your tracking number in your order confirmation email</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

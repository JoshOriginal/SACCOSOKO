import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Clock, DollarSign, Package, AlertCircle, Zap } from 'lucide-react';

export default function ShippingInfo() {
  const shippingOptions = [
    {
      name: 'Standard Delivery',
      time: '3-5 Business Days',
      cost: 'KES 200-500',
      icon: <Truck size={24} />,
      description: 'Reliable delivery via SACCO-SOKO network',
      details: 'Perfect for non-urgent deliveries across Kenya'
    },
    {
      name: 'Express Delivery',
      time: '1-2 Business Days',
      cost: 'KES 800-1,500',
      icon: <Clock size={24} />,
      description: 'Fast delivery to major cities',
      details: 'Available for Nairobi, Mombasa, and Kisumu'
    },
    {
      name: 'Same-Day Delivery',
      time: '24 Hours',
      cost: 'KES 1,500-3,000',
      icon: <Zap size={24} />,
      description: 'Ultra-fast delivery (Nairobi only)',
      details: 'Order before 2 PM for same-day delivery'
    },
    {
      name: 'Free Shipping',
      time: '3-5 Business Days',
      cost: 'Free',
      icon: <Package size={24} />,
      description: 'Available for orders over KES 5,000',
      details: 'Conditions apply, see terms'
    }
  ];

  const faqs = [
    {
      question: 'How is shipping cost calculated?',
      answer: 'Shipping cost is calculated based on the distance from our warehouse to your delivery address and the weight of your order. Standard shipping is usually KES 200-500 depending on location.'
    },
    {
      question: 'Can I get free shipping?',
      answer: 'Yes! Orders above KES 5,000 qualify for free standard shipping. Express and same-day delivery charges still apply for those options.'
    },
    {
      question: 'Which areas do you deliver to?',
      answer: 'We deliver to all 47 counties in Kenya via SACCO-SOKO\'s extensive network. Delivery times vary by county, with major cities getting faster delivery.'
    },
    {
      question: 'How can I track my package?',
      answer: 'Once your order is dispatched, you\'ll receive a tracking number via email and SMS. Use this number to track your package in real-time on our Track Order page.'
    },
    {
      question: 'What if my package is delayed?',
      answer: 'While rare, delays can happen due to weather or logistics issues. We\'ll keep you updated via SMS. If significantly delayed, contact our support for compensation options.'
    },
    {
      question: 'Do you offer same-day delivery outside Nairobi?',
      answer: 'Same-day delivery is currently available only in Nairobi. Express delivery (1-2 days) is available in other major cities like Mombasa and Kisumu.'
    },
    {
      question: 'Can I change my delivery address?',
      answer: 'You can change your delivery address within 2 hours of placing the order. After that, contact our support team to arrange address changes.'
    },
    {
      question: 'What happens if I\'m not home for delivery?',
      answer: 'Our drivers will try delivering 2-3 times. If unsuccessful, we\'ll hold your package at a nearby SACCO-SOKO stage for pickup.'
    }
  ];

  const deliveryZones = [
    { zone: 'Nairobi Metro', time: '1-2 days', coverage: 'All areas' },
    { zone: 'Coastal Region', time: '2-3 days', coverage: 'Mombasa, Malindi, Diani' },
    { zone: 'Western Region', time: '2-3 days', coverage: 'Kisumu, Nakuru, Eldoret' },
    { zone: 'Rift Valley', time: '3-4 days', coverage: 'Kericho, Naivasha, Bomet' },
    { zone: 'Eastern Region', time: '3-4 days', coverage: 'Meru, Embu, Machakos' },
    { zone: 'Remote Areas', time: '4-5 days', coverage: 'Selected areas' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shipping Information</h1>
          <p className="text-gray-600">Learn about our shipping options, rates, and delivery process</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Shipping Options */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shipping Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shippingOptions.map((option, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-primary">{option.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{option.name}</h3>
                      <Badge className="bg-primary hover:bg-secondary text-xs">
                        {option.time}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{option.description}</p>
                  <p className="text-xs text-gray-600 mb-4">{option.details}</p>
                  <p className="text-2xl font-bold text-primary">{option.cost}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Delivery Zones */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Delivery Coverage & Times</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-green-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Zone</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Delivery Time</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Coverage</th>
                </tr>
              </thead>
              <tbody>
                {deliveryZones.map((zone, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-gray-900 font-medium">{zone.zone}</td>
                    <td className="px-4 py-3 text-gray-700">{zone.time}</td>
                    <td className="px-4 py-3 text-gray-700">{zone.coverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Shipping Process */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How Shipping Works</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Place Your Order</h3>
                    <p className="text-gray-600 text-sm">Select your items and choose a delivery option at checkout</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Order Processing</h3>
                    <p className="text-gray-600 text-sm">We verify payment and prepare your items for shipment (usually 24 hours)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Dispatch & Tracking</h3>
                    <p className="text-gray-600 text-sm">Your package is dispatched and you receive a tracking number via email and SMS</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">In Transit</h3>
                    <p className="text-gray-600 text-sm">Package is shipped via SACCO-SOKO network to your delivery address</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold">
                      5
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Delivery</h3>
                    <p className="text-gray-600 text-sm">Package is delivered to your address. Sign and inspect upon receipt</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Important Notes */}
        <section className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex gap-3 mb-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <h3 className="font-semibold text-blue-900">Important Shipping Notes</h3>
          </div>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Delivery times are estimates and may vary due to unforeseen circumstances</li>
            <li>• Weekend and public holiday deliveries are not available for standard shipping</li>
            <li>• Additional charges may apply for remote or hard-to-reach areas</li>
            <li>• Recipient must be available to sign for the delivery</li>
            <li>• We recommend tracking your package for real-time updates</li>
          </ul>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-4">
                <AccordionTrigger className="font-semibold text-gray-900 hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Support */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Need Help With Your Delivery?</h2>
          <p className="text-white/90 mb-6">Our logistics team is ready to assist you with any shipping questions or concerns.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-white text-primary hover:bg-gray-100">
              Track Your Order
            </Button>
            <Button className="border-2 border-white text-white hover:bg-blue-700">
              Contact Support
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Clock, AlertCircle, Percent, ShieldCheck } from 'lucide-react';

export default function ReturnsRefunds() {
  const returnPolicy = [
    { days: '30', description: 'Days to return items after delivery' },
    { condition: 'Unused', description: 'Items must be in original condition' },
    { time: '7', description: 'Business days for refund processing' },
  ];

  const faqs = [
    {
      question: 'What is your return window?',
      answer: 'We offer a 30-day return window from the date of delivery. This gives you plenty of time to inspect your purchase and decide if you\'d like to return it.'
    },
    {
      question: 'What items can be returned?',
      answer: 'Most items can be returned except for consumable products, custom items, and items that have been used or damaged. Electronics must be unopened and in original packaging.'
    },
    {
      question: 'How do I initiate a return?',
      answer: 'You can request a return through your order page in your account. Select the item you want to return, provide a reason, and we\'ll generate a return label for you.'
    },
    {
      question: 'Who pays for return shipping?',
      answer: 'For defective or incorrect items, we cover the return shipping. For change of mind returns, the customer bears the shipping cost (usually KES 300-500).'
    },
    {
      question: 'How long does refund processing take?',
      answer: 'Once we receive and inspect your returned item, refunds are processed within 7 business days to your original payment method.'
    },
    {
      question: 'Can I exchange an item instead of returning it?',
      answer: 'Yes! If you want to exchange for a different size, color, or product, we can arrange that at no additional cost for most items.'
    },
    {
      question: 'What if my item arrives damaged?',
      answer: 'Contact us immediately with photos of the damage. We\'ll either send a replacement or process a full refund. Return shipping will be on us.'
    },
    {
      question: 'Are there any items that cannot be returned?',
      answer: 'Yes, consumables (food, beverages), custom-made items, underwear, and items without original tags typically cannot be returned for hygiene reasons.'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Request Return',
      description: 'Go to your order and click "Return Item". Select the reason and follow the prompts.'
    },
    {
      number: '2',
      title: 'Get Return Label',
      description: 'We\'ll email you a prepaid return label (for eligible items). Print it and attach to the package.'
    },
    {
      number: '3',
      title: 'Ship Back',
      description: 'Drop off your package at any SACCO-SOKO stage or approved collection point with your return label.'
    },
    {
      number: '4',
      title: 'Verification',
      description: 'Once we receive your item, we\'ll verify its condition and initiate your refund within 24 hours.'
    },
    {
      number: '5',
      title: 'Refund',
      description: 'Your refund will be processed within 7 business days to your original payment method.'
    }
  ];

  const reasons = [
    { icon: <AlertCircle className="text-primary" />, title: 'Wrong Item', description: 'Received a different item than ordered' },
    { icon: <ShieldCheck className="text-primary" />, title: 'Defective', description: 'Item is broken or doesn\'t work' },
    { icon: <Percent className="text-primary" />, title: 'Change of Mind', description: 'Changed your mind about the purchase' },
    { icon: <Clock className="text-primary" />, title: 'Poor Quality', description: 'Item is not as described' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Returns & Refunds Policy</h1>
          <p className="text-gray-600">Your satisfaction is our priority. Learn about our hassle-free return policy.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {returnPolicy.map((item, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6 text-center">
                <p className="text-3xl font-bold text-primary mb-2">{item.days || item.condition || item.time}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Return Process */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Return an Item</h2>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-white font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Return Reasons */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Return Reasons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{reason.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{reason.title}</h3>
                      <p className="text-sm text-gray-600">{reason.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Return Eligibility */}
        <section className="mb-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligible for Returns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-green-700 mb-3">✓ Returnable Items</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Unopened electronics</li>
                <li>✓ Defective products</li>
                <li>✓ Wrong items received</li>
                <li>✓ Items not as described</li>
                <li>✓ Most clothing and accessories</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 mb-3">✗ Non-Returnable Items</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✗ Food and beverages</li>
                <li>✗ Opened electronics</li>
                <li>✗ Custom-made items</li>
                <li>✗ Intimate apparel with tags removed</li>
                <li>✗ Items damaged due to user misuse</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Refund Methods */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Refund Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>💳</span> Original Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Refunds are processed back to your original payment method (credit card, debit card, or M-Pesa) within 7 business days.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🎁</span> Store Credit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Choose to receive a refund as store credit instead. You'll get a 5% bonus on the amount for next purchase.
                </p>
              </CardContent>
            </Card>
          </div>
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

        {/* Contact Support */}
        <section className="bg-green-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
          <p className="text-gray-700 mb-6">
            Our customer support team is here to help with any questions about returns and refunds.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">📧 Email</p>
              <p className="font-semibold text-gray-900">support@sacco-soko.ke</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">📞 Phone</p>
              <p className="font-semibold text-gray-900">+254 (0) 123-456-789</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">💬 Live Chat</p>
              <p className="font-semibold text-gray-900">Available 24/7</p>
            </div>
          </div>
          <Button className="mt-6 bg-primary hover:bg-secondary w-full">
            Start a Return
          </Button>
        </section>
      </div>
    </div>
  );
}

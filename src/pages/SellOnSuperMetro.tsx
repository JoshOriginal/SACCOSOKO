import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, TrendingUp, Target, Award, Zap } from 'lucide-react';

export default function SellOnSokoSacco() {
  const benefits = [
    {
      icon: <Users size={24} className="text-primary" />,
      title: 'Reach Millions',
      description: 'Access SACCO-SOKO\'s extensive customer base across Kenya'
    },
    {
      icon: <TrendingUp size={24} className="text-primary" />,
      title: 'Grow Your Business',
      description: 'Scale your sales with our reliable delivery network'
    },
    {
      icon: <Zap size={24} className="text-primary" />,
      title: 'Easy Integration',
      description: 'Simple tools to manage inventory and orders'
    },
    {
      icon: <Award size={24} className="text-primary" />,
      title: 'Support & Training',
      description: 'Dedicated support team to help you succeed'
    }
  ];

  const fees = [
    { category: 'Platform Fee', amount: '5%', description: 'On each successful sale' },
    { category: 'Shipping', amount: 'Variable', description: 'Competitive rates based on weight/distance' },
    { category: 'Setup', amount: 'Free', description: 'No registration or setup fees' },
  ];

  const requirements = [
    'Valid business registration or national ID',
    'Active bank account for payouts',
    'Phone number and email',
    'Product inventory',
    'Business address and contact details'
  ];

  const steps = [
    {
      number: '1',
      title: 'Create Account',
      description: 'Sign up as a seller and complete your profile'
    },
    {
      number: '2',
      title: 'Verify Business',
      description: 'Submit documentation for verification (1-2 business days)'
    },
    {
      number: '3',
      title: 'List Products',
      description: 'Add your products with descriptions, prices, and images'
    },
    {
      number: '4',
      title: 'Start Selling',
      description: 'Receive orders and manage shipments through our dashboard'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sell on SACCO-SOKO</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Join thousands of sellers and reach millions of customers. Grow your business with Kenya's leading e-commerce marketplace powered by SACCO-SOKO's delivery network.
          </p>
          <Button className="mt-6 bg-white text-primary hover:bg-gray-100 text-base px-8 py-2 h-auto">
            Get Started Now
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Benefits Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Sell With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="mb-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting Started in 4 Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4">
                    {step.number}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-300"></div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing & Fees */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fees.map((fee, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{fee.category}</h3>
                  <p className="text-3xl font-bold text-primary mb-2">{fee.amount}</p>
                  <p className="text-sm text-gray-600">{fee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800">
              <strong>Payouts:</strong> Receive payments weekly to your registered bank account. We handle all transaction processing securely.
            </p>
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Seller Requirements</h2>
          <div className="space-y-3">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                <span className="text-gray-700">{req}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Seller Dashboard */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Seller Dashboard Features</h2>
          <Tabs defaultValue="products" className="bg-white rounded-lg shadow-sm p-6">
            <TabsList>
              <TabsTrigger value="products">Product Management</TabsTrigger>
              <TabsTrigger value="orders">Order Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Manage Your Inventory</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Add and edit products with bulk upload feature</li>
                  <li>✓ Manage stock levels in real-time</li>
                  <li>✓ Set competitive pricing</li>
                  <li>✓ Upload high-quality product images</li>
                  <li>✓ Create detailed product descriptions</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="mt-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Handle Orders Efficiently</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Real-time order notifications</li>
                  <li>✓ Integrated shipping labels</li>
                  <li>✓ Track shipments end-to-end</li>
                  <li>✓ Manage returns and refunds</li>
                  <li>✓ Communicate with customers</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Data-Driven Insights</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Sales performance dashboard</li>
                  <li>✓ Customer insights and behavior tracking</li>
                  <li>✓ Revenue reports and analytics</li>
                  <li>✓ Top-performing products</li>
                  <li>✓ Growth recommendations</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="support" className="mt-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">We're Here to Help</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Dedicated seller support team</li>
                  <li>✓ 24/7 helpline and email support</li>
                  <li>✓ Training resources and tutorials</li>
                  <li>✓ Community forum with other sellers</li>
                  <li>✓ Regular webinars and workshops</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Success Stories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Tech Hub Kenya', growth: '+250%', description: 'Increased sales by 250% in first 6 months' },
              { name: 'Fashion Forward', growth: '+180%', description: 'Expanded customer reach across Kenya' },
              { name: 'Home Essentials', growth: '+320%', description: 'Best performing seller in home category' }
            ].map((story, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold text-primary mb-2">{story.growth}</p>
                  <h3 className="font-semibold text-gray-900 mb-2">{story.name}</h3>
                  <p className="text-sm text-gray-600">{story.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join our community of successful sellers and grow your business today
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-2 h-auto text-base">
              Apply Now
            </Button>
            <Button className="border-2 border-white text-white hover:bg-blue-700 px-8 py-2 h-auto text-base">
              Learn More
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

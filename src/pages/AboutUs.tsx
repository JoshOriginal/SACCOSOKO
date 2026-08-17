import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Globe, Truck, Award, Target, Heart } from 'lucide-react';

export default function AboutUs() {
  const stats = [
    { number: '50K+', label: 'Active Sellers' },
    { number: '2M+', label: 'Happy Customers' },
    { number: '100K+', label: 'Products' },
    { number: '48hrs', label: 'Avg Delivery Time' }
  ];

  const values = [
    {
      icon: <Heart size={24} className="text-primary" />,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction in every decision we make'
    },
    {
      icon: <Award size={24} className="text-primary" />,
      title: 'Quality',
      description: 'Committed to maintaining highest standards in products and service'
    },
    {
      icon: <Truck size={24} className="text-primary" />,
      title: 'Reliability',
      description: 'Dependable delivery and consistent support'
    },
    {
      icon: <Globe size={24} className="text-primary" />,
      title: 'Innovation',
      description: 'Continuously improving our platform and services'
    }
  ];

  const team = [
    { name: 'John Mwangi', role: 'CEO & Co-founder', image: '👨‍💼' },
    { name: 'Sarah Kipchoge', role: 'CTO', image: '👩‍💻' },
    { name: 'David Omondi', role: 'Head of Operations', image: '👨‍⚙️' },
    { name: 'Grace Kariuki', role: 'Head of Customer Service', image: '👩‍🔧' }
  ];

  const milestones = [
    { year: '2020', event: 'SACCO-SOKO founded' },
    { year: '2021', event: 'Launched mobile app' },
    { year: '2022', event: 'Reached 1 million customers' },
    { year: '2023', event: 'Expanded to 40+ counties' },
    { year: '2024', event: 'Launched seller dashboard' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About SACCO-SOKO</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Kenya's leading e-commerce marketplace powered by SACCO-SOKO's trusted delivery network. We connect sellers and shoppers across the country.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                SACCO-SOKO was founded with a vision to revolutionize e-commerce in Kenya by leveraging SACCO-SOKO's extensive delivery network. We recognized a gap in the market for a reliable, customer-focused online marketplace.
              </p>
              <p className="text-gray-700 mb-4">
                Starting with a small team in Nairobi, we've grown to serve millions of customers across the country. Our commitment to quality, reliability, and innovation has made us the platform of choice for both buyers and sellers.
              </p>
              <p className="text-gray-700">
                Today, we continue to expand our services, improve our technology, and create opportunities for entrepreneurs to grow their businesses through our platform.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-blue-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-8xl">🚌</div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2 border-orange-200">
            <CardHeader className="bg-green-50">
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700">
                To democratize e-commerce in Kenya by providing an easy-to-use platform that connects quality sellers with satisfied customers, backed by SACCO-SOKO's reliable delivery infrastructure.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-700">
                To be Africa's most trusted e-commerce marketplace, enabling millions of Kenyans to shop conveniently and empowering entrepreneurs to build thriving businesses.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6 text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Journey</h2>
          <div className="relative">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="mb-8 flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  {idx < milestones.length - 1 && (
                    <div className="w-1 h-16 bg-blue-100 mt-2"></div>
                  )}
                </div>
                <div className="pt-1">
                  <Badge className="bg-primary hover:bg-secondary mb-2">{milestone.year}</Badge>
                  <p className="text-gray-700">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sustainability */}
        <section className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Commitment to Sustainability</h2>
          <p className="text-gray-700 mb-4">
            We're committed to sustainable business practices that benefit our community and environment. Our initiatives include:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <li>✓ Carbon-neutral delivery partnerships</li>
            <li>✓ Eco-friendly packaging programs</li>
            <li>✓ Supporting local communities</li>
            <li>✓ Fair labor practices</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're a buyer looking for quality products or a seller ready to grow your business, we're here to help you succeed.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-primary hover:bg-secondary px-8 py-2 h-auto text-base">
              Shop Now
            </Button>
            <Button variant="outline" className="px-8 py-2 h-auto text-base">
              Become a Seller
            </Button>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-gray-600 mb-2">Email</p>
              <p className="text-gray-900 font-semibold">info@sacco-soko.co.ke</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Phone</p>
              <p className="text-gray-900 font-semibold">+254 (0) 123-456-789</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Address</p>
              <p className="text-gray-900 font-semibold">Nairobi, Kenya</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

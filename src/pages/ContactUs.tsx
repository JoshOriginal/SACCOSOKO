import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const contactMethods = [
    {
      icon: <Phone className="text-primary" size={24} />,
      title: 'Call Us',
      content: '+254 (0) 123-456-789',
      subtext: 'Mon-Fri, 9AM-6PM EAT'
    },
    {
      icon: <Mail className="text-primary" size={24} />,
      title: 'Email Us',
      content: 'support@sacco-soko.co.ke',
      subtext: 'We\'ll respond within 24 hours'
    },
    {
      icon: <MessageSquare className="text-primary" size={24} />,
      title: 'Live Chat',
      content: 'Chat with us',
      subtext: 'Available 24/7'
    },
    {
      icon: <MapPin className="text-primary" size={24} />,
      title: 'Visit Us',
      content: 'SACCO-SOKO HQ',
      subtext: 'Nairobi CBD, Kenya'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600">We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Methods */}
          {contactMethods.map((method, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4">{method.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                <p className="text-gray-900 font-medium mb-1">{method.content}</p>
                <p className="text-sm text-gray-600">{method.subtext}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (Optional)
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254 700 000 000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  ></textarea>
                </div>

                <Button className="w-full bg-primary hover:bg-secondary flex items-center justify-center gap-2">
                  <Send size={18} />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Response Time</h3>
              <p className="text-gray-700 mb-4">
                We aim to respond to all inquiries within 24 hours during business days. For urgent issues, please call our support line.
              </p>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <Clock className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-blue-900 mb-1">Business Hours</p>
                  <p className="text-sm text-blue-800">Monday - Friday: 9:00 AM - 6:00 PM EAT</p>
                  <p className="text-sm text-blue-800">Saturday: 10:00 AM - 4:00 PM EAT</p>
                  <p className="text-sm text-blue-800">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/help" className="text-primary hover:text-blue-700 font-medium">
                    → Help Center
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-primary hover:text-blue-700 font-medium">
                    → FAQs
                  </a>
                </li>
                <li>
                  <a href="/returns-refunds" className="text-primary hover:text-blue-700 font-medium">
                    → Returns & Refunds
                  </a>
                </li>
                <li>
                  <a href="/shipping-info" className="text-primary hover:text-blue-700 font-medium">
                    → Shipping Info
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Social Media</h3>
              <p className="text-gray-700 mb-4">
                Follow us on social media for updates, promotions, and customer stories.
              </p>
              <div className="flex gap-3">
                <a href="#" className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition">
                  f
                </a>
                <a href="#" className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition">
                  𝕏
                </a>
                <a href="#" className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition">
                  📸
                </a>
                <a href="#" className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition">
                  in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Department Info */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Customer Support</h3>
                <p className="text-sm text-gray-600 mb-3">Orders, shipping, returns</p>
                <a href="mailto:support@sacco-soko.co.ke" className="text-primary hover:text-blue-700 font-medium text-sm">
                  support@sacco-soko.co.ke
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Seller Support</h3>
                <p className="text-sm text-gray-600 mb-3">Seller account, dashboard</p>
                <a href="mailto:sellers@sacco-soko.co.ke" className="text-primary hover:text-blue-700 font-medium text-sm">
                  sellers@sacco-soko.co.ke
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Business Inquiries</h3>
                <p className="text-sm text-gray-600 mb-3">Partnerships, corporate</p>
                <a href="mailto:business@sacco-soko.co.ke" className="text-primary hover:text-blue-700 font-medium text-sm">
                  business@sacco-soko.co.ke
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Media & Press</h3>
                <p className="text-sm text-gray-600 mb-3">Press releases, interviews</p>
                <a href="mailto:press@sacco-soko.co.ke" className="text-primary hover:text-blue-700 font-medium text-sm">
                  press@sacco-soko.co.ke
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

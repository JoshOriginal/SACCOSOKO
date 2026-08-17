import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function FAQs() {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = {
    'General': [
      {
        question: 'What is SACCO-SOKO?',
        answer: 'SACCO-SOKO is Kenya\'s leading e-commerce marketplace powered by SACCO-SOKO\'s reliable transport network. We connect buyers and sellers across Kenya with fast, dependable delivery.'
      },
      {
        question: 'Is SACCO-SOKO safe?',
        answer: 'Yes! We use secure payment gateways, buyer protection policies, and verified sellers to ensure a safe shopping experience. All transactions are encrypted.'
      },
      {
        question: 'Which payment methods do you accept?',
        answer: 'We accept M-Pesa, credit cards, debit cards, and bank transfers. All payments are secure and processed through trusted payment providers.'
      }
    ],
    'Orders & Shipping': [
      {
        question: 'How long does delivery take?',
        answer: 'Standard delivery takes 3-5 business days depending on your location. Express delivery (1-2 days) and same-day delivery (Nairobi only) are also available.'
      },
      {
        question: 'Can I change my delivery address?',
        answer: 'You can change your delivery address within 2 hours of placing the order. After that, contact our support team to arrange address changes.'
      },
      {
        question: 'Do you deliver to my area?',
        answer: 'We deliver to all 47 counties in Kenya via SACCO-SOKO\'s network. Enter your location at checkout to see delivery options and costs.'
      },
      {
        question: 'How do I track my order?',
        answer: 'You\'ll receive a tracking number via email and SMS after your order ships. Use this number on our Track Order page to monitor delivery in real-time.'
      }
    ],
    'Returns & Refunds': [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return window from delivery date. Items must be unused and in original packaging. Some items are non-returnable (consumables, custom items, etc.)'
      },
      {
        question: 'How do I return an item?',
        answer: 'Request a return through your order page. We\'ll generate a return label. For defective items, we cover return shipping. For change of mind, customer covers shipping.'
      },
      {
        question: 'How long does refund processing take?',
        answer: 'After we receive and inspect your return, refunds are processed within 7 business days to your original payment method.'
      }
    ],
    'Seller Program': [
      {
        question: 'How do I become a seller?',
        answer: 'Visit our "Sell on SACCO-SOKO" page and click "Apply Now". Complete the registration, verify your business, and start listing products. Verification takes 1-2 business days.'
      },
      {
        question: 'What are the seller fees?',
        answer: 'We charge 5% platform fee on each sale. Shipping costs vary by distance and weight. There\'s no registration or setup fee.'
      },
      {
        question: 'When do I get paid?',
        answer: 'We process payouts weekly to your registered bank account. Payments are made within 7 days of order delivery.'
      },
      {
        question: 'What can I sell?',
        answer: 'You can sell most products except prohibited items (weapons, drugs, counterfeits, etc.). We support Electronics, Fashion, Home & Kitchen, Sports, and more.'
      }
    ],
    'Account & Security': [
      {
        question: 'How do I create an account?',
        answer: 'Click the sign-up button at the top right. Enter your email, phone number, and password. You\'ll receive a verification code via SMS to complete registration.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page. Enter your email and we\'ll send you a reset link.'
      },
      {
        question: 'Is my personal information safe?',
        answer: 'Yes! We use industry-standard encryption and security protocols to protect your data. We never share your information with third parties without consent.'
      }
    ]
  };

  const allFaqs = Object.entries(faqCategories).flatMap(([category, items]) =>
    items.map(item => ({ ...item, category }))
  );

  const filteredFaqs = searchTerm
    ? allFaqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allFaqs;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to common questions about SACCO-SOKO</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* FAQs */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No FAQs found matching your search</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(faqCategories).map(([category, items]) => {
              const categoryFaqs = items.filter(item =>
                !searchTerm ||
                item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchTerm.toLowerCase())
              );

              if (categoryFaqs.length === 0) return null;

              return (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{category}</h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {categoryFaqs.map((faq, idx) => (
                      <AccordionItem key={idx} value={`${category}-${idx}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="font-semibold text-gray-900 hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        )}

        {/* Contact Support */}
        <section className="mt-12 bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Didn't find what you're looking for?</h2>
          <p className="text-white/90 mb-6">Our support team is here to help</p>
          <Button className="bg-white text-primary hover:bg-gray-100">
            Contact Support
          </Button>
        </section>
      </div>
    </div>
  );
}

import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Phone, MessageCircle, Search, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      id: "1",
      category: "Ordering & Delivery",
      question: "How long does delivery take?",
      answer: "Delivery times depend on the route and pickup location. Most deliveries within SACCO-SOKO routes take 24-48 hours. You can track your order in real-time using our tracking system."
    },
    {
      id: "2",
      category: "Ordering & Delivery",
      question: "What are the delivery charges?",
      answer: "Delivery charges vary based on the distance and route. Charges are calculated automatically at checkout and shown before you complete your purchase."
    },
    {
      id: "3",
      category: "Ordering & Delivery",
      question: "Can I change my delivery location?",
      answer: "You can change your delivery location before payment is processed. After payment, contact our support team to request changes."
    },
    {
      id: "4",
      category: "Returns & Refunds",
      question: "What is your return policy?",
      answer: "We offer 30-day returns on most items. Products must be unused and in original packaging. Refunds are processed within 5-7 business days."
    },
    {
      id: "5",
      category: "Returns & Refunds",
      question: "How do I initiate a return?",
      answer: "Go to your Orders page, select the item, and click 'Return Item'. Follow the instructions to initiate the return process."
    },
    {
      id: "6",
      category: "Account & Payment",
      question: "What payment methods are accepted?",
      answer: "We accept M-Pesa, bank transfers, debit/credit cards, and cash on delivery. Select your preferred method at checkout."
    },
    {
      id: "7",
      category: "Account & Payment",
      question: "Is my payment information secure?",
      answer: "Yes, all transactions are encrypted using industry-standard SSL technology. We never store your card details on our servers."
    },
    {
      id: "8",
      category: "Account & Payment",
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page, enter your email, and follow the reset instructions sent to your inbox."
    },
    {
      id: "9",
      category: "Sellers",
      question: "How do I become a seller?",
      answer: "Click 'Become a Seller' in the header, fill out the application form, and our team will review your application within 24-48 hours."
    },
    {
      id: "10",
      category: "Sellers",
      question: "What are the seller fees?",
      answer: "We charge a small commission on each sale (typically 5-10% depending on category). There are no setup or monthly fees."
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30">
        {/* Hero */}
        <div className="bg-gradient-hero-blue text-secondary-foreground">
          <div className="container px-4 py-12 sm:py-16">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Help Center</h1>
            <p className="text-lg text-secondary-foreground/80 mb-8 max-w-2xl">
              Find answers to your questions about ordering, delivery, payments, and more.
            </p>
            
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background/20 border-secondary-foreground/30 text-secondary-foreground placeholder:text-secondary-foreground/60"
              />
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="container px-4 py-12">
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-card rounded-xl border border-border p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-4">Mon-Fri 9am-6pm</p>
              <a href="tel:+254712345678" className="text-primary hover:underline font-medium">
                +254 712 345 678
              </a>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-4">Response within 24 hours</p>
              <a href="mailto:support@sacco-soko.co.ke" className="text-primary hover:underline font-medium">
                support@sacco-soko.co.ke
              </a>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-4">Mon-Fri 10am-5pm</p>
              <Button variant="outline" size="sm">
                Start Chat
              </Button>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mb-8">
              {searchQuery ? `Found ${filteredFaqs.length} results for "${searchQuery}"` : "Browse our most common questions"}
            </p>

            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-3">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="bg-card rounded-lg border border-border overflow-hidden">
                    <AccordionItem value={faq.id} className="border-0">
                      <AccordionTrigger className="hover:no-underline hover:bg-muted/50 px-6 py-4">
                        <div className="flex items-start gap-4 text-left flex-1">
                          <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-primary mb-1">{faq.category}</p>
                            <p className="font-medium text-foreground">{faq.question}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
                <Button 
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>

          {/* Still need help */}
          <div className="mt-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">Still need help?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpCenter;

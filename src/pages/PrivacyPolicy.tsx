import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: `SACCO-SOKO ("we", "our", or "us") operates the SACCO-SOKO website and mobile application (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.

Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Service.

We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy to the Service, and you waive the right to receive specific notice of each such change or modification.`
    },
    {
      id: 'collection',
      title: '2. Information We Collect',
      content: `We collect information in various ways, including:

Personal Information You Provide:
- Account registration information (name, email, phone number, address)
- Payment information (processed securely through payment gateways)
- Order and transaction history
- Communication preferences
- Customer service inquiries and feedback
- Product reviews and ratings

Information Collected Automatically:
- Browser type and version
- IP address and location data
- Device information and identifiers
- Pages visited and time spent on each page
- Referring/exit pages
- Operating system
- Clickstream data
- Cookies and similar tracking technologies`
    },
    {
      id: 'use',
      title: '3. Use of Information',
      content: `We use the information we collect for various purposes:

Service Provision:
- Processing and fulfilling your orders
- Sending order confirmations and updates
- Providing customer support and responding to inquiries
- Facilitating transactions and sending related information

Communication:
- Sending promotional emails and newsletters (with your consent)
- Notifying you about changes to our Service
- Sending security alerts and administrative messages
- Responding to your inquiries

Analytics and Improvement:
- Analyzing usage patterns and trends
- Understanding customer preferences
- Improving our products and services
- Detecting and preventing fraudulent transactions
- Personalizing your experience

Marketing:
- Creating targeted marketing campaigns
- Sending promotional offers (with opt-in consent)
- Conducting surveys and market research
- Testing new features and promotions`
    },
    {
      id: 'sharing',
      title: '4. Disclosure of Information',
      content: `We may disclose your information in the following circumstances:

Third-Party Service Providers:
We share information with vendors and service providers who assist us in operating our website and conducting our business, including:
- Payment processors and financial institutions
- Shipping and logistics partners
- Email service providers
- Analytics services
- Customer service platforms

Legal Requirements:
- Complying with applicable laws and regulations
- Responding to lawful government requests
- Protecting our rights and the rights of others
- Preventing fraud and ensuring security

Business Transactions:
- In connection with a merger, acquisition, or sale of assets
- You will be notified of any change in ownership or control
- We will provide you with choices regarding your personal information

With Your Consent:
- We may disclose information with your explicit consent for specific purposes`
    },
    {
      id: 'security',
      title: '5. Security of Information',
      content: `We implement appropriate technical, administrative, and physical security measures designed to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

Our security measures include:
- SSL/TLS encryption for data transmission
- Secure password authentication
- Regular security audits and assessments
- Access controls and role-based permissions
- Secure data storage and backup procedures
- Employee training on data protection

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security. You acknowledge this inherent risk when providing information.`
    },
    {
      id: 'retention',
      title: '6. Data Retention',
      content: `We retain your personal information for as long as necessary to:
- Provide our services
- Fulfill the purposes outlined in this Privacy Policy
- Comply with legal obligations
- Resolve disputes and enforce agreements

The retention period may vary depending on the type of information and the purpose for which we use it. When information is no longer needed, we securely delete or anonymize it.

For account information, if you request deletion, we will retain necessary information to:
- Complete transactions in progress
- Maintain business records for tax purposes
- Protect against fraud and abuse
- Comply with legal requirements`
    },
    {
      id: 'cookies',
      title: '7. Cookies and Tracking Technologies',
      content: `We use cookies, web beacons, pixels, and similar tracking technologies to:
- Remember your preferences and settings
- Understand how you use our Service
- Deliver targeted advertising
- Prevent fraud and enhance security
- Analyze website performance

Types of Cookies:
- Essential cookies: Required for basic website functionality
- Performance cookies: Help us understand user behavior
- Functional cookies: Remember your preferences
- Targeting cookies: Used for marketing and analytics

You can control cookie settings through your browser. However, disabling cookies may affect the functionality of our Service. Most browsers allow you to refuse cookies or alert you when cookies are being sent. For more information about cookies, visit www.allaboutcookies.org.`
    },
    {
      id: 'children',
      title: '8. Children\'s Privacy',
      content: `Our Service is not directed to individuals under the age of 13 (or the applicable age of digital consent in your jurisdiction). We do not knowingly collect personal information from children under 13.

If we learn that we have collected personal information from a child under 13 without parental consent, we will promptly delete such information and terminate the child's account.

Parents or guardians who believe their child has provided us with personal information should contact us immediately at privacy@sacco-soko.ke.

For users between 13 and 18, we provide additional privacy protections and may require parental consent for certain data uses.`
    },
    {
      id: 'rights',
      title: '9. Your Privacy Rights',
      content: `Depending on your location, you may have the following rights:

Access:
- The right to know what personal information we hold about you
- Request a copy of your data in a portable format

Correction:
- The right to correct inaccurate or incomplete information
- Request updates to your personal data

Deletion:
- The right to request deletion of your personal information
- Subject to legal and operational requirements

Opt-Out:
- The right to opt out of marketing communications
- The right to disable cookies and tracking

Data Portability:
- The right to receive your data in a structured, commonly used format
- The right to transmit data to another service

To exercise these rights, please contact us at privacy@sacco-soko.ke with clear details of your request. We will respond within 30 days.

For EU residents, you have additional rights under the GDPR. For California residents, you have rights under the CCPA.`
    },
    {
      id: 'thirdparty',
      title: '10. Third-Party Links',
      content: `Our Service may contain links to third-party websites, applications, and services that are not operated by SACCO-SOKO. This Privacy Policy applies only to information collected through our Service.

We are not responsible for the privacy practices of third-party websites. We encourage you to review the privacy policies of any third-party services before providing your personal information or using their services.

Third-party links are provided for your convenience and do not constitute an endorsement or affiliation.`
    },
    {
      id: 'contact',
      title: '11. Contact Us',
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:

Email: privacy@sacco-soko.ke
Mailing Address:
SACCO-SOKO
Privacy Department
Nairobi, Kenya

Phone: +254 700 000 000

Data Protection Officer:
dpo@sacco-soko.ke

We will respond to your inquiry within 30 days. If you are not satisfied with our response, you may have the right to lodge a complaint with your local data protection authority.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">Learn how we protect and handle your personal information</p>
          <p className="text-sm text-gray-500 mt-4">Last Updated: December 2024</p>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8 bg-white border-green-100">
          <CardHeader>
            <CardTitle>Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-primary hover:text-blue-700 text-sm py-2 transition"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="space-y-4 mb-12">
          {sections.map((section) => (
            <Card key={section.id} className="bg-white" id={section.id}>
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition"
                onClick={() => toggleSection(section.id)}
              >
                <CardTitle className="text-lg flex items-center justify-between">
                  {section.title}
                  <span className={`transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </CardTitle>
              </CardHeader>
              {expandedSection === section.id && (
                <CardContent>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Important Notice */}
        <Card className="bg-blue-50 border-blue-200 mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="text-blue-600 text-xl">ℹ️</div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Important Notice</h3>
                <p className="text-blue-800 text-sm">
                  If you are a resident of the European Union, California, or other jurisdiction with specific data protection laws, you have additional rights. For more information about your rights and how to exercise them, please contact our Data Protection Officer at dpo@sacco-soko.ke.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Top Button */}
        <div className="flex justify-center mb-12">
          <Button
            onClick={scrollToTop}
            className="bg-primary hover:bg-secondary gap-2"
          >
            <ChevronUp size={18} />
            Back to Top
          </Button>
        </div>

        {/* Footer Section */}
        <Card className="bg-gray-100 border-gray-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-700 mb-4">
                Do you have questions about our privacy practices?
              </p>
              <Button className="bg-primary hover:bg-secondary">
                Contact Our Privacy Team
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                We respond to all privacy inquiries within 30 business days.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

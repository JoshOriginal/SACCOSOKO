import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function TermsOfService() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      id: 'agreement',
      title: '1. Agreement to Terms',
      content: `By accessing and using the SACCO-SOKO website and mobile application (the "Service"), you accept and agree to be bound by and comply with these Terms of Service and our Privacy Policy.

If you do not agree to abide by the above, please do not use this service.

SACCO-SOKO reserves the right to make changes to these terms and conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the Service following the posting of revised terms means that you accept and agree to the changes.`
    },
    {
      id: 'use_license',
      title: '2. Use License',
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on SACCO-SOKO's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:

- Modifying or copying the materials
- Using the materials for any commercial purpose or for any public display
- Attempting to decompile or reverse engineer any software contained on the website
- Removing any copyright or other proprietary notations from the materials
- Transferring the materials to another person or "mirroring" the materials on any other server
- Using the materials for unauthorized purposes or in violation of applicable laws
- Harassing, abusing, or threatening any individuals or organizations
- Submitting false or misleading information
- Engaging in any activity that disrupts the operation of the Service`
    },
    {
      id: 'account',
      title: '3. Account Registration',
      content: `To use certain features of the Service, you must register for an account. You agree to:

- Provide accurate, current, and complete information during registration
- Maintain and promptly update your account information
- Choose a strong password and keep it confidential
- Accept responsibility for all activities under your account
- Notify us immediately of any unauthorized use of your account
- Comply with all applicable laws and regulations

SACCO-SOKO reserves the right to suspend or terminate accounts that violate these terms or engage in prohibited conduct. You may delete your account at any time by contacting customer service.

Users under 18 years old may only use the Service with parental consent and supervision. We recommend parents review these terms with their children.`
    },
    {
      id: 'purchasing',
      title: '4. Product Purchases and Orders',
      content: `Product Descriptions and Pricing:
- We strive to provide accurate product descriptions and pricing
- Prices are subject to change without notice
- We reserve the right to limit quantities and refuse orders
- Product availability is not guaranteed

Order Acceptance:
- Submitting an order constitutes an offer to purchase
- We reserve the right to accept or reject any order
- Order confirmation does not constitute acceptance
- We will notify you of order acceptance or rejection

Payment:
- All payment information must be accurate and complete
- You authorize us to charge the payment method provided
- All transactions are subject to verification
- Payment terms are those specified at checkout
- Prices are in Kenyan Shillings (KES) unless otherwise stated

Errors and Omissions:
- If a product is listed at an incorrect price due to a typographical error, we reserve the right to correct the price or cancel the order
- We are not responsible for third-party payment processing errors`
    },
    {
      id: 'shipping',
      title: '5. Shipping and Delivery',
      content: `Shipping Options:
- We offer multiple shipping options as displayed during checkout
- Delivery times are estimates and not guarantees
- Shipping costs will be calculated and displayed before purchase

Delivery Responsibility:
- Products are at your risk once delivered to the address provided
- You are responsible for inspecting packages upon receipt
- Report any shipping damage within 48 hours of delivery
- We are not liable for lost or stolen packages after delivery

Delivery Issues:
- If a package does not arrive, contact customer service within 14 days
- We will investigate and work with the shipping carrier
- Refunds or replacements will be issued if appropriate
- Delivery delays do not entitle automatic refunds

International Shipping:
- International orders are subject to customs duties and import taxes
- You are responsible for any customs fees
- Delivery times for international orders may be longer`
    },
    {
      id: 'returns',
      title: '6. Returns and Refunds',
      content: `Return Policy:
- Products may be returned within 30 days of delivery
- Items must be unused, unwashed, and in original condition
- Return shipping is free for defective or incorrect items
- Return shipping is paid by customer for other returns (unless specified)

Return Process:
1. Contact customer service with your order number and reason for return
2. Receive return shipping label and instructions
3. Ship the item back to us in original packaging
4. Once received and inspected, your refund will be processed

Refund Timeline:
- Refunds are processed within 7-10 business days of receipt
- Refunds are issued to the original payment method
- Some payment methods may take longer to reflect the credit

Non-Returnable Items:
- Customized or personalized products
- Items damaged due to customer misuse
- Products without original packaging
- Digital products (once downloaded)
- Consumable items (food, beverages, cosmetics)

Defective Products:
- If a product arrives defective, we will provide a full refund or replacement
- Report defects within 14 days of delivery with photographic evidence
- We will cover return shipping for defective items`
    },
    {
      id: 'warranties',
      title: '7. Warranties and Disclaimers',
      content: `Product Warranties:
- Products are sold "as is" unless otherwise stated
- We provide manufacturer warranties where applicable
- Extended warranty options may be available for certain items
- Warranty claims must be submitted within applicable warranty periods

Disclaimer of Warranties:
- The Service and all materials are provided on an "as is" basis
- We make no warranties, express or implied, regarding the Service
- We disclaim all warranties of merchantability and fitness for a particular purpose
- We do not warrant that the Service will be uninterrupted or error-free

Limitation of Liability:
- SACCO-SOKO shall not be liable for any indirect, incidental, special, consequential, or punitive damages
- Our total liability is limited to the amount paid for the product or service
- Some jurisdictions do not allow limitation of liability; applicable laws will apply`
    },
    {
      id: 'prohibited',
      title: '8. Prohibited Conduct',
      content: `You agree not to:

Illegal Activities:
- Violate any applicable laws or regulations
- Engage in fraud, theft, or harassment
- Use the Service for illegal purposes
- Facilitate or encourage illegal activity

Harmful Content:
- Post obscene, offensive, or abusive content
- Harass, threaten, or defame others
- Post hate speech or discriminatory content
- Post content that violates intellectual property rights
- Spread misinformation or false claims

System Abuse:
- Attempt to gain unauthorized access to our systems
- Engage in hacking or phishing
- Introduce viruses or malware
- Engage in denial-of-service attacks
- Scrape or crawl the website without permission

Commercial Abuse:
- Spam or send unsolicited communications
- Engage in multi-level marketing or pyramid schemes
- Resell products without authorization
- Use the Service for competitive purposes without permission

Violation Consequences:
- Violations may result in account suspension or termination
- We may report illegal activity to authorities
- We may pursue civil or criminal action
- You remain liable for any damages caused`
    },
    {
      id: 'intellectual',
      title: '9. Intellectual Property Rights',
      content: `Ownership:
- All content on the Service (text, images, logos, designs) is owned by SACCO-SOKO
- The Service is protected by copyright, trademark, and other intellectual property laws
- You may not reproduce, modify, or distribute content without permission

User Content:
- You retain ownership of content you post to the Service
- By posting content, you grant SACCO-SOKO a non-exclusive, royalty-free license to use it
- You represent that you own or have permission to share all posted content
- You are responsible for any infringement claims related to your content

Trademarks:
- "SACCO-SOKO" and associated logos are trademarks
- You may not use our trademarks without written permission
- Third-party trademarks are property of their respective owners

Copyright Infringement:
- We respect intellectual property rights
- If you believe content infringes your copyright, contact us at legal@sacco-soko.ke
- We will respond to valid DMCA claims within applicable timeframes
- Repeated infringement may result in account termination`
    },
    {
      id: 'user_content',
      title: '10. User Reviews and Content',
      content: `Review Guidelines:
- Reviews must be honest and based on your actual experience
- Reviews should not contain promotional content or spam
- Reviews should not disclose others' private information
- Reviews should not contain hate speech or discriminatory language
- Reviews should relate to the product or service

Content Moderation:
- We reserve the right to remove or edit user content
- Removed content may be hidden without notice
- We are not obligated to explain removal decisions
- You may not post any unlawful or inappropriate content

Compensation Restrictions:
- You must not be compensated for writing reviews
- Incentivizing positive reviews is prohibited
- Soliciting fake reviews violates these terms
- Fraudulent reviews may result in legal action`
    },
    {
      id: 'limitation',
      title: '11. Limitation of Liability',
      content: `Maximum Liability:
- Our total liability for any claim shall not exceed the amount paid for the product or service
- This applies to all claims, whether in contract, tort, or otherwise

Excluded Damages:
- We are not liable for indirect, incidental, special, or consequential damages
- We are not liable for lost profits, lost revenue, or lost data
- We are not liable for business interruption or goodwill
- We are not liable for reputational harm

Applicable to:
- Service disruptions or errors
- Unauthorized access or data breaches
- Third-party actions or content
- Product quality or defects
- Delivery or shipping issues

Note: Some jurisdictions do not allow limitation of liability. Applicable laws will govern to the extent permitted.`
    },
    {
      id: 'indemnification',
      title: '12. Indemnification',
      content: `You agree to defend, indemnify, and hold harmless SACCO-SOKO, its officers, directors, employees, and agents from:
- Any claims, damages, or costs arising from your use of the Service
- Any violation of these terms or applicable laws
- Any infringement of third-party rights by your actions
- Any content you post or actions you take on the Service
- Any breach of representations or warranties

This includes reasonable attorney's fees and court costs. Your indemnification obligation applies regardless of the outcome of any dispute.`
    },
    {
      id: 'termination',
      title: '13. Termination',
      content: `Termination by You:
- You may terminate your account at any time by contacting customer service
- Account deletion is permanent and cannot be undone
- Charges for orders placed before termination remain due

Termination by SACCO-SOKO:
- We may terminate your account for any reason or no reason
- We may terminate immediately if you violate these terms
- We may terminate for unauthorized or illegal activity
- We will not be liable for termination-related damages (within applicable law)

Effects of Termination:
- Your account and all associated data will be deleted
- You lose access to the Service and your account
- Your license to use the Service ends
- These terms continue to apply to past interactions`
    },
    {
      id: 'dispute',
      title: '14. Dispute Resolution',
      content: `Governing Law:
- These terms are governed by the laws of Kenya
- You consent to exclusive jurisdiction in Kenyan courts

Dispute Resolution Process:
- For disputes, first contact customer service in writing
- We will attempt to resolve informally within 30 days
- If unresolved, disputes may proceed to mediation or arbitration
- Class action lawsuits are prohibited

Arbitration:
- Any legal dispute may be resolved through binding arbitration
- Arbitration is conducted by a neutral arbitrator
- Each party bears its own costs unless otherwise ordered
- Arbitration is conducted in English

Exceptions:
- Injunctive relief may be sought in court to prevent harm
- Small claims court suits are permitted
- Intellectual property disputes may be litigated`
    },
    {
      id: 'changes',
      title: '15. Changes to Terms',
      content: `Modification Rights:
- We reserve the right to modify these terms at any time
- Changes are effective upon posting to the website
- We will notify you of material changes via email

Your Responsibility:
- You are responsible for reviewing these terms periodically
- Continued use after changes means you accept the modified terms
- If you do not agree with changes, you must stop using the Service

Material Changes:
- Major changes may be highlighted or require affirmative acceptance
- We will provide notice for significant modifications
- Your rights will not be materially diminished without notice`
    },
    {
      id: 'misc',
      title: '16. Miscellaneous',
      content: `Entire Agreement:
- These terms, along with our Privacy Policy, constitute the entire agreement
- This supersedes all previous communications and agreements
- No other terms, conditions, or representations apply

Severability:
- If any provision is found invalid, that provision is severed
- Remaining provisions continue in full effect
- The severability clause does not affect enforceability

Waiver:
- Failure to enforce any term does not constitute a waiver
- A waiver must be in writing to be effective
- Waiving one breach does not waive future breaches

Third-Party Beneficiaries:
- These terms do not create rights for third parties
- Only you and SACCO-SOKO are parties to this agreement

Contact Information:
Email: support@sacco-soko.ke
Phone: +254 700 000 000
Address: Nairobi, Kenya`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 text-lg">Please read these terms carefully before using our service</p>
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
        <Card className="bg-red-50 border-red-200 mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="text-red-600 text-xl">⚠️</div>
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Important Agreement</h3>
                <p className="text-red-800 text-sm">
                  By using SACCO-SOKO, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use the Service. Continued use of the Service implies your acceptance of any changes to these terms.
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
                Questions about our Terms of Service?
              </p>
              <Button className="bg-primary hover:bg-secondary">
                Contact Us
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                Our legal team will be happy to assist you.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

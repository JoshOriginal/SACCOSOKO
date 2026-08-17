import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Store, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SellerRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    ownerName: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    businessType: "general",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 1500);
  };

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md">
            <div className="bg-card rounded-2xl border border-border shadow-xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h1>
              <p className="text-muted-foreground mb-6">
                Thank you for registering as a seller. Our team will review your application and contact you within 24-48 hours.
              </p>
              <div className="space-y-2 mb-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-foreground"><strong>Store Name:</strong> {formData.storeName}</p>
                <p className="text-sm text-foreground"><strong>Email:</strong> {formData.email}</p>
                <p className="text-sm text-foreground"><strong>Phone:</strong> {formData.phone}</p>
              </div>
              <Link to="/">
                <Button className="w-full">
                  Return to Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Store className="h-5 w-5" />
              <span className="font-medium">Become a SACCO-SOKO Seller</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Start Selling Today
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join thousands of sellers on SACCO-SOKO and reach customers across Kenya through our reliable delivery network.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <p className="text-foreground font-semibold mb-1">Delivery Routes</p>
              <p className="text-sm text-muted-foreground">Reach customers across Kenya</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="text-3xl font-bold text-primary mb-2">24hrs</div>
              <p className="text-foreground font-semibold mb-1">Fast Verification</p>
              <p className="text-sm text-muted-foreground">Quick onboarding process</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="text-3xl font-bold text-primary mb-2">0%</div>
              <p className="text-foreground font-semibold mb-1">Setup Fees</p>
              <p className="text-sm text-muted-foreground">No hidden charges</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl border border-border shadow-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Store Information */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Store Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="storeName" className="text-foreground">
                      Store Name *
                    </Label>
                    <Input
                      id="storeName"
                      name="storeName"
                      placeholder="e.g., Tech Hub Kenya"
                      value={formData.storeName}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessType" className="text-foreground">
                      Business Type *
                    </Label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full mt-2 px-3 py-2 rounded-lg border border-input bg-background text-foreground"
                    >
                      <option value="general">General Merchandise</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion & Clothing</option>
                      <option value="food">Food & Beverages</option>
                      <option value="home">Home & Living</option>
                      <option value="beauty">Beauty & Personal Care</option>
                      <option value="books">Books & Media</option>
                      <option value="sports">Sports & Outdoors</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-foreground">
                      Store Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell customers about your store..."
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-2 min-h-[100px]"
                    />
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Owner Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ownerName" className="text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="ownerName"
                      name="ownerName"
                      placeholder="Your full name"
                      value={formData.ownerName}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                    <div>
                      <Label htmlFor="email" className="text-foreground">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-foreground">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+254 7XX XXX XXX"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-foreground">
                      Location/City *
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., Nairobi, Mombasa, Kisumu"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Submission */}
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  By submitting this form, you agree to our <Link to="#" className="text-primary hover:underline">Seller Terms & Conditions</Link> and <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SellerRegister;

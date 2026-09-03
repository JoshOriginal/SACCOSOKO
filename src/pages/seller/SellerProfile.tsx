import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDemoSeller } from "@/data/demoSeller";
import { getSaccoById } from "@/data/saccos";
import { Store, User, Phone, Mail, Tag, MapPin, CalendarDays, Star, ShieldCheck } from "lucide-react";

const SellerProfile = () => {
  const seller = getDemoSeller();
  const sacco = getSaccoById(seller.saccoId);

  const fields = [
    { icon: Store, label: "Business Name", value: seller.businessName },
    { icon: User, label: "Seller Name", value: seller.ownerName },
    { icon: Phone, label: "Phone", value: seller.phone },
    { icon: Mail, label: "Email", value: seller.email },
    { icon: Tag, label: "Business Category", value: "Electronics" },
    { icon: MapPin, label: "Location", value: seller.location },
    { icon: CalendarDays, label: "Seller Since", value: seller.joinedYear },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Store Profile</h1>
        <p className="text-muted-foreground mt-1">This is demo profile data for the seller portal preview.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-gradient-hero flex items-center justify-center text-primary-foreground font-bold text-2xl shrink-0">
              {seller.businessName.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-foreground truncate">{seller.businessName}</h2>
                {seller.verified && (
                  <Badge className="bg-primary text-primary-foreground gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span className="font-medium text-foreground">{seller.rating}</span>
                <span>· {seller.productsCount} products sold</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-5">
            {fields.map((field) => (
              <div key={field.label} className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-brand-light-green flex items-center justify-center shrink-0">
                  <field.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{field.label}</p>
                  <p className="text-sm font-medium text-foreground truncate">{field.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {sacco && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Delivery Partner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-brand-light-blue flex items-center justify-center shrink-0">
                <Store className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{sacco.name}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{sacco.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{sacco.region}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SellerProfile;

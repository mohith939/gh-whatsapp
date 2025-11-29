import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { CheckCircle, Award, Shield, Truck, Users, Star, Factory, Clock, Package, Zap, Heart, Globe } from "lucide-react";

interface BulkInquiryForm {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  location: string;
  productsRequired: string[];
  quantity: string;
  frequency: string;
  notes: string;
}

const BulkInquiry = () => {
  const form = useForm<BulkInquiryForm>({
    defaultValues: {
      name: "",
      businessName: "",
      phone: "",
      email: "",
      location: "",
      productsRequired: [],
      quantity: "",
      frequency: "",
      notes: "",
    },
  });

  const onSubmit = (data: BulkInquiryForm) => {
    console.log("Bulk Inquiry Form Data:", data);
    // TODO: Integrate with backend or email service
    alert("Thank you for your inquiry! We'll get back to you within 2-4 hours.");
    form.reset();
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {/* Header */}
      <div className="text-center bg-muted/50 rounded-lg p-8 shadow-sm mb-12">
        <h1 className="text-5xl font-serif font-bold text-primary animate-fade-in">Bulk Orders – Partner With Golden Harvest Raw Powders</h1>
        <p className="mt-4 text-lg text-foreground/70 animate-fade-in-delay">
          Premium-Grade Raw Powders for Large-Scale Requirements
        </p>
        <p className="mt-2 text-foreground/70">
          Golden Harvest Raw Powders is a trusted bulk supplier for brands and businesses looking for consistent quality, clean ingredients, and dependable service. We work closely with manufacturers, retailers, and food brands across India to deliver fresh, pure, and ethically sourced raw powders at scale.
        </p>
      </div>

      {/* Trust Signals */}
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8 shadow-sm mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">Trusted by Industry Leaders</h2>
          <p className="text-foreground/70">Certified quality and compliance you can rely on</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center p-4 border-muted bg-background/50">
            <CardContent className="p-4">
              <Award className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">FSSAI Certified</h3>
              <p className="text-sm text-foreground/70">Food Safety Standards Authority of India</p>
            </CardContent>
          </Card>
          <Card className="text-center p-4 border-muted bg-background/50">
            <CardContent className="p-4">
              <Shield className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">Lab Tested</h3>
              <p className="text-sm text-foreground/70">Independent quality testing</p>
            </CardContent>
          </Card>
          <Card className="text-center p-4 border-muted bg-background/50">
            <CardContent className="p-4">
              <Globe className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">Pan-India Delivery</h3>
              <p className="text-sm text-foreground/70">Nationwide shipping network</p>
            </CardContent>
          </Card>
          <Card className="text-center p-4 border-muted bg-background/50">
            <CardContent className="p-4">
              <Users className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">500+ Partners</h3>
              <p className="text-sm text-foreground/70">Trusted by leading brands</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-muted/50 rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-6">Who We Serve</h2>
        <p className="mb-4">Our bulk program is built for businesses that rely on purity and consistency:</p>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>FMCG & D2C Brands</li>
          <li>Cafés, Bakeries & Smoothie Chains</li>
          <li>Ayurvedic & Herbal Manufacturers</li>
          <li>Baby Food Producers</li>
          <li>Ice Cream, Chocolate & Dessert Units</li>
          <li>Distributors & Retail Stores</li>
          <li>Exporters & Private Label Brands</li>
          <li>Amazon / Flipkart Sellers</li>
        </ul>
      </section>

      {/* Our Bulk Product Range */}
      <section className="bg-muted/50 rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-6">Our Bulk Product Range</h2>
        <p className="mb-4">We offer a curated portfolio of 19+ premium raw powders, including:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="text-center p-4 border border-muted rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300 bg-background">
              <img src={product.imageUrl} alt={product.name} className="w-24 h-24 mx-auto mb-2 rounded" />
              <p className="font-semibold">{product.name}</p>
            </div>
          ))}
        </div>
        <p className="mt-4">All powders are processed in hygienic, certified facilities ensuring consistent texture, colour, and freshness.</p>
      </section>

      {/* Bulk Quantities & Packaging */}
      <section className="bg-muted/50 rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-6">Bulk Quantities & Packaging</h2>
        <p className="mb-4">Flexibility for businesses of every size:</p>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>Minimum Order Quantity: 5 KG per product</li>
          <li>Bulk Packs: 1 KG | 5 KG | 10 KG | 25 KG bags</li>
          <li>Custom private label or white-label options available for qualifying volumes</li>
          <li>Contract manufacturing support for specific blends (on request)</li>
        </ul>
      </section>

      {/* Why Businesses Choose Golden Harvest */}
      <section className="bg-muted/50 rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-6">Why Businesses Choose Golden Harvest</h2>
        <p className="mb-4">Built for reliability. Designed for scale.</p>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>Direct farm sourcing ensuring purity</li>
          <li>No colors, preservatives, or additives</li>
          <li>Premium-grade, lab-tested powders</li>
          <li>Stable & continuous supply for recurring orders</li>
          <li>Pan-India delivery with fast dispatch</li>
          <li>Dedicated bulk support team</li>
          <li>Transparent pricing & long-term partnership approach</li>
        </ul>
        <p className="mt-4">Your business receives the same quality that Golden Harvest customers trust every day.</p>
      </section>

      {/* Industries Using Our Powders */}
      <section className="bg-muted/50 rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-6">Industries Using Our Powders</h2>
        <p className="mb-4">Our ingredients support a wide range of applications:</p>
        <ul className="list-disc list-inside space-y-2 text-foreground/80">
          <li>Health & Nutrition Foods</li>
          <li>Functional Food & Beverages</li>
          <li>Bakery, Confectionery & Ice Cream</li>
          <li>Ayurveda, Wellness & Herbal Products</li>
          <li>Baby Food & Porridge Mixes</li>
          <li>Ready-to-Cook / Instant Mix Brands</li>
          <li>Smoothies, Shakes & Meal Prep Brands</li>
        </ul>
      </section>

      {/* Bulk Order Process */}
      <section className="bg-muted/50 rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-6">Bulk Order Process</h2>
        <p className="mb-4">A streamlined, professional workflow:</p>
        <ol className="list-decimal list-inside space-y-2 text-foreground/80">
          <li>Submit your requirement using the form below</li>
          <li>Get a customised quote within 2–4 hours</li>
          <li>Sample dispatch (if required)</li>
          <li>Final confirmation & invoice</li>
          <li>Production & packaging</li>
          <li>Pan-India delivery with tracking</li>
        </ol>
      </section>

      {/* Request a Bulk Quote */}
      <section className="bg-muted/50 rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-6">Request a Bulk Quote</h2>
        <p className="mb-4">Tell us what you need, and our team will prepare a tailored quote.</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessName"
                rules={{ required: "Business/Brand Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business/Brand Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your business name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                rules={{ required: "Phone Number is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email" } }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productsRequired"
                rules={{ required: "Select at least one product" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product(s) Required</FormLabel>
                    <FormControl>
                      <Select onValueChange={(value) => field.onChange([value])} value={field.value?.[0] || ""}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select products" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                rules={{ required: "Quantity is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity Required</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 10 KG Banana Powder" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequency"
                rules={{ required: "Expected Order Frequency is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Order Frequency</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-time">One-time</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any specific requirements or questions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit Inquiry</Button>
          </form>
        </Form>
        <p className="mt-4 text-sm text-foreground/70">Our team responds within 2–4 business hours.</p>
      </section>

      {/* Connect With Us Instantly */}
      <section className="text-center bg-muted/50 rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-6">Connect With Us Instantly</h2>
        <p className="mb-4">WhatsApp for Quick Pricing & Support</p>
        <p className="mb-4">Get immediate assistance and updated wholesale rates.</p>
        <Button asChild>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">Contact via WhatsApp</a>
        </Button>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-muted/50 rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-4xl font-serif font-bold text-primary mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Q1. Do you provide samples for bulk buyers?</h3>
            <p>Yes, samples can be arranged based on product type and requirement.</p>
          </div>
          <div>
            <h3 className="font-semibold">Q2. What is the usual dispatch timeline?</h3>
            <p>Orders are typically dispatched within 24–48 hours, depending on quantity.</p>
          </div>
          <div>
            <h3 className="font-semibold">Q3. Do you offer custom packaging or private-label options?</h3>
            <p>Yes, for larger volumes we offer customised packaging and white-label services.</p>
          </div>
          <div>
            <h3 className="font-semibold">Q4. Are the powders lab tested?</h3>
            <p>Yes. All our products go through standard quality and safety checks.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BulkInquiry;

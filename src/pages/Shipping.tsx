const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-bold text-primary mb-6">Shipping & Returns</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-foreground/70 mb-6">
          At Golden Harvest Raw Powders, we are committed to delivering your farm-fresh products safely and efficiently across India. We offer reliable shipping services with multiple options to suit your needs.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">Shipping Methods</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-primary mb-3">Standard Shipping</h3>
            <p className="text-foreground/70 mb-3">Reliable delivery across India through our trusted courier partners.</p>
            <ul className="text-foreground/70">
              <li>• Delivery: 3-7 business days</li>
              <li>• Cost: ₹50 (Free on orders above ₹500)</li>
              <li>• Tracking: Available</li>
            </ul>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-primary mb-3">Express Shipping</h3>
            <p className="text-foreground/70 mb-3">Faster delivery for urgent orders.</p>
            <ul className="text-foreground/70">
              <li>• Delivery: 1-3 business days</li>
              <li>• Cost: ₹100</li>
              <li>• Tracking: Real-time tracking</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-primary mb-4">Cash on Delivery (COD)</h2>
        <p className="text-foreground/70 mb-4">
          Pay only when you receive your order! We offer COD across India for your convenience and security.
        </p>
        <ul className="list-disc pl-6 mb-6 text-foreground/70">
          <li>Available on all orders below ₹5000</li>
          <li>No additional COD charges</li>
          <li>Pay in cash or card upon delivery</li>
          <li>Secure and convenient payment option</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mb-4">Shipping Costs</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-primary/5">
                <th className="border border-border p-3 text-left">Order Value</th>
                <th className="border border-border p-3 text-left">Standard Shipping</th>
                <th className="border border-border p-3 text-left">Express Shipping</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3">Below ₹500</td>
                <td className="border border-border p-3">₹50</td>
                <td className="border border-border p-3">₹100</td>
              </tr>
              <tr className="bg-primary/5">
                <td className="border border-border p-3">₹500 and above</td>
                <td className="border border-border p-3">FREE</td>
                <td className="border border-border p-3">₹100</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-primary mb-4">Delivery Information</h2>
        <ul className="list-disc pl-6 mb-6 text-foreground/70">
          <li><strong>Processing Time:</strong> Orders are processed within 1-2 business days</li>
          <li><strong>Delivery Areas:</strong> We deliver across all major cities and towns in India</li>
          <li><strong>Remote Areas:</strong> Additional 2-3 days may be required for remote locations</li>
          <li><strong>Business Days:</strong> Monday to Saturday (excluding public holidays)</li>
          <li><strong>Tracking:</strong> You'll receive tracking information via SMS and email</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mb-4">Packaging & Safety</h2>
        <p className="text-foreground/70 mb-4">
          Your health and safety are our top priorities. All products are packaged with care to maintain freshness and quality.
        </p>
        <ul className="list-disc pl-6 mb-6 text-foreground/70">
          <li>Food-grade, airtight packaging</li>
          <li>Protective cushioning for safe transit</li>
          <li>Temperature-controlled shipping where required</li>
          <li>Quality checks before dispatch</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mb-4">Order Tracking</h2>
        <p className="text-foreground/70 mb-6">
          Stay updated on your order status! Once your order ships, you'll receive:
        </p>
        <ul className="list-disc pl-6 mb-6 text-foreground/70">
          <li>SMS with tracking number</li>
          <li>Email with tracking link</li>
          <li>Real-time delivery updates</li>
          <li>Customer support contact for assistance</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mb-4">Shipping Restrictions</h2>
        <p className="text-foreground/70 mb-6">
          While we strive to deliver everywhere, there are some limitations:
        </p>
        <ul className="list-disc pl-6 mb-6 text-foreground/70">
          <li>International shipping not available at this time</li>
          <li>Some remote areas may have extended delivery times</li>
          <li>COD not available in certain high-risk areas</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
        <p className="text-foreground/70">
          Have questions about shipping? We're here to help!
        </p>
        <ul className="list-none pl-0 mt-4 text-foreground/70">
          <li>Email: info@goldenharvest.com</li>
          <li>Phone: +91 9949589098</li>
          <li>WhatsApp: +91 9949589098</li>
        </ul>
      </div>
    </div>
  );
};

export default Shipping;

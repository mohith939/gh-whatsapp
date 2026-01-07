const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-bold text-primary mb-6">Returns</h1>
      <div className="prose prose-lg max-w-none">

        <h2 className="text-2xl font-semibold text-primary mb-4">Returns and Refunds</h2>
        <p className="text-foreground/70 mb-6">
          At Golden Harvest Raw Powders, we want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help with our hassle-free returns and refunds policy.
        </p>

        <h3 className="text-xl font-semibold text-primary mb-4">Eligibility for Returns</h3>
        <ul className="list-disc pl-6 mb-6 text-foreground/70">
          <li>Items must be returned within 30 days of delivery.</li>
          <li>Products must be in their original packaging and unopened.</li>
          <li>Items must be in resalable condition.</li>
          <li>Custom or personalized orders are not eligible for return.</li>
        </ul>

        <h3 className="text-xl font-semibold text-primary mb-4">How to Initiate a Return</h3>
        <ol className="list-decimal pl-6 mb-6 text-foreground/70">
          <li>Contact our customer service team at goldenharvest0648@gmail.com or call +91 9949589098.</li>
          <li>Provide your order number and reason for return.</li>
          <li>We'll provide you with a return authorization number and shipping instructions.</li>
          <li>Pack the item securely and include the return authorization number.</li>
          <li>Ship the item back to us using the provided prepaid label (if applicable).</li>
        </ol>

        <h3 className="text-xl font-semibold text-primary mb-4">Refund Process</h3>
        <p className="text-foreground/70 mb-4">
          Once we receive and inspect your returned item, we'll process your refund within 5-7 business days. Refunds will be issued to the original payment method.
        </p>
        <ul className="list-disc pl-6 mb-6 text-foreground/70">
          <li>Processing time may vary depending on your bank or payment provider.</li>
          <li>You will receive an email confirmation once the refund has been processed.</li>
          <li>Shipping charges are non-refundable unless the return is due to our error.</li>
        </ul>

        <h3 className="text-xl font-semibold text-primary mb-4">Exchanges</h3>
        <p className="text-foreground/70 mb-6">
          We offer exchanges for the same item in a different size or flavor, subject to availability. Please contact us to arrange an exchange.
        </p>

        <h3 className="text-xl font-semibold text-primary mb-4">Damaged or Defective Items</h3>
        <p className="text-foreground/70 mb-6">
          If you receive a damaged or defective item, please contact us immediately. We'll arrange for a replacement or full refund at no cost to you.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
        <p className="text-foreground/70">
          Have questions about returns? We're here to help!
        </p>
        <ul className="list-none pl-0 mt-4 text-foreground/70">
          <li>Email: goldenharvest0648@gmail.com</li>
          <li>Phone: +91 9949589098</li>
          <li>WhatsApp: +91 9949589098</li>
        </ul>
      </div>
    </div>
  );
};

export default Shipping;

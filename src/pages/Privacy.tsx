const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif font-bold text-primary mb-6">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-foreground/70 mb-6">
          At Golden Harvest Raw Powders, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">Information We Collect</h2>
        <ul className="list-disc pl-6 mb-6 text-foreground/70">
          <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and payment information.</li>
          <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and device information.</li>
          <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience and analyze website traffic.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mb-4">How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-6 text-foreground/70">
          <li>To process and fulfill your orders.</li>
          <li>To communicate with you about your orders and our services.</li>
          <li>To improve our website and customer experience.</li>
          <li>To send marketing communications (with your consent).</li>
          <li>To comply with legal obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mb-4">Information Sharing</h2>
        <p className="text-foreground/70 mb-6">
          We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
        </p>
        <ul className="list-disc pl-6 mb-6 text-foreground/70">
          <li>With service providers who help us operate our business (e.g., payment processors, shipping companies).</li>
          <li>When required by law or to protect our rights.</li>
          <li>With your explicit consent.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mb-4">Data Security</h2>
        <p className="text-foreground/70 mb-6">
          We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">Your Rights</h2>
        <ul className="list-disc pl-6 mb-6 text-foreground/70">
          <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
          <li><strong>Correction:</strong> You can update your personal information at any time.</li>
          <li><strong>Deletion:</strong> You can request the deletion of your personal information.</li>
          <li><strong>Opt-out:</strong> You can unsubscribe from marketing communications at any time.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-primary mb-4">Cookies Policy</h2>
        <p className="text-foreground/70 mb-6">
          Our website uses cookies to enhance your experience. You can control cookie settings through your browser preferences. Essential cookies are required for the website to function properly.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">Changes to This Policy</h2>
        <p className="text-foreground/70 mb-6">
          We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date.
        </p>

        <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
        <p className="text-foreground/70">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <ul className="list-none pl-0 mt-4 text-foreground/70">
          <li>Email: info@goldenharvest.com</li>
          <li>Phone: +91 9949589098</li>
          <li>Address: [Your Business Address]</li>
        </ul>

        <p className="text-sm text-foreground/60 mt-8">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Privacy;

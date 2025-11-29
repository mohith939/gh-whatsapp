// Google Analytics 4 implementation for Golden Harvest
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string = 'GA_MEASUREMENT_ID') => {
  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters: Record<string, any> = {}
) => {
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Track product views
export const trackProductView = (product: {
  id: string;
  name: string;
  category?: string;
  price?: number;
}) => {
  trackEvent('view_item', {
    currency: 'INR',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
    }],
  });
};

// Track add to cart
export const trackAddToCart = (product: {
  id: string;
  name: string;
  category?: string;
  price?: number;
  quantity?: number;
}) => {
  trackEvent('add_to_cart', {
    currency: 'INR',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      quantity: product.quantity || 1,
    }],
  });
};

// Track form submissions
export const trackFormSubmission = (formType: string, success: boolean = true) => {
  trackEvent('form_submit', {
    form_type: formType,
    success: success,
  });
};

// Track user engagement
export const trackEngagement = (action: string, category: string, label?: string) => {
  trackEvent('engagement', {
    action,
    category,
    label,
  });
};

// Track conversions
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value,
    currency: 'INR',
  });
};

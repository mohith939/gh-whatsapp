// Security utilities for Golden Harvest Raw Powders
// Frontend security measures to prevent common vulnerabilities

// Input sanitization functions
export const sanitizeName = (input: string): string => {
  // Remove HTML tags, trim whitespace, limit length
  return input.replace(/<[^>]*>/g, '').trim().substring(0, 100);
};

export const sanitizeEmail = (input: string): string => {
  // Basic email sanitization - remove HTML tags and trim
  return input.replace(/<[^>]*>/g, '').trim().toLowerCase();
};

export const sanitizePhone = (input: string): string => {
  // Remove all non-numeric characters except + and spaces
  return input.replace(/[^\d+\s-()]/g, '').trim();
};

export const sanitizeMessage = (input: string): string => {
  // Remove potentially dangerous HTML tags, limit length
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .substring(0, 1000);
};

// Validation functions
export const validateName = (name: string): boolean => {
  const sanitized = sanitizeName(name);
  return sanitized.length >= 2 && sanitized.length <= 100 && /^[a-zA-Z\s'-]+$/.test(sanitized);
};

export const validateEmail = (email: string): boolean => {
  const sanitized = sanitizeEmail(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized) && sanitized.length <= 254;
};

export const validatePhone = (phone: string): boolean => {
  const sanitized = sanitizePhone(phone);
  // Allow international format with + and various separators
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = sanitized.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10 && cleanPhone.length <= 15;
};

export const validateMessage = (message: string): boolean => {
  const sanitized = sanitizeMessage(message);
  return sanitized.length >= 10 && sanitized.length <= 1000;
};

// Rate limiting for form submissions
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  isAllowed(identifier: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];

    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < windowMs);

    if (validAttempts.length >= maxAttempts) {
      return false;
    }

    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const rateLimiter = new RateLimiter();

// CSRF token generation (for forms that will be submitted to server)
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Content Security Policy headers (to be set server-side)
// This is informational for server configuration
export const CSP_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
    "frame-src 'self' https://www.instagram.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ].join('; ')
};

// Security headers for server configuration
export const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
};

// Input validation for forms
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateContactForm = (data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): ValidationResult => {
  const errors: string[] = [];

  if (!validateName(data.name)) {
    errors.push('Name must be 2-100 characters and contain only letters, spaces, hyphens, and apostrophes.');
  }

  if (!validateEmail(data.email)) {
    errors.push('Please enter a valid email address.');
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push('Please enter a valid phone number.');
  }

  if (!data.subject.trim()) {
    errors.push('Subject is required.');
  }

  if (!validateMessage(data.message)) {
    errors.push('Message must be 10-1000 characters long.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateBulkInquiryForm = (data: {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  location: string;
  productsRequired: string[];
  quantity: string;
  frequency: string;
  notes?: string;
}): ValidationResult => {
  const errors: string[] = [];

  if (!validateName(data.name)) {
    errors.push('Name must be 2-100 characters and contain only letters, spaces, hyphens, and apostrophes.');
  }

  if (!validateName(data.businessName)) {
    errors.push('Business name must be 2-100 characters.');
  }

  if (!validatePhone(data.phone)) {
    errors.push('Please enter a valid phone number.');
  }

  if (!validateEmail(data.email)) {
    errors.push('Please enter a valid email address.');
  }

  if (!data.location.trim()) {
    errors.push('Location is required.');
  }

  if (!data.productsRequired.length) {
    errors.push('Please select at least one product.');
  }

  if (!data.quantity.trim()) {
    errors.push('Quantity is required.');
  }

  if (!data.frequency.trim()) {
    errors.push('Frequency is required.');
  }

  if (data.notes && !validateMessage(data.notes)) {
    errors.push('Notes must be less than 1000 characters.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

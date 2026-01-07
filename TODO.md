# SEO Canonical Tag and Indexing Fix

## Plan to Resolve Google Search Console Issue: "Page is not indexed: Alternative page with proper canonical tag"

### Information Gathered
- Index.tsx has canonical meta tag set to https://www.ghrawpowders.com
- Other pages (About, Shop, Contact, ProductDetail, Cart, Checkout, OrderConfirmation, Privacy, Terms, Shipping, Returns, BulkInquiry) are missing canonical tags
- No sitemap.xml or robots.txt present in public folder
- Product data available for generating sitemap URLs

### Plan
- [ ] Create public/sitemap.xml with all site URLs (home, shop, about, contact, bulk-inquiry, privacy, terms, shipping, returns, and all product detail pages)
- [ ] Create public/robots.txt to allow crawling
- [ ] Add canonical meta tags to all pages missing them using consistent URL https://www.ghrawpowders.com
- [ ] Ensure all canonical URLs are consistent across the site

### Dependent Files to be Edited
- public/sitemap.xml (new file)
- public/robots.txt (new file)
- src/pages/About.tsx
- src/pages/Shop.tsx
- src/pages/Contact.tsx
- src/pages/ProductDetail.tsx
- src/pages/Cart.tsx
- src/pages/Checkout.tsx
- src/pages/OrderConfirmation.tsx
- src/pages/Privacy.tsx
- src/pages/Terms.tsx
- src/pages/Shipping.tsx
- src/pages/Returns.tsx
- src/pages/BulkInquiry.tsx

### Followup Steps
- [ ] Submit sitemap.xml to Google Search Console
- [ ] Request re-indexing of pages
- [ ] Monitor Search Console for indexing status
- [ ] Test canonical tags are properly set

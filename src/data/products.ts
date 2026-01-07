import bananaPowderImage from '@/assets/banana-raw-powder.jpg';
import bananaPowderBackImage from '@/assets/banana-raw-powder-back.jpg';
import bananaPowderBowlImage from '@/assets/banana-powder-bowl.jpg';
import bananaPowderBenefitsImage from '@/assets/banana-powder-benefits.jpg';
import beetrootPowderImage from '@/assets/beetroot-powder.jpg';
import moringaPowderImage from '@/assets/moringa-powder.jpg';
import gingerPowderImage from '@/assets/ginger-powder.jpg';
import garlicPowderImage from '@/assets/garlic-powder.jpg';
import carrotPowderImage from '@/assets/carrot-powder.jpg';
import curryLeafPowderImage from '@/assets/curry-leaf-powder.jpg';
import betelLeafPowderImage from '@/assets/betel-leaf-powder.jpg';
import coconutPowderImage from '@/assets/coconut-powder.jpg';
import datesPowderImage from '@/assets/dates-powder.jpg';
import lemonPowderImage from '@/assets/lemon-powder.jpg';
import papayaPowderImage from '@/assets/papaya-powder.jpg';
import tomatoPowderImage from '@/assets/tomato-powder.jpg';
import neemPowderImage from '@/assets/neem-powder.jpg';
import spinachPowderImage from '@/assets/spinach-powder.jpg';
import amlaPowderImage from '@/assets/amla-powder.jpg';

export interface ProductVariant {
  weight: '100g' | '150g' | '500g';
  price: number;
  originalPrice: number;
  discountPercentage: number;
  stock: number;
  sku: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  usage: string;
  dosage: string;
  safety: string;
  storage: string;
  category: string[];
  howItMade: string;
  highlights: string[];
  seoKeywords: {
    primary: string;
    secondary: string[];
    longTail?: string[];
  };
  imageUrl: string;
  imageUrls: string[]; // Array of image URLs for multiple images
  variants: ProductVariant[];
  featured?: boolean;
  reviews?: Review[];
  averageRating?: number; // Calculated average rating from reviews
}

export const products: Product[] = [
  {
    id: "banana-powder",
    name: "Banana Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Fruit Powders"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: [
      "100% natural",
      "No sugar",
      "No preservatives",
      "Fresh banana taste"
    ],
    seoKeywords: {
      primary: "banana powder benefits",
      secondary: ["natural banana powder", "banana powder for health"]
    },
    imageUrl: bananaPowderImage,
    imageUrls: [bananaPowderImage, bananaPowderBackImage, bananaPowderBowlImage, bananaPowderBenefitsImage],
    averageRating: 4.7,
    variants: [
      { weight: '150g', price: 187, originalPrice: 220, discountPercentage: 15, stock: 50, sku: 'BAN-150' },
      { weight: '500g', price: 595, originalPrice: 700, discountPercentage: 15, stock: 30, sku: 'BAN-500' }
    ],
    reviews: [
      {
        id: "rev1",
        author: "Priya Sharma",
        rating: 5,
        comment: "Perfect for my baby's porridge! Natural sweetness and no additives. Highly recommend for parents.",
        date: "2024-01-15",
        verified: true
      },
      {
        id: "rev2",
        author: "Rajesh Kumar",
        rating: 4,
        comment: "Great for smoothies. Good quality and authentic taste. Only wish it was available in larger quantities.",
        date: "2024-01-10",
        verified: true
      },
      {
        id: "rev3",
        author: "Meera Patel",
        rating: 5,
        comment: "Excellent for baking! My cakes turn out perfect with this natural sweetener.",
        date: "2024-01-08",
        verified: true
      }
    ]
  },
  {
    id: "beetroot-powder",
    name: "Beetroot Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Vegetable Powder"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: [
      "No colours",
      "No preservatives",
      "100% pure beetroot"
    ],
    seoKeywords: {
      primary: "beetroot powder benefits",
      secondary: ["natural beetroot powder", "beetroot powder for health"]
    },
    imageUrl: beetrootPowderImage,
    imageUrls: [beetrootPowderImage],
    variants: [
      { weight: '150g', price: 238, originalPrice: 280, discountPercentage: 15, stock: 45, sku: 'BEE-150' },
      { weight: '500g', price: 808, originalPrice: 950, discountPercentage: 15, stock: 25, sku: 'BEE-500' }
    ],
    featured: true
  },
  {
    id: "moringa-powder",
    name: "MORINGA LEAF POWDER",
    shortDescription: "Premium organic moringa leaf powder packed with essential nutrients and antioxidants.",
    longDescription: "Our premium Moringa Leaf Powder is sourced from organically grown moringa trees and processed using traditional methods to preserve all natural nutrients. Known as the 'miracle tree', moringa is rich in vitamins, minerals, and antioxidants that support overall wellness, boost immunity, and provide natural energy. Perfect for those seeking a nutrient-dense superfood to enhance their daily nutrition.",
    benefits: [
      "Rich in vitamins A, C, and E",
      "High in calcium and iron",
      "Supports immune function",
      "Natural energy booster",
      "Antioxidant properties",
      "Supports healthy digestion"
    ],
    usage: "Mix 1 teaspoon with water, juice, or smoothies. Can also be added to soups, curries, or baked goods for an extra nutritional boost.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Leafy Vegetable Powder"],
    howItMade: "Fresh moringa leaves are carefully selected, washed, shade-dried naturally, and finely ground to preserve nutrients.",
    highlights: [
      "Pure leaf powder",
      "No additives",
      "Naturally nutrient-rich"
    ],
    seoKeywords: {
      primary: "moringa powder benefits",
      secondary: ["organic moringa powder", "moringa leaf powder"]
    },
    imageUrl: moringaPowderImage,
    imageUrls: [moringaPowderImage],
    variants: [
      { weight: '100g', price: 1, originalPrice: 1, discountPercentage: 0, stock: 100, sku: 'MOR-100' },
      { weight: '150g', price: 229, originalPrice: 270, discountPercentage: 15, stock: 55, sku: 'MOR-150' },
      { weight: '500g', price: 723, originalPrice: 850, discountPercentage: 15, stock: 30, sku: 'MOR-500' }
    ],
    featured: true
  },
  {
    id: "ginger-powder",
    name: "Ginger Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Vegetable Powder"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: ["Aromatic", "No additives", "Pure ginger"],
    seoKeywords: {
      primary: "ginger powder benefits",
      secondary: ["natural ginger powder", "ginger powder for health"]
    },
    imageUrl: gingerPowderImage,
    imageUrls: [gingerPowderImage],
    variants: [
      { weight: '150g', price: 135, originalPrice: 159, discountPercentage: 15, stock: 60, sku: 'GIN-150' },
      { weight: '500g', price: 400, originalPrice: 471, discountPercentage: 15, stock: 40, sku: 'GIN-500' }
    ]
  },
  {
    id: "garlic-powder",
    name: "Garlic Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Vegetable Powder"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: ["100% garlic", "No preservatives", "Dehydrated naturally"],
    seoKeywords: {
      primary: "garlic powder benefits",
      secondary: ["natural garlic powder", "garlic powder for health"]
    },
    imageUrl: garlicPowderImage,
    imageUrls: [garlicPowderImage],
    variants: [
      { weight: '150g', price: 165, originalPrice: 194, discountPercentage: 15, stock: 55, sku: 'GAR-150' },
      { weight: '500g', price: 490, originalPrice: 576, discountPercentage: 15, stock: 35, sku: 'GAR-500' }
    ]
  },
  {
    id: "amla-powder",
    name: "Amla Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Fruit Powders"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: ["Shade-dried", "Nutrient-dense", "Pure amla"],
    seoKeywords: {
      primary: "amla powder benefits",
      secondary: ["natural amla powder", "amla powder for health"]
    },
    imageUrl: amlaPowderImage,
    imageUrls: [amlaPowderImage],
    variants: [
      { weight: '150g', price: 150, originalPrice: 176, discountPercentage: 15, stock: 50, sku: 'AML-150' },
      { weight: '500g', price: 440, originalPrice: 518, discountPercentage: 15, stock: 30, sku: 'AML-500' }
    ]
  },
  {
    id: "neem-powder",
    name: "Neem Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Leafy Vegetable Powder"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: ["Leaf-only powder", "No fillers", "Pure neem"],
    seoKeywords: {
      primary: "neem powder benefits",
      secondary: ["natural neem powder", "neem powder for health"]
    },
    imageUrl: neemPowderImage,
    imageUrls: [neemPowderImage],
    variants: [
      { weight: '150g', price: 135, originalPrice: 159, discountPercentage: 15, stock: 50, sku: 'NEE-150' },
      { weight: '500g', price: 400, originalPrice: 471, discountPercentage: 15, stock: 30, sku: 'NEE-500' }
    ]
  },
  {
    id: "carrot-powder",
    name: "Carrot Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Vegetable Powder"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: ["Natural orange", "Nutrient-retentive processing", "Pure carrot"],
    seoKeywords: {
      primary: "carrot powder benefits",
      secondary: ["natural carrot powder", "carrot powder for health"]
    },
    imageUrl: carrotPowderImage,
    imageUrls: [carrotPowderImage],
    variants: [
      { weight: '150g', price: 165, originalPrice: 194, discountPercentage: 15, stock: 50, sku: 'CAR-150' },
      { weight: '500g', price: 490, originalPrice: 576, discountPercentage: 15, stock: 30, sku: 'CAR-500' }
    ]
  },
  {
    id: "spinach-powder",
    name: "Spinach Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Leafy Vegetable Powder"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: ["Shade-dried leaves", "Nutrient retention", "Pure spinach"],
    seoKeywords: {
      primary: "spinach powder benefits",
      secondary: ["natural spinach powder", "spinach powder for health"]
    },
    imageUrl: spinachPowderImage,
    imageUrls: [spinachPowderImage],
    variants: [
      { weight: '150g', price: 210, originalPrice: 247, discountPercentage: 15, stock: 45, sku: 'SPI-150' },
      { weight: '500g', price: 630, originalPrice: 741, discountPercentage: 15, stock: 25, sku: 'SPI-500' }
    ]
  },
  {
    id: "curry-leaf-powder",
    name: "Curry Leaf Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Leafy Vegetable Powder"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: ["Dried fresh curry leaves", "Aromatic finish", "Pure kadi patta"],
    seoKeywords: {
      primary: "curry leaf powder benefits",
      secondary: ["natural curry leaf powder", "curry leaf powder for health"]
    },
    imageUrl: curryLeafPowderImage,
    imageUrls: [curryLeafPowderImage],
    variants: [
      { weight: '150g', price: 180, originalPrice: 212, discountPercentage: 15, stock: 50, sku: 'CUR-150' },
      { weight: '500g', price: 530, originalPrice: 624, discountPercentage: 15, stock: 30, sku: 'CUR-500' }
    ]
  },
  {
    id: "betel-leaf-powder",
    name: "Betel Leaf Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Leafy Vegetable Powder"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: [
      "Traditional herb",
      "Natural properties",
      "Pure betel leaf"
    ],
    seoKeywords: {
      primary: "betel leaf powder benefits",
      secondary: ["natural betel leaf powder", "betel leaf powder for health"]
    },
    imageUrl: betelLeafPowderImage,
    imageUrls: [betelLeafPowderImage],
    variants: [
      { weight: '150g', price: 210, originalPrice: 247, discountPercentage: 15, stock: 40, sku: 'BET-150' },
      { weight: '500g', price: 630, originalPrice: 741, discountPercentage: 15, stock: 20, sku: 'BET-500' }
    ]
  },
  {
    id: "coconut-powder",
    name: "Coconut Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Flakes"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: [
      "Desiccated coconut",
      "Natural flavor",
      "Versatile use"
    ],
    seoKeywords: {
      primary: "coconut powder benefits",
      secondary: ["natural coconut powder", "coconut powder for health"]
    },
    imageUrl: coconutPowderImage,
    imageUrls: [coconutPowderImage],
    variants: [
      { weight: '150g', price: 180, originalPrice: 212, discountPercentage: 15, stock: 50, sku: 'COC-150' },
      { weight: '500g', price: 530, originalPrice: 624, discountPercentage: 15, stock: 30, sku: 'COC-500' }
    ]
  },
  {
    id: "dates-powder",
    name: "Dates Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Fruit Powders"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: [
      "Natural sweetener",
      "No added sugar",
      "Rich in nutrients"
    ],
    seoKeywords: {
      primary: "dates powder benefits",
      secondary: ["natural dates powder", "dates powder for health"]
    },
    imageUrl: datesPowderImage,
    imageUrls: [datesPowderImage],
    variants: [
      { weight: '150g', price: 240, originalPrice: 282, discountPercentage: 15, stock: 45, sku: 'DAT-150' },
      { weight: '500g', price: 720, originalPrice: 847, discountPercentage: 15, stock: 25, sku: 'DAT-500' }
    ]
  },
  {
    id: "lemon-powder",
    name: "Lemon Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Digestion", "Wellness"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: [
      "Natural tanginess",
      "Vitamin C source",
      "Versatile flavor"
    ],
    seoKeywords: {
      primary: "lemon powder benefits",
      secondary: ["natural lemon powder", "lemon powder for health"]
    },
    imageUrl: lemonPowderImage,
    imageUrls: [lemonPowderImage],
    variants: [
      { weight: '150g', price: 150, originalPrice: 176, discountPercentage: 15, stock: 50, sku: 'LEM-150' },
      { weight: '500g', price: 440, originalPrice: 518, discountPercentage: 15, stock: 30, sku: 'LEM-500' }
    ]
  },
  {
    id: "papaya-powder",
    name: "Papaya Leaf Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Leafy Vegetable Powder", "Wellness"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: [
      "Immune support",
      "Natural antioxidants",
      "Wellness powder"
    ],
    seoKeywords: {
      primary: "papaya leaf powder benefits",
      secondary: ["natural papaya leaf powder", "papaya leaf powder for health"]
    },
    imageUrl: papayaPowderImage,
    imageUrls: [papayaPowderImage],
    variants: [
      { weight: '150g', price: 210, originalPrice: 247, discountPercentage: 15, stock: 45, sku: 'PAP-150' },
      { weight: '500g', price: 630, originalPrice: 741, discountPercentage: 15, stock: 25, sku: 'PAP-500' }
    ]
  },
  {
    id: "tomato-powder",
    name: "Tomato Powder",
    shortDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    longDescription: "Made from carefully selected fresh raw materials and processed naturally.",
    benefits: [
      "Supports overall health and daily nutrition."
    ],
    usage: "Mix with water, milk, or food.",
    dosage: "½ to 1 teaspoon daily.",
    safety: "Consult a doctor if pregnant or under medication.",
    storage: "Store in a cool, dry place. Keep airtight.",
    category: ["Vegetable Powder"],
    howItMade: "Cleaned, naturally dried, and finely powdered.",
    highlights: [
      "Lycopene rich",
      "Natural color",
      "Versatile cooking"
    ],
    seoKeywords: {
      primary: "tomato powder benefits",
      secondary: ["natural tomato powder", "tomato powder for health"]
    },
    imageUrl: tomatoPowderImage,
    imageUrls: [tomatoPowderImage],
    variants: [
      { weight: '150g', price: 165, originalPrice: 194, discountPercentage: 15, stock: 50, sku: 'TOM-150' },
      { weight: '500g', price: 490, originalPrice: 576, discountPercentage: 15, stock: 30, sku: 'TOM-500' }
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category.includes(category));
};

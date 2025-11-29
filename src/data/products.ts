import bananaPowderImage from '@/assets/banana raw powder.jpg';
import beetrootPowderImage from '@/assets/beetroot raw powder.jpg';
import moringaPowderImage from '@/assets/moringa powder.jpg';
import gingerPowderImage from '@/assets/ginger powder.jpg';
import garlicPowderImage from '@/assets/garlic powder.jpg';
import carrotPowderImage from '@/assets/carrot powders.jpg';
import curryLeafPowderImage from '@/assets/curry leaves powder.jpg';
import betelLeafPowderImage from '@/assets/beteal leaf powder.jpg';
import coconutPowderImage from '@/assets/coconut powder.jpg';
import datesPowderImage from '@/assets/dates powder.jpg';
import guavaPowderImage from '@/assets/guava powder.jpg';
import lemonPowderImage from '@/assets/lemon powder.jpg';
import papayaPowderImage from '@/assets/papaya powder.jpg';
import tomatoPowderImage from '@/assets/tomato powder.jpg';
import neemPowderImage from '@/assets/neem powder.jpg';
import spinachPowderImage from '@/assets/spinach powder.jpg';
import turmericPowderImage from '@/assets/turmeric powder.jpg';
import amlaPowderImage from '@/assets/amla powder.jpg';

export interface ProductVariant {
  weight: '100g' | '250g' | '500g' | '1kg';
  price: number;
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
    name: "BANANA POWDER",
    shortDescription: "A naturally sweet, nutrient-dense powder made from sun-ripened bananas.",
    longDescription: "Golden Harvest Banana Powder is made from fully ripe, chemical-free bananas that are cleaned, sliced, and dehydrated at low temperatures to retain natural sweetness and nutrients. Perfect for babies, adults, athletes, and baking recipes.",
    benefits: [
      "Natural energy booster",
      "Gentle on digestion",
      "Rich in potassium",
      "Helps maintain satiety",
      "Naturally sweet (no sugar added)",
      "Ideal for infants' porridges",
      "Great for baking and desserts"
    ],
    usage: "Mix in milk, water, porridges\nAdd to smoothies and shakes\nUse in baking (cakes, muffins)\nBaby food preparations",
    dosage: "Adults: 2–3 tbsp/day\nChildren: 1–2 tsp/day\nBabies: as advised",
    safety: "Avoid if allergic to bananas\nIntroduce slowly for infants",
    storage: "Store in an airtight container, away from moisture and heat.",
    category: ["Energy", "Daily Nutrition", "Kids Nutrition"],
    howItMade: "Sourcing: Ripe local bananas\nCleaning: RO-washed\nDrying: Low-heat dehydration\nGrinding: Fine micro-grinding\nTesting: Purity & quality\nPacking: Airtight pouches",
    highlights: [
      "100% natural",
      "No sugar",
      "No preservatives",
      "Fresh banana taste"
    ],
    seoKeywords: {
      primary: "banana powder",
      secondary: ["banana powder for kids", "banana powder for smoothies"],
      longTail: ["natural banana powder for babies"]
    },
    imageUrl: bananaPowderImage,
    imageUrls: [bananaPowderImage],
    averageRating: 4.7,
    variants: [
      { weight: '100g', price: 150, stock: 50, sku: 'BAN-100' },
      { weight: '250g', price: 350, stock: 40, sku: 'BAN-250' },
      { weight: '500g', price: 650, stock: 30, sku: 'BAN-500' },
      { weight: '1kg', price: 1200, stock: 20, sku: 'BAN-1KG' }
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
    name: "BEETROOT POWDER",
    shortDescription: "A vibrant, nutrient-rich powder made from fresh farm beetroots.",
    longDescription: "Golden Harvest Beetroot Powder is a clean, preservative-free superfood made from dehydrated beetroots. Known for its natural colour and earthy sweetness, it's great for smoothies, rotis, soups, and natural food coloring.",
    benefits: [
      "Supports stamina",
      "Natural food color",
      "Daily nutrient support",
      "Rich in antioxidants",
      "Boosts natural energy"
    ],
    usage: "Mix in water, smoothies\nAdd to dough, soups, gravies\nUse as natural colour",
    dosage: "1–2 tsp/day",
    safety: "Not advised for oxalate-sensitive individuals.",
    storage: "Cool, dry, airtight.",
    category: ["Energy", "Daily Nutrition"],
    howItMade: "Beetroots → Cleaned → Sliced → Low-temp dried → Ground → Packed",
    highlights: [
      "No colours",
      "No preservatives",
      "100% pure beetroot"
    ],
    seoKeywords: {
      primary: "beetroot powder",
      secondary: ["beet powder", "natural beetroot colour"],
      longTail: ["beetroot powder for smoothies"]
    },
    imageUrl: beetrootPowderImage,
    imageUrls: [beetrootPowderImage],
    variants: [
      { weight: '100g', price: 140, stock: 45, sku: 'BEE-100' },
      { weight: '250g', price: 320, stock: 35, sku: 'BEE-250' },
      { weight: '500g', price: 600, stock: 25, sku: 'BEE-500' },
      { weight: '1kg', price: 1150, stock: 15, sku: 'BEE-1KG' }
    ],
    featured: true
  },
  {
    id: "moringa-powder",
    name: "MORINGA LEAF POWDER",
    shortDescription: "Pure moringa leaves dried and powdered for daily nutrition.",
    longDescription: "Made from organically grown moringa leaves, this powder is rich in micronutrients and antioxidants. Ideal for mixing into juices, water, or curries.",
    benefits: [
      "Nutrient-rich",
      "Supports daily wellness",
      "Helps natural energy",
      "Natural antioxidants",
      "Supports immunity"
    ],
    usage: "Warm water\nSmoothies\nCurries & soups",
    dosage: "1 tsp/day",
    safety: "Avoid during pregnancy without guidance.",
    storage: "Airtight, away from sunlight.",
    category: ["Daily Nutrition", "Wellness"],
    howItMade: "Leaves → Washed → Shade dried → Fine ground → Packed",
    highlights: [
      "Pure leaf powder",
      "No additives",
      "Naturally nutrient-rich"
    ],
    seoKeywords: {
      primary: "moringa powder",
      secondary: ["drumstick leaf powder"],
      longTail: ["moringa for daily nutrition"]
    },
    imageUrl: moringaPowderImage,
    imageUrls: [moringaPowderImage],
    variants: [
      { weight: '100g', price: 180, stock: 55, sku: 'MOR-100' },
      { weight: '250g', price: 420, stock: 45, sku: 'MOR-250' },
      { weight: '500g', price: 800, stock: 30, sku: 'MOR-500' },
      { weight: '1kg', price: 1500, stock: 20, sku: 'MOR-1KG' }
    ],
    featured: true
  },
  {
    id: "ginger-powder",
    name: "Ginger Powder",
    shortDescription: "Sun-dried ginger powder with strong aroma and warmth.",
    longDescription: "Golden Harvest Ginger Powder is made from mature ginger rhizomes that are cleaned, sliced, and sun-dried to preserve their natural oils and pungency. Perfect for teas, cooking, and traditional wellness drinks.",
    benefits: [
      "Supports healthy digestion",
      "Warming spice",
      "Culinary versatility",
      "Traditional wellness ingredient"
    ],
    usage: "Teas, curries, kadha, baking",
    dosage: "½–1 tsp/day",
    safety: "Avoid excessive consumption. Consult doctor if on blood-thinning medication.",
    storage: "Store in an airtight container in a cool, dry place",
    category: ["Digestion", "Wellness"],
    howItMade: "Fresh ginger → Cleaned → Sliced → Sun-dried → Ground → Quality checked → Packed",
    highlights: ["Aromatic", "No additives", "Pure ginger"],
    seoKeywords: {
      primary: "ginger powder",
      secondary: ["dry ginger powder", "sonth powder"]
    },
    imageUrl: gingerPowderImage,
    imageUrls: [gingerPowderImage],
    variants: [
      { weight: '100g', price: 90, stock: 60, sku: 'GIN-100' },
      { weight: '250g', price: 210, stock: 50, sku: 'GIN-250' },
      { weight: '500g', price: 400, stock: 40, sku: 'GIN-500' },
      { weight: '1kg', price: 750, stock: 25, sku: 'GIN-1KG' }
    ]
  },
  {
    id: "garlic-powder",
    name: "Garlic Powder",
    shortDescription: "Aromatic dehydrated garlic powder for instant flavour.",
    longDescription: "Made from fresh garlic cloves that are peeled, sliced, and dehydrated at controlled temperatures. Our garlic powder retains its strong aroma and adds instant flavor to any dish without the hassle of peeling and chopping.",
    benefits: [
      "Strong, authentic flavour",
      "Easy seasoning solution",
      "Long shelf life",
      "Convenient cooking aid"
    ],
    usage: "Gravies, marinades, seasoning",
    dosage: "As per recipe",
    safety: "Safe for daily use. May cause digestive discomfort if consumed in large quantities.",
    storage: "Store in an airtight container away from moisture",
    category: ["Cooking Essentials"],
    howItMade: "Garlic cloves → Peeled → Sliced → Low-temp dried → Ground → Packed",
    highlights: ["100% garlic", "No preservatives", "Dehydrated naturally"],
    seoKeywords: {
      primary: "garlic powder",
      secondary: ["dehydrated garlic", "garlic seasoning powder"]
    },
    imageUrl: garlicPowderImage,
    imageUrls: [garlicPowderImage],
    variants: [
      { weight: '100g', price: 110, stock: 55, sku: 'GAR-100' },
      { weight: '250g', price: 260, stock: 45, sku: 'GAR-250' },
      { weight: '500g', price: 490, stock: 35, sku: 'GAR-500' },
      { weight: '1kg', price: 920, stock: 20, sku: 'GAR-1KG' }
    ]
  },
  {
    id: "turmeric-powder",
    name: "Turmeric Powder",
    shortDescription: "High-colour turmeric from pure desi rhizomes.",
    longDescription: "Our turmeric powder is made from premium quality desi turmeric rhizomes grown in chemical-free farms. The rhizomes are cleaned, boiled, dried, and ground to produce a vibrant yellow powder with high curcumin content.",
    benefits: [
      "Antioxidant-rich",
      "Daily spice for immunity",
      "Excellent for cooking",
      "Natural golden colour"
    ],
    usage: "Curries, milk, kadha, smoothies",
    dosage: "½–1 tsp/day",
    safety: "Safe for daily use. Avoid if allergic. Consult doctor if on specific medications.",
    storage: "Store in an airtight container away from light and moisture",
    category: ["Immunity", "Wellness"],
    howItMade: "Turmeric rhizomes → Cleaned → Boiled → Dried → Ground → Quality tested → Packed",
    highlights: ["No fillers", "High colour", "Pure turmeric"],
    seoKeywords: {
      primary: "turmeric powder",
      secondary: ["haldi powder", "curcumin powder"]
    },
    imageUrl: turmericPowderImage,
    imageUrls: [turmericPowderImage],
    variants: [
      { weight: '100g', price: 80, stock: 70, sku: 'TUR-100' },
      { weight: '250g', price: 190, stock: 60, sku: 'TUR-250' },
      { weight: '500g', price: 360, stock: 50, sku: 'TUR-500' },
      { weight: '1kg', price: 680, stock: 30, sku: 'TUR-1KG' }
    ]
  },
  {
    id: "amla-powder",
    name: "Amla Powder",
    shortDescription: "Indian gooseberry powder — natural Vitamin C source.",
    longDescription: "Golden Harvest Amla Powder is made from fresh Indian gooseberries (amla) that are shade-dried to preserve their natural Vitamin C content. Known for its immunity and hair benefits, this tangy powder is a wellness staple.",
    benefits: [
      "Supports immune function",
      "Hair and skin benefits",
      "Supports digestion",
      "Rich in Vitamin C"
    ],
    usage: "Warm water, smoothies, hair masks",
    dosage: "1 tsp/day",
    safety: "Safe for most people. May interact with diabetes medication. Consult doctor if unsure.",
    storage: "Store in an airtight container in a cool, dry place",
    category: ["Immunity", "Beauty"],
    howItMade: "Fresh amla → Washed → Shade-dried → Ground → Packed",
    highlights: ["Shade-dried", "Nutrient-dense", "Pure amla"],
    seoKeywords: {
      primary: "amla powder",
      secondary: ["gooseberry powder", "Indian gooseberry powder"]
    },
    imageUrl: amlaPowderImage,
    imageUrls: [amlaPowderImage],
    variants: [
      { weight: '100g', price: 100, stock: 50, sku: 'AML-100' },
      { weight: '250g', price: 230, stock: 40, sku: 'AML-250' },
      { weight: '500g', price: 440, stock: 30, sku: 'AML-500' },
      { weight: '1kg', price: 850, stock: 20, sku: 'AML-1KG' }
    ]
  },
  {
    id: "neem-powder",
    name: "Neem Powder",
    shortDescription: "Pure neem leaf powder for skin and wellness.",
    longDescription: "Made from neem leaves sourced from mature neem trees. The leaves are shade-dried and ground into a fine powder, preserving their natural properties. Used traditionally for skin care and wellness support.",
    benefits: [
      "Supports skin health",
      "Natural detox support",
      "Hair pack uses",
      "Traditional wellness herb"
    ],
    usage: "Water rinses, face/hair packs",
    dosage: "½ tsp/day (topical as needed)",
    safety: "Not for internal use during pregnancy. External use generally safe. Patch test before use.",
    storage: "Store in an airtight container away from moisture",
    category: ["Skin", "Wellness"],
    howItMade: "Neem leaves → Cleaned → Shade-dried → Ground → Packed",
    highlights: ["Leaf-only powder", "No fillers", "Pure neem"],
    seoKeywords: {
      primary: "neem powder",
      secondary: ["neem leaf powder", "azadirachta indica powder"]
    },
    imageUrl: neemPowderImage,
    imageUrls: [neemPowderImage],
    variants: [
      { weight: '100g', price: 90, stock: 50, sku: 'NEE-100' },
      { weight: '250g', price: 210, stock: 40, sku: 'NEE-250' },
      { weight: '500g', price: 400, stock: 30, sku: 'NEE-500' },
      { weight: '1kg', price: 750, stock: 20, sku: 'NEE-1KG' }
    ]
  },
  {
    id: "carrot-powder",
    name: "Carrot Powder",
    shortDescription: "Natural carrot powder high in beta-carotene & colour.",
    longDescription: "Made from fresh, sweet carrots that are washed, sliced, and dehydrated at low temperatures to retain their natural beta-carotene and vibrant orange colour. Perfect for baby food, smoothies, and baking.",
    benefits: [
      "Vitamin A precursor",
      "Eye and skin support",
      "Baby-friendly nutrition",
      "Natural orange colour"
    ],
    usage: "Smoothies, soups, baking",
    dosage: "1–2 tsp/day",
    safety: "Safe for all ages including infants. Introduce gradually to babies. May cause orange tint to skin in large amounts (harmless).",
    storage: "Store in an airtight container away from light",
    category: ["Kids Nutrition", "Daily Wellness"],
    howItMade: "Fresh carrots → Washed → Sliced → Low-temp dried → Ground → Packed",
    highlights: ["Natural orange", "Nutrient-retentive processing", "Pure carrot"],
    seoKeywords: {
      primary: "carrot powder",
      secondary: ["dried carrot powder", "carrot powder for babies"]
    },
    imageUrl: carrotPowderImage,
    imageUrls: [carrotPowderImage],
    variants: [
      { weight: '100g', price: 110, stock: 50, sku: 'CAR-100' },
      { weight: '250g', price: 260, stock: 40, sku: 'CAR-250' },
      { weight: '500g', price: 490, stock: 30, sku: 'CAR-500' },
      { weight: '1kg', price: 940, stock: 20, sku: 'CAR-1KG' }
    ]
  },
  {
    id: "spinach-powder",
    name: "Spinach Powder",
    shortDescription: "Nutrient-packed spinach powder for daily iron & greens.",
    longDescription: "Golden Harvest Spinach Powder is made from fresh palak leaves that are thoroughly washed, shade-dried, and ground into a fine powder. A convenient way to add greens to your daily diet.",
    benefits: [
      "Rich in iron",
      "Packed with vitamins",
      "Easy to add to food",
      "Daily greens boost"
    ],
    usage: "Smoothies, dough, soups",
    dosage: "1 tsp/day",
    safety: "Safe for most people. High in oxalates - those with kidney issues should limit intake. Consult doctor if on blood thinners.",
    storage: "Store in an airtight container away from heat and moisture",
    category: ["Daily Nutrition"],
    howItMade: "Fresh spinach → Washed → Shade-dried → Ground → Packed",
    highlights: ["Shade-dried leaves", "Nutrient retention", "Pure spinach"],
    seoKeywords: {
      primary: "spinach powder",
      secondary: ["palak powder", "dried spinach powder"]
    },
    imageUrl: spinachPowderImage,
    imageUrls: [spinachPowderImage],
    variants: [
      { weight: '100g', price: 140, stock: 45, sku: 'SPI-100' },
      { weight: '250g', price: 330, stock: 35, sku: 'SPI-250' },
      { weight: '500g', price: 630, stock: 25, sku: 'SPI-500' },
      { weight: '1kg', price: 1200, stock: 15, sku: 'SPI-1KG' }
    ]
  },
  {
    id: "curry-leaf-powder",
    name: "Curry Leaf Powder",
    shortDescription: "Aromatic curry leaf powder rich in minerals and flavour.",
    longDescription: "Made from fresh curry leaves (kadi patta) that are plucked, cleaned, and shade-dried to preserve their distinctive aroma and nutrients. An essential ingredient in South Indian cooking and wellness practices.",
    benefits: [
      "Supports digestion",
      "Flavour enhancer",
      "Iron source",
      "Traditional cooking ingredient"
    ],
    usage: "Curries, seasoning, rice mixes",
    dosage: "As per recipe",
    safety: "Safe for culinary use. Generally well-tolerated. Start with small amounts to test tolerance.",
    storage: "Store in an airtight container to retain aroma",
    category: ["Daily Nutrition"],
    howItMade: "Fresh curry leaves → Cleaned → Shade-dried → Ground → Packed",
    highlights: ["Dried fresh curry leaves", "Aromatic finish", "Pure kadi patta"],
    seoKeywords: {
      primary: "curry leaf powder",
      secondary: ["kadi patta powder", "dried curry leaves powder"]
    },
    imageUrl: curryLeafPowderImage,
    imageUrls: [curryLeafPowderImage],
    variants: [
      { weight: '100g', price: 120, stock: 50, sku: 'CUR-100' },
      { weight: '250g', price: 280, stock: 40, sku: 'CUR-250' },
      { weight: '500g', price: 530, stock: 30, sku: 'CUR-500' },
      { weight: '1kg', price: 1020, stock: 20, sku: 'CUR-1KG' }
    ]
  },
  {
    id: "betel-leaf-powder",
    name: "Betel Leaf Powder",
    shortDescription: "Traditional betel leaf powder for oral health and wellness.",
    longDescription: "Golden Harvest Betel Leaf Powder is made from fresh betel leaves that are cleaned, dried, and ground into a fine powder. Known for its traditional use in oral care and digestive support, this powder preserves the natural properties of betel leaves.",
    benefits: [
      "Supports oral health",
      "Traditional digestive aid",
      "Natural breath freshener",
      "Supports overall wellness"
    ],
    usage: "Oral care, traditional preparations",
    dosage: "½–1 tsp/day (external use)",
    safety: "External use only. Not for internal consumption. Consult healthcare provider before use.",
    storage: "Store in an airtight container away from moisture",
    category: ["Wellness", "Oral Care"],
    howItMade: "Fresh betel leaves → Cleaned → Dried → Ground → Packed",
    highlights: [
      "Traditional herb",
      "Natural properties",
      "Pure betel leaf"
    ],
    seoKeywords: {
      primary: "betel leaf powder",
      secondary: ["paan leaf powder", "betel powder"]
    },
    imageUrl: betelLeafPowderImage,
    imageUrls: [betelLeafPowderImage],
    variants: [
      { weight: '100g', price: 140, stock: 40, sku: 'BET-100' },
      { weight: '250g', price: 330, stock: 30, sku: 'BET-250' },
      { weight: '500g', price: 630, stock: 20, sku: 'BET-500' },
      { weight: '1kg', price: 1200, stock: 15, sku: 'BET-1KG' }
    ]
  },
  {
    id: "coconut-powder",
    name: "Coconut Powder",
    shortDescription: "Desiccated coconut powder for cooking and baking.",
    longDescription: "Made from fresh coconut meat that is dried and ground into a fine powder. This versatile powder adds a rich, tropical flavor to various dishes and is perfect for both sweet and savory recipes.",
    benefits: [
      "Rich in healthy fats",
      "Natural flavor enhancer",
      "Versatile cooking ingredient",
      "Supports energy needs"
    ],
    usage: "Baking, curries, smoothies, desserts",
    dosage: "As per recipe",
    safety: "Safe for daily use. May cause digestive discomfort in large amounts.",
    storage: "Store in an airtight container in a cool, dry place",
    category: ["Cooking Essentials", "Energy"],
    howItMade: "Fresh coconut → Meat extracted → Dried → Ground → Packed",
    highlights: [
      "Desiccated coconut",
      "Natural flavor",
      "Versatile use"
    ],
    seoKeywords: {
      primary: "coconut powder",
      secondary: ["desiccated coconut powder", "coconut flour"]
    },
    imageUrl: coconutPowderImage,
    imageUrls: [coconutPowderImage],
    variants: [
      { weight: '100g', price: 120, stock: 50, sku: 'COC-100' },
      { weight: '250g', price: 280, stock: 40, sku: 'COC-250' },
      { weight: '500g', price: 530, stock: 30, sku: 'COC-500' },
      { weight: '1kg', price: 1020, stock: 20, sku: 'COC-1KG' }
    ]
  },
  {
    id: "dates-powder",
    name: "Dates Powder",
    shortDescription: "Natural sweetener powder from sun-dried dates.",
    longDescription: "Golden Harvest Dates Powder is made from premium quality dates that are pitted, dried, and ground into a fine powder. This natural sweetener is rich in natural sugars and minerals, perfect for healthy baking and sweetening.",
    benefits: [
      "Natural sweetener",
      "Rich in minerals",
      "Energy booster",
      "Healthy baking alternative"
    ],
    usage: "Baking, smoothies, desserts, energy bars",
    dosage: "1–2 tbsp/day",
    safety: "Safe for most people. May cause digestive discomfort if consumed in large amounts. High in natural sugars.",
    storage: "Store in an airtight container away from moisture",
    category: ["Energy", "Cooking Essentials"],
    howItMade: "Fresh dates → Pitted → Dried → Ground → Packed",
    highlights: [
      "Natural sweetener",
      "No added sugar",
      "Rich in nutrients"
    ],
    seoKeywords: {
      primary: "dates powder",
      secondary: ["date powder", "dried dates powder"]
    },
    imageUrl: datesPowderImage,
    imageUrls: [datesPowderImage],
    variants: [
      { weight: '100g', price: 160, stock: 45, sku: 'DAT-100' },
      { weight: '250g', price: 380, stock: 35, sku: 'DAT-250' },
      { weight: '500g', price: 720, stock: 25, sku: 'DAT-500' },
      { weight: '1kg', price: 1380, stock: 15, sku: 'DAT-1KG' }
    ]
  },
  {
    id: "guava-powder",
    name: "Guava Powder",
    shortDescription: "Nutrient-rich guava powder for daily wellness.",
    longDescription: "Made from fresh guava fruit that is cleaned, dried, and ground into a fine powder. Rich in vitamin C and fiber, this powder is an excellent addition to smoothies and wellness drinks.",
    benefits: [
      "High in vitamin C",
      "Rich in fiber",
      "Supports immune function",
      "Natural energy source"
    ],
    usage: "Smoothies, juices, wellness drinks",
    dosage: "1–2 tsp/day",
    safety: "Safe for most people. May cause digestive discomfort if consumed in large amounts.",
    storage: "Store in an airtight container in a cool, dry place",
    category: ["Immunity", "Daily Nutrition"],
    howItMade: "Fresh guava → Cleaned → Dried → Ground → Packed",
    highlights: [
      "Vitamin C rich",
      "Natural fiber",
      "Immune support"
    ],
    seoKeywords: {
      primary: "guava powder",
      secondary: ["dried guava powder", "guava fruit powder"]
    },
    imageUrl: guavaPowderImage,
    imageUrls: [guavaPowderImage],
    variants: [
      { weight: '100g', price: 130, stock: 40, sku: 'GUA-100' },
      { weight: '250g', price: 300, stock: 30, sku: 'GUA-250' },
      { weight: '500g', price: 570, stock: 20, sku: 'GUA-500' },
      { weight: '1kg', price: 1100, stock: 15, sku: 'GUA-1KG' }
    ]
  },
  {
    id: "lemon-powder",
    name: "Lemon Powder",
    shortDescription: "Tangy lemon powder for flavor and wellness.",
    longDescription: "Golden Harvest Lemon Powder is made from fresh lemons that are dried and ground into a fine powder. This versatile powder adds a bright, tangy flavor to dishes and drinks while providing natural wellness benefits.",
    benefits: [
      "Natural flavor enhancer",
      "Supports digestion",
      "Rich in vitamin C",
      "Antioxidant properties"
    ],
    usage: "Drinks, marinades, baking, teas",
    dosage: "½–1 tsp/day",
    safety: "Safe for daily use. May cause digestive discomfort in large amounts. Avoid if allergic to citrus.",
    storage: "Store in an airtight container away from moisture",
    category: ["Digestion", "Wellness"],
    howItMade: "Fresh lemons → Dried → Ground → Packed",
    highlights: [
      "Natural tanginess",
      "Vitamin C source",
      "Versatile flavor"
    ],
    seoKeywords: {
      primary: "lemon powder",
      secondary: ["dried lemon powder", "lemon zest powder"]
    },
    imageUrl: lemonPowderImage,
    imageUrls: [lemonPowderImage],
    variants: [
      { weight: '100g', price: 100, stock: 50, sku: 'LEM-100' },
      { weight: '250g', price: 230, stock: 40, sku: 'LEM-250' },
      { weight: '500g', price: 440, stock: 30, sku: 'LEM-500' },
      { weight: '1kg', price: 850, stock: 20, sku: 'LEM-1KG' }
    ]
  },
  {
    id: "papaya-powder",
    name: "Papaya Powder",
    shortDescription: "Digestive enzyme-rich papaya powder for wellness.",
    longDescription: "Made from fresh papaya fruit that is dried and ground into a fine powder. Rich in papain enzyme, this powder supports digestion and provides natural wellness benefits.",
    benefits: [
      "Supports digestion",
      "Rich in papain enzyme",
      "Natural wellness aid",
      "Supports overall health"
    ],
    usage: "Smoothies, wellness drinks, marinades",
    dosage: "½–1 tsp/day",
    safety: "Safe for most people. May cause digestive discomfort if consumed in large amounts. Avoid during pregnancy.",
    storage: "Store in an airtight container in a cool, dry place",
    category: ["Digestion", "Wellness"],
    howItMade: "Fresh papaya → Dried → Ground → Packed",
    highlights: [
      "Digestive enzyme rich",
      "Natural papain",
      "Wellness support"
    ],
    seoKeywords: {
      primary: "papaya powder",
      secondary: ["dried papaya powder", "papaya enzyme powder"]
    },
    imageUrl: papayaPowderImage,
    imageUrls: [papayaPowderImage],
    variants: [
      { weight: '100g', price: 140, stock: 45, sku: 'PAP-100' },
      { weight: '250g', price: 330, stock: 35, sku: 'PAP-250' },
      { weight: '500g', price: 630, stock: 25, sku: 'PAP-500' },
      { weight: '1kg', price: 1200, stock: 15, sku: 'PAP-1KG' }
    ]
  },
  {
    id: "tomato-powder",
    name: "Tomato Powder",
    shortDescription: "Concentrated tomato powder for cooking and nutrition.",
    longDescription: "Golden Harvest Tomato Powder is made from fresh tomatoes that are dried and ground into a fine powder. This concentrated powder adds rich flavor and nutrition to various dishes and is perfect for soups, sauces, and seasonings.",
    benefits: [
      "Rich in lycopene",
      "Natural flavor enhancer",
      "Supports immune function",
      "Antioxidant properties"
    ],
    usage: "Soups, sauces, seasoning, baking",
    dosage: "As per recipe",
    safety: "Safe for daily use. May cause digestive discomfort in large amounts.",
    storage: "Store in an airtight container away from moisture",
    category: ["Cooking Essentials", "Immunity"],
    howItMade: "Fresh tomatoes → Dried → Ground → Packed",
    highlights: [
      "Lycopene rich",
      "Natural color",
      "Versatile cooking"
    ],
    seoKeywords: {
      primary: "tomato powder",
      secondary: ["dried tomato powder", "tomato seasoning powder"]
    },
    imageUrl: tomatoPowderImage,
    imageUrls: [tomatoPowderImage],
    variants: [
      { weight: '100g', price: 110, stock: 50, sku: 'TOM-100' },
      { weight: '250g', price: 260, stock: 40, sku: 'TOM-250' },
      { weight: '500g', price: 490, stock: 30, sku: 'TOM-500' },
      { weight: '1kg', price: 940, stock: 20, sku: 'TOM-1KG' }
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

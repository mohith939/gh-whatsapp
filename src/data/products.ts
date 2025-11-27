import bananaPowderImage from '@/assets/banana raw powder.jpg';

export interface ProductVariant {
  weight: '100g' | '250g' | '500g' | '1kg';
  price: number;
  stock: number;
  sku: string;
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
  variants: ProductVariant[];
  featured?: boolean;
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
    variants: [
      { weight: '100g', price: 150, stock: 50, sku: 'BAN-100' },
      { weight: '250g', price: 350, stock: 40, sku: 'BAN-250' },
      { weight: '500g', price: 650, stock: 30, sku: 'BAN-500' },
      { weight: '1kg', price: 1200, stock: 20, sku: 'BAN-1KG' }
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
    imageUrl: "/images/products/beetroot-powder.jpg",
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
    imageUrl: "/images/products/moringa-powder.jpg",
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
    benefits: [
      "Supports healthy digestion",
      "Warming spice",
      "Culinary versatility",
      "Traditional wellness ingredient"
    ],
    usage: "Teas, curries, kadha, baking",
    dosage: "½–1 tsp/day",
    storage: "Store in an airtight container in a cool, dry place",
    category: ["Digestion", "Wellness"],
    highlights: ["Aromatic", "No additives", "Pure ginger"],
    seoKeywords: {
      primary: "ginger powder",
      secondary: ["dry ginger powder", "sonth powder"]
    },
    imageUrl: "/images/products/ginger-powder.jpg",
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
    benefits: [
      "Strong, authentic flavour",
      "Easy seasoning solution",
      "Long shelf life",
      "Convenient cooking aid"
    ],
    usage: "Gravies, marinades, seasoning",
    dosage: "As per recipe",
    storage: "Store in an airtight container away from moisture",
    category: ["Cooking Essentials"],
    highlights: ["100% garlic", "No preservatives", "Dehydrated naturally"],
    seoKeywords: {
      primary: "garlic powder",
      secondary: ["dehydrated garlic", "garlic seasoning powder"]
    },
    imageUrl: "/images/products/garlic-powder.jpg",
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
    benefits: [
      "Antioxidant-rich",
      "Daily spice for immunity",
      "Excellent for cooking",
      "Natural golden colour"
    ],
    usage: "Curries, milk, kadha, smoothies",
    dosage: "½–1 tsp/day",
    storage: "Store in an airtight container away from light and moisture",
    category: ["Immunity", "Wellness"],
    highlights: ["No fillers", "High colour", "Pure turmeric"],
    seoKeywords: {
      primary: "turmeric powder",
      secondary: ["haldi powder", "curcumin powder"]
    },
    imageUrl: "/images/products/turmeric-powder.jpg",
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
    benefits: [
      "Supports immune function",
      "Hair and skin benefits",
      "Supports digestion",
      "Rich in Vitamin C"
    ],
    usage: "Warm water, smoothies, hair masks",
    dosage: "1 tsp/day",
    storage: "Store in an airtight container in a cool, dry place",
    category: ["Immunity", "Beauty"],
    highlights: ["Shade-dried", "Nutrient-dense", "Pure amla"],
    seoKeywords: {
      primary: "amla powder",
      secondary: ["gooseberry powder", "Indian gooseberry powder"]
    },
    imageUrl: "/images/products/amla-powder.jpg",
    variants: [
      { weight: '100g', price: 100, stock: 50, sku: 'AML-100' },
      { weight: '250g', price: 230, stock: 40, sku: 'AML-250' },
      { weight: '500g', price: 440, stock: 30, sku: 'AML-500' },
      { weight: '1kg', price: 850, stock: 20, sku: 'AML-1KG' }
    ]
  },
  {
    id: "ashwagandha-powder",
    name: "Ashwagandha Powder",
    shortDescription: "Traditional adaptogenic root powder for stress balance.",
    benefits: [
      "Supports relaxation",
      "Promotes sleep quality",
      "Supports stress resilience",
      "Traditional Ayurvedic herb"
    ],
    usage: "Warm milk/tonic, smoothies",
    dosage: "½–1 tsp/day",
    storage: "Store in an airtight container away from heat and moisture",
    category: ["Stress Relief", "Wellness"],
    highlights: ["Root-only powder", "Clean processing", "Pure ashwagandha"],
    seoKeywords: {
      primary: "ashwagandha powder",
      secondary: ["ashwagandha root powder", "Indian ginseng powder"]
    },
    imageUrl: "/images/products/ashwagandha-powder.jpg",
    variants: [
      { weight: '100g', price: 200, stock: 40, sku: 'ASH-100' },
      { weight: '250g', price: 480, stock: 30, sku: 'ASH-250' },
      { weight: '500g', price: 920, stock: 20, sku: 'ASH-500' },
      { weight: '1kg', price: 1750, stock: 15, sku: 'ASH-1KG' }
    ]
  },
  {
    id: "spirulina-powder",
    name: "Spirulina Powder",
    shortDescription: "Protein-rich blue-green algae powder for daily nutrition.",
    benefits: [
      "High plant protein content",
      "Natural energy boost",
      "Rich in micronutrients",
      "Supports overall wellness"
    ],
    usage: "Smoothies, juices, health drinks",
    dosage: "1 tsp/day",
    storage: "Store in an airtight container away from light and moisture",
    category: ["Energy", "Daily Nutrition"],
    highlights: ["Pure spirulina", "No additives", "Nutrient powerhouse"],
    seoKeywords: {
      primary: "spirulina powder",
      secondary: ["spirulina protein powder", "blue-green algae powder"]
    },
    imageUrl: "/images/products/spirulina-powder.jpg",
    variants: [
      { weight: '100g', price: 250, stock: 35, sku: 'SPI-100' },
      { weight: '250g', price: 600, stock: 25, sku: 'SPI-250' },
      { weight: '500g', price: 1150, stock: 15, sku: 'SPI-500' },
      { weight: '1kg', price: 2200, stock: 10, sku: 'SPI-1KG' }
    ]
  },
  {
    id: "wheatgrass-powder",
    name: "Wheatgrass Powder",
    shortDescription: "Chlorophyll-rich tender wheatgrass for detox-style wellness.",
    benefits: [
      "Supports detox wellness",
      "Natural energy boost",
      "Supports immune function",
      "Rich in chlorophyll"
    ],
    usage: "Water shots, smoothies",
    dosage: "1 tsp/day",
    storage: "Store in an airtight container in a cool, dry place",
    category: ["Detox", "Wellness"],
    highlights: ["Freshly dried wheatgrass", "Nutrient-dense", "Pure wheatgrass"],
    seoKeywords: {
      primary: "wheatgrass powder",
      secondary: ["organic wheatgrass powder", "wheatgrass juice powder"]
    },
    imageUrl: "/images/products/wheatgrass-powder.jpg",
    variants: [
      { weight: '100g', price: 170, stock: 40, sku: 'WHE-100' },
      { weight: '250g', price: 400, stock: 30, sku: 'WHE-250' },
      { weight: '500g', price: 760, stock: 20, sku: 'WHE-500' },
      { weight: '1kg', price: 1450, stock: 15, sku: 'WHE-1KG' }
    ]
  },
  {
    id: "neem-powder",
    name: "Neem Powder",
    shortDescription: "Pure neem leaf powder for skin and wellness.",
    benefits: [
      "Supports skin health",
      "Natural detox support",
      "Hair pack uses",
      "Traditional wellness herb"
    ],
    usage: "Water rinses, face/hair packs",
    dosage: "½ tsp/day (topical as needed)",
    storage: "Store in an airtight container away from moisture",
    category: ["Skin", "Wellness"],
    highlights: ["Leaf-only powder", "No fillers", "Pure neem"],
    seoKeywords: {
      primary: "neem powder",
      secondary: ["neem leaf powder", "azadirachta indica powder"]
    },
    imageUrl: "/images/products/neem-powder.jpg",
    variants: [
      { weight: '100g', price: 90, stock: 50, sku: 'NEE-100' },
      { weight: '250g', price: 210, stock: 40, sku: 'NEE-250' },
      { weight: '500g', price: 400, stock: 30, sku: 'NEE-500' },
      { weight: '1kg', price: 750, stock: 20, sku: 'NEE-1KG' }
    ]
  },
  {
    id: "hibiscus-powder",
    name: "Hibiscus Powder",
    shortDescription: "Flower powder for hair strength, shine and natural colour.",
    benefits: [
      "Hair conditioning",
      "Scalp nourishment",
      "Natural colour enhancement",
      "Traditional hair care"
    ],
    usage: "Hair masks, face packs, tea",
    dosage: "As topical or ½–1 tsp infusion",
    storage: "Store in an airtight container away from moisture",
    category: ["Beauty", "Hair Care"],
    highlights: ["Vibrant natural pigment", "No stabilizers", "Pure hibiscus"],
    seoKeywords: {
      primary: "hibiscus powder",
      secondary: ["hibiscus hair powder", "gudhal powder"]
    },
    imageUrl: "/images/products/hibiscus-powder.jpg",
    variants: [
      { weight: '100g', price: 130, stock: 45, sku: 'HIB-100' },
      { weight: '250g', price: 300, stock: 35, sku: 'HIB-250' },
      { weight: '500g', price: 570, stock: 25, sku: 'HIB-500' },
      { weight: '1kg', price: 1100, stock: 15, sku: 'HIB-1KG' }
    ]
  },
  {
    id: "aloe-vera-powder",
    name: "Aloe Vera Powder",
    shortDescription: "Pure aloe leaf powder for skin hydration and digestion support.",
    benefits: [
      "Hydration support",
      "Skin wellness support",
      "Digestion-friendly properties",
      "Soothing and gentle"
    ],
    usage: "Smoothies, face packs",
    dosage: "½–1 tsp/day",
    storage: "Store in an airtight container in a cool, dry place",
    category: ["Beauty", "Digestion"],
    highlights: ["Pure leaf powder", "Gentle", "Natural aloe"],
    seoKeywords: {
      primary: "aloe vera powder",
      secondary: ["aloe powder", "dried aloe vera powder"]
    },
    imageUrl: "/images/products/aloe-vera-powder.jpg",
    variants: [
      { weight: '100g', price: 150, stock: 40, sku: 'ALO-100' },
      { weight: '250g', price: 350, stock: 30, sku: 'ALO-250' },
      { weight: '500g', price: 670, stock: 20, sku: 'ALO-500' },
      { weight: '1kg', price: 1280, stock: 15, sku: 'ALO-1KG' }
    ]
  },
  {
    id: "carrot-powder",
    name: "Carrot Powder",
    shortDescription: "Natural carrot powder high in beta-carotene & colour.",
    benefits: [
      "Vitamin A precursor",
      "Eye and skin support",
      "Baby-friendly nutrition",
      "Natural orange colour"
    ],
    usage: "Smoothies, soups, baking",
    dosage: "1–2 tsp/day",
    storage: "Store in an airtight container away from light",
    category: ["Kids Nutrition", "Daily Wellness"],
    highlights: ["Natural orange", "Nutrient-retentive processing", "Pure carrot"],
    seoKeywords: {
      primary: "carrot powder",
      secondary: ["dried carrot powder", "carrot powder for babies"]
    },
    imageUrl: "/images/products/carrot-powder.jpg",
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
    benefits: [
      "Rich in iron",
      "Packed with vitamins",
      "Easy to add to food",
      "Daily greens boost"
    ],
    usage: "Smoothies, dough, soups",
    dosage: "1 tsp/day",
    storage: "Store in an airtight container away from heat and moisture",
    category: ["Daily Nutrition"],
    highlights: ["Shade-dried leaves", "Nutrient retention", "Pure spinach"],
    seoKeywords: {
      primary: "spinach powder",
      secondary: ["palak powder", "dried spinach powder"]
    },
    imageUrl: "/images/products/spinach-powder.jpg",
    variants: [
      { weight: '100g', price: 140, stock: 45, sku: 'SPI-100' },
      { weight: '250g', price: 330, stock: 35, sku: 'SPI-250' },
      { weight: '500g', price: 630, stock: 25, sku: 'SPI-500' },
      { weight: '1kg', price: 1200, stock: 15, sku: 'SPI-1KG' }
    ]
  },
  {
    id: "fenugreek-powder",
    name: "Fenugreek (Methi) Powder",
    shortDescription: "Natural methi powder for digestion support & hair care.",
    benefits: [
      "Digestion aid",
      "Hair conditioning",
      "Cooling properties",
      "Multi-use wellness herb"
    ],
    usage: "Warm water, masala mixes, hair masks",
    dosage: "½–1 tsp/day",
    storage: "Store in an airtight container in a cool, dry place",
    category: ["Digestion", "Beauty"],
    highlights: ["Clean-processed methi", "Multi-use", "Pure fenugreek"],
    seoKeywords: {
      primary: "fenugreek powder",
      secondary: ["methi powder", "fenugreek seed powder"]
    },
    imageUrl: "/images/products/fenugreek-powder.jpg",
    variants: [
      { weight: '100g', price: 70, stock: 60, sku: 'FEN-100' },
      { weight: '250g', price: 160, stock: 50, sku: 'FEN-250' },
      { weight: '500g', price: 300, stock: 40, sku: 'FEN-500' },
      { weight: '1kg', price: 570, stock: 25, sku: 'FEN-1KG' }
    ]
  },
  {
    id: "curry-leaf-powder",
    name: "Curry Leaf Powder",
    shortDescription: "Aromatic curry leaf powder rich in minerals and flavour.",
    benefits: [
      "Supports digestion",
      "Flavour enhancer",
      "Iron source",
      "Traditional cooking ingredient"
    ],
    usage: "Curries, seasoning, rice mixes",
    dosage: "As per recipe",
    storage: "Store in an airtight container to retain aroma",
    category: ["Daily Nutrition"],
    highlights: ["Dried fresh curry leaves", "Aromatic finish", "Pure kadi patta"],
    seoKeywords: {
      primary: "curry leaf powder",
      secondary: ["kadi patta powder", "dried curry leaves powder"]
    },
    imageUrl: "/images/products/curry-leaf-powder.jpg",
    variants: [
      { weight: '100g', price: 120, stock: 50, sku: 'CUR-100' },
      { weight: '250g', price: 280, stock: 40, sku: 'CUR-250' },
      { weight: '500g', price: 530, stock: 30, sku: 'CUR-500' },
      { weight: '1kg', price: 1020, stock: 20, sku: 'CUR-1KG' }
    ]
  },
  {
    id: "pumpkin-seed-powder",
    name: "Pumpkin Seed Powder",
    shortDescription: "Plant-protein-rich pumpkin seed powder for energy & magnesium.",
    benefits: [
      "High plant protein",
      "Rich in magnesium",
      "Heart wellness support",
      "Energy boost"
    ],
    usage: "Smoothies, baking, shakes",
    dosage: "1–2 tbsp/day",
    storage: "Store in an airtight container in a cool, dry place",
    category: ["Protein", "Energy"],
    highlights: ["Cold-pressed dried seed powder", "High protein", "Pure pumpkin seeds"],
    seoKeywords: {
      primary: "pumpkin seed powder",
      secondary: ["pumpkin protein powder", "pepita powder"]
    },
    imageUrl: "/images/products/pumpkin-seed-powder.jpg",
    variants: [
      { weight: '100g', price: 180, stock: 35, sku: 'PUM-100' },
      { weight: '250g', price: 420, stock: 25, sku: 'PUM-250' },
      { weight: '500g', price: 800, stock: 20, sku: 'PUM-500' },
      { weight: '1kg', price: 1550, stock: 15, sku: 'PUM-1KG' }
    ]
  },
  {
    id: "flaxseed-powder",
    name: "Flaxseed Powder",
    shortDescription: "Fiber- and omega-rich flaxseed powder for digestion and healthy fats.",
    benefits: [
      "Supports digestion",
      "Rich in omega fatty acids",
      "High fiber content",
      "Heart wellness support"
    ],
    usage: "Smoothies, atta mixes, salads",
    dosage: "1–2 tbsp/day",
    storage: "Store in an airtight container in a cool, dry place",
    category: ["Digestion", "Daily Nutrition"],
    highlights: ["Ground fresh", "Natural omega content", "Pure flaxseed"],
    seoKeywords: {
      primary: "flaxseed powder",
      secondary: ["alsi powder", "ground flaxseed powder"]
    },
    imageUrl: "/images/products/flaxseed-powder.jpg",
    variants: [
      { weight: '100g', price: 90, stock: 60, sku: 'FLA-100' },
      { weight: '250g', price: 210, stock: 50, sku: 'FLA-250' },
      { weight: '500g', price: 400, stock: 40, sku: 'FLA-500' },
      { weight: '1kg', price: 760, stock: 25, sku: 'FLA-1KG' }
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

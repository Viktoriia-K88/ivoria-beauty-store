export const categoryConfigs = {
  skincare: {
    searchTerm: "skincare",

    allowedBrands: [
      "La Roche-Posay",
      "La Roche Posay",
      "CeraVe",
      "Bioderma",
      "The Ordinary",
      "Clinique",
      "Lancôme",
      "Lancome",
      "Estée Lauder",
      "Estee Lauder",
      "Avène",
      "Avene",
      "Vichy",
      "Eucerin",
      "Kiehl's",
      "COSRX",
      "Beauty of Joseon",
      "Paula's Choice",
      "Elemis",
      "Drunk Elephant",
      "Laneige",
    ],

    keywords: [
      "cleanser",
      "cleansing",
      "face wash",
      "micellar",
      "toner",
      "serum",
      "moisturizer",
      "moisturiser",
      "face cream",
      "facial cream",
      "eye cream",
      "face mask",
      "facial mask",
      "sunscreen",
      "spf",
      "skincare",
      "skin care",
      "facial",
    ],

    baseQueries: [
      "facial cleanser serum skincare",
      "moisturizer toner mask skincare",
      "sunscreen face cream skincare",
    ],

    types: {
      cleanser: {
        query: "facial cleanser skincare",

        keywords: ["cleanser", "cleansing", "face wash", "micellar water"],
      },

      toner: {
        query: "face toner skincare",

        keywords: ["toner", "tonique"],
      },

      serum: {
        query: "face serum skincare",

        keywords: ["serum"],
      },

      moisturizer: {
        query: "face moisturizer cream skincare",

        keywords: ["moisturizer", "moisturiser", "face cream", "facial cream"],

        excludeKeywords: ["sunscreen", "spf", "sun protection"],
      },

      mask: {
        query: "face mask skincare",

        keywords: ["face mask", "facial mask", "sheet mask", "mask"],
      },

      sunscreen: {
        query: "face sunscreen spf skincare",

        keywords: ["sunscreen", "spf", "sun protection"],
      },
    },

    brands: {
      "la-roche-posay": {
        query: "La Roche Posay",

        aliases: ["La Roche-Posay", "La Roche Posay"],
      },

      cerave: {
        query: "CeraVe",

        aliases: ["CeraVe", "Cerave"],
      },

      bioderma: {
        query: "Bioderma",

        aliases: ["Bioderma"],
      },

      clinique: {
        query: "Clinique",

        aliases: ["Clinique"],
      },

      lancome: {
        query: "Lancome",

        aliases: ["Lancôme", "Lancome"],
      },
    },
  },

  makeup: {
    searchTerm: "makeup",

    allowedBrands: [
      "Dior",
      "Christian Dior",
      "Yves Saint Laurent",
      "YSL",
      "Charlotte Tilbury",
      "Maybelline",
      "NYX",
      "NYX Professional Makeup",
      "MAC",
      "MAC Cosmetics",
      "NARS",
      "Lancôme",
      "Lancome",
      "Estée Lauder",
      "Estee Lauder",
      "Clinique",
      "Benefit",
      "Benefit Cosmetics",
      "Rare Beauty",
      "Fenty Beauty",
      "Huda Beauty",
      "Giorgio Armani",
      "Armani Beauty",
      "Too Faced",
      "Urban Decay",
    ],

    keywords: [
      "foundation",
      "concealer",
      "primer",
      "blush",
      "bronzer",
      "highlighter",
      "illuminator",
      "mascara",
      "eyeshadow",
      "eye shadow",
      "eyeliner",
      "brow",
      "eyebrow",
      "lipstick",
      "lip gloss",
      "lip liner",
      "lip color",
      "makeup",
      "cosmetic",
      "powder",
      "setting spray",
    ],

    baseQueries: [
      "foundation concealer makeup",
      "blush bronzer mascara makeup",
      "eyeshadow lipstick eyebrow makeup",
    ],

    types: {
      foundation: {
        query: "foundation makeup",

        keywords: ["foundation"],
      },

      concealer: {
        query: "concealer makeup",

        keywords: ["concealer"],
      },

      blush: {
        query: "blush makeup",

        keywords: ["blush"],
      },

      bronzer: {
        query: "bronzer makeup",

        keywords: ["bronzer"],
      },

      highlighter: {
        query: "highlighter illuminator makeup",

        keywords: ["highlighter", "illuminator"],
      },

      mascara: {
        query: "mascara makeup",

        keywords: ["mascara"],

        excludeKeywords: ["brow", "eyebrow"],
      },

      eyeshadow: {
        query: "eyeshadow makeup",

        keywords: ["eyeshadow", "eye shadow"],
      },

      brow: {
        query: "eyebrow brow makeup",

        keywords: ["eyebrow", "brow"],
      },

      lips: {
        query: "lipstick lip gloss lip liner makeup",

        keywords: ["lipstick", "lip gloss", "lip liner", "lip color"],
      },
    },

    brands: {
      dior: {
        query: "Dior",

        aliases: ["Dior", "Christian Dior"],
      },

      "yves-saint-laurent": {
        query: "Yves Saint Laurent",

        aliases: ["Yves Saint Laurent", "YSL", "Saint Laurent"],
      },

      "charlotte-tilbury": {
        query: "Charlotte Tilbury",

        aliases: ["Charlotte Tilbury"],
      },

      maybelline: {
        query: "Maybelline",

        aliases: ["Maybelline"],
      },

      nyx: {
        query: "NYX",

        aliases: ["NYX", "NYX Professional Makeup"],
      },
    },
  },

  perfume: {
    searchTerm: "perfume fragrance",

    allowedBrands: [
      "Chanel",
      "Dior",
      "Christian Dior",
      "Yves Saint Laurent",
      "YSL",
      "Giorgio Armani",
      "Armani Beauty",
      "Guerlain",
      "Prada",
      "Gucci",
      "Versace",
      "Givenchy",
      "Lancôme",
      "Lancome",
      "Burberry",
      "Valentino",
      "Carolina Herrera",
      "Tiziana Terenzi",
      "Victoria's Secret",
      "Victoria Secret",
      "Tom Ford",
      "Mugler",
      "Jo Malone",
      "Maison Francis Kurkdjian",
    ],

    keywords: [
      "perfume",
      "parfum",
      "fragrance",
      "eau de parfum",
      "eau de toilette",
      "body mist",
      "fragrance mist",
      "cologne",
      "scent",
    ],

    baseQueries: [
      "women perfume fragrance",
      "eau de parfum perfume",
      "body mist fragrance",
    ],

    types: {
      "eau-de-parfum": {
        query: "women eau de parfum",

        keywords: ["eau de parfum", "edp"],
      },

      "eau-de-toilette": {
        query: "women eau de toilette",

        keywords: ["eau de toilette", "edt"],
      },

      "body-mist": {
        query: "women fragrance body mist",

        keywords: ["body mist", "fragrance mist"],
      },
    },

    brands: {
      dior: {
        query: "Dior",

        aliases: ["Dior", "Christian Dior"],
      },

      chanel: {
        query: "Chanel",

        aliases: ["Chanel"],
      },

      "giorgio-armani": {
        query: "Giorgio Armani",

        aliases: ["Giorgio Armani", "Armani Beauty"],
      },

      "yves-saint-laurent": {
        query: "Yves Saint Laurent",

        aliases: ["Yves Saint Laurent", "YSL", "Saint Laurent"],
      },

      guerlain: {
        query: "Guerlain",

        aliases: ["Guerlain"],
      },

      "victorias-secret": {
        query: "Victoria's Secret",

        aliases: ["Victoria's Secret", "Victoria Secret"],
      },

      "tiziana-terenzi": {
        query: "Tiziana Terenzi",

        aliases: ["Tiziana Terenzi"],
      },
    },
  },

  "hair-care": {
    searchTerm: "hair care",

    allowedBrands: [
      "Kérastase",
      "Kerastase",
      "Olaplex",
      "Moroccanoil",
      "Redken",
      "Pureology",
      "K18",
      "L'Oréal Professionnel",
      "L'Oreal Professionnel",
      "Matrix",
      "Wella Professionals",
      "Schwarzkopf Professional",
      "Davines",
      "Briogeo",
      "OUAI",
      "Living Proof",
      "Color Wow",
      "Amika",
    ],

    keywords: [
      "shampoo",
      "conditioner",
      "hair mask",
      "hair treatment",
      "hair oil",
      "hair serum",
      "hair care",
      "haircare",
      "leave in",
      "leave-in",
      "scalp",
      "styling",
      "heat protect",
      "hair spray",
      "hairspray",
    ],

    baseQueries: [
      "shampoo conditioner hair care",
      "hair mask oil treatment hair care",
      "hair styling leave in hair care",
    ],

    types: {
      shampoo: {
        query: "shampoo hair care",

        keywords: ["shampoo"],
      },

      conditioner: {
        query: "conditioner hair care",

        keywords: ["conditioner"],
      },

      mask: {
        query: "hair mask treatment",

        keywords: ["hair mask", "hair treatment", "treatment mask"],
      },

      oil: {
        query: "hair oil serum treatment",

        keywords: ["hair oil", "treatment oil", "oil treatment", "hair serum"],
      },

      "leave-in": {
        query: "leave in hair care",

        keywords: ["leave in", "leave-in"],
      },

      styling: {
        query: "hair styling product",

        keywords: [
          "styling",
          "hair spray",
          "hairspray",
          "mousse",
          "styler",
          "texturizing",
        ],
      },
    },

    brands: {
      kerastase: {
        query: "Kerastase",

        aliases: ["Kérastase", "Kerastase"],
      },

      olaplex: {
        query: "Olaplex",

        aliases: ["Olaplex"],
      },

      pureology: {
        query: "Pureology",

        aliases: ["Pureology"],
      },

      moroccanoil: {
        query: "Moroccanoil",

        aliases: ["Moroccanoil"],
      },
    },
  },

  "body-care": {
    searchTerm: "body care",

    allowedBrands: [
      "Sol de Janeiro",
      "L'Occitane",
      "LOccitane",
      "CeraVe",
      "Bioderma",
      "La Roche-Posay",
      "La Roche Posay",
      "Eucerin",
      "Nécessaire",
      "Necessaire",
      "Rituals",
      "Aesop",
      "Dove",
      "Nivea",
      "OUAI",
      "Aveeno",
      "Bath & Body Works",
    ],

    keywords: [
      "body wash",
      "shower gel",
      "body lotion",
      "body cream",
      "body butter",
      "body scrub",
      "body exfoliator",
      "body exfoliant",
      "body oil",
      "body care",
      "hand cream",
      "hand wash",
      "hand lotion",
      "hand balm",
      "deodorant",
      "antiperspirant",
      "bath",
    ],

    baseQueries: [
      "body lotion cream body care",
      "body wash scrub body care",
      "hand cream deodorant body care",
    ],

    types: {
      "body-wash": {
        query: "body wash shower gel",

        keywords: ["body wash", "shower gel"],
      },

      "body-lotion": {
        query: "body lotion",

        keywords: ["body lotion"],
      },

      "body-cream": {
        query: "body cream body butter",

        keywords: ["body cream", "body butter"],
      },

      scrub: {
        query: "body scrub exfoliator",

        keywords: ["body scrub", "body exfoliator", "body exfoliant", "scrub"],
      },

      "hand-care": {
        query: "hand cream hand wash hand care",

        keywords: ["hand cream", "hand wash", "hand lotion", "hand balm"],
      },

      deodorant: {
        query: "deodorant antiperspirant body care",

        keywords: ["deodorant", "antiperspirant"],
      },
    },

    brands: {
      "sol-de-janeiro": {
        query: "Sol de Janeiro",

        aliases: ["Sol de Janeiro"],
      },

      loccitane: {
        query: "L'Occitane",

        aliases: ["L'Occitane", "LOccitane"],
      },

      cerave: {
        query: "CeraVe",

        aliases: ["CeraVe", "Cerave"],
      },

      necessaire: {
        query: "Necessaire",

        aliases: ["Nécessaire", "Necessaire"],
      },
    },
  },
};

export const categoryNames = Object.keys(categoryConfigs);

export const featuredBrands = [
  "Dior",
  "Yves Saint Laurent",
  "Chanel",
  "Giorgio Armani",
  "Lancôme",
  "Charlotte Tilbury",
  "Guerlain",
  "Estée Lauder",
];

export const excludedProductWords = [
  "gift set",
  "value set",
  "discovery set",
  "starter set",
  "holiday set",
  "sampler",
  "bundle",
  "kit",
];

export const typeExcludedProductWords = ["set", "duo", "kit", "bundle"];

export const nonBeautyWords = [
  "sunglasses",
  "eyeglasses",
  "eyewear",
  "optical frame",
  "glasses frame",
  "handbag",
  "shoulder bag",
  "crossbody bag",
  "wallet",
  "shoe",
  "shoes",
  "sneaker",
  "sneakers",
  "dress",
  "jacket",
  "shirt",
  "sweater",
  "jeans",
  "pants",
  "belt",
  "watch",
  "earrings",
  "necklace",
  "bracelet",
];

export const maleProductWords = ["for men", "men's", "mens", "homme"];

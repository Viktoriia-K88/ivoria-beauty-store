const skincareConfig = {
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

      excludeKeywords: ["micellar", "cleansing water"],

      matchInTitleOnly: true,
    },

    serum: {
      query: "face serum skincare",

      keywords: ["serum"],

      matchInTitleOnly: true,
    },

    moisturizer: {
      query: "face moisturizer cream skincare",

      keywords: [
        "moisturizer",
        "moisturiser",
        "face cream",
        "facial cream",
        "night cream",
        "gel cream",
      ],

      excludeKeywords: ["sunscreen", "spf", "sun protection"],

      matchInTitleOnly: true,
    },

    mask: {
      query: "face mask skincare",

      keywords: ["face mask", "facial mask", "sheet mask", "mask"],

      matchInTitleOnly: true,
    },

    sunscreen: {
      query: "face sunscreen spf skincare",

      keywords: ["sunscreen", "spf", "sun protection"],

      excludeKeywords: ["body", "body cream", "body lotion"],

      matchInTitleOnly: true,
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
};

export default skincareConfig;

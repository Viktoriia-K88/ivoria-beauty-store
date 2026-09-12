const makeupConfig = {
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

  excludeKeywords: ["makeup remover", "brush", "brushes"],

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

      excludeKeywords: ["concealer"],

      matchInTitleOnly: true,
    },

    concealer: {
      query: "concealer makeup",

      keywords: ["concealer"],

      excludeKeywords: ["foundation"],

      matchInTitleOnly: true,
    },

    blush: {
      query: "blush makeup",

      keywords: ["blush"],

      excludeKeywords: ["bronzer", "brush"],

      matchInTitleOnly: true,
    },

    bronzer: {
      query: "bronzer makeup",

      keywords: ["bronzer"],

      excludeKeywords: ["blush", "brush"],

      matchInTitleOnly: true,
    },

    highlighter: {
      query: "highlighter illuminator makeup",

      keywords: ["highlighter", "illuminator"],

      matchInTitleOnly: true,
    },

    mascara: {
      query: "mascara makeup",

      keywords: ["mascara"],

      excludeKeywords: ["brow", "eyebrow"],

      matchInTitleOnly: true,
    },

    eyeshadow: {
      query: "eyeshadow makeup",

      keywords: ["eyeshadow", "eye shadow"],

      matchInTitleOnly: true,
    },

    brow: {
      query: "eyebrow brow makeup",

      keywords: ["eyebrow", "brow"],

      matchInTitleOnly: true,
    },

    lips: {
      query: "lipstick lip gloss lip liner makeup",

      keywords: ["lipstick", "lip gloss", "lip liner", "lip color"],

      matchInTitleOnly: true,
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
};

export default makeupConfig;

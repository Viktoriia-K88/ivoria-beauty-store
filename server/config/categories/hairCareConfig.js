const hairCareConfig = {
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
    "mousse",
    "hair powder",
    "texture",
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

      matchInTitleOnly: true,
    },

    conditioner: {
      query: "conditioner hair care",

      keywords: ["conditioner"],

      excludeKeywords: ["mask"],

      matchInTitleOnly: true,
    },

    mask: {
      query: "hair mask treatment",

      keywords: ["hair mask", "treatment mask", "mask"],

      excludeKeywords: ["leave-in", "leave in"],

      matchInTitleOnly: true,
    },

    oil: {
      query: "hair oil serum treatment",

      keywords: ["hair oil", "treatment oil", "oil treatment", "hair serum"],

      matchInTitleOnly: true,
    },

    "leave-in": {
      query: "leave in hair care",

      keywords: ["leave in", "leave-in"],

      matchInTitleOnly: true,
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
        "texture",
        "heat protect",
        "heat protectant",
        "hair powder",
        "volume powder",
      ],

      matchInTitleOnly: true,
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
};

export default hairCareConfig;

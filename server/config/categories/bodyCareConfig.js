const bodyCareConfig = {
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

      matchInTitleOnly: true,
    },

    "body-lotion": {
      query: "body lotion",

      keywords: ["body lotion"],

      matchInTitleOnly: true,
    },

    "body-cream": {
      query: "body cream body butter",

      keywords: ["body cream", "body butter"],

      matchInTitleOnly: true,
    },

    scrub: {
      query: "body scrub exfoliator",

      keywords: ["body scrub", "body exfoliator", "body exfoliant", "scrub"],

      matchInTitleOnly: true,
    },

    "hand-care": {
      query: "hand cream hand wash hand care",

      keywords: ["hand cream", "hand wash", "hand lotion", "hand balm"],

      matchInTitleOnly: true,
    },

    deodorant: {
      query: "deodorant antiperspirant body care",

      keywords: ["deodorant", "antiperspirant"],

      matchInTitleOnly: true,
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
};

export default bodyCareConfig;

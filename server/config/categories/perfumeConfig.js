const perfumeConfig = {
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

  excludeKeywords: [
    "tester",
    "fragrance cap",
    "fragrance caps",
    "fragrance lotion",
    "body lotion",
    "lip glow oil",
    "lip oil",
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

      excludeKeywords: ["eau de toilette", "edt"],

      matchInTitleOnly: true,
    },

    "eau-de-toilette": {
      query: "women eau de toilette",

      keywords: ["eau de toilette", "edt"],

      excludeKeywords: ["eau de parfum", "edp"],

      matchInTitleOnly: true,
    },

    "body-mist": {
      query: "women fragrance body mist",

      keywords: ["body mist", "fragrance mist"],

      matchInTitleOnly: true,
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
};

export default perfumeConfig;

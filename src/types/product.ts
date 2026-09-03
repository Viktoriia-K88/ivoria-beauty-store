export type Product = {
  id: string;
  title: string;
  brand: string;
  description: string;
  image: string;
  images: string[];
  price: number;
  compareAtPrice: number | null;
  currency: string;
  availability: string | null;
  category: string | null;
  gender: string | null;
  catalogCategory: string | null;
  size: string | null;
  shade: string | null;
};

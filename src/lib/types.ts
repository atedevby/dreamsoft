export type ProductCard = {
  id: string;
  title: string;
  slug: string;
  price: string;
  currency: string;
  categoryName: string | null;
  imageUrl: string;
};

export type CartItem = {
  id: string;
  title: string;
  slug: string;
  price: string;
  currency: string;
  imageUrl: string;
  quantity: number;
};

export type ProductSpec = {
  name: string;
  value: string;
};

export type ProductRecommendation = ProductCard;

export type ProductDetails = ProductCard & {
  description: string;
  stockQty: number;
  images: { id: string; url: string; alt: string | null }[];
  specs: ProductSpec[];
  recommendations: ProductRecommendation[];
};

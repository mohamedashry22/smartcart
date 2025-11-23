export interface Category {
  id: string;
  name: string;
  slug: string;
  heroImageUrl?: string;
}

export interface Subcategory {
  id: string;
  categoryId: Category["id"];
  name: string;
  slug: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  lqipDataUrl: string;
  availableStock: number;
  categoryId: Category["id"];
  subcategoryId: Subcategory["id"];
  tags: string[];
  unit: string;
  badge?: "sale" | "bogo" | "popular" | "new";
}

export interface CatalogData {
  categories: Category[];
  subcategories: Subcategory[];
  products: Product[];
}

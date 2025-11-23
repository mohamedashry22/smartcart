import { faker } from "@faker-js/faker";
import { defaultLqip, fallbackImage, foodImagePools } from "./foodImagePool";
import type { CatalogData, Category, Product, Subcategory } from "../../../shared/types/catalog";

faker.seed(123);

const categories: Category[] = [
  { id: "produce", name: "Produce", slug: "produce", heroImageUrl: foodImagePools.produce[0] },
  { id: "dairy", name: "Dairy & Eggs", slug: "dairy", heroImageUrl: foodImagePools.dairy[0] },
  { id: "bakery", name: "Bakery", slug: "bakery", heroImageUrl: foodImagePools.bakery[0] },
  { id: "meat", name: "Meat & Seafood", slug: "meat", heroImageUrl: foodImagePools.meat[0] },
  { id: "pantry", name: "Pantry", slug: "pantry", heroImageUrl: foodImagePools.pantry[0] },
  { id: "snacks", name: "Snacks", slug: "snacks", heroImageUrl: foodImagePools.snacks[0] },
  { id: "beverages", name: "Beverages", slug: "beverages", heroImageUrl: foodImagePools.beverages[0] },
  { id: "frozen", name: "Frozen", slug: "frozen", heroImageUrl: foodImagePools.frozen[0] },
];

const subcategories: Subcategory[] = [
  { id: "leafy-greens", categoryId: "produce", name: "Leafy Greens", slug: "leafy-greens", imageUrl: foodImagePools.produce[1] },
  { id: "berries", categoryId: "produce", name: "Berries", slug: "berries", imageUrl: foodImagePools.produce[2] },
  { id: "milk", categoryId: "dairy", name: "Milk", slug: "milk", imageUrl: foodImagePools.dairy[1] },
  { id: "cheese", categoryId: "dairy", name: "Cheese", slug: "cheese", imageUrl: foodImagePools.dairy[2] },
  { id: "bread", categoryId: "bakery", name: "Bread", slug: "bread", imageUrl: foodImagePools.bakery[1] },
  { id: "pastries", categoryId: "bakery", name: "Pastries", slug: "pastries", imageUrl: foodImagePools.bakery[2] },
  { id: "poultry", categoryId: "meat", name: "Poultry", slug: "poultry", imageUrl: foodImagePools.meat[1] },
  { id: "seafood", categoryId: "meat", name: "Seafood", slug: "seafood", imageUrl: foodImagePools.meat[2] },
  { id: "grains", categoryId: "pantry", name: "Grains & Rice", slug: "grains", imageUrl: foodImagePools.pantry[1] },
  { id: "canned", categoryId: "pantry", name: "Canned Goods", slug: "canned", imageUrl: foodImagePools.pantry[2] },
  { id: "chips", categoryId: "snacks", name: "Chips", slug: "chips", imageUrl: foodImagePools.snacks[1] },
  { id: "cookies", categoryId: "snacks", name: "Cookies", slug: "cookies", imageUrl: foodImagePools.snacks[2] },
  { id: "coffee", categoryId: "beverages", name: "Coffee & Tea", slug: "coffee", imageUrl: foodImagePools.beverages[1] },
  { id: "juices", categoryId: "beverages", name: "Juices", slug: "juices", imageUrl: foodImagePools.beverages[2] },
  { id: "frozen-meals", categoryId: "frozen", name: "Frozen Meals", slug: "frozen-meals", imageUrl: foodImagePools.frozen[1] },
  { id: "ice-cream", categoryId: "frozen", name: "Ice Cream", slug: "ice-cream", imageUrl: foodImagePools.frozen[2] },
];

const subcategoryLookup = subcategories.reduce<Record<string, Subcategory[]>>((acc, sub) => {
  if (!acc[sub.categoryId]) acc[sub.categoryId] = [];
  acc[sub.categoryId].push(sub);
  return acc;
}, {});

const units = ["lb", "oz", "ct", "pack"];
const badges: Array<Product["badge"]> = ["sale", "bogo", "popular", "new", undefined];

const pickImage = (categorySlug: string, index: number) => {
  const pool = foodImagePools[categorySlug] ?? [fallbackImage];
  return pool[index % pool.length];
};

export const buildCatalogData = (count = 10000): CatalogData => {
  const products: Product[] = Array.from({ length: count }, (_, index) => {
    const category = categories[index % categories.length];
    const subcats = subcategoryLookup[category.id] ?? [];
    const subcategory = subcats[index % subcats.length] ?? subcategories[0];

    const price = Number(faker.commerce.price({ min: 1.5, max: 35, dec: 2 }));
    const tags = faker.helpers.arrayElements(
      ["organic", "gluten-free", "vegan", "local", "keto"],
      faker.number.int({ min: 0, max: 2 })
    );

    const namePools: Record<string, string[]> = {
      produce: ["Bananas", "Gala Apples", "Baby Spinach", "Blueberries", "Avocado", "Roma Tomatoes"],
      dairy: ["Whole Milk", "Greek Yogurt", "Cheddar Cheese", "Butter", "Eggs Large Grade A"],
      bakery: ["Sourdough Bread", "Croissant", "Bagels", "Brioche Buns", "Blueberry Muffin"],
      meat: ["Chicken Breast", "Ground Beef", "Salmon Fillet", "Shrimp", "Lamb Chops"],
      pantry: ["Olive Oil", "Pasta Spaghetti", "Basmati Rice", "Black Beans", "Tomato Sauce"],
      snacks: ["Potato Chips", "Granola Bars", "Chocolate Cookies", "Pretzels", "Trail Mix"],
      beverages: ["Orange Juice", "Sparkling Water", "Cold Brew Coffee", "Green Tea", "Lemonade"],
      frozen: ["Frozen Pizza", "Ice Cream Vanilla", "Frozen Berries", "Waffles", "Frozen Veg Mix"],
    };

    const baseName = faker.helpers.arrayElement(namePools[category.id] ?? ["Grocery Item"]);

    return {
      id: faker.string.uuid(),
      sku: faker.string.alphanumeric({ length: 10 }).toUpperCase(),
      title: `${baseName}`,
      description: faker.commerce.productDescription(),
      price,
      imageUrl: pickImage(category.slug, index),
      lqipDataUrl: defaultLqip,
      availableStock: faker.number.int({ min: 0, max: 120 }),
      categoryId: category.id,
      subcategoryId: subcategory.id,
      tags,
      unit: faker.helpers.arrayElement(units),
      badge: faker.helpers.arrayElement(badges),
    };
  });

  return { categories, subcategories, products };
};

export const mockCatalogData = buildCatalogData();
export const productsById = new Map(mockCatalogData.products.map((product) => [product.id, product]));

export const getProductById = (id: string): Product | null => productsById.get(id) ?? null;

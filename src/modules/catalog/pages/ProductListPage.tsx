import { useMemo, useRef, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductGridSkeleton } from "../components/ProductGridSkeleton";
import { AppLayout } from "../../../shared/components/AppLayout";
import { VirtualProductList } from "../components/VirtualProductList";
import {
  IconDiscount,
  IconLeaf,
  IconCarrot,
  IconEggs,
  IconMeat,
  IconBottle,
  IconBread,
  IconCookie,
  IconCoffee,
  IconIceCream,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

export const ProductListPage = () => {
  const { products, categories, isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleByCategory, setVisibleByCategory] = useState<Record<string, number>>({});

  const filteredProducts = useMemo(
    () =>
      activeCategory === "flyers"
        ? products.filter((p) => p.badge === "sale")
        : activeCategory
        ? products.filter((p) => p.categoryId === activeCategory)
        : products,
    [products, activeCategory]
  );

  const activeCategoryData = useMemo(
  () => categories.find(c => c.id === activeCategory),
  [categories, activeCategory]
);

  const categoryScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollCategories = (dir: "left" | "right") => {
    const node = categoryScrollRef.current;
    if (!node) return;
    const amount = 220;
    node.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-900">{activeCategory ? activeCategoryData?.name ?? "Deals" : "All products"}</h2>
        </div>

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar" ref={categoryScrollRef}>
          <CategoryPill
            label="Flyers"
            icon={<IconDiscount size={22} />}
            active={activeCategory === "flyers"}
            onClick={() => setActiveCategory("flyers")}
          />
            {categories.map((cat) => (
              <CategoryPill
                key={cat.id}
                label={cat.name}
                icon={<CategoryIcon categoryId={cat.id} />}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>
          <CategoryScrollButton direction="left" onClick={() => scrollCategories("left")} />
          <CategoryScrollButton direction="right" onClick={() => scrollCategories("right")} />
        </div>

        {isLoading ? (
          <ProductGridSkeleton />
        ) : (
          <VirtualProductList
            key={activeCategory ?? "all"}
            products={filteredProducts}
            initialVisible={visibleByCategory[activeCategory ?? "all"]}
            onVisibleChange={(count) =>
              setVisibleByCategory((prev) => ({
                ...prev,
                [activeCategory ?? "all"]: count,
              }))
            }
          />
        )}
      </div>
    </AppLayout>
  );
};

const CategoryPill = ({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex min-w-[96px] flex-col items-center gap-2 rounded-2xl border px-3 py-2 shadow-sm transition ${
      active ? "border-emerald-600 bg-emerald-50" : "border-gray-200 bg-white hover:border-gray-300"
    }`}
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-gray-100 text-emerald-700">
      {icon}
    </div>
    <span className="text-xs font-semibold text-gray-800">{label}</span>
  </button>
);

const CategoryIcon = ({ categoryId }: { categoryId: string }) => {
  switch (categoryId) {
    case "produce":
      return <IconLeaf size={22} />;
    case "dairy":
      return <IconEggs size={22} />;
    case "bakery":
      return <IconBread size={22} />;
    case "meat":
      return <IconMeat size={22} />;
    case "pantry":
      return <IconCarrot size={22} />;
    case "snacks":
      return <IconCookie size={22} />;
    case "beverages":
      return <IconCoffee size={22} />;
    case "frozen":
      return <IconIceCream size={22} />;
    default:
      return <IconBottle size={22} />;
  }
};

const CategoryScrollButton = ({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label={direction === "left" ? "Previous categories" : "Next categories"}
    className={`absolute top-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white/90 p-2 text-emerald-700 shadow-md transition hover:bg-white ${
      direction === "left" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
    }`}
  >
    {direction === "left" ? <IconChevronLeft size={18} /> : <IconChevronRight size={18} />}
  </button>
);

import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { SmartLazyImage } from "./SmartLazyImage";
import type { Product } from "../../../shared/types/catalog";
import { useCart } from "../../cart/hooks/useCart";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const { addItem, state } = useCart();
  const quantity = state.items[product.id]?.quantity ?? 0;

  return (
    <div
      className="group relative flex h-full flex-col cursor-pointer rounded-2xl bg-white p-3 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative mb-3 overflow-hidden rounded-lg bg-gray-50 aspect-[4/3]">
        <SmartLazyImage src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            addItem(product);
          }}
          className="absolute right-2 top-2 flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md"
        >
          <IconPlus size={16} />
          Add
          {quantity > 0 && <span className="text-[11px] opacity-80">({quantity})</span>}
        </button>
      </div>

      <div className="flex flex-1 flex-col space-y-1">
        <div
          className="text-sm font-semibold leading-tight text-gray-900"
          style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}
        >
          {product.title}
        </div>
        <div className="text-xs text-gray-500">
          {product.unit} • {product.tags.slice(0, 2).join(", ")}
        </div>
        <div className="min-h-[20px]">
          {product.badge && (
            <span className="inline-block rounded bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700">
              {product.badge.toUpperCase()}
            </span>
          )}
        </div>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <span className="text-xs text-gray-500">Many in stock</span>
        </div>
      </div>
    </div>
  );
};

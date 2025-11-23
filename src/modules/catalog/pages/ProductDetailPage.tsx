import { useTransition, useState } from "react";
import { IconArrowLeft, IconPlus, IconHeart, IconListCheck, IconCheck } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { SmartLazyImage } from "../components/SmartLazyImage";
import { useProductById } from "../hooks/useProducts";
import { AppLayout } from "../../../shared/components/AppLayout";
import { useCart } from "../../cart/hooks/useCart";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, isLoading } = useProductById(id);
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);
  const [pulse, setPulse] = useState(false);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="h-64 animate-pulse rounded-xl bg-gray-100" />
        <div className="mt-4 h-6 w-1/2 animate-pulse rounded bg-gray-100" />
      </AppLayout>
    );
  }

  if (!product) {
    return (
      <AppLayout>
        <div className="space-y-3">
          <p className="text-gray-700">No product found.</p>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800"
            onClick={() => startTransition(() => navigate("/"))}
          >
            <IconArrowLeft size={16} />
            Back to market
          </button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-4">
        <button
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700"
          onClick={() => startTransition(() => navigate(-1))}
          disabled={isPending}
        >
          <IconArrowLeft size={16} />
          Back
        </button>

        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <SmartLazyImage src={product.imageUrl} alt={product.title} className="h-[420px] w-full rounded-lg" />
            <div className="flex gap-2 overflow-x-auto">
              {[product.imageUrl, product.imageUrl, product.imageUrl].map((src, idx) => (
                <div key={idx} className="h-16 w-16 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  <SmartLazyImage src={src} alt={`${product.title} thumb ${idx}`} className="h-full w-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="rounded bg-amber-100 px-2 py-1 text-amber-800">New</span>
              <span className="text-gray-500">{product.unit}</span>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
              <p className="mt-1 text-sm text-gray-600">{product.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded bg-yellow-100 px-3 py-1 text-sm font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </div>
              <span className="text-sm text-gray-500">In stock: {product.availableStock}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-base font-semibold text-white shadow-md transition ${
                  pulse ? "bg-emerald-700 scale-[1.02]" : "bg-emerald-600"
                }`}
                onClick={() => {
                  addItem(product);
                  setAdded(true);
                  setPulse(true);
                  setTimeout(() => setPulse(false), 200);
                  setTimeout(() => setAdded(false), 1500);
                }}
              >
                {added ? <IconCheck size={18} /> : <IconPlus size={18} />}
                {added ? "Added!" : "Add to cart"}
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <button className="flex items-center gap-2 text-gray-700">
                <IconHeart size={16} />
                Save
              </button>
              <button className="flex items-center gap-2 text-gray-700">
                <IconListCheck size={16} />
                Add to list
              </button>
            </div>

            <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
              <div className="font-semibold text-gray-800">Details</div>
              <div>Tags: {product.tags.join(", ")}</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

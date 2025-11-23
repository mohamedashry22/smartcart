import { IconSearch, IconShoppingCart, IconMapPin, IconBolt, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface Props {
  totalItems: number;
  onCartOpen: () => void;
}

export const AppHeader = ({ totalItems, onCartOpen }: Props) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex w-full items-center justify-between gap-3 md:w-auto md:flex-none">
          <button className="flex items-center gap-2" onClick={() => navigate("/")} aria-label="Go to homepage">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white text-lg font-bold">
              🥕
            </div>
            <span className="text-sm font-semibold text-gray-900 md:text-base">smartcart</span>
          </button>
          <div className="flex items-center gap-2 md:hidden">
            <button className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
              Mohamed
            </button>
            <button
              onClick={onCartOpen}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md"
              aria-label="Cart"
            >
              <IconShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-emerald-700 shadow">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex w-full items-center justify-between text-xs text-gray-600 md:hidden">
          <div className="flex items-center gap-1">
            <IconMapPin size={16} />
            Maadi
          </div>
          <div className="flex items-center gap-1 text-emerald-600">
            <IconBolt size={16} />
            ETA 4:02pm
          </div>
        </div>

        <div className="hidden flex-1 items-center gap-3 md:flex">
          <div className="flex w-full flex-1 items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 shadow-sm">
            <IconSearch size={18} className="text-gray-500" />
            <input
              className="w-full bg-transparent text-sm focus:outline-none"
              placeholder='Try "fruits for ice cream toppings"'
              aria-label="Search for groceries"
            />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800">
            Delivery
          </div>

          <div className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-gray-700">
            <IconMapPin size={18} className="text-gray-600" />
            Maadi, Cairo
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
            <IconBolt size={18} />
            Delivery by 4:02-4:15pm
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 lg:flex">
            <IconUser size={18} />
            Mohamed Ashry
          </div>
        </div>

        <button
          onClick={onCartOpen}
          className="relative hidden h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md md:flex"
          aria-label="Cart"
        >
          <IconShoppingCart size={20} />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-emerald-700 shadow">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

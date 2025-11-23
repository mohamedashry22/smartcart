import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import type { Product } from "../../../shared/types/catalog";
import { ProductCard } from "./ProductCard";
import { LoadMoreStatus } from "./load-more-status";

interface Props {
  products: Product[];
  initialVisible?: number;
  onVisibleChange?: (count: number) => void;
}

const getColumnsForWidth = (width: number) => {
  if (width >= 1600) return 5;
  if (width >= 1280) return 4;
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
};

const gridColumnsClass = (columns: number) => {
  const map: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  };
  return map[columns] ?? "grid-cols-1";
};

export const VirtualProductList = ({ products, initialVisible, onVisibleChange }: Props) => {
  const [columns, setColumns] = useState(() => (typeof window !== "undefined" ? getColumnsForWidth(window.innerWidth) : 2));
  const [visibleCount, setVisibleCount] = useState(() => initialVisible ?? 40);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingRef = useRef(false);
  const lastReportedCountRef = useRef<number | null>(null);

  useEffect(() => {
    const handler = () =>
      setColumns((prev) => {
        const next = getColumnsForWidth(window.innerWidth);
        return prev === next ? prev : next;
      });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (onVisibleChange && lastReportedCountRef.current !== visibleCount) {
      lastReportedCountRef.current = visibleCount;
      onVisibleChange(visibleCount);
    }
  }, [visibleCount, onVisibleChange]);

  const requestMore = useCallback(() => {
    if (loadingRef.current) return;
    if (visibleCount >= products.length) return;
    loadingRef.current = true;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 40, products.length));
      loadingRef.current = false;
      setIsLoadingMore(false);
    }, 700);
  }, [visibleCount, products.length]);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 600;
      if (nearBottom) {
        requestMore();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [products.length, requestMore]);

  const visibleProducts = useMemo(
    () => products.slice(0, Math.min(visibleCount, products.length)),
    [products, visibleCount]
  );
  const shouldVirtualize = columns >= 4;
  const rowCount = useMemo(() => Math.ceil(visibleProducts.length / columns), [visibleProducts.length, columns]);
  const gridClass = gridColumnsClass(columns);
  const paddingClass = columns === 1 ? "px-1" : "";

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 370,
    overscan: 4,
  });

  useEffect(() => {
    rowVirtualizer.measure();
  }, [rowVirtualizer, rowCount]);

  const virtualItems = rowVirtualizer.getVirtualItems();
  if (!shouldVirtualize) {
    return (
      <div>
        <div className={`grid gap-4 pb-8 ${gridClass} ${paddingClass}`}>
          {visibleProducts.map((product) => (
            <div key={product.id} className="min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <LoadMoreStatus
          hasMore={visibleCount < products.length}
          isLoading={isLoadingMore}
          onLoadMore={requestMore}
          columns={columns}
          gridClass={gridClass}
          paddingClass={paddingClass}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="relative pb-8" style={{ height: rowVirtualizer.getTotalSize() }}>
        {virtualItems.map((virtualRow) => {
          const startIndex = virtualRow.index * columns;
          const rowItems = visibleProducts.slice(startIndex, startIndex + columns);
          return (
            <div
              key={virtualRow.key}
              className="absolute left-0 top-0 w-full pb-4"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <div className={`grid gap-4 ${gridClass}`}>
                {rowItems.map((product) => (
                  <div key={product.id} className="min-w-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <LoadMoreStatus
        hasMore={visibleCount < products.length}
        isLoading={isLoadingMore}
        onLoadMore={requestMore}
        columns={columns}
        gridClass={gridClass}
        paddingClass={paddingClass}
      />
    </div>
  );
};


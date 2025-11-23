import { SkeletonRow } from "./SkeletonRow";

interface Props {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  columns: number;
  gridClass: string;
  paddingClass: string;
}

export const LoadMoreStatus = ({ hasMore, isLoading, onLoadMore, columns, gridClass, paddingClass }: Props) => (
  <div className="flex flex-col items-center gap-3 py-4">
    {isLoading && <SkeletonRow columns={columns} gridClass={gridClass} paddingClass={paddingClass} />}
    {isLoading ? (
      <div className="flex items-center gap-2 text-gray-500">
        <span className="h-3 w-3 animate-ping rounded-full bg-emerald-500" />
        <p className="text-sm">Loading more products…</p>
      </div>
    ) : hasMore ? (
      <button
        className="rounded-full border border-gray-200 px-4 py-1 text-sm font-semibold text-gray-700 transition hover:border-gray-300"
        onClick={onLoadMore}
      >
        Load more
      </button>
    ) : (
      <p className="text-xs text-gray-400">You’ve reached the end</p>
    )}
  </div>
);

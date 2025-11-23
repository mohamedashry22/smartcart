interface Props {
  columns: number;
  gridClass: string;
  paddingClass: string;
}

export const SkeletonRow = ({ columns, gridClass, paddingClass }: Props) => {
  const count = Math.max(1, Math.min(columns, 4));
  return (
    <div className={`grid w-full gap-3 ${gridClass} ${paddingClass}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="rounded-2xl bg-white p-3 shadow-sm">
          <div className="h-40 w-full animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-3 space-y-2">
            <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
};

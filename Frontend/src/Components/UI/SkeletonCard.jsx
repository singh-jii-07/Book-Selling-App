import React from "react";

const SkeletonCard = ({ variant = "grid" }) => {
  if (variant === "list") {
    return (
      <div className="card-dark flex gap-5 p-4">
        <div className="shimmer w-20 h-28 rounded-lg shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="shimmer h-4 rounded-lg w-3/4" />
          <div className="shimmer h-3 rounded-lg w-1/2" />
          <div className="shimmer h-3 rounded-lg w-1/4 mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="card-dark overflow-hidden">
      <div className="shimmer w-full h-56" />
      <div className="p-4 space-y-3">
        <div className="shimmer h-4 rounded-lg w-4/5" />
        <div className="shimmer h-3 rounded-lg w-3/5" />
        <div className="shimmer h-3 rounded-lg w-2/5 mt-2" />
        <div className="flex justify-between items-center mt-4">
          <div className="shimmer h-5 rounded-lg w-16" />
          <div className="shimmer h-8 rounded-lg w-20" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 8, variant = "grid" }) => (
  <div className={variant === "grid"
    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    : "flex flex-col gap-4"
  }>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} variant={variant} />
    ))}
  </div>
);

export default SkeletonCard;

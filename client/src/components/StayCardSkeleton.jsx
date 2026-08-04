const StayCardSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white">

      {/* Image skeleton */}
      <div className="h-56 bg-gray-300 animate-pulse"></div>


      <div className="p-4 space-y-3">

        {/* Title */}
        <div className="h-5 bg-gray-300 rounded animate-pulse w-3/4"></div>

        {/* Location */}
        <div className="h-4 bg-gray-300 rounded animate-pulse w-1/2"></div>

        {/* Price */}
        <div className="h-5 bg-gray-300 rounded animate-pulse w-1/3"></div>

      </div>

    </div>
  );
};

export default StayCardSkeleton;
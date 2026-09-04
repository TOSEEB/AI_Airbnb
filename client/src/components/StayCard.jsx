import { Link, useSearchParams } from "react-router-dom";
import { FavoriteButton } from "../context/FavoriteContext";

const StayCard = ({ stay }) => {
  const [params] = useSearchParams();
  const query = params.toString();
  const to = query ? `/stay/${stay._id}?${query}` : `/stay/${stay._id}`;

  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <FavoriteButton
        stayId={stay._id}
        className="absolute top-3 right-3 z-10"
      />

      <Link to={to} className="block cursor-pointer">
        <img
          src={stay.images?.[0]}
          alt={stay.title}
          className="w-full h-56 object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400?text=No+Image";
          }}
        />

        <div className="p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold pr-8">
              {stay.title}
            </h2>

            <span className="text-yellow-500 font-bold">
              ⭐ {stay.rating}
            </span>
          </div>

          <p className="text-gray-500 mt-1">
            {stay.location}
          </p>

          <p className="mt-3 text-gray-700 line-clamp-2">
            {stay.description}
          </p>

          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span>🛏 {stay.bedrooms} Bedrooms</span>
            <span>👥 {stay.guests} Guests</span>
          </div>

          <div className="flex justify-between items-center mt-5">
            <span className="font-bold text-rose-500 text-lg">
              ₹{stay.price}/night
            </span>

            <span className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StayCard;

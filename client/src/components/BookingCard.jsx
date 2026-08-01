import { Link } from "react-router-dom";

const BookingCard = ({ booking }) => {
  if (!booking) return null;

  const stay = booking.stay || {};

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300">
      <img
        src={stay.images?.[0]}
        alt={stay.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-semibold">
          {stay.title}
        </h2>

        <p className="text-gray-500 mt-1">
          📍 {stay.location}
        </p>

        <div className="mt-4 space-y-2 text-gray-700">
          <p>
            <strong>Check In:</strong>{" "}
            {booking.checkIn
              ? new Date(booking.checkIn).toLocaleDateString()
              : "-"}
          </p>

          <p>
            <strong>Check Out:</strong>{" "}
            {booking.checkOut
              ? new Date(booking.checkOut).toLocaleDateString()
              : "-"}
          </p>

          <p>
            <strong>Guests:</strong> {booking.guests}
          </p>

          <p className="text-rose-500 font-bold text-lg">
            ₹{booking.totalPrice}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="text-green-600 capitalize">
              {booking.status}
            </span>
          </p>
        </div>

        <Link
          to={`/stay/${stay._id}`}
          className="block mt-6 text-center bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl transition"
        >
          View Stay
        </Link>
      </div>
    </div>
  );
};

export default BookingCard; 

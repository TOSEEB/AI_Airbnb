import { Link } from "react-router-dom";

const BookingCard = ({ booking, onCancel }) => {
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
            <span
              className={`capitalize ${
                booking.status === "confirmed"
                  ? "text-green-600"
                  : booking.status === "pending"
                    ? "text-amber-600"
                    : "text-gray-600"
              }`}
            >
              {booking.status}
            </span>
          </p>

          {booking.status === "pending" && booking.holdExpiresAt && (
            <p className="text-sm text-amber-700">
              Complete payment by{" "}
              {new Date(booking.holdExpiresAt).toLocaleTimeString()} to keep
              these dates.
            </p>
          )}
        </div>

        <Link
          to={stay._id ? `/stay/${stay._id}` : "/stays"}
          className="block mt-6 text-center bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl transition"
        >
          View Stay
        </Link>

        {booking.status === "pending" && onCancel && (
          <button
            type="button"
            onClick={() => onCancel(booking._id)}
            className="block w-full mt-3 text-center border border-gray-300 py-3 rounded-xl hover:bg-gray-50"
          >
            Release hold
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;

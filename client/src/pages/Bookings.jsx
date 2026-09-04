import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import BookingCard from "../components/BookingCard";
import Loader from "../components/Loader";

import { cancelBooking, getBookings } from "../api/bookingApi";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Unable to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      toast.success("Hold released");
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not cancel hold");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;

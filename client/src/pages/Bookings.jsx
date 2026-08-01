import { useEffect, useState } from "react";

import BookingCard from "../components/BookingCard";
import Loader from "../components/Loader";

import { getBookings } from "../api/bookingApi";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">

        My Bookings

      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
          />
        ))}

      </div>

    </div>
  );
};

export default Bookings;
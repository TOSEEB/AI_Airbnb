import { useEffect, useState } from "react";

import Loader from "../components/Loader";
import BookingCard from "../components/BookingCard";
import ReviewCard from "../components/ReviewCard";

import { getDashboard } from "../api/dashboardApi";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!dashboard) return <Loader />;

  return (
    <div className="container mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        My Bookings
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {dashboard.bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
          />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        My Reviews
      </h2>

      {dashboard.reviews.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
        />
      ))}
    </div>
  );
};

export default Dashboard;
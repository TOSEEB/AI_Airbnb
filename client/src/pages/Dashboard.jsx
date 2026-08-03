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



      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">


        <div className="border rounded-xl p-6 shadow">

          <h3 className="text-gray-500">
            Total Bookings
          </h3>

          <p className="text-3xl font-bold mt-2">
            {dashboard.bookings.length}
          </p>

        </div>



        <div className="border rounded-xl p-6 shadow">

          <h3 className="text-gray-500">
            Total Reviews
          </h3>

          <p className="text-3xl font-bold mt-2">
            {dashboard.reviews.length}
          </p>

        </div>



        <div className="border rounded-xl p-6 shadow">

          <h3 className="text-gray-500">
            Account Status
          </h3>

          <p className="text-3xl font-bold mt-2">
            Active
          </p>

        </div>


      </div>





      {/* Recent Booking */}

      <h2 className="text-2xl font-semibold mb-4">

        Recent Booking

      </h2>



      <div className="grid md:grid-cols-2 gap-6">


        {
          dashboard.bookings
            .slice(0, 2)
            .map((booking) => (

              <BookingCard
                key={booking._id}
                booking={booking}
              />

            ))
        }


        {
          dashboard.bookings.length === 0 && (

            <p className="text-gray-500">
              No bookings yet.
            </p>

          )
        }


      </div>






      {/* Recent Reviews */}

      <h2 className="text-2xl font-semibold mt-10 mb-4">

        Recent Reviews

      </h2>



      <div className="space-y-4">


        {
          dashboard.reviews
            .slice(0, 3)
            .map((review) => (

              <ReviewCard
                key={review._id}
                review={review}
              />

            ))
        }



        {
          dashboard.reviews.length === 0 && (

            <p className="text-gray-500">
              No reviews yet.
            </p>

          )
        }


      </div>


    </div>

  );

};


export default Dashboard;
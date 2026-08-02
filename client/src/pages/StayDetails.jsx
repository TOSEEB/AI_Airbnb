import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";

import Loader from "../components/Loader";
import ReviewCard from "../components/ReviewCard";

import { getStayById } from "../api/stayApi";
import { getReviews } from "../api/reviewApi";
import {
  createBooking,
  createPaymentOrder,
  verifyPayment,
} from "../api/bookingApi";

const StayDetails = () => {
  const { id } = useParams();

  const [stay, setStay] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [tripSummary, setTripSummary] = useState(null); 


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const stayRes = await getStayById(id);
      setStay(stayRes.data);

      const reviewRes = await getReviews(id);
      setReviews(reviewRes.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


 

 const bookStay = async () => {
  if (!checkIn || !checkOut) {
    return toast.error(
      "Please select check-in and check-out dates."
    );
  }

  if (new Date(checkOut) <= new Date(checkIn)) {
    return toast.error(
      "Check-out date must be after check-in."
    );
  }

  if (guests < 1) {
    return toast.error(
      "Please enter valid guests."
    );
  }

  try {
    setBookingLoading(true);

    // Create Razorpay Order
    const orderRes = await createPaymentOrder({
  stayId: id,
  checkIn,
  checkOut,
  guests,
});

const { order, tripSummary } = orderRes.data;

setTripSummary(tripSummary);

    

  const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,

  amount: order.amount,

  currency: order.currency,

  name: "AIbnb",

  description: "Stay Booking",

  order_id: order.id,

  handler: async function (response) {
    try {
      await verifyPayment(response);

      await createBooking({
        stayId: id,
        checkIn,
        checkOut,
        guests,
      });

      toast.success("Booking Confirmed!");

      setCheckIn("");
      setCheckOut("");
      setGuests(1);
      setTripSummary(null);

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Payment verification failed."
      );
    }
  },

  theme: {
    color: "#F43F5E",
  },
};

    const razorpay = new window.Razorpay(options);

    razorpay.on("payment.failed", function (response) {
  toast.error("Payment Failed!");

  console.log(response.error);
});

    razorpay.open();

  } catch (err) {

    console.error(err);

    toast.error(
      err.response?.data?.message ||
      "Unable to start payment."
    );

  } finally {

    setBookingLoading(false);

  }
}; 


  if (loading) return <Loader />;


  return (
    <div className="max-w-7xl mx-auto px-6 py-10">


      <h1 className="text-4xl font-bold">
        {stay.title}
      </h1>


      <div className="flex items-center gap-4 mt-3 text-gray-600">
        <span>
          ⭐ {stay.rating}
        </span>

        <span>
          {stay.location}
        </span>
      </div>



      <div className="mt-8">

        <img
          src={stay.images[selectedImage]}
          alt={stay.title}
          className="w-full h-[550px] object-cover rounded-2xl shadow-lg"
        />


        <div className="grid grid-cols-5 gap-3 mt-4">

          {stay.images.map((image,index)=>(

            <img
              key={index}
              src={image}
              alt={`Property ${index+1}`}
              onClick={() =>
                setSelectedImage(index)
              }
              className={`h-28 w-full object-cover rounded-xl cursor-pointer border-4 ${
                selectedImage === index
                  ? "border-rose-500"
                  : "border-transparent"
              }`}
            />

          ))}

        </div>

      </div>




      <div className="grid lg:grid-cols-3 gap-10 mt-10">


        <div className="lg:col-span-2">


          <h2 className="text-3xl font-semibold">
            Entire {stay.category}
          </h2>


          <div className="flex gap-6 mt-3 text-gray-600">

            <span>
              🛏 {stay.bedrooms} Bedrooms
            </span>

            <span>
              👥 {stay.guests} Guests
            </span>

          </div>


          <hr className="my-8" />


          <h3 className="text-2xl font-semibold mb-4">
            About this place
          </h3>


          <p className="text-gray-700 leading-8">
            {stay.description}
          </p>


          <hr className="my-10" />


          <h2 className="text-3xl font-bold mb-6">
            Reviews
          </h2>


          {reviews.length > 0 ? (

            reviews.map((review)=>(

              <ReviewCard
                key={review._id}
                review={review}
              />

            ))

          ) : (

            <p className="text-gray-500">
              No reviews yet.
            </p>

          )}


        </div>




        <div>


          <div className="sticky top-24 border rounded-2xl shadow-xl p-6">


            <h2 className="text-3xl font-bold text-rose-500">

              ₹{stay.price}

              <span className="text-lg text-gray-600 font-normal">
                {" "}
                / night
              </span>

            </h2>



            <div className="mt-6 space-y-4">


              <input
                type="date"
                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                value={checkIn}
                onChange={(e)=>
                  setCheckIn(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />



              <input
                type="date"
                min={
                  checkIn ||
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                value={checkOut}
                onChange={(e)=>
                  setCheckOut(e.target.value)
                }
                className="w-full border rounded-lg p-3"
              />



              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e)=>
                  setGuests(Number(e.target.value))
                }
                className="w-full border rounded-lg p-3"
              />


            </div>



            {/* PRICE SUMMARY */}
            {/* PRICE SUMMARY */}

{tripSummary && (
  <div className="border-t mt-6 pt-5">

    <h3 className="text-lg font-semibold mb-4">
      Price Details
    </h3>

    <div className="flex justify-between text-gray-700 mb-3">
      <span>
        ₹{tripSummary.nightlyRate.toLocaleString()} × {tripSummary.nights}{" "}
        {tripSummary.nights === 1 ? "night" : "nights"}
      </span>

      <span>
        ₹{tripSummary.subtotal.toLocaleString()}
      </span>
    </div>

    <hr className="my-4" />

    <div className="flex justify-between text-xl font-bold">
      <span>Total</span>

      <span>
        ₹{tripSummary.total.toLocaleString()}
      </span>
    </div>

  </div>
)}




            <button
              onClick={bookStay}
              disabled={bookingLoading}
              className="w-full mt-6 bg-rose-500 text-white py-4 rounded-xl font-semibold hover:bg-rose-600 transition disabled:opacity-50"
            >

              {
                bookingLoading
                  ? "Booking..."
                  : "Reserve"
              }

            </button>



            <p className="text-center text-gray-500 mt-4 text-sm">
  Secure payments powered by Razorpay
</p>


          </div>


        </div>


      </div>


    </div>
  );
};


export default StayDetails;
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";

import Loader from "../components/Loader";
import ReviewCard from "../components/ReviewCard";

import { getStayById } from "../api/stayApi";
import { getReviews } from "../api/reviewApi";
import { createBooking } from "../api/bookingApi";

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
    return toast.error("Please select check-in and check-out dates.");
  }

  if (new Date(checkOut) <= new Date(checkIn)) {
    return toast.error("Check-out date must be after check-in.");
  }

  if (guests < 1) {
    return toast.error("Please enter a valid number of guests.");
  }

  try {
    setBookingLoading(true);

    await createBooking({
      stayId: id,
      checkIn,
      checkOut,
      guests,
    });

    toast.success("Booking successful!");

    setCheckIn("");
    setCheckOut("");
    setGuests(1);

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Booking failed"
    );
  } finally {
    setBookingLoading(false);
  }
};

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Title */}
      <h1 className="text-4xl font-bold">
        {stay.title}
      </h1>

      <div className="flex items-center gap-4 mt-3 text-gray-600">
        <span>⭐ {stay.rating}</span>
        <span>{stay.location}</span>
      </div>

      {/* Image Gallery */}
      <div className="mt-8">

        <img
          src={stay.images[selectedImage]}
          alt={stay.title}
          className="w-full h-[550px] object-cover rounded-2xl shadow-lg"
        />

        <div className="grid grid-cols-5 gap-3 mt-4">
          {stay.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Property ${index + 1}`}
              onClick={() => setSelectedImage(index)}
              className={`h-28 w-full object-cover rounded-xl cursor-pointer transition duration-300 border-4 ${
                selectedImage === index
                  ? "border-rose-500"
                  : "border-transparent hover:border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-10 mt-10">

        {/* Left Side */}
        <div className="lg:col-span-2">

          <h2 className="text-3xl font-semibold">
            Entire {stay.category}
          </h2>

          <div className="flex gap-6 mt-3 text-gray-600">
            <span>🛏 {stay.bedrooms} Bedrooms</span>
            <span>👥 {stay.guests} Guests</span>
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
            reviews.map((review) => (
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

        {/* Booking Card */}
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
  min={new Date().toISOString().split("T")[0]}
  value={checkIn}
  onChange={(e) => setCheckIn(e.target.value)}
  className="w-full border rounded-lg p-3"
/>

             <input
  type="date"
  min={checkIn || new Date().toISOString().split("T")[0]}
  value={checkOut}
  onChange={(e) => setCheckOut(e.target.value)}
  className="w-full border rounded-lg p-3"
/>

              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border rounded-lg p-3"
              />

            </div>

            <button
  onClick={bookStay}
  disabled={bookingLoading}
  className="w-full mt-6 bg-rose-500 text-white py-4 rounded-xl font-semibold hover:bg-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {bookingLoading ? "Booking..." : "Reserve"}
</button>

            <p className="text-center text-gray-500 mt-4">
              You won't be charged yet.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StayDetails;
import { useState } from "react";
import { toast } from "react-toastify";

import {
  createBooking,
  createPaymentOrder,
  verifyPayment,
} from "../../api/bookingApi";


const ReservationCard = ({ stay, id }) => {

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [tripSummary, setTripSummary] = useState(null);


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

        handler: async function(response) {

          try {

            await verifyPayment(response);

            await createBooking({
              stayId: id,
              checkIn,
              checkOut,
              guests,
            });

            toast.success(
              "Booking Confirmed!"
            );

            setCheckIn("");
            setCheckOut("");
            setGuests(1);
            setTripSummary(null);

          } catch(err) {

            toast.error(
              err.response?.data?.message ||
              "Payment verification failed."
            );

          }

        },

        theme: {
          color: "#F43F5E",
        }

      };


      const razorpay = new window.Razorpay(options);


     razorpay.on(
  "payment.failed",
  function(response) {

    toast.error("Payment Failed!");

    setBookingLoading(false);

    console.log(response.error);

  }
);


      razorpay.open();


    } catch(err) {

      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Unable to start payment."
      );

    } finally {

      setBookingLoading(false);

    }

  };


  return (

    <div className="sticky top-24 border rounded-2xl shadow-xl p-6">

      <h2 className="text-3xl font-bold text-rose-500">

        ₹{stay.price}

        <span className="text-lg text-gray-600 font-normal">
          {" "} / night
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


      {
        tripSummary && (

          <div className="border-t mt-6 pt-5">

            <h3 className="text-lg font-semibold mb-4">
              Price Details
            </h3>


            <div className="flex justify-between text-gray-700 mb-3">

              <span>
                ₹{tripSummary.nightlyRate.toLocaleString()}
                {" × "}
                {tripSummary.nights} nights
              </span>


              <span>
                ₹{tripSummary.subtotal.toLocaleString()}
              </span>

            </div>


            <hr className="my-4" />


            <div className="flex justify-between text-xl font-bold">

              <span>
                Total
              </span>


              <span>
                ₹{tripSummary.total.toLocaleString()}
              </span>

            </div>

          </div>

        )
      }


      <button
        onClick={bookStay}
        disabled={bookingLoading}
        className="w-full mt-6 bg-rose-500 text-white py-4 rounded-xl font-semibold hover:bg_rose-600 transition disabled:opacity-50"
      >

        {
          bookingLoading
          ?
          "Processing..."
          :
          "Reserve"
        }

      </button>


      <p className="text-center text-gray-500 mt-4 text-sm">
        Secure payments powered by Razorpay
      </p>


    </div>

  );

};


export default ReservationCard;
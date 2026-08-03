import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../components/Loader";

import { getStayById } from "../api/stayApi";
import { getReviews } from "../api/reviewApi";

import ImageGallery from "../components/stay/ImageGallery";
import StayInfo from "../components/stay/StayInfo";
import ReviewsSection from "../components/stay/ReviewSection";
import AIStayAssistant from "../components/stay/AIStayAssistant";
import AIChatAssistant from "../components/stay/AIChatAssistant";
import ReservationCard from "../components/stay/ReservationCard";

const StayDetails = () => {
  const { id } = useParams();

  const [stay, setStay] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top whenever a new property opens
    window.scrollTo(0, 0);

    fetchData();
  }, [id]);

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

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* TITLE */}
      <h1 className="text-4xl font-bold">
        {stay.title}
      </h1>

      <div className="flex items-center gap-4 mt-3 text-gray-600">
        <span>⭐ {stay.rating}</span>
        <span>{stay.location}</span>
      </div>

      {/* IMAGE GALLERY */}
      <ImageGallery images={stay.images} />

      <div className="grid lg:grid-cols-3 gap-10 mt-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2">

          <StayInfo stay={stay} />

          <hr className="my-10" />

          <ReviewsSection reviews={reviews} />

          {/* AI Stay Recommendation */}
          <AIStayAssistant stay={stay} />

          {/* AI Chat Assistant */}
          <AIChatAssistant stay={stay} />

        </div>

        {/* RIGHT SIDE */}
        <div>
          <ReservationCard
            stay={stay}
            id={id}
          />
        </div>

      </div>
    </div>
  );
};

export default StayDetails;
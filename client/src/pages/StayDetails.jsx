import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { FavoriteButton } from "../context/FavoriteContext";

import { getStayById } from "../api/stayApi";
import { getReviewEligibility, getReviews } from "../api/reviewApi";

import ImageGallery from "../components/stay/ImageGallery";
import StayInfo from "../components/stay/StayInfo";
import ReviewsSection from "../components/stay/ReviewSection";
import AIStayAssistant from "../components/stay/AIStayAssistant";
import AIChatAssistant from "../components/stay/AIChatAssistant";
import ReservationCard from "../components/stay/ReservationCard";

const StayDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [stay, setStay] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [id, user?.id]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    setStay(null);

    try {
      const stayRes = await getStayById(id);
      setStay(stayRes.data);

      const reviewRes = await getReviews(id);
      setReviews(Array.isArray(reviewRes.data) ? reviewRes.data : []);

      if (user) {
        const eligibility = await getReviewEligibility(id);
        setCanReview(Boolean(eligibility.data?.canReview));
      } else {
        setCanReview(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Stay not found");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (error || !stay) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Stay not found</h1>
        <p className="text-gray-600 mb-8">
          {error || "This listing may have been removed."}
        </p>
        <Link
          to="/"
          className="inline-block bg-rose-500 text-white px-6 py-3 rounded-xl"
        >
          Back to stays
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">{stay.title}</h1>
          <div className="flex items-center gap-4 mt-3 text-gray-600">
            <span>⭐ {stay.rating}</span>
            <span>{stay.location}</span>
          </div>
        </div>
        <FavoriteButton stayId={stay._id} />
      </div>

      <ImageGallery images={stay.images} />

      <div className="grid lg:grid-cols-3 gap-10 mt-10">
        <div className="lg:col-span-2">
          <StayInfo stay={stay} />

          <hr className="my-10" />

          <ReviewsSection
            stayId={id}
            reviews={reviews}
            canReview={canReview}
            onReviewCreated={(review) => {
              setReviews((prev) => [review, ...prev]);
              setCanReview(false);
            }}
          />

          <AIStayAssistant stay={stay} />
          <AIChatAssistant stay={stay} />
        </div>

        <div>
          <ReservationCard stay={stay} id={id} />
        </div>
      </div>
    </div>
  );
};

export default StayDetails;

import { useState } from "react";
import { toast } from "react-toastify";
import ReviewCard from "../ReviewCard";
import { createReview } from "../../api/reviewApi";

const ReviewsSection = ({
  stayId,
  reviews,
  canReview,
  onReviewCreated,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      const res = await createReview({
        stayId,
        rating: Number(rating),
        comment,
      });
      toast.success("Review published");
      setComment("");
      setRating(5);
      onReviewCreated?.(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not submit review");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Reviews</h2>

      {canReview && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 border rounded-2xl p-5 mb-8 space-y-4"
        >
          <p className="font-semibold">Share your stay</p>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border rounded-lg p-3 bg-white"
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} star{value === 1 ? "" : "s"}
              </option>
            ))}
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What was the stay like?"
            className="w-full border rounded-lg p-3 min-h-28"
            required
          />

          <button
            type="submit"
            disabled={saving}
            className="bg-rose-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-rose-600 disabled:opacity-50"
          >
            {saving ? "Publishing..." : "Submit review"}
          </button>
        </form>
      )}

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsSection;

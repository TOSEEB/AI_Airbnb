const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 mb-4">
      <div className="flex justify-between">
        <h3 className="font-semibold">
          {review.user?.name || "Anonymous"}
        </h3>

        <span className="text-yellow-500">
          ⭐ {review.rating}
        </span>
      </div>

      <p className="text-gray-700 mt-3">
        {review.comment}
      </p>

      <p className="text-sm text-gray-500 mt-3">
        {review.createdAt
          ? new Date(review.createdAt).toLocaleDateString()
          : ""}
      </p>
    </div>
  );
};

export default ReviewCard;
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import http from "../lib/http";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [isEligible, setIsEligible] = useState(false);
  const [summary, setSummary] = useState({ average_rating: 0, total_reviews: 0 });
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchReviewsAndSummary = async () => {
    try {
      const resReviews = await http(`/api/products/${productId}/reviews?limit=10`);
      if (resReviews.ok) {
        const data = await resReviews.json();
        if (data.success && data.data) {
          setReviews(data.data);
        }
      }

      const resSummary = await http(`/api/products/${productId}/rating`);
      if (resSummary.ok) {
        const data = await resSummary.json();
        if (data.success && data.data) {
          setSummary(data.data);
        }
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkEligibility = async () => {
    try {
      const userStr = localStorage.getItem("currentUserSession");
      if (!userStr) return;
      const userSession = JSON.parse(userStr);
      const token = userSession?.token || userSession?.user?.token;
      if (!token) return;

      const response = await http(`/api/products/${productId}/reviews/eligible`, null, { method: "GET", token });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsEligible(data.eligible);
        }
      }
    } catch (err) {
      console.error("Eligibility check failed:", err);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviewsAndSummary();
      checkEligibility();
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMsg("Review message cannot be empty.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const userStr = localStorage.getItem("currentUserSession");
      const userSession = JSON.parse(userStr);
      const token = userSession?.token || userSession?.user?.token;

      const payload = {
        product_id: parseInt(productId, 10),
        message,
        rating
      };

      const response = await http(`/api/reviews`, payload, { method: "POST", token });
      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg("Review submitted successfully!");
        setMessage("");
        setRating(5);
        setIsEligible(false); // Can't review again immediately unless they buy another one
        fetchReviewsAndSummary();
      } else {
        setErrorMsg(data.message || data.error || "Failed to submit review.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setErrorMsg("An error occurred while submitting.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Loading reviews...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8 border-b pb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
        <div className="flex items-center gap-4">
          <div className="text-5xl font-bold text-gray-900">
            {summary.average_rating.toFixed(1)}
          </div>
          <div>
            <div className="flex text-orange-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.round(summary.average_rating) ? "fill-orange-400 text-orange-400" : "text-gray-300"}
                />
              ))}
            </div>
            <p className="text-gray-500 text-sm">Based on {summary.total_reviews} reviews</p>
          </div>
        </div>
      </div>

      {isEligible && (
        <div className="bg-gray-50 p-6 rounded-lg mb-10 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Write a Review</h3>
          {errorMsg && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">{errorMsg}</div>}
          {successMsg && <div className="mb-4 text-green-600 bg-green-50 p-3 rounded">{successMsg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      size={28}
                      className={star <= rating ? "fill-orange-400 text-orange-400" : "text-gray-300 hover:text-orange-300"}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded p-3 focus:ring-orange-500 focus:border-orange-500"
                placeholder="What did you think about this product?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={submitting}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded transition disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}

      <div>
        {reviews.length === 0 ? (
          <p className="text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold uppercase overflow-hidden">
                    {review.user_profile_image ? (
                      <img src={review.user_profile_image} alt={review.user_name} className="w-full h-full object-cover" />
                    ) : (
                      review.user_name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.user_name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex text-orange-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < review.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(review.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mt-3">{review.message}</p>
                <div className="mt-2 text-xs font-medium text-green-600 flex items-center gap-1">
                  ✓ Verified Buyer
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;

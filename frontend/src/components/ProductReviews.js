import React, { useState, useEffect } from "react";
import "../assets/styles/ProductReviews.css";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ averageRating: 0, reviewCount: 0 });
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchReviews();
    fetchStats();
    if (user) {
      checkUserReview();
    }
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/reviews/product/${productId}`
      );
      const data = await response.json();
      setReviews(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load reviews");
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/reviews/product/${productId}/stats`
      );
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const checkUserReview = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/reviews/product/${productId}/user/${user.id}/exists`
      );
      const data = await response.json();
      setHasReviewed(data.hasReviewed);
    } catch (err) {
      console.error("Failed to check user review:", err);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to submit a review");
      return;
    }

    const review = {
      productId: productId,
      userId: user.id,
      userName: user.name || user.username,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    try {
      const response = await fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      if (response.ok) {
        setNewReview({ rating: 5, comment: "" });
        setShowReviewForm(false);
        setHasReviewed(true);
        fetchReviews();
        fetchStats();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to submit review");
      }
    } catch (err) {
      alert("Error submitting review");
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? "star filled" : "star"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderRatingSelector = () => {
    return (
      <div className="rating-selector">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= newReview.rating ? "star filled" : "star"}
            onClick={() => setNewReview({ ...newReview, rating: star })}
            style={{ cursor: "pointer", fontSize: "24px" }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="reviews-loading">Loading reviews...</div>;
  if (error) return <div className="reviews-error">{error}</div>;

  return (
    <div className="product-reviews">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        <div className="reviews-summary">
          <div className="average-rating">
            {renderStars(Math.round(stats.averageRating))}
            <span className="rating-number">
              {stats.averageRating.toFixed(1)} out of 5
            </span>
          </div>
          <div className="review-count">
            Based on {stats.reviewCount} review
            {stats.reviewCount !== 1 ? "s" : ""}
          </div>
        </div>

        {user && !hasReviewed && (
          <button
            className="write-review-btn"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? "Cancel" : "Write a Review"}
          </button>
        )}

        {hasReviewed && (
          <div className="already-reviewed">
            You have already reviewed this product
          </div>
        )}
      </div>

      {showReviewForm && (
        <form className="review-form" onSubmit={handleSubmitReview}>
          <h3>Write Your Review</h3>
          <div className="form-group">
            <label>Rating</label>
            {renderRatingSelector()}
          </div>
          <div className="form-group">
            <label>Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              placeholder="Share your experience with this product..."
              rows="4"
              required
            />
          </div>
          <button type="submit" className="submit-review-btn">
            Submit Review
          </button>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">{review.userName}</span>
                  {review.verified && (
                    <span className="verified-badge">Verified Purchase</span>
                  )}
                </div>
                <span className="review-date">
                  {formatDate(review.createdAt)}
                </span>
              </div>
              <div className="review-rating">{renderStars(review.rating)}</div>
              {review.comment && (
                <p className="review-comment">{review.comment}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;

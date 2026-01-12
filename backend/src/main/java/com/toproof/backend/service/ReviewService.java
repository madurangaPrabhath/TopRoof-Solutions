package com.toproof.backend.service;

import com.toproof.backend.models.Review;
import com.toproof.backend.repo.ReviewRepository;
import com.toproof.backend.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    public List<Review> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId);
    }

    public List<Review> getReviewsByUserId(Long userId) {
        return reviewRepository.findByUserId(userId);
    }

    public Double getAverageRating(Long productId) {
        Double avg = reviewRepository.getAverageRatingByProductId(productId);
        return avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0;
    }

    public Long getReviewCount(Long productId) {
        return reviewRepository.countByProductId(productId);
    }

    @Transactional
    public Review addReview(Review review) {
        // Check if user already reviewed this product
        Optional<Review> existingReview = reviewRepository.findByProductIdAndUserId(
                review.getProductId(), review.getUserId());
        
        if (existingReview.isPresent()) {
            throw new RuntimeException("User has already reviewed this product");
        }

        // Verify product exists
        if (!productRepository.existsById(review.getProductId())) {
            throw new RuntimeException("Product not found");
        }

        return reviewRepository.save(review);
    }

    @Transactional
    public Review updateReview(Long id, Review reviewDetails) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        review.setRating(reviewDetails.getRating());
        review.setComment(reviewDetails.getComment());

        return reviewRepository.save(review);
    }

    @Transactional
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new RuntimeException("Review not found");
        }
        reviewRepository.deleteById(id);
    }

    public boolean hasUserReviewedProduct(Long productId, Long userId) {
        return reviewRepository.findByProductIdAndUserId(productId, userId).isPresent();
    }
}

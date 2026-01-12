package com.toproof.backend.repo;

import com.toproof.backend.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProductId(Long productId);
    
    List<Review> findByUserId(Long userId);
    
    Optional<Review> findByProductIdAndUserId(Long productId, Long userId);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.productId = :productId")
    Double getAverageRatingByProductId(Long productId);
    
    Long countByProductId(Long productId);
    
    List<Review> findByProductIdOrderByCreatedAtDesc(Long productId);
}

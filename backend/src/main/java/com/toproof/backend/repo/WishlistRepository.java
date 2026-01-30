package com.toproof.backend.repo;

import com.toproof.backend.models.WishlistItem;
import com.toproof.backend.models.User;
import com.toproof.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByUserOrderByAddedAtDesc(User user);
    
    List<WishlistItem> findByUserId(Long userId);
    
    Optional<WishlistItem> findByUserAndProduct(User user, Product product);
    
    Optional<WishlistItem> findByUserIdAndProductId(Long userId, Long productId);
    
    boolean existsByUserIdAndProductId(Long userId, Long productId);
    
    void deleteByUserIdAndProductId(Long userId, Long productId);
    
    void deleteByUserId(Long userId);
    
    long countByUserId(Long userId);
}

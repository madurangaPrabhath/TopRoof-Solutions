package com.toproof.backend.service;

import com.toproof.backend.models.Product;
import com.toproof.backend.models.User;
import com.toproof.backend.models.WishlistItem;
import com.toproof.backend.repo.ProductRepository;
import com.toproof.backend.repo.UserRepository;
import com.toproof.backend.repo.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Map<String, Object>> getUserWishlist(Long userId) {
        List<WishlistItem> wishlistItems = wishlistRepository.findByUserId(userId);
        return wishlistItems.stream().map(item -> {
            Map<String, Object> wishlistData = new HashMap<>();
            wishlistData.put("id", item.getId());
            wishlistData.put("product", item.getProduct());
            wishlistData.put("addedAt", item.getAddedAt());
            return wishlistData;
        }).collect(Collectors.toList());
    }

    @Transactional
    public Map<String, Object> addToWishlist(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (wishlistRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new RuntimeException("Product already in wishlist");
        }

        WishlistItem wishlistItem = new WishlistItem(user, product);
        WishlistItem saved = wishlistRepository.save(wishlistItem);

        Map<String, Object> response = new HashMap<>();
        response.put("id", saved.getId());
        response.put("product", saved.getProduct());
        response.put("addedAt", saved.getAddedAt());
        response.put("message", "Product added to wishlist");
        
        return response;
    }

    @Transactional
    public Map<String, String> removeFromWishlist(Long userId, Long productId) {
        if (!wishlistRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new RuntimeException("Product not in wishlist");
        }

        wishlistRepository.deleteByUserIdAndProductId(userId, productId);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Product removed from wishlist");
        return response;
    }

    public boolean isInWishlist(Long userId, Long productId) {
        return wishlistRepository.existsByUserIdAndProductId(userId, productId);
    }
}

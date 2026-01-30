package com.toproof.backend.controller;

import com.toproof.backend.models.WishlistItem;
import com.toproof.backend.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "*")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistItem>> getWishlist(@PathVariable Long userId) {
        List<WishlistItem> wishlist = wishlistService.getWishlistByUserId(userId);
        return ResponseEntity.ok(wishlist);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToWishlist(
            @RequestParam Long userId,
            @RequestParam Long productId) {
        try {
            WishlistItem item = wishlistService.addToWishlist(userId, productId);
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeFromWishlist(
            @RequestParam Long userId,
            @RequestParam Long productId) {
        try {
            wishlistService.removeFromWishlist(userId, productId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Product removed from wishlist");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkWishlist(
            @RequestParam Long userId,
            @RequestParam Long productId) {
        boolean isInWishlist = wishlistService.isInWishlist(userId, productId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("inWishlist", isInWishlist);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<?> clearWishlist(@PathVariable Long userId) {
        wishlistService.clearWishlist(userId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Wishlist cleared");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/count/{userId}")
    public ResponseEntity<Map<String, Long>> getWishlistCount(@PathVariable Long userId) {
        long count = wishlistService.getWishlistCount(userId);
        Map<String, Long> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }
}

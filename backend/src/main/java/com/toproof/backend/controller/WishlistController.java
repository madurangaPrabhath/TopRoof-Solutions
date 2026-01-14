package com.toproof.backend.controller;

import com.toproof.backend.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getUserWishlist(@PathVariable Long userId) {
        try {
            List<Map<String, Object>> wishlist = wishlistService.getUserWishlist(userId);
            return ResponseEntity.ok(wishlist);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addToWishlist(
            @RequestParam Long userId,
            @RequestParam Long productId) {
        try {
            Map<String, Object> result = wishlistService.addToWishlist(userId, productId);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Map<String, String>> removeFromWishlist(
            @RequestParam Long userId,
            @RequestParam Long productId) {
        try {
            Map<String, String> result = wishlistService.removeFromWishlist(userId, productId);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkWishlist(
            @RequestParam Long userId,
            @RequestParam Long productId) {
        try {
            boolean isInWishlist = wishlistService.isInWishlist(userId, productId);
            return ResponseEntity.ok(Map.of("inWishlist", isInWishlist));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

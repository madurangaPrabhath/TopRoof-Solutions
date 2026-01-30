package com.toproof.backend.controller;

import com.toproof.backend.models.CartItem;
import com.toproof.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUser(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> request) {
        try {
            // Validate request parameters
            if (request.get("userId") == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "userId is required"));
            }
            if (request.get("productId") == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "productId is required"));
            }
            if (request.get("quantity") == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "quantity is required"));
            }

            Long userId = Long.valueOf(request.get("userId").toString());
            Long productId = Long.valueOf(request.get("productId").toString());
            int quantity = Integer.parseInt(request.get("quantity").toString());

            CartItem cartItem = cartService.addToCart(userId, productId, quantity);
            return ResponseEntity.ok(cartItem);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid number format for userId, productId, or quantity"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItem> updateQuantity(
            @PathVariable Long cartItemId,
            @RequestBody Map<String, Integer> request) {
        int quantity = request.get("quantity");
        CartItem updated = cartService.updateCartItemQuantity(cartItemId, quantity);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/user/{userId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}/total")
    public ResponseEntity<Map<String, Double>> getCartTotal(@PathVariable Long userId) {
        double total = cartService.getCartTotal(userId);
        return ResponseEntity.ok(Map.of("total", total));
    }
}

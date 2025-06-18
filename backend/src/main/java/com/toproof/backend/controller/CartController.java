package com.toproof.backend.controller;

import com.toproof.backend.models.CartItem;
import com.toproof.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService service;

    @GetMapping("/{email}")
    public List<CartItem> getCart(@PathVariable String email) {
        return service.getCart(email);
    }

    @PostMapping
    public CartItem addToCart(@RequestBody CartItem item) {
        return service.addToCart(item);
    }

    @DeleteMapping("/{email}")
    public void clearCart(@PathVariable String email) {
        service.clearCart(email);
    }
}

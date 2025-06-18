package com.toproof.backend.service;

import com.toproof.backend.models.CartItem;
import com.toproof.backend.repo.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartItemRepository repo;

    public List<CartItem> getCart(String userEmail) {
        return repo.findByUserEmail(userEmail);
    }

    public CartItem addToCart(CartItem item) {
        return repo.save(item);
    }

    public void clearCart(String userEmail) {
        repo.deleteByUserEmail(userEmail);
    }
}

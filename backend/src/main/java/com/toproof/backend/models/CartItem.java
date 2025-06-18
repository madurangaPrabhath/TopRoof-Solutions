package com.toproof.backend.models;

import jakarta.persistence.*;

@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private String productName;
    private double price;
    private int quantity;
    private String userEmail;
    
    public CartItem(Long id, Long productId, String productName, double price, int quantity, String userEmail) {
      this.id = id;
      this.productId = productId;
      this.productName = productName;
      this.price = price;
      this.quantity = quantity;
      this.userEmail = userEmail;
    }

    public Long getId() {
      return id;
    }
    public void setId(Long id) {
      this.id = id;
    }
    public Long getProductId() {
      return productId;
    }
    public void setProductId(Long productId) {
      this.productId = productId;
    }
    public String getProductName() {
      return productName;
    }
    public void setProductName(String productName) {
      this.productName = productName;
    }
    public double getPrice() {
      return price;
    }
    public void setPrice(double price) {
      this.price = price;
    }
    public int getQuantity() {
      return quantity;
    }
    public void setQuantity(int quantity) {
      this.quantity = quantity;
    }
    public String getUserEmail() {
      return userEmail;
    }
    public void setUserEmail(String userEmail) {
      this.userEmail = userEmail;
    }
}
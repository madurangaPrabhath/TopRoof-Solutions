package com.toproof.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  @JsonBackReference
  private Order order;

  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  @JsonIgnoreProperties({"category", "description", "stockQuantity", "createdAt", "updatedAt"})
  private Product product;

  @Column(nullable = false)
  private int quantity;

  @Column(nullable = false)
  private double price; // Price at the time of order

  public OrderItem() {
  }

  public OrderItem(Product product, int quantity, double price) {
    this.product = product;
    this.quantity = quantity;
    this.price = price;
  }

  // Getters and Setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Order getOrder() {
    return order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  // Computed property
  public double getSubtotal() {
    return price * quantity;
  }
}

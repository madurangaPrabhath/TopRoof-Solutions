package com.toproof.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  @JsonIgnoreProperties({"password", "orders", "cartItems", "wishlistItems"})
  private User user;

  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
  private List<OrderItem> orderItems = new ArrayList<>();

  @Column(nullable = false)
  private String status = "PENDING";

  @Column(nullable = false)
  private double totalAmount;

  private String shippingAddress;
  private String paymentMethod;
  private String paymentStatus = "PENDING";

  private double shippingCost = 0.0;
  private String shippingMethod;
  private String shippingRegion;
  private int estimatedDeliveryDays;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public Order() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  public void preUpdate() {
    this.updatedAt = LocalDateTime.now();
  }

  public void addOrderItem(OrderItem item) {
    orderItems.add(item);
    item.setOrder(this);
  }

  public void removeOrderItem(OrderItem item) {
    orderItems.remove(item);
    item.setOrder(null);
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public List<OrderItem> getOrderItems() {
    return orderItems;
  }

  public void setOrderItems(List<OrderItem> orderItems) {
    this.orderItems = orderItems;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public double getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(double totalAmount) {
    this.totalAmount = totalAmount;
  }

  public String getShippingAddress() {
    return shippingAddress;
  }

  public void setShippingAddress(String shippingAddress) {
    this.shippingAddress = shippingAddress;
  }

  public String getPaymentMethod() {
    return paymentMethod;
  }

  public void setPaymentMethod(String paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  public String getPaymentStatus() {
    return paymentStatus;
  }

  public void setPaymentStatus(String paymentStatus) {
    this.paymentStatus = paymentStatus;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  public double getShippingCost() {
    return shippingCost;
  }

  public void setShippingCost(double shippingCost) {
    this.shippingCost = shippingCost;
  }

  public String getShippingMethod() {
    return shippingMethod;
  }

  public void setShippingMethod(String shippingMethod) {
    this.shippingMethod = shippingMethod;
  }

  public String getShippingRegion() {
    return shippingRegion;
  }

  public void setShippingRegion(String shippingRegion) {
    this.shippingRegion = shippingRegion;
  }

  public int getEstimatedDeliveryDays() {
    return estimatedDeliveryDays;
  }

  public void setEstimatedDeliveryDays(int estimatedDeliveryDays) {
    this.estimatedDeliveryDays = estimatedDeliveryDays;
  }
}

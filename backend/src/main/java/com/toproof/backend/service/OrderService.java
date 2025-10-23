package com.toproof.backend.service;

import com.toproof.backend.models.*;
import com.toproof.backend.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CartItemRepository cartItemRepository;

  @Autowired
  private ProductRepository productRepository;

  public List<Order> getAllOrders() {
    return orderRepository.findAll();
  }

  public Optional<Order> getOrderById(Long id) {
    return orderRepository.findById(id);
  }

  public List<Order> getOrdersByUser(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));
    return orderRepository.findByUserOrderByCreatedAtDesc(user);
  }

  public List<Order> getOrdersByStatus(String status) {
    return orderRepository.findByStatus(status);
  }

  @Transactional
  public Order createOrder(Long userId, String shippingAddress, String paymentMethod) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    // Get cart items
    List<CartItem> cartItems = cartItemRepository.findByUser(user);

    if (cartItems.isEmpty()) {
      throw new RuntimeException("Cart is empty");
    }

    // Create order
    Order order = new Order();
    order.setUser(user);
    order.setShippingAddress(shippingAddress);
    order.setPaymentMethod(paymentMethod);
    order.setStatus("PENDING");
    order.setPaymentStatus("PENDING");

    // Calculate total and create order items
    double total = 0.0;
    for (CartItem cartItem : cartItems) {
      OrderItem orderItem = new OrderItem(
          cartItem.getProduct(),
          cartItem.getQuantity(),
          cartItem.getProduct().getPrice());
      order.addOrderItem(orderItem);
      total += orderItem.getSubtotal();
    }

    order.setTotalAmount(total);

    // Save order
    Order savedOrder = orderRepository.save(order);

    // Clear cart after order
    cartItemRepository.deleteByUser(user);

    return savedOrder;
  }

  @Transactional
  public Order updateOrderStatus(Long orderId, String status) {
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new RuntimeException("Order not found"));

    order.setStatus(status);
    return orderRepository.save(order);
  }

  @Transactional
  public Order updatePaymentStatus(Long orderId, String paymentStatus) {
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new RuntimeException("Order not found"));

    order.setPaymentStatus(paymentStatus);
    return orderRepository.save(order);
  }

  @Transactional
  public void cancelOrder(Long orderId) {
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() -> new RuntimeException("Order not found"));

    if ("DELIVERED".equals(order.getStatus())) {
      throw new RuntimeException("Cannot cancel delivered order");
    }

    order.setStatus("CANCELLED");
    orderRepository.save(order);
  }
}

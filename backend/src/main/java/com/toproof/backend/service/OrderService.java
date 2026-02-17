package com.toproof.backend.service;

import com.toproof.backend.models.*;
import com.toproof.backend.repo.*;
import com.toproof.backend.service.ShippingService;
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
  private ShippingService shippingService;

  @Transactional(readOnly = true)
  public List<Order> getAllOrders() {
    List<Order> orders = orderRepository.findAllWithItemsAndUser();
    for (Order order : orders) {
      if (order.getOrderItems() != null) {
        order.getOrderItems().size();
        for (OrderItem item : order.getOrderItems()) {
          if (item.getProduct() != null) {
            item.getProduct().getName();
          }
        }
      }
      if (order.getUser() != null) {
        order.getUser().getEmail();
      }
    }
    return orders;
  }

  @Transactional(readOnly = true)
  public Optional<Order> getOrderById(Long id) {
    return orderRepository.findByIdWithItems(id);
  }

  @Transactional(readOnly = true)
  public List<Order> getOrdersByUser(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));
    List<Order> orders = orderRepository.findByUserWithItemsOrderByCreatedAtDesc(user);
    for (Order order : orders) {
      order.getOrderItems().size();
      for (OrderItem item : order.getOrderItems()) {
        if (item.getProduct() != null) {
          item.getProduct().getName();
        }
      }
    }
    return orders;
  }

  public List<Order> getOrdersByStatus(String status) {
    return orderRepository.findByStatus(status);
  }

  @Transactional
  public Order createOrder(Long userId, String shippingAddress, String paymentMethod) {
    return createOrder(userId, shippingAddress, paymentMethod, null);
  }

  @Transactional
  public Order createOrder(Long userId, String shippingAddress, String paymentMethod, Long shippingOptionId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));

    List<CartItem> cartItems = cartItemRepository.findByUser(user);

    if (cartItems.isEmpty()) {
      throw new RuntimeException("Cart is empty");
    }

    Order order = new Order();
    order.setUser(user);
    order.setShippingAddress(shippingAddress);
    order.setPaymentMethod(paymentMethod);
    order.setStatus("PENDING");
    order.setPaymentStatus("PENDING");

    double subtotal = 0.0;
    for (CartItem cartItem : cartItems) {
      OrderItem orderItem = new OrderItem(
          cartItem.getProduct(),
          cartItem.getQuantity(),
          cartItem.getProduct().getPrice());
      order.addOrderItem(orderItem);
      subtotal += orderItem.getSubtotal();
    }

    double shippingCost = 0.0;
    if (shippingOptionId != null) {
      try {
        ShippingOption shippingOption = shippingService.getShippingOptionById(shippingOptionId)
            .orElseThrow(() -> new RuntimeException("Shipping option not found"));
        shippingCost = shippingService.calculateShippingCost(shippingOptionId, subtotal);
        order.setShippingCost(shippingCost);
        order.setShippingMethod(shippingOption.getMethodName());
        order.setShippingRegion(shippingOption.getRegion());
        order.setEstimatedDeliveryDays(shippingOption.getEstimatedDays());
      } catch (RuntimeException e) {
        order.setShippingCost(0.0);
        order.setShippingMethod("Free Shipping");
      }
    } else {
      order.setShippingCost(0.0);
      order.setShippingMethod("Free Shipping");
    }

    order.setTotalAmount(subtotal + shippingCost);

    Order savedOrder = orderRepository.save(order);

    cartItemRepository.deleteByUser(user);

    return savedOrder;
  }

  @Transactional
  public Order updateOrderStatus(Long orderId, String status) {
    Order order = orderRepository.findByIdWithItems(orderId)
        .orElseThrow(() -> new RuntimeException("Order not found"));

    order.setStatus(status);
    Order savedOrder = orderRepository.save(order);
    
    if (savedOrder.getOrderItems() != null) {
      savedOrder.getOrderItems().size();
      for (OrderItem item : savedOrder.getOrderItems()) {
        if (item.getProduct() != null) {
          item.getProduct().getName();
        }
      }
    }
    if (savedOrder.getUser() != null) {
      savedOrder.getUser().getEmail();
    }
    
    return savedOrder;
  }

  @Transactional
  public Order updatePaymentStatus(Long orderId, String paymentStatus) {
    Order order = orderRepository.findByIdWithItems(orderId)
        .orElseThrow(() -> new RuntimeException("Order not found"));

    order.setPaymentStatus(paymentStatus);
    Order savedOrder = orderRepository.save(order);
    
    if (savedOrder.getOrderItems() != null) {
      savedOrder.getOrderItems().size();
      for (OrderItem item : savedOrder.getOrderItems()) {
        if (item.getProduct() != null) {
          item.getProduct().getName();
        }
      }
    }
    if (savedOrder.getUser() != null) {
      savedOrder.getUser().getEmail();
    }
    
    return savedOrder;
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

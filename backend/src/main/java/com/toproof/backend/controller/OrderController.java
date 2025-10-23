package com.toproof.backend.controller;

import com.toproof.backend.models.Order;
import com.toproof.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @GetMapping
  public ResponseEntity<List<Order>> getAllOrders() {
    return ResponseEntity.ok(orderService.getAllOrders());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
    return orderService.getOrderById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
    return ResponseEntity.ok(orderService.getOrdersByUser(userId));
  }

  @GetMapping("/status/{status}")
  public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable String status) {
    return ResponseEntity.ok(orderService.getOrdersByStatus(status));
  }

  @PostMapping
  public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> request) {
    try {
      Long userId = Long.valueOf(request.get("userId").toString());
      String shippingAddress = request.get("shippingAddress").toString();
      String paymentMethod = request.get("paymentMethod").toString();

      Order order = orderService.createOrder(userId, shippingAddress, paymentMethod);
      return ResponseEntity.ok(order);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
    }
  }

  @PutMapping("/{id}/status")
  public ResponseEntity<Order> updateOrderStatus(
      @PathVariable Long id,
      @RequestBody Map<String, String> request) {
    try {
      String status = request.get("status");
      return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @PutMapping("/{id}/payment-status")
  public ResponseEntity<Order> updatePaymentStatus(
      @PathVariable Long id,
      @RequestBody Map<String, String> request) {
    try {
      String paymentStatus = request.get("paymentStatus");
      return ResponseEntity.ok(orderService.updatePaymentStatus(id, paymentStatus));
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> cancelOrder(@PathVariable Long id) {
    try {
      orderService.cancelOrder(id);
      return ResponseEntity.noContent().build();
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
    }
  }
}

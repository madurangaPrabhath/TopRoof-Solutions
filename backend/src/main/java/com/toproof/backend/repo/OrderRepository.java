package com.toproof.backend.repo;

import com.toproof.backend.models.Order;
import com.toproof.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByUser(User user);

  List<Order> findByUserOrderByCreatedAtDesc(User user);

  @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.orderItems oi LEFT JOIN FETCH oi.product WHERE o.user = :user ORDER BY o.createdAt DESC")
  List<Order> findByUserWithItemsOrderByCreatedAtDesc(@Param("user") User user);

  @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.orderItems oi LEFT JOIN FETCH oi.product LEFT JOIN FETCH o.user ORDER BY o.createdAt DESC")
  List<Order> findAllWithItemsAndUser();

  @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.orderItems oi LEFT JOIN FETCH oi.product LEFT JOIN FETCH o.user WHERE o.id = :id")
  Optional<Order> findByIdWithItems(@Param("id") Long id);

  List<Order> findByStatus(String status);
}

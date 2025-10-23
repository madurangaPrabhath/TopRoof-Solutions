package com.toproof.backend.repo;

import com.toproof.backend.models.Order;
import com.toproof.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
  List<Order> findByUser(User user);

  List<Order> findByUserOrderByCreatedAtDesc(User user);

  List<Order> findByStatus(String status);
}

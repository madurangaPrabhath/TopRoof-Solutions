package com.toproof.backend.repo;

import com.toproof.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);

    List<Product> findByFeaturedTrue();

    List<Product> findByBestSellerTrue();

    List<Product> findByNameContainingIgnoreCase(String name);
}
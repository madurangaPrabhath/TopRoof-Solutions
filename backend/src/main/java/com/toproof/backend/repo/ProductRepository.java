package com.toproof.backend.repo;

import com.toproof.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);

    List<Product> findByFeaturedTrue();

    List<Product> findByBestSellerTrue();

    List<Product> findByNameContainingIgnoreCase(String name);
    
    List<Product> findByBrand(String brand);
    
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
    
    @Query("SELECT DISTINCT p.brand FROM Product p WHERE p.brand IS NOT NULL ORDER BY p.brand")
    List<String> findAllDistinctBrands();
    
    @Query("SELECT DISTINCT p.category FROM Product p WHERE p.category IS NOT NULL ORDER BY p.category")
    List<String> findAllDistinctCategories();
    
    @Query("SELECT p FROM Product p WHERE " +
           "(:searchTerm IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
           "(:category IS NULL OR p.category = :category) AND " +
           "(:brand IS NULL OR p.brand = :brand) AND " +
           "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice)")
    List<Product> findByFilters(@Param("searchTerm") String searchTerm,
                                @Param("category") String category,
                                @Param("brand") String brand,
                                @Param("minPrice") Double minPrice,
                                @Param("maxPrice") Double maxPrice);
}
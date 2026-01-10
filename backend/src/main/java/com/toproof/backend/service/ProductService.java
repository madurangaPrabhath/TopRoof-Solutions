package com.toproof.backend.service;

import com.toproof.backend.models.Product;
import com.toproof.backend.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue();
    }

    public List<Product> getBestSellers() {
        return productRepository.findByBestSellerTrue();
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }
    
    public List<String> getAllBrands() {
        return productRepository.findAllDistinctBrands();
    }
    
    public List<String> getAllCategories() {
        return productRepository.findAllDistinctCategories();
    }
    
    public List<Product> filterProducts(String searchTerm, String category, String brand, 
                                        Double minPrice, Double maxPrice, String sortBy) {
        List<Product> products = productRepository.findByFilters(
            searchTerm != null && !searchTerm.isEmpty() ? searchTerm : null,
            category != null && !category.isEmpty() ? category : null,
            brand != null && !brand.isEmpty() ? brand : null,
            minPrice,
            maxPrice
        );
        
        // Apply sorting
        if (sortBy != null && !sortBy.isEmpty()) {
            switch (sortBy.toLowerCase()) {
                case "price_asc":
                    products = products.stream()
                        .sorted(Comparator.comparing(Product::getPrice))
                        .collect(Collectors.toList());
                    break;
                case "price_desc":
                    products = products.stream()
                        .sorted(Comparator.comparing(Product::getPrice).reversed())
                        .collect(Collectors.toList());
                    break;
                case "name_asc":
                    products = products.stream()
                        .sorted(Comparator.comparing(Product::getName))
                        .collect(Collectors.toList());
                    break;
                case "name_desc":
                    products = products.stream()
                        .sorted(Comparator.comparing(Product::getName).reversed())
                        .collect(Collectors.toList());
                    break;
            }
        }
        
        return products;
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setDescription(updatedProduct.getDescription());
                    product.setPrice(updatedProduct.getPrice());
                    product.setImageUrl(updatedProduct.getImageUrl());
                    product.setCategory(updatedProduct.getCategory());
                    product.setBrand(updatedProduct.getBrand());
                    product.setStockQuantity(updatedProduct.getStockQuantity());
                    product.setFeatured(updatedProduct.isFeatured());
                    product.setBestSeller(updatedProduct.isBestSeller());
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}

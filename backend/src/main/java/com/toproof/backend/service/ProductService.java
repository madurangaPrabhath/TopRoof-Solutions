package com.toproof.backend.service;

import com.toproof.backend.models.Product;
import com.toproof.backend.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
}

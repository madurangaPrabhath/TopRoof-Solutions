package com.toproof.backend.config;

import com.toproof.backend.models.Product;
import com.toproof.backend.models.User;
import com.toproof.backend.repo.ProductRepository;
import com.toproof.backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * This class initializes sample data when the application starts.
 * Comment out the @Component annotation after first run if you don't want to
 * reset data.
 */
@Component
public class DataInitializer implements CommandLineRunner {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    // Only initialize if database is empty
    if (userRepository.count() == 0) {
      initializeUsers();
    }

    if (productRepository.count() == 0) {
      initializeProducts();
    }

    System.out.println("✅ Database initialized with sample data");
  }

  private void initializeUsers() {
    // Create admin user
    User admin = new User();
    admin.setEmail("admin@toproof.com");
    admin.setPassword(passwordEncoder.encode("admin123"));
    admin.setFirstName("Admin");
    admin.setLastName("User");
    admin.setPhone("1234567890");
    admin.setAddress("123 Admin Street, Colombo");
    admin.setRole("ADMIN");
    userRepository.save(admin);

    // Create regular user
    User user = new User();
    user.setEmail("user@toproof.com");
    user.setPassword(passwordEncoder.encode("user123"));
    user.setFirstName("John");
    user.setLastName("Doe");
    user.setPhone("0771234567");
    user.setAddress("456 User Avenue, Kandy");
    user.setRole("USER");
    userRepository.save(user);

    System.out.println("✅ Sample users created:");
    System.out.println("   Admin: admin@toproof.com / admin123");
    System.out.println("   User: user@toproof.com / user123");
  }

  private void initializeProducts() {
    // Roofing Products
    createProduct("Premium Clay Roof Tiles",
        "High-quality clay roofing tiles with 50-year warranty. Weather-resistant and durable.",
        45.99, "https://picsum.photos/400/300?random=1", "ROOFING", "TopRoof Premium", 500, true, true);

    createProduct("Concrete Roof Tiles",
        "Durable concrete tiles suitable for all weather conditions. Easy to install.",
        35.50, "https://picsum.photos/400/300?random=2", "ROOFING", "TopRoof", 750, true, true);

    createProduct("Metal Roofing Sheets",
        "Lightweight galvanized metal sheets with anti-rust coating.",
        28.99, "https://picsum.photos/400/300?random=3", "ROOFING", "MetalGuard", 600, true, false);

    createProduct("Asphalt Shingles",
        "Classic asphalt shingles in various colors. Fire-resistant and affordable.",
        22.50, "https://picsum.photos/400/300?random=4", "ROOFING", "ShinglePro", 1000, false, true);

    createProduct("Slate Roof Tiles",
        "Natural slate tiles for premium aesthetic. Extremely durable with 100+ year lifespan.",
        89.99, "https://picsum.photos/400/300?random=5", "ROOFING", "TopRoof Premium", 200, true, false);

    createProduct("Terracotta Roof Tiles",
        "Traditional terracotta tiles with excellent thermal properties.",
        42.00, "https://picsum.photos/400/300?random=6", "ROOFING", "TerraTop", 450, false, true);

    // Accessories
    createProduct("Ridge Caps",
        "Weather-sealed ridge caps for roof peaks. Matches all tile colors.",
        12.99, "https://picsum.photos/400/300?random=7", "ACCESSORIES", "TopRoof", 800, true, false);

    createProduct("Roof Valley Flashing",
        "Waterproof valley flashing to prevent leaks at roof junctions.",
        18.50, "https://picsum.photos/400/300?random=8", "ACCESSORIES", "FlashGuard", 500, false, false);

    createProduct("Gutter System Complete Kit",
        "Complete gutter system with brackets and downpipes. 6-meter length.",
        65.00, "https://picsum.photos/400/300?random=9", "ACCESSORIES", "FlowMaster", 300, true, true);

    createProduct("Roof Underlayment",
        "Waterproof synthetic underlayment roll. 1000 sq ft coverage.",
        55.99, "https://picsum.photos/400/300?random=10", "ACCESSORIES", "SealPro", 400, false, false);

    createProduct("Roofing Nails (5kg)",
        "Galvanized roofing nails. Rust-resistant. 5kg pack.",
        15.50, "https://picsum.photos/400/300?random=11", "ACCESSORIES", "FastenPro", 1000, false, true);

    createProduct("Roof Ventilation System",
        "Complete roof ventilation kit. Improves air circulation and reduces heat.",
        85.00, "https://picsum.photos/400/300?random=12", "ACCESSORIES", "AirFlow", 150, true, false);

    createProduct("Roof Sealant (10L)",
        "Professional-grade roof sealant. Waterproof and UV-resistant.",
        32.99, "https://picsum.photos/400/300?random=13", "ACCESSORIES", "SealMaster", 250, false, false);

    createProduct("Snow Guards",
        "Prevent snow avalanche from roof. Set of 10 pieces.",
        45.00, "https://picsum.photos/400/300?random=14", "ACCESSORIES", "SnowStop", 200, false, false);

    System.out.println("✅ Sample products created: " + productRepository.count() + " products");
  }

  private void createProduct(String name, String description, double price,
      String imageUrl, String category, String brand,
      int stock, boolean featured, boolean bestSeller) {
    Product product = new Product();
    product.setName(name);
    product.setDescription(description);
    product.setPrice(price);
    product.setImageUrl(imageUrl);
    product.setCategory(category);
    product.setBrand(brand);
    product.setStockQuantity(stock);
    product.setFeatured(featured);
    product.setBestSeller(bestSeller);
    productRepository.save(product);
  }
}

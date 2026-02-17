package com.toproof.backend.config;

import com.toproof.backend.models.Product;
import com.toproof.backend.models.ShippingOption;
import com.toproof.backend.models.User;
import com.toproof.backend.repo.ProductRepository;
import com.toproof.backend.repo.ShippingOptionRepository;
import com.toproof.backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ShippingOptionRepository shippingOptionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            initializeUsers();
        }

        if (productRepository.count() == 0) {
            initializeProducts();
        }

        if (shippingOptionRepository.count() == 0) {
            initializeShippingOptions();
        }

        System.out.println("✅ Database initialized with sample data");
    }

    private void initializeUsers() {
        User admin = new User();
        admin.setEmail("admin@toproof.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setFirstName("Admin");
        admin.setLastName("User");
        admin.setPhone("1234567890");
        admin.setAddress("123 Admin Street, Colombo");
        admin.setRole("ADMIN");
        userRepository.save(admin);

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
        createProduct("Premium Clay Roof Tiles",
                "High-quality clay roofing tiles with 50-year warranty. Weather-resistant and durable.",
                45.99, "https://picsum.photos/seed/rooftile1/400/300", "ROOFING",
                "TopRoof Premium", 500, true, true);

        createProduct("Concrete Roof Tiles",
                "Durable concrete tiles suitable for all weather conditions. Easy to install.",
                35.50, "https://picsum.photos/seed/rooftile2/400/300", "ROOFING",
                "TopRoof", 750, true, true);

        createProduct("Metal Roofing Sheets",
                "Lightweight galvanized metal sheets with anti-rust coating.",
                28.99, "https://picsum.photos/seed/metalroof/400/300", "ROOFING",
                "MetalGuard", 600, true, false);

        createProduct("Asphalt Shingles",
                "Classic asphalt shingles in various colors. Fire-resistant and affordable.",
                22.50, "https://picsum.photos/seed/shingles/400/300", "ROOFING",
                "ShinglePro", 1000, false, true);

        createProduct("Slate Roof Tiles",
                "Natural slate tiles for premium aesthetic. Extremely durable with 100+ year lifespan.",
                89.99, "https://picsum.photos/seed/slatetile/400/300", "ROOFING",
                "TopRoof Premium", 200, true, false);

        createProduct("Terracotta Roof Tiles",
                "Traditional terracotta tiles with excellent thermal properties.",
                42.00, "https://picsum.photos/seed/terracotta/400/300", "ROOFING",
                "TerraTop", 450, false, true);

        createProduct("Ridge Caps",
                "Weather-sealed ridge caps for roof peaks. Matches all tile colors.",
                12.99, "https://picsum.photos/seed/ridgecap/400/300",
                "ACCESSORIES", "TopRoof", 800, true, false);

        createProduct("Roof Valley Flashing",
                "Waterproof valley flashing to prevent leaks at roof junctions.",
                18.50, "https://picsum.photos/seed/flashing/400/300",
                "ACCESSORIES", "FlashGuard", 500, false, false);

        createProduct("Gutter System Complete Kit",
                "Complete gutter system with brackets and downpipes. 6-meter length.",
                65.00, "https://picsum.photos/seed/gutter/400/300",
                "ACCESSORIES", "FlowMaster", 300, true, true);

        createProduct("Roof Underlayment",
                "Waterproof synthetic underlayment roll. 1000 sq ft coverage.",
                55.99, "https://picsum.photos/seed/underlay/400/300",
                "ACCESSORIES", "SealPro", 400, false, false);

        createProduct("Roofing Nails (5kg)",
                "Galvanized roofing nails. Rust-resistant. 5kg pack.",
                15.50, "https://picsum.photos/seed/nails/400/300",
                "ACCESSORIES", "FastenPro", 1000, false, true);

        createProduct("Roof Ventilation System",
                "Complete roof ventilation kit. Improves air circulation and reduces heat.",
                85.00, "https://picsum.photos/seed/ventilation/400/300",
                "ACCESSORIES", "AirFlow", 150, true, false);

        createProduct("Roof Sealant (10L)",
                "Professional-grade roof sealant. Waterproof and UV-resistant.",
                32.99, "https://picsum.photos/seed/sealant/400/300",
                "ACCESSORIES", "SealMaster", 250, false, false);

        createProduct("Snow Guards",
                "Prevent snow avalanche from roof. Set of 10 pieces.",
                45.00, "https://picsum.photos/seed/snowguard/400/300",
                "ACCESSORIES", "SnowStop", 200, false, false);

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

    private void initializeShippingOptions() {
        // Colombo District
        createShippingOption("Colombo", "Standard Delivery", 350.00,
                "Standard delivery within Colombo district. 2-3 business days.", 3, true, 5000.0);
        createShippingOption("Colombo", "Express Delivery", 750.00,
                "Express next-day delivery within Colombo.", 1, true, 10000.0);
        createShippingOption("Colombo", "Same Day Delivery", 1200.00,
                "Same day delivery for orders placed before 12 PM.", 0, false, 0.0);

        // Kandy District
        createShippingOption("Kandy", "Standard Delivery", 500.00,
                "Standard delivery to Kandy district. 3-5 business days.", 5, true, 8000.0);
        createShippingOption("Kandy", "Express Delivery", 950.00,
                "Express delivery to Kandy. 1-2 business days.", 2, true, 15000.0);

        // Galle District
        createShippingOption("Galle", "Standard Delivery", 550.00,
                "Standard delivery to Galle district. 3-5 business days.", 5, true, 8000.0);
        createShippingOption("Galle", "Express Delivery", 1000.00,
                "Express delivery to Galle. 2-3 business days.", 3, true, 15000.0);

        // Jaffna District
        createShippingOption("Jaffna", "Standard Delivery", 800.00,
                "Standard delivery to Jaffna district. 5-7 business days.", 7, true, 12000.0);
        createShippingOption("Jaffna", "Express Delivery", 1500.00,
                "Express delivery to Jaffna. 3-4 business days.", 4, false, 0.0);

        // Kurunegala District
        createShippingOption("Kurunegala", "Standard Delivery", 450.00,
                "Standard delivery to Kurunegala district. 3-4 business days.", 4, true, 7000.0);
        createShippingOption("Kurunegala", "Express Delivery", 850.00,
                "Express delivery to Kurunegala. 1-2 business days.", 2, true, 12000.0);

        // Matara District
        createShippingOption("Matara", "Standard Delivery", 600.00,
                "Standard delivery to Matara district. 4-6 business days.", 6, true, 9000.0);

        // Ratnapura District
        createShippingOption("Ratnapura", "Standard Delivery", 550.00,
                "Standard delivery to Ratnapura district. 4-5 business days.", 5, true, 8000.0);

        // Anuradhapura District
        createShippingOption("Anuradhapura", "Standard Delivery", 650.00,
                "Standard delivery to Anuradhapura district. 4-6 business days.", 6, true, 10000.0);

        // Badulla District
        createShippingOption("Badulla", "Standard Delivery", 700.00,
                "Standard delivery to Badulla district. 5-7 business days.", 7, true, 10000.0);

        // Island-wide option
        createShippingOption("Island-wide", "Standard Delivery", 750.00,
                "Standard delivery anywhere in Sri Lanka. 5-7 business days.", 7, true, 15000.0);
        createShippingOption("Island-wide", "Express Delivery", 1500.00,
                "Express delivery anywhere in Sri Lanka. 2-4 business days.", 4, false, 0.0);

        System.out.println("✅ Shipping options created: " + shippingOptionRepository.count() + " options");
    }

    private void createShippingOption(String region, String methodName, double cost,
            String description, int estimatedDays, boolean freeShippingAbove, double threshold) {
        ShippingOption option = new ShippingOption();
        option.setRegion(region);
        option.setMethodName(methodName);
        option.setCost(cost);
        option.setDescription(description);
        option.setEstimatedDays(estimatedDays);
        option.setActive(true);
        option.setFreeShippingAbove(freeShippingAbove);
        option.setFreeShippingThreshold(threshold);
        shippingOptionRepository.save(option);
    }
}

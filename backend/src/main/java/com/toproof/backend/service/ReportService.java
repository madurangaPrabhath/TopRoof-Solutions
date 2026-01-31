package com.toproof.backend.service;

import com.toproof.backend.dto.ReportDTO;
import com.toproof.backend.models.Order;
import com.toproof.backend.models.OrderItem;
import com.toproof.backend.models.Product;
import com.toproof.backend.models.User;
import com.toproof.backend.repo.OrderRepository;
import com.toproof.backend.repo.ProductRepository;
import com.toproof.backend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public ReportDTO generateDashboardReport() {
        ReportDTO report = new ReportDTO();
        
        List<Order> allOrders = orderRepository.findAllWithItemsAndUser();
        List<Product> allProducts = productRepository.findAll();
        List<User> allUsers = userRepository.findAll();
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime startOfWeek = now.minusDays(7);
        LocalDateTime startOfToday = now.withHour(0).withMinute(0).withSecond(0);
        
        // Calculate revenue metrics
        double totalRevenue = allOrders.stream()
                .filter(o -> !"CANCELLED".equals(o.getStatus()))
                .mapToDouble(Order::getTotalAmount)
                .sum();
        
        double monthlyRevenue = allOrders.stream()
                .filter(o -> o.getCreatedAt() != null && o.getCreatedAt().isAfter(startOfMonth))
                .filter(o -> !"CANCELLED".equals(o.getStatus()))
                .mapToDouble(Order::getTotalAmount)
                .sum();
        
        double weeklyRevenue = allOrders.stream()
                .filter(o -> o.getCreatedAt() != null && o.getCreatedAt().isAfter(startOfWeek))
                .filter(o -> !"CANCELLED".equals(o.getStatus()))
                .mapToDouble(Order::getTotalAmount)
                .sum();
        
        double todayRevenue = allOrders.stream()
                .filter(o -> o.getCreatedAt() != null && o.getCreatedAt().isAfter(startOfToday))
                .filter(o -> !"CANCELLED".equals(o.getStatus()))
                .mapToDouble(Order::getTotalAmount)
                .sum();
        
        report.setTotalRevenue(totalRevenue);
        report.setMonthlyRevenue(monthlyRevenue);
        report.setWeeklyRevenue(weeklyRevenue);
        report.setTodayRevenue(todayRevenue);
        
        // Calculate order counts
        report.setTotalOrders(allOrders.size());
        report.setMonthlyOrders((int) allOrders.stream()
                .filter(o -> o.getCreatedAt() != null && o.getCreatedAt().isAfter(startOfMonth))
                .count());
        report.setWeeklyOrders((int) allOrders.stream()
                .filter(o -> o.getCreatedAt() != null && o.getCreatedAt().isAfter(startOfWeek))
                .count());
        report.setTodayOrders((int) allOrders.stream()
                .filter(o -> o.getCreatedAt() != null && o.getCreatedAt().isAfter(startOfToday))
                .count());
        
        // Order status counts
        report.setPendingOrders((int) allOrders.stream().filter(o -> "PENDING".equals(o.getStatus())).count());
        report.setConfirmedOrders((int) allOrders.stream().filter(o -> "CONFIRMED".equals(o.getStatus())).count());
        report.setShippedOrders((int) allOrders.stream().filter(o -> "SHIPPED".equals(o.getStatus())).count());
        report.setDeliveredOrders((int) allOrders.stream().filter(o -> "DELIVERED".equals(o.getStatus())).count());
        report.setCancelledOrders((int) allOrders.stream().filter(o -> "CANCELLED".equals(o.getStatus())).count());
        
        // Product stats
        report.setTotalProducts(allProducts.size());
        report.setLowStockProducts((int) allProducts.stream().filter(p -> p.getStockQuantity() > 0 && p.getStockQuantity() <= 10).count());
        report.setOutOfStockProducts((int) allProducts.stream().filter(p -> p.getStockQuantity() == 0).count());
        
        // User stats
        report.setTotalUsers(allUsers.size());
        report.setNewUsersThisMonth((int) allUsers.stream()
                .filter(u -> u.getCreatedAt() != null && u.getCreatedAt().isAfter(startOfMonth))
                .count());
        
        // Average order value
        double avgOrderValue = allOrders.isEmpty() ? 0 : totalRevenue / allOrders.stream()
                .filter(o -> !"CANCELLED".equals(o.getStatus()))
                .count();
        report.setAverageOrderValue(avgOrderValue);
        
        // Order completion rate
        long completedOrders = allOrders.stream().filter(o -> "DELIVERED".equals(o.getStatus())).count();
        double completionRate = allOrders.isEmpty() ? 0 : (completedOrders * 100.0) / allOrders.size();
        report.setOrderCompletionRate(completionRate);
        
        // Revenue by month (last 6 months)
        report.setRevenueByMonth(calculateRevenueByMonth(allOrders));
        
        // Orders by month (last 6 months)
        report.setOrdersByMonth(calculateOrdersByMonth(allOrders));
        
        // Top selling products
        report.setTopSellingProducts(calculateTopSellingProducts(allOrders));
        
        // Sales by category
        report.setSalesByCategory(calculateSalesByCategory(allOrders));
        
        // Payment method statistics
        report.setPaymentMethodStats(calculatePaymentMethodStats(allOrders));
        
        // Recent orders (last 10)
        report.setRecentOrders(getRecentOrdersSummary(allOrders));
        
        return report;
    }
    
    private List<Map<String, Object>> calculateRevenueByMonth(List<Order> orders) {
        List<Map<String, Object>> result = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");
        
        LocalDateTime now = LocalDateTime.now();
        for (int i = 5; i >= 0; i--) {
            LocalDateTime monthStart = now.minusMonths(i).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime monthEnd = monthStart.plusMonths(1);
            
            double revenue = orders.stream()
                    .filter(o -> o.getCreatedAt() != null)
                    .filter(o -> o.getCreatedAt().isAfter(monthStart) && o.getCreatedAt().isBefore(monthEnd))
                    .filter(o -> !"CANCELLED".equals(o.getStatus()))
                    .mapToDouble(Order::getTotalAmount)
                    .sum();
            
            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", monthStart.format(formatter));
            monthData.put("revenue", revenue);
            result.add(monthData);
        }
        
        return result;
    }
    
    private List<Map<String, Object>> calculateOrdersByMonth(List<Order> orders) {
        List<Map<String, Object>> result = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM yyyy");
        
        LocalDateTime now = LocalDateTime.now();
        for (int i = 5; i >= 0; i--) {
            LocalDateTime monthStart = now.minusMonths(i).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime monthEnd = monthStart.plusMonths(1);
            
            long orderCount = orders.stream()
                    .filter(o -> o.getCreatedAt() != null)
                    .filter(o -> o.getCreatedAt().isAfter(monthStart) && o.getCreatedAt().isBefore(monthEnd))
                    .count();
            
            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", monthStart.format(formatter));
            monthData.put("orders", orderCount);
            result.add(monthData);
        }
        
        return result;
    }
    
    private List<Map<String, Object>> calculateTopSellingProducts(List<Order> orders) {
        Map<Long, Map<String, Object>> productSales = new HashMap<>();
        
        for (Order order : orders) {
            if ("CANCELLED".equals(order.getStatus())) continue;
            
            for (OrderItem item : order.getOrderItems()) {
                if (item.getProduct() == null) continue;
                
                final Long productId = item.getProduct().getId();
                final String productName = item.getProduct().getName();
                
                productSales.computeIfAbsent(productId, k -> {
                    Map<String, Object> data = new HashMap<>();
                    data.put("id", k);
                    data.put("name", productName);
                    data.put("quantity", 0);
                    data.put("revenue", 0.0);
                    return data;
                });
                
                Map<String, Object> data = productSales.get(productId);
                data.put("quantity", (int) data.get("quantity") + item.getQuantity());
                data.put("revenue", (double) data.get("revenue") + (item.getPrice() * item.getQuantity()));
            }
        }
        
        return productSales.values().stream()
                .sorted((a, b) -> Integer.compare((int) b.get("quantity"), (int) a.get("quantity")))
                .limit(10)
                .collect(Collectors.toList());
    }
    
    private List<Map<String, Object>> calculateSalesByCategory(List<Order> orders) {
        Map<String, Double> categorySales = new HashMap<>();
        
        for (Order order : orders) {
            if ("CANCELLED".equals(order.getStatus())) continue;
            
            for (OrderItem item : order.getOrderItems()) {
                if (item.getProduct() == null) continue;
                
                String category = item.getProduct().getCategory();
                if (category == null) category = "Other";
                
                categorySales.merge(category, item.getPrice() * item.getQuantity(), Double::sum);
            }
        }
        
        return categorySales.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> data = new HashMap<>();
                    data.put("category", entry.getKey());
                    data.put("revenue", entry.getValue());
                    return data;
                })
                .sorted((a, b) -> Double.compare((double) b.get("revenue"), (double) a.get("revenue")))
                .collect(Collectors.toList());
    }
    
    private List<Map<String, Object>> calculatePaymentMethodStats(List<Order> orders) {
        Map<String, Map<String, Object>> paymentStats = new HashMap<>();
        
        for (Order order : orders) {
            final String method = order.getPaymentMethod() != null ? order.getPaymentMethod() : "Unknown";
            
            paymentStats.computeIfAbsent(method, k -> {
                Map<String, Object> data = new HashMap<>();
                data.put("method", k);
                data.put("count", 0);
                data.put("revenue", 0.0);
                return data;
            });
            
            Map<String, Object> data = paymentStats.get(method);
            data.put("count", (int) data.get("count") + 1);
            if (!"CANCELLED".equals(order.getStatus())) {
                data.put("revenue", (double) data.get("revenue") + order.getTotalAmount());
            }
        }
        
        return new ArrayList<>(paymentStats.values());
    }
    
    private List<Map<String, Object>> getRecentOrdersSummary(List<Order> orders) {
        return orders.stream()
                .sorted((a, b) -> {
                    if (a.getCreatedAt() == null) return 1;
                    if (b.getCreatedAt() == null) return -1;
                    return b.getCreatedAt().compareTo(a.getCreatedAt());
                })
                .limit(10)
                .map(order -> {
                    Map<String, Object> data = new HashMap<>();
                    data.put("id", order.getId());
                    data.put("customerEmail", order.getUser() != null ? order.getUser().getEmail() : "N/A");
                    data.put("customerName", order.getUser() != null ? 
                            (order.getUser().getFirstName() + " " + order.getUser().getLastName()) : "N/A");
                    data.put("total", order.getTotalAmount());
                    data.put("status", order.getStatus());
                    data.put("paymentStatus", order.getPaymentStatus());
                    data.put("date", order.getCreatedAt() != null ? order.getCreatedAt().toString() : null);
                    data.put("itemCount", order.getOrderItems() != null ? order.getOrderItems().size() : 0);
                    return data;
                })
                .collect(Collectors.toList());
    }
}

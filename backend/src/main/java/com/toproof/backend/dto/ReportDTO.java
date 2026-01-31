package com.toproof.backend.dto;

import java.util.List;
import java.util.Map;

public class ReportDTO {
    
    // Overall Statistics
    private double totalRevenue;
    private double monthlyRevenue;
    private double weeklyRevenue;
    private double todayRevenue;
    
    private int totalOrders;
    private int monthlyOrders;
    private int weeklyOrders;
    private int todayOrders;
    
    private int pendingOrders;
    private int confirmedOrders;
    private int shippedOrders;
    private int deliveredOrders;
    private int cancelledOrders;
    
    private int totalProducts;
    private int lowStockProducts;
    private int outOfStockProducts;
    
    private int totalUsers;
    private int newUsersThisMonth;
    
    // Charts Data
    private List<Map<String, Object>> revenueByMonth;
    private List<Map<String, Object>> ordersByMonth;
    private List<Map<String, Object>> topSellingProducts;
    private List<Map<String, Object>> salesByCategory;
    private List<Map<String, Object>> recentOrders;
    private List<Map<String, Object>> paymentMethodStats;
    
    // Average metrics
    private double averageOrderValue;
    private double orderCompletionRate;
    
    public ReportDTO() {}

    // Getters and Setters
    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public double getMonthlyRevenue() {
        return monthlyRevenue;
    }

    public void setMonthlyRevenue(double monthlyRevenue) {
        this.monthlyRevenue = monthlyRevenue;
    }

    public double getWeeklyRevenue() {
        return weeklyRevenue;
    }

    public void setWeeklyRevenue(double weeklyRevenue) {
        this.weeklyRevenue = weeklyRevenue;
    }

    public double getTodayRevenue() {
        return todayRevenue;
    }

    public void setTodayRevenue(double todayRevenue) {
        this.todayRevenue = todayRevenue;
    }

    public int getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(int totalOrders) {
        this.totalOrders = totalOrders;
    }

    public int getMonthlyOrders() {
        return monthlyOrders;
    }

    public void setMonthlyOrders(int monthlyOrders) {
        this.monthlyOrders = monthlyOrders;
    }

    public int getWeeklyOrders() {
        return weeklyOrders;
    }

    public void setWeeklyOrders(int weeklyOrders) {
        this.weeklyOrders = weeklyOrders;
    }

    public int getTodayOrders() {
        return todayOrders;
    }

    public void setTodayOrders(int todayOrders) {
        this.todayOrders = todayOrders;
    }

    public int getPendingOrders() {
        return pendingOrders;
    }

    public void setPendingOrders(int pendingOrders) {
        this.pendingOrders = pendingOrders;
    }

    public int getConfirmedOrders() {
        return confirmedOrders;
    }

    public void setConfirmedOrders(int confirmedOrders) {
        this.confirmedOrders = confirmedOrders;
    }

    public int getShippedOrders() {
        return shippedOrders;
    }

    public void setShippedOrders(int shippedOrders) {
        this.shippedOrders = shippedOrders;
    }

    public int getDeliveredOrders() {
        return deliveredOrders;
    }

    public void setDeliveredOrders(int deliveredOrders) {
        this.deliveredOrders = deliveredOrders;
    }

    public int getCancelledOrders() {
        return cancelledOrders;
    }

    public void setCancelledOrders(int cancelledOrders) {
        this.cancelledOrders = cancelledOrders;
    }

    public int getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(int totalProducts) {
        this.totalProducts = totalProducts;
    }

    public int getLowStockProducts() {
        return lowStockProducts;
    }

    public void setLowStockProducts(int lowStockProducts) {
        this.lowStockProducts = lowStockProducts;
    }

    public int getOutOfStockProducts() {
        return outOfStockProducts;
    }

    public void setOutOfStockProducts(int outOfStockProducts) {
        this.outOfStockProducts = outOfStockProducts;
    }

    public int getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(int totalUsers) {
        this.totalUsers = totalUsers;
    }

    public int getNewUsersThisMonth() {
        return newUsersThisMonth;
    }

    public void setNewUsersThisMonth(int newUsersThisMonth) {
        this.newUsersThisMonth = newUsersThisMonth;
    }

    public List<Map<String, Object>> getRevenueByMonth() {
        return revenueByMonth;
    }

    public void setRevenueByMonth(List<Map<String, Object>> revenueByMonth) {
        this.revenueByMonth = revenueByMonth;
    }

    public List<Map<String, Object>> getOrdersByMonth() {
        return ordersByMonth;
    }

    public void setOrdersByMonth(List<Map<String, Object>> ordersByMonth) {
        this.ordersByMonth = ordersByMonth;
    }

    public List<Map<String, Object>> getTopSellingProducts() {
        return topSellingProducts;
    }

    public void setTopSellingProducts(List<Map<String, Object>> topSellingProducts) {
        this.topSellingProducts = topSellingProducts;
    }

    public List<Map<String, Object>> getSalesByCategory() {
        return salesByCategory;
    }

    public void setSalesByCategory(List<Map<String, Object>> salesByCategory) {
        this.salesByCategory = salesByCategory;
    }

    public List<Map<String, Object>> getRecentOrders() {
        return recentOrders;
    }

    public void setRecentOrders(List<Map<String, Object>> recentOrders) {
        this.recentOrders = recentOrders;
    }

    public List<Map<String, Object>> getPaymentMethodStats() {
        return paymentMethodStats;
    }

    public void setPaymentMethodStats(List<Map<String, Object>> paymentMethodStats) {
        this.paymentMethodStats = paymentMethodStats;
    }

    public double getAverageOrderValue() {
        return averageOrderValue;
    }

    public void setAverageOrderValue(double averageOrderValue) {
        this.averageOrderValue = averageOrderValue;
    }

    public double getOrderCompletionRate() {
        return orderCompletionRate;
    }

    public void setOrderCompletionRate(double orderCompletionRate) {
        this.orderCompletionRate = orderCompletionRate;
    }
}

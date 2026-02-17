package com.toproof.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shipping_options")
public class ShippingOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Region name is required")
    @Size(max = 100)
    @Column(nullable = false)
    private String region;

    @NotBlank(message = "Shipping method name is required")
    @Size(max = 100)
    @Column(nullable = false)
    private String methodName;

    @NotNull(message = "Shipping cost is required")
    @Min(value = 0, message = "Shipping cost cannot be negative")
    @Column(nullable = false)
    private double cost;

    @Size(max = 500)
    private String description;

    @Min(value = 1, message = "Estimated days must be at least 1")
    private int estimatedDays = 3;

    private boolean active = true;

    private boolean freeShippingAbove = false;

    @Min(value = 0)
    private double freeShippingThreshold = 0.0;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ShippingOption() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public ShippingOption(String region, String methodName, double cost, String description, int estimatedDays) {
        this.region = region;
        this.methodName = methodName;
        this.cost = cost;
        this.description = description;
        this.estimatedDays = estimatedDays;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getMethodName() {
        return methodName;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getEstimatedDays() {
        return estimatedDays;
    }

    public void setEstimatedDays(int estimatedDays) {
        this.estimatedDays = estimatedDays;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isFreeShippingAbove() {
        return freeShippingAbove;
    }

    public void setFreeShippingAbove(boolean freeShippingAbove) {
        this.freeShippingAbove = freeShippingAbove;
    }

    public double getFreeShippingThreshold() {
        return freeShippingThreshold;
    }

    public void setFreeShippingThreshold(double freeShippingThreshold) {
        this.freeShippingThreshold = freeShippingThreshold;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

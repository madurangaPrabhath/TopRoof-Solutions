package com.toproof.backend.controller;

import com.toproof.backend.models.ShippingOption;
import com.toproof.backend.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/shipping")
public class ShippingController {

    @Autowired
    private ShippingService shippingService;

    @GetMapping
    public ResponseEntity<List<ShippingOption>> getActiveShippingOptions() {
        return ResponseEntity.ok(shippingService.getActiveShippingOptions());
    }

    @GetMapping("/region/{region}")
    public ResponseEntity<List<ShippingOption>> getShippingByRegion(@PathVariable String region) {
        return ResponseEntity.ok(shippingService.getShippingOptionsByRegion(region));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ShippingOption>> searchShippingByRegion(@RequestParam String region) {
        return ResponseEntity.ok(shippingService.searchShippingByRegion(region));
    }

    @GetMapping("/regions")
    public ResponseEntity<List<String>> getActiveRegions() {
        return ResponseEntity.ok(shippingService.getAllActiveRegions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShippingOption> getShippingOptionById(@PathVariable Long id) {
        return shippingService.getShippingOptionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/calculate")
    public ResponseEntity<?> calculateShippingCost(@RequestBody Map<String, Object> request) {
        try {
            Long shippingOptionId = Long.valueOf(request.get("shippingOptionId").toString());
            double orderSubtotal = Double.parseDouble(request.get("orderSubtotal").toString());

            double shippingCost = shippingService.calculateShippingCost(shippingOptionId, orderSubtotal);

            return ResponseEntity.ok(Map.of(
                    "shippingCost", shippingCost,
                    "orderSubtotal", orderSubtotal,
                    "total", orderSubtotal + shippingCost
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<ShippingOption>> getAllShippingOptions() {
        return ResponseEntity.ok(shippingService.getAllShippingOptions());
    }

    @PostMapping
    public ResponseEntity<ShippingOption> createShippingOption(@RequestBody ShippingOption shippingOption) {
        return ResponseEntity.ok(shippingService.createShippingOption(shippingOption));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateShippingOption(@PathVariable Long id, @RequestBody ShippingOption shippingOption) {
        try {
            return ResponseEntity.ok(shippingService.updateShippingOption(id, shippingOption));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShippingOption(@PathVariable Long id) {
        try {
            shippingService.deleteShippingOption(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

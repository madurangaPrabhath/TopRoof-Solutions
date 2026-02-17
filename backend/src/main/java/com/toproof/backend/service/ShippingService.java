package com.toproof.backend.service;

import com.toproof.backend.models.ShippingOption;
import com.toproof.backend.repo.ShippingOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShippingService {

    @Autowired
    private ShippingOptionRepository shippingOptionRepository;

    public List<ShippingOption> getAllShippingOptions() {
        return shippingOptionRepository.findAll();
    }

    public List<ShippingOption> getActiveShippingOptions() {
        return shippingOptionRepository.findByActiveTrue();
    }

    public Optional<ShippingOption> getShippingOptionById(Long id) {
        return shippingOptionRepository.findById(id);
    }

    public List<ShippingOption> getShippingOptionsByRegion(String region) {
        return shippingOptionRepository.findByRegionIgnoreCaseAndActiveTrue(region);
    }

    public List<ShippingOption> searchShippingByRegion(String region) {
        return shippingOptionRepository.findByRegionContainingIgnoreCaseAndActiveTrue(region);
    }

    public List<String> getAllActiveRegions() {
        return shippingOptionRepository.findAllActiveRegions();
    }

    public double calculateShippingCost(Long shippingOptionId, double orderSubtotal) {
        ShippingOption option = shippingOptionRepository.findById(shippingOptionId)
                .orElseThrow(() -> new RuntimeException("Shipping option not found"));

        if (!option.isActive()) {
            throw new RuntimeException("Selected shipping option is not available");
        }

        if (option.isFreeShippingAbove() && orderSubtotal >= option.getFreeShippingThreshold()) {
            return 0.0;
        }

        return option.getCost();
    }

    public ShippingOption createShippingOption(ShippingOption shippingOption) {
        return shippingOptionRepository.save(shippingOption);
    }

    public ShippingOption updateShippingOption(Long id, ShippingOption updatedOption) {
        ShippingOption existing = shippingOptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shipping option not found"));

        existing.setRegion(updatedOption.getRegion());
        existing.setMethodName(updatedOption.getMethodName());
        existing.setCost(updatedOption.getCost());
        existing.setDescription(updatedOption.getDescription());
        existing.setEstimatedDays(updatedOption.getEstimatedDays());
        existing.setActive(updatedOption.isActive());
        existing.setFreeShippingAbove(updatedOption.isFreeShippingAbove());
        existing.setFreeShippingThreshold(updatedOption.getFreeShippingThreshold());

        return shippingOptionRepository.save(existing);
    }

    public void deleteShippingOption(Long id) {
        if (!shippingOptionRepository.existsById(id)) {
            throw new RuntimeException("Shipping option not found");
        }
        shippingOptionRepository.deleteById(id);
    }
}

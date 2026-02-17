package com.toproof.backend.repo;

import com.toproof.backend.models.ShippingOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShippingOptionRepository extends JpaRepository<ShippingOption, Long> {

    List<ShippingOption> findByActiveTrue();

    List<ShippingOption> findByRegionIgnoreCaseAndActiveTrue(String region);

    List<ShippingOption> findByRegionContainingIgnoreCaseAndActiveTrue(String region);

    @Query("SELECT DISTINCT s.region FROM ShippingOption s WHERE s.active = true ORDER BY s.region")
    List<String> findAllActiveRegions();

    List<ShippingOption> findByRegionIgnoreCase(String region);
}

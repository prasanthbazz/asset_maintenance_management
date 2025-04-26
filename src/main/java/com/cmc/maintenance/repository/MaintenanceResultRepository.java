package com.cmc.maintenance.repository;

import com.cmc.maintenance.model.MaintenanceResult;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MaintenanceResultRepository extends JpaRepository<MaintenanceResult, Long> {
}

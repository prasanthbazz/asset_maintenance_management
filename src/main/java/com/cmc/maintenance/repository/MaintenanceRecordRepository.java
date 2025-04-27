package com.cmc.maintenance.repository;

import com.cmc.maintenance.model.MaintenanceRecord;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaintenanceRecordRepository extends JpaRepository<MaintenanceRecord, Long> {
    List<MaintenanceRecord> findByAssetIdAndApprovalStatus(Long assetId, MaintenanceRecord.ApprovalStatus status);
    List<MaintenanceRecord> findByApprovalStatus(MaintenanceRecord.ApprovalStatus status);
}

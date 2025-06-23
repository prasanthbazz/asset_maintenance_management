package com.cmc.maintenance.service;

import com.cmc.maintenance.repository.AssetRepository;
import org.springframework.stereotype.Service;

import com.cmc.maintenance.dto.DashboardSummaryDTO;
import lombok.RequiredArgsConstructor;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final AssetService assetService;
    private final MaintenanceRecordService maintenanceRecordService;
    private final AssetRepository assetRepository;

    public DashboardSummaryDTO getDashboardSummary() {
        DashboardSummaryDTO summaryDTO = new DashboardSummaryDTO();
        summaryDTO.setTotalAssets(assetService.getTotalAssetsCount());
        summaryDTO.setMaintenanceThisMonth(maintenanceRecordService.getCountOfApprovedMaintenanceRecordsSince(LocalDate.now().withDayOfMonth(1)));
        summaryDTO.setMaintenancePendingApproval(maintenanceRecordService.getCountOfPendingMaintenanceRecords());
        summaryDTO.setOverdueAssets(assetService.getCountOfAssetsDueForMaintenance(LocalDate.now()));
        summaryDTO.setAssetsCountByType(assetRepository.countAssetsByAssetType());
        summaryDTO.setAssetsCountByMaintenanceStatus(assetRepository.countAssetsByMaintenanceStatus(LocalDate.now().plusDays(7)));
        return summaryDTO;
    }
}

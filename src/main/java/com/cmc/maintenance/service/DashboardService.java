package com.cmc.maintenance.service;

import org.springframework.stereotype.Service;

import com.cmc.maintenance.dto.DashboardSummaryDTO;
import lombok.RequiredArgsConstructor;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final AssetService assetService;
    private final MaintenanceRecordService maintenanceRecordService;

    public DashboardSummaryDTO getDashboardSummary() {
        DashboardSummaryDTO summaryDTO = new DashboardSummaryDTO();
        summaryDTO.setTotalAssets(assetService.getTotalAssetsCount());
        summaryDTO.setMaintenanceThisMonth(maintenanceRecordService.getCountOfApprovedMaintenanceRecordsSince(LocalDate.now().withDayOfMonth(1)));
        summaryDTO.setMaintenancePendingApproval(maintenanceRecordService.getCountOfPendingMaintenanceRecords());
        summaryDTO.setOverdueAssets(assetService.getCountOfAssetsDueForMaintenance(LocalDate.now()));
        return summaryDTO;
    }
}

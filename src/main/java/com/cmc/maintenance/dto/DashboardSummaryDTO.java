package com.cmc.maintenance.dto;

import com.cmc.maintenance.dto.AssetTypeCountDTO;

import lombok.Data;

import java.util.List;


@Data
public class DashboardSummaryDTO {
    Long totalAssets;
    Long maintenanceThisMonth;
    Long maintenancePendingApproval;
    Long overdueAssets;
    List<AssetTypeCountDTO> assetsCountByType;
    AssetMaintenanceStatusCountDTO assetsCountByMaintenanceStatus;
}

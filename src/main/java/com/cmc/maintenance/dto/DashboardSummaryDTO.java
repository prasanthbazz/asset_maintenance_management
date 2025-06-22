package com.cmc.maintenance.dto;

import lombok.Data;

@Data
public class DashboardSummaryDTO {
    Long totalAssets;
    Long maintenanceThisMonth;
    Long maintenancePendingApproval;
    Long overdueAssets;
}

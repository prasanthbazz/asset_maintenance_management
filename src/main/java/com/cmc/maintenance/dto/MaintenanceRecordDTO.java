package com.cmc.maintenance.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class MaintenanceRecordDTO {

    private Long id;

    @NotNull(message = "Asset ID cannot be null")
    private Long assetId;

    @NotNull(message = "Maintenance Date cannot be null")
    private LocalDateTime maintenanceDate;

    private String approvalStatus;

    private String adminRemarks;

    private List<MaintenanceResultDTO> maintenanceResults;
}

package com.cmc.maintenance.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class MaintenanceRecordResponseDTO {
    private Long id;

    @NotNull(message = "Asset cannot be null")
    private AssetResponseDTO asset;

    @NotNull(message = "Maintenance Date cannot be null")
    private LocalDateTime maintenanceDate;

    private String approvalStatus;

    private String adminRemarks;

    private List<MaintenanceResultResponseDTO> maintenanceResults;
}

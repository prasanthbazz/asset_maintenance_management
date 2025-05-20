package com.cmc.maintenance.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MaintenanceResultResponseDTO {

    private Long id;

    @NotNull(message = "Maintenance Record ID cannot be null")
    private Long maintenanceRecordId;

    @NotNull(message = "Checklist Item ID cannot be null")
    private Long checklistItemId;

    private String checklistItemTask;

    @NotNull(message = "Result cannot be null")
    private String result;

    private String comments;
}

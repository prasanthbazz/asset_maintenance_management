package com.cmc.maintenance.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AssetDTO {
    private Long id;

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @NotBlank(message = "Tag ID cannot be blank")
    private String tagId;

    private String location;

    @NotNull(message = "Type ID cannot be null")
    private Long typeId;

    private LocalDateTime lastMaintenanceTime;

    @Min(value = 1, message = "Maintenance cycle must be at least 1 day")
    private int maintenanceCycleInDays;

    private LocalDate nextMaintenanceDate;
}

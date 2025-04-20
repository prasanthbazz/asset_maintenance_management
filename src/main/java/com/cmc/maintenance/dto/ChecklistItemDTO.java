package com.cmc.maintenance.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Data
public class ChecklistItemDTO {
    private Long id;

    @NotNull(message = "Asset type ID cannot be null")
    private Long assetTypeId;

    @NotBlank(message = "Task cannot be blank")
    private String task;

    //@NotNull(message = "Required field cannot be null")
    //private Boolean required;
}

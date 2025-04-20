package com.cmc.maintenance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Table(name = "checklist_items")
@Data
public class ChecklistItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_type_id", nullable = false)
    @NotNull(message = "Asset type cannot be null")
    private AssetType assetType;

    @NotBlank(message = "Task cannot be blank")
    private String task;
}

package com.cmc.maintenance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
@Table(name = "maintenance_results")
public class MaintenanceResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "maintenance_record_id", nullable = false)
    @NotNull(message = "Maintenance record cannot be null")
    private MaintenanceRecord maintenanceRecord;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checklist_item_id", nullable = false)
    @NotNull(message = "Checklist item cannot be null")
    private ChecklistItem checklistItem;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Result cannot be null")
    private Result result;

    private String comments;

    public enum Result {
        OK, NOT_OK
    }
}

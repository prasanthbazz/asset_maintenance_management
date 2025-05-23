package com.cmc.maintenance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Entity
@Table(name = "maintenance_records")
public class MaintenanceRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_id", nullable = false)
    @NotNull(message = "Asset cannot be null")
    private Asset asset;

    @NotNull(message = "Maintenance date cannot be null")
    private LocalDateTime maintenanceDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

    @Column(name = "admin_remarks")
    private String adminRemarks;

    @OneToMany(mappedBy = "maintenanceRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MaintenanceResult> maintenanceResults = new ArrayList<MaintenanceResult>();

    public enum ApprovalStatus {
        PENDING, APPROVED, REJECTED
    }
}

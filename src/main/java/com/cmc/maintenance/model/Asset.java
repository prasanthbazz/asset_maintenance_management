package com.cmc.maintenance.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.time.LocalDate;

import lombok.Data;

@Entity
@Data
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String tagId;

    private String location;

    @ManyToOne
    @JoinColumn(name = "asset_type_id", nullable = false)
    private AssetType type;

    //@Enumerated(EnumType.STRING)
    //@Column(nullable = false)
    //private AssetStatus status;

    private LocalDateTime lastMaintenanceTime;

    private int maintenanceCycleInDays;

    private LocalDate nextMaintenanceDate;
}

@Entity
@Table(name = "asset_types")
@Data
class AssetType{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;
}
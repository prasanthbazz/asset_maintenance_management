package com.cmc.maintenance.repository;

import com.cmc.maintenance.dto.AssetMaintenanceStatusCountDTO;
import com.cmc.maintenance.dto.AssetTypeCountDTO;
import com.cmc.maintenance.model.Asset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {

    // Find asset by unique asset code
    Optional<Asset> findByTagId(String assetTagId);

    // Find assets by type
    //List<Asset> findByAssetType(Asset.AssetType assetType);

    // Find assets by status
    //List<Asset> findByStatus(Asset.AssetStatus status);

    //Find assets due for maintenance
    @Query("SELECT a FROM Asset a WHERE a.nextMaintenanceDate <= :currentDate")
    List<Asset> findAssetsDueForMaintenance(@Param("currentDate") LocalDate currentDate);

    @Query("SELECT COUNT(a) FROM Asset a WHERE a.nextMaintenanceDate <= :currentDate")
    long countAssetsDueForMaintenance(@Param("currentDate") LocalDate currentDate);

    @Query("SELECT new com.cmc.maintenance.dto.AssetTypeCountDTO(a.type.name, COUNT(a)) FROM Asset a GROUP BY a.type.name")
    List<AssetTypeCountDTO> countAssetsByAssetType();

    @Query("""
      SELECT new com.cmc.maintenance.dto.AssetMaintenanceStatusCountDTO(
        SUM(CASE WHEN a.nextMaintenanceDate > :dueSoonCutoffDate THEN 1 ELSE 0 END),
        SUM(CASE WHEN a.nextMaintenanceDate BETWEEN CURRENT_DATE AND :dueSoonCutoffDate THEN 1 ELSE 0 END),
        SUM(CASE WHEN a.nextMaintenanceDate < CURRENT_DATE THEN 1 ELSE 0 END)
      )
      FROM Asset a
    """)
    AssetMaintenanceStatusCountDTO countAssetsByMaintenanceStatus(@Param("dueSoonCutoffDate") LocalDate dueSoonCutoffDate);
    // Count assets by type
    //long countByAssetType(Asset.AssetType assetType);
}

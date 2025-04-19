package com.cmc.maintenance.repository;

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
    @Query("SELECT a FROM Asset a WHERE a.nextMaintenance <= :currentDate")
    List<Asset> findAssetsDueForMaintenance(@Param("currentDate") LocalDate currentDate);

    // Count assets by type
    //long countByAssetType(Asset.AssetType assetType);
}

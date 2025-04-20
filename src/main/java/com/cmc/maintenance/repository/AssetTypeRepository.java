package com.cmc.maintenance.repository;

import com.cmc.maintenance.model.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssetTypeRepository extends JpaRepository<AssetType, Long> {
    Optional<AssetType> findById(long assetTypeId);
}
package com.cmc.maintenance.mapper;

import com.cmc.maintenance.dto.AssetDTO;
import com.cmc.maintenance.model.Asset;
import com.cmc.maintenance.model.AssetType;
import com.cmc.maintenance.repository.AssetTypeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class AssetMapper {
    public static Asset toEntity(AssetDTO dto, AssetType assetType) {
        if (dto == null) return null;
        Asset asset = new Asset();
        asset.setName(dto.getName());
        asset.setTagId(dto.getTagId());
        asset.setLocation(dto.getLocation());
        asset.setType(assetType);
        asset.setLastMaintenanceTime(dto.getLastMaintenanceTime());
        asset.setNextMaintenanceDate(dto.getNextMaintenanceDate());
        asset.setMaintenanceCycleInDays(dto.getMaintenanceCycleInDays());
        return asset;
    }

    public static AssetDTO toDTO(Asset asset) {
        if (asset == null) return null;
        AssetDTO dto = new AssetDTO();
        dto.setId(asset.getId());
        dto.setName(asset.getName());
        dto.setTagId(asset.getTagId());
        dto.setLocation(asset.getLocation());
        dto.setTypeId(asset.getType() != null ? asset.getType().getId() : null);
        dto.setLastMaintenanceTime(asset.getLastMaintenanceTime());
        dto.setNextMaintenanceDate(asset.getNextMaintenanceDate());
        dto.setMaintenanceCycleInDays(asset.getMaintenanceCycleInDays());
        return dto;
    }
}

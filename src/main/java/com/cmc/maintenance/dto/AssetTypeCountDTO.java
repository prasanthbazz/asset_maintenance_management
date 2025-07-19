package com.cmc.maintenance.dto;

import lombok.Data;

@Data
public class AssetTypeCountDTO {
    String assetType;
    Long count;

    public AssetTypeCountDTO(String assetType, Long count) {
        this.assetType = assetType;
        this.count = count;
    }
}
package com.cmc.maintenance.controller;

import com.cmc.maintenance.model.AssetType;
import com.cmc.maintenance.service.AssetTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/asset-types")
public class AssetTypeController {

    private final AssetTypeService assetTypeService;

    public AssetTypeController(AssetTypeService assetTypeService) {
        this.assetTypeService = assetTypeService;
    }

    @GetMapping
    public ResponseEntity<List<AssetType>> getAllAssetTypes() {
        return ResponseEntity.ok(assetTypeService.getAllAssetTypes());
    }
}
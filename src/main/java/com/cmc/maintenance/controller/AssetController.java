package com.cmc.maintenance.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;

import com.cmc.maintenance.service.AssetService;
import com.cmc.maintenance.model.Asset;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
public class AssetController {

    private final AssetService assetService;

    @Autowired
    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @PostMapping
    public ResponseEntity<Asset> createAsset(@Valid @RequestBody Asset asset) {
        try {
            Asset newAsset = assetService.createAsset(asset);
            return new ResponseEntity<>(newAsset, HttpStatus.CREATED);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Asset>> getAllAssets(){
        return new ResponseEntity<>(assetService.getAllAssets(), HttpStatus.OK);
    }

    @GetMapping("/tag/{tagId}")
    public ResponseEntity<Asset> findAssetByAssetTagId(@PathVariable String tagId){
        return assetService.getAssetByTagId(tagId)
                .map(asset -> ResponseEntity.status(HttpStatus.OK).body(asset))
                .orElseGet(()-> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
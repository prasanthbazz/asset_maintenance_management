package com.cmc.maintenance.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;

import com.cmc.maintenance.service.AssetService;
import com.cmc.maintenance.dto.AssetDTO;

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
    public ResponseEntity<AssetDTO> createAsset(@Valid @RequestBody AssetDTO assetDTO) {
        try {
            AssetDTO newAssetDTO = assetService.createAsset(assetDTO);
            return new ResponseEntity<>(newAssetDTO, HttpStatus.CREATED);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<AssetDTO>> getAllAssets(){
        return new ResponseEntity<>(assetService.getAllAssets(), HttpStatus.OK);
    }

    @GetMapping("/tag/{tagId}")
    public ResponseEntity<AssetDTO> findAssetByAssetTagId(@PathVariable String tagId){
        return assetService.getAssetByTagId(tagId)
                .map(asset -> ResponseEntity.status(HttpStatus.OK).body(asset))
                .orElseGet(()-> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
package com.cmc.maintenance.controller;

import com.cmc.maintenance.dto.AssetResponseDTO;
import com.cmc.maintenance.dto.MaintenanceRecordDTO;
import com.cmc.maintenance.dto.MaintenanceRecordResponseDTO;
import com.cmc.maintenance.service.MaintenanceRecordService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;

import com.cmc.maintenance.service.AssetService;
import com.cmc.maintenance.dto.AssetDTO;

import java.util.List;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;
    private final MaintenanceRecordService maintenanceRecordService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AssetResponseDTO> createAsset(@Valid @RequestBody AssetDTO assetDTO) {
        try {
            AssetResponseDTO newAssetDTO = assetService.createAsset(assetDTO);
            return new ResponseEntity<>(newAssetDTO, HttpStatus.CREATED);
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<AssetResponseDTO>> getAllAssets(){
        return new ResponseEntity<>(assetService.getAllAssets(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetResponseDTO> getAssetById(@PathVariable long id){
        return assetService.getAssetById(id)
                .map(assetDTO -> ResponseEntity.status(HttpStatus.OK).body(assetDTO))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/tag/{tagId}")
    public ResponseEntity<AssetResponseDTO> findAssetByAssetTagId(@PathVariable String tagId){
        return assetService.getAssetByTagId(tagId)
                .map(assetDTO -> ResponseEntity.status(HttpStatus.OK).body(assetDTO))
                .orElseGet(()-> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/due")
    public ResponseEntity<List<AssetResponseDTO>> getAssetsDueForMaintenance() {
        return ResponseEntity.ok(assetService.getAssetsDueForMaintenance(LocalDate.now()));
    }

    @GetMapping("/{assetId}/maintenance-records")
    public ResponseEntity<List<MaintenanceRecordResponseDTO>> getMaintenanceRecordsByAssetId(@PathVariable Long assetId) {
        try {
            return ResponseEntity.ok(maintenanceRecordService.getApprovedMaintenanceRecordsByAssetId(assetId));
        }
        catch(EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
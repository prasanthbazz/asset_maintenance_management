package com.cmc.maintenance.service;

import com.cmc.maintenance.model.Asset;
import com.cmc.maintenance.repository.AssetRepository;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.time.LocalDate;

import jakarta.persistence.EntityNotFoundException;
//import lombok.RequiredArgsConstructor;
//import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AssetService {
    private final AssetRepository assetRepository;

    @Autowired
    public AssetService(AssetRepository assetRepository){
        this.assetRepository = assetRepository;
    }

    @Transactional
    public Asset createAsset(Asset asset) {
        // Validate asset before saving
        if (assetRepository.findByTagId(asset.getTagId()).isPresent()) {
            throw new IllegalArgumentException("Asset with this code already exists");
        }

        if(asset.getLastMaintenanceTime() == null) {
            asset.setLastMaintenanceTime(LocalDateTime.now());
        }

        if(asset.getNextMaintenanceDate() == null){
            asset.setNextMaintenanceDate(asset.getLastMaintenanceTime().toLocalDate().plusDays(asset.getMaintenanceCycleInDays()));
        }
        return assetRepository.save(asset);
    }

    @Transactional
    public Asset updateAsset(Long id, Asset updatedAsset) {
        Asset existingAsset = assetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asset not found with id: " + id));

        // Update fields selectively
        existingAsset.setName(updatedAsset.getName());
        //existingAsset.setDescription(updatedAsset.getDescription());
        existingAsset.setLocation(updatedAsset.getLocation());
        //existingAsset.setStatus(updatedAsset.getStatus());
        //existingAsset.setLastMaintenanceDate(updatedAsset.getLastMaintenanceDate());
        //existingAsset.setNextMaintenanceDate(updatedAsset.getNextMaintenanceDate());

        return assetRepository.save(existingAsset);
    }

    @Transactional(readOnly = true)
    public List<Asset> getAssetsDueForMaintenance() {
        return assetRepository.findAssetsDueForMaintenance(LocalDate.now());
    }

    @Transactional(readOnly = true)
    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Asset> getAssetByTagId(String tagId) {
        return assetRepository.findByTagId(tagId);
    }

    @Transactional
    public void deleteAsset(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asset not found with id: " + id));

        assetRepository.delete(asset);
    }
}
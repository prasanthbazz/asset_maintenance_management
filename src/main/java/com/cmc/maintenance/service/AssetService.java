package com.cmc.maintenance.service;

import com.cmc.maintenance.mapper.AssetMapper;
import com.cmc.maintenance.model.Asset;
import com.cmc.maintenance.model.AssetType;
import com.cmc.maintenance.dto.AssetDTO;
import com.cmc.maintenance.repository.AssetRepository;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;
import java.time.LocalDate;
//import java.util.stream.Collectors;

import com.cmc.maintenance.repository.AssetTypeRepository;
import jakarta.persistence.EntityNotFoundException;
//import lombok.RequiredArgsConstructor;
//import org.apache.el.stream.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AssetService {
    private final AssetRepository assetRepository;
    private final AssetTypeService assetTypeService;

    @Transactional
    public AssetDTO createAsset(AssetDTO assetDTO) {

        AssetType assetType = getAssetTypeById(assetDTO.getTypeId());
        Asset asset = AssetMapper.toEntity(assetDTO, assetType);

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
        asset =  assetRepository.save(asset);

        return AssetMapper.toDTO(asset);
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
    public List<AssetDTO> getAllAssets() {
        return assetRepository.findAll().stream()
                .map(AssetMapper::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public Optional<AssetDTO> getAssetByTagId(String tagId) {
        return assetRepository.findByTagId(tagId)
                .map(AssetMapper::toDTO);
    }

    @Transactional
    public void deleteAsset(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Asset not found with id: " + id));

        assetRepository.delete(asset);
    }

    private AssetType getAssetTypeById(Long typeId) {
        return assetTypeService.getAssetTypeById(typeId)
                .orElseThrow(() -> new IllegalArgumentException("Asset type not found with id : " + typeId));
    }
}
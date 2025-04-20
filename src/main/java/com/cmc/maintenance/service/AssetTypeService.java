package com.cmc.maintenance.service;

import com.cmc.maintenance.model.AssetType;
import com.cmc.maintenance.mapper.AssetMapper;
import com.cmc.maintenance.model.AssetType;
import com.cmc.maintenance.repository.AssetTypeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AssetTypeService {

    private final AssetTypeRepository assetTypeRepository;

    public AssetTypeService(AssetTypeRepository assetTypeRepository) {
        this.assetTypeRepository = assetTypeRepository;
    }

    public Optional<AssetType> getAssetTypeById(long assetTypeId) {
        return assetTypeRepository.findById(assetTypeId);
    }

    @Transactional(readOnly = true)
    public List<AssetType> getAllAssetTypes() {
//        return assetTypeRepository.findAll().stream()
//                .map(AssetMapper::toDTO)
//                .collect(Collectors.toList());
        return assetTypeRepository.findAll();
    }
}
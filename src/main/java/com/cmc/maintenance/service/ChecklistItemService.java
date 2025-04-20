package com.cmc.maintenance.service;

import com.cmc.maintenance.dto.ChecklistItemDTO;
import com.cmc.maintenance.mapper.AssetMapper;
import com.cmc.maintenance.repository.ChecklistItemRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChecklistItemService {
    private final ChecklistItemRepository checklistItemRepository;

    public List<ChecklistItemDTO> getChecklistItemsByAssetType(Long assetTypeId){
        return checklistItemRepository.findByAssetTypeId(assetTypeId).stream()
                .map(AssetMapper::toDTO)
                .toList();
    }
}

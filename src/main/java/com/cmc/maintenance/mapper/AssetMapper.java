package com.cmc.maintenance.mapper;

import com.cmc.maintenance.dto.*;
import com.cmc.maintenance.model.*;

import java.util.stream.Collectors;

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

    public static AssetResponseDTO toDTO(Asset asset) {
        if (asset == null) return null;
        AssetResponseDTO dto = new AssetResponseDTO();
        dto.setId(asset.getId());
        dto.setName(asset.getName());
        dto.setTagId(asset.getTagId());
        dto.setLocation(asset.getLocation());
        dto.setAssetType(asset.getType() != null ? asset.getType().getName() : null);
        dto.setLastMaintenanceTime(asset.getLastMaintenanceTime());
        dto.setNextMaintenanceDate(asset.getNextMaintenanceDate());
        dto.setMaintenanceCycleInDays(asset.getMaintenanceCycleInDays());
        return dto;
    }

    public static ChecklistItemDTO toDTO(ChecklistItem checklistItem) {
        if (checklistItem == null) return null;

        ChecklistItemDTO dto = new ChecklistItemDTO();
        dto.setId(checklistItem.getId());
        dto.setTask(checklistItem.getTask());
        dto.setAssetTypeId(checklistItem.getAssetType() != null ? checklistItem.getAssetType().getId() : null);

        return dto;
    }

//    public static MaintenanceRecordDTO toDTO(MaintenanceRecord record) {
//        if (record == null) return null;
//        MaintenanceRecordDTO dto = new MaintenanceRecordDTO();
//        dto.setId(record.getId());
//        dto.setAssetId(record.getAsset() != null ? record.getAsset().getId() : null);
//        dto.setMaintenanceDate(record.getMaintenanceDate());
//        dto.setApprovalStatus(record.getApprovalStatus().name());
//        dto.setAdminRemarks(record.getAdminRemarks());
//        dto.setMaintenanceResults(record.getMaintenanceResults().stream()
//                .map(AssetMapper::toDTO)
//                .toList());
//        return dto;
//    }

    public static MaintenanceRecordResponseDTO toDTO(MaintenanceRecord record) {
        if (record == null) return null;
        MaintenanceRecordResponseDTO dto = new MaintenanceRecordResponseDTO();
        dto.setId(record.getId());
        dto.setAsset(record.getAsset() != null ? toDTO(record.getAsset()) : null);
        dto.setMaintenanceDate(record.getMaintenanceDate());
        dto.setApprovalStatus(record.getApprovalStatus().name());
        dto.setAdminRemarks(record.getAdminRemarks());
        dto.setMaintenanceResults(record.getMaintenanceResults().stream()
                .map(AssetMapper::toDTO)
                .toList());
        return dto;
    }

    public static MaintenanceRecord toEntity(MaintenanceRecordDTO dto, Asset asset) {
        if(dto == null) return null;
        MaintenanceRecord maintenanceRecord = new MaintenanceRecord();

        maintenanceRecord.setAsset(asset);
        maintenanceRecord.setMaintenanceDate(dto.getMaintenanceDate());
        if (dto.getApprovalStatus() != null) {
            maintenanceRecord.setApprovalStatus(MaintenanceRecord.ApprovalStatus.valueOf(dto.getApprovalStatus()));
        }
        maintenanceRecord.setAdminRemarks(dto.getAdminRemarks());

        return maintenanceRecord;
    }

//    public static MaintenanceResultDTO toDTO(MaintenanceResult result) {
//        if (result == null) return null;
//        MaintenanceResultDTO dto = new MaintenanceResultDTO();
//        dto.setId(result.getId());
//        dto.setMaintenanceRecordId(result.getMaintenanceRecord() != null ? result.getMaintenanceRecord().getId() : null);
//        dto.setChecklistItemId(result.getChecklistItem() != null ? result.getChecklistItem().getId() : null);
//        dto.setResult(result.getResult() != null ? result.getResult().name() : null);
//        dto.setComments(result.getComments());
//        return dto;
//    }

    public static MaintenanceResultResponseDTO toDTO(MaintenanceResult result) {
        if (result == null) return null;
        MaintenanceResultResponseDTO dto = new MaintenanceResultResponseDTO();
        dto.setId(result.getId());
        dto.setMaintenanceRecordId(result.getMaintenanceRecord() != null ? result.getMaintenanceRecord().getId() : null);
        dto.setChecklistItemId(result.getChecklistItem() != null ? result.getChecklistItem().getId() : null);
        dto.setChecklistItemTask(result.getChecklistItem() != null ? result.getChecklistItem().getTask() : null);
        dto.setResult(result.getResult() != null ? result.getResult().name() : null);
        dto.setComments(result.getComments());
        return dto;
    }

    public static MaintenanceResult toEntity(MaintenanceResultDTO dto, MaintenanceRecord record, ChecklistItem item) {
        if (dto == null) return null;
        MaintenanceResult result = new MaintenanceResult();
        result.setMaintenanceRecord(record);
        result.setChecklistItem(item);
        result.setResult(dto.getResult() != null ? MaintenanceResult.Result.valueOf(dto.getResult()) : null);
        result.setComments(dto.getComments());
        return result;
    }
}

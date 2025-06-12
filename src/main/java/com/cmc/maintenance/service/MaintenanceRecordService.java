package com.cmc.maintenance.service;

import com.cmc.maintenance.dto.MaintenanceRecordDTO;
import com.cmc.maintenance.dto.MaintenanceRecordResponseDTO;
import com.cmc.maintenance.dto.MaintenanceRecordUpdateDTO;
import com.cmc.maintenance.dto.MaintenanceResultDTO;
import com.cmc.maintenance.mapper.AssetMapper;
import com.cmc.maintenance.model.Asset;
import com.cmc.maintenance.model.ChecklistItem;
import com.cmc.maintenance.model.MaintenanceRecord;
import com.cmc.maintenance.model.MaintenanceResult;
import com.cmc.maintenance.repository.AssetRepository;
import com.cmc.maintenance.repository.ChecklistItemRepository;
import com.cmc.maintenance.repository.MaintenanceRecordRepository;
import com.cmc.maintenance.repository.MaintenanceResultRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceRecordService {
    private final MaintenanceRecordRepository maintenanceRecordRepository;
    private final MaintenanceResultRepository maintenanceResultRepository;
    private final AssetRepository assetRepository;
    private final ChecklistItemRepository checklistItemRepository;

    @Transactional
    public MaintenanceRecordResponseDTO createMaintenanceRecord(MaintenanceRecordDTO maintenanceRecordDTO){
        Asset asset = this.assetRepository.findById(maintenanceRecordDTO.getAssetId())
                .orElseThrow(() -> new EntityNotFoundException("Asset not found with id: " + maintenanceRecordDTO.getAssetId()));

        MaintenanceRecord maintenanceRecord = AssetMapper.toEntity(maintenanceRecordDTO, asset);

        MaintenanceRecord savedRecord = maintenanceRecordRepository.save(maintenanceRecord);

        if(maintenanceRecordDTO.getMaintenanceResults() != null) {
            for(MaintenanceResultDTO resultDTO : maintenanceRecordDTO.getMaintenanceResults()) {
                ChecklistItem item = checklistItemRepository.findById(resultDTO.getChecklistItemId())
                        .orElseThrow(() -> new EntityNotFoundException("ChecklistItem not found with id: " + resultDTO.getChecklistItemId()));
                MaintenanceResult result = AssetMapper.toEntity(resultDTO, savedRecord, item);
                maintenanceResultRepository.save(result);
            }
        }
        return AssetMapper.toDTO(savedRecord);
    }

    @Transactional(readOnly = true)
    public MaintenanceRecordResponseDTO getMaintenanceRecord(Long id) {
        MaintenanceRecord record = maintenanceRecordRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("MaintenanceRecord not found with id: " + id));
        return AssetMapper.toDTO(record);
    }

    @Transactional(readOnly = true)
    public List<MaintenanceRecordResponseDTO> getAllMaintenanceRecords() {
        return maintenanceRecordRepository.findAll().stream()
                .map(AssetMapper::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MaintenanceRecordResponseDTO> getAllApprovedMaintenanceRecords() {
        return maintenanceRecordRepository.findByApprovalStatus(MaintenanceRecord.ApprovalStatus.APPROVED).stream()
                .map(AssetMapper::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MaintenanceRecordResponseDTO> getAllPendingMaintenanceRecords() {
        return maintenanceRecordRepository.findByApprovalStatus(MaintenanceRecord.ApprovalStatus.PENDING).stream()
                .map(AssetMapper::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MaintenanceRecordResponseDTO> getApprovedMaintenanceRecordsByAssetId(Long assetId) {
        assetRepository.findById(assetId)
                .orElseThrow(() -> new EntityNotFoundException("Asset not found with id: " + assetId));
        return maintenanceRecordRepository.findByAssetIdAndApprovalStatus(assetId, MaintenanceRecord.ApprovalStatus.APPROVED).stream()
                .map(AssetMapper::toDTO)
                .toList();
    }

    public MaintenanceRecordResponseDTO approveMaintenanceRecord(Long maintenanceRecordId, MaintenanceRecordUpdateDTO recordUpdateDTO) {
        MaintenanceRecord record = maintenanceRecordRepository.findById(maintenanceRecordId)
                .orElseThrow(() -> new EntityNotFoundException("Maintenance Record not found with id : " + maintenanceRecordId));
        record.setApprovalStatus(MaintenanceRecord.ApprovalStatus.APPROVED);
        if(recordUpdateDTO != null) {
            record.setAdminRemarks(recordUpdateDTO.getAdminRemarks());
        }
        maintenanceRecordRepository.save(record);
        return AssetMapper.toDTO(record);
    }

    public MaintenanceRecordResponseDTO rejectMaintenanceRecord(Long maintenanceRecordId, MaintenanceRecordUpdateDTO recordUpdateDTO) {
        MaintenanceRecord record = maintenanceRecordRepository.findById(maintenanceRecordId)
                .orElseThrow(() -> new EntityNotFoundException("Maintenance Record not found with id : " + maintenanceRecordId));
        record.setApprovalStatus(MaintenanceRecord.ApprovalStatus.REJECTED);
        if(recordUpdateDTO != null) {
            record.setAdminRemarks(recordUpdateDTO.getAdminRemarks());
        }
        maintenanceRecordRepository.save(record);
        return AssetMapper.toDTO(record);
    }
}

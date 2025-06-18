package com.cmc.maintenance.controller;

import com.cmc.maintenance.dto.MaintenanceRecordDTO;
import com.cmc.maintenance.dto.MaintenanceRecordResponseDTO;
import com.cmc.maintenance.dto.MaintenanceRecordUpdateDTO;
import com.cmc.maintenance.service.MaintenanceRecordService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/maintenance-records")
public class MaintenanceRecordController {
    private final MaintenanceRecordService maintenanceRecordService;

    @PostMapping
    public ResponseEntity<MaintenanceRecordResponseDTO> createMaintenanceRecord(@Valid @RequestBody MaintenanceRecordDTO maintenanceRecordDTO) {
        try {
            MaintenanceRecordResponseDTO recordDTO = maintenanceRecordService.createMaintenanceRecord(maintenanceRecordDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(recordDTO);
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRecordResponseDTO> getMaintenanceRecord(@PathVariable Long id) {
        try {
            MaintenanceRecordResponseDTO record = maintenanceRecordService.getMaintenanceRecord(id);
            return ResponseEntity.ok(record);
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<MaintenanceRecordResponseDTO>> getAllMaintenanceRecords() {
        return ResponseEntity.status(HttpStatus.OK).body(maintenanceRecordService.getAllMaintenanceRecords());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<MaintenanceRecordResponseDTO>> getAllPendingMaintenanceRecords() {
        return ResponseEntity.status(HttpStatus.OK).body(maintenanceRecordService.getAllPendingMaintenanceRecords());
    }

    @GetMapping("/approved")
    public ResponseEntity<List<MaintenanceRecordResponseDTO>> getAllApprovedMaintenanceRecords() {
        return ResponseEntity.status(HttpStatus.OK).body(maintenanceRecordService.getAllApprovedMaintenanceRecords());
    }

    @PatchMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MaintenanceRecordResponseDTO> approveMaintenanceRecord(@PathVariable Long id, @RequestBody(required=false) MaintenanceRecordUpdateDTO recordUpdateDTO) {
        try {
            MaintenanceRecordResponseDTO dto =  maintenanceRecordService.approveMaintenanceRecord(id, recordUpdateDTO);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MaintenanceRecordResponseDTO> rejectMaintenanceRecord(@PathVariable Long id, @RequestBody(required=false) MaintenanceRecordUpdateDTO recordUpdateDTO) {
        try {
            MaintenanceRecordResponseDTO dto =  maintenanceRecordService.rejectMaintenanceRecord(id, recordUpdateDTO);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    ////To-Do : bulk-approve and bulk-reject
}

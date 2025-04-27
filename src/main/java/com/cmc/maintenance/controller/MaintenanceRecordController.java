package com.cmc.maintenance.controller;

import com.cmc.maintenance.dto.MaintenanceRecordDTO;
import com.cmc.maintenance.dto.MaintenanceRecordUpdateDTO;
import com.cmc.maintenance.service.MaintenanceRecordService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/maintenance-records")
public class MaintenanceRecordController {
    private final MaintenanceRecordService maintenanceRecordService;

    @PostMapping
    public ResponseEntity<MaintenanceRecordDTO> createMaintenanceRecord(@Valid @RequestBody MaintenanceRecordDTO maintenanceRecordDTO) {
        try {
            MaintenanceRecordDTO recordDTO = maintenanceRecordService.createMaintenanceRecord(maintenanceRecordDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(recordDTO);
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRecordDTO> getMaintenanceRecord(@PathVariable Long id) {
        try {
            MaintenanceRecordDTO record = maintenanceRecordService.getMaintenanceRecord(id);
            return ResponseEntity.ok(record);
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<MaintenanceRecordDTO>> getAllMaintenanceRecords() {
        return ResponseEntity.status(HttpStatus.OK).body(maintenanceRecordService.getAllMaintenanceRecords());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<MaintenanceRecordDTO>> getAllPendingMaintenanceRecords() {
        return ResponseEntity.status(HttpStatus.OK).body(maintenanceRecordService.getAllPendingMaintenanceRecords());
    }

    @GetMapping("/approved")
    public ResponseEntity<List<MaintenanceRecordDTO>> getAllApprovedMaintenanceRecords() {
        return ResponseEntity.status(HttpStatus.OK).body(maintenanceRecordService.getAllApprovedMaintenanceRecords());
    }

    @PatchMapping("/{id}/approve")
    public ResponseEntity<MaintenanceRecordDTO> approveMaintenanceRecord(@PathVariable Long id, @RequestBody MaintenanceRecordUpdateDTO recordUpdateDTO) {
        try {
            MaintenanceRecordDTO dto =  maintenanceRecordService.approveMaintenanceRecord(id, recordUpdateDTO);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping("/{id}/reject")
    public ResponseEntity<MaintenanceRecordDTO> rejectMaintenanceRecord(@PathVariable Long id, @RequestBody MaintenanceRecordUpdateDTO recordUpdateDTO) {
        try {
            MaintenanceRecordDTO dto =  maintenanceRecordService.rejectMaintenanceRecord(id, recordUpdateDTO);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

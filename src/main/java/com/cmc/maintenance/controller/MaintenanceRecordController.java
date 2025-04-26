package com.cmc.maintenance.controller;

import com.cmc.maintenance.dto.MaintenanceRecordDTO;
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
}

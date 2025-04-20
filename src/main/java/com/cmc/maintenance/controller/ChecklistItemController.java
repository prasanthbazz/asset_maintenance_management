package com.cmc.maintenance.controller;

import com.cmc.maintenance.dto.ChecklistItemDTO;
import com.cmc.maintenance.service.ChecklistItemService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ChecklistItemController {
    private final ChecklistItemService checklistItemService;

    @GetMapping("/asset-types/{assetTypeId}/checklist-items")
    public ResponseEntity<List<ChecklistItemDTO>> getChecklistItemsByAssetType(@PathVariable Long assetTypeId) {
        return ResponseEntity.ok(checklistItemService.getChecklistItemsByAssetType(assetTypeId));
    }

}
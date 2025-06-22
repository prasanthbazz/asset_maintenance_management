package com.cmc.maintenance.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cmc.maintenance.service.DashboardService;
import com.cmc.maintenance.dto.DashboardSummaryDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDTO> getDashboardSummary() {
        System.out.println("WE ARE HERE - getDashboardSummary");
        return ResponseEntity.ok(dashboardService.getDashboardSummary());
    }
}

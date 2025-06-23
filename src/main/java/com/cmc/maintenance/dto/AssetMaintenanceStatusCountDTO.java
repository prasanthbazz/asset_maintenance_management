package com.cmc.maintenance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class AssetMaintenanceStatusCountDTO {
    Long maintained;
    Long dueSoon;
    Long overdue;
}
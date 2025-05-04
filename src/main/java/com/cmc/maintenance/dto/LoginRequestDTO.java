package com.cmc.maintenance.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequestDTO {
    private String username;
    private String password;
}

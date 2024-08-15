package com.iam.server.dto;

import com.iam.server.entity.Position;
import jakarta.validation.constraints.NotBlank;

public record MemberRequest(
        @NotBlank(message = "Name is mandatory")
        String name,
        String img,
        Position position,
        String reportTo
) {
}

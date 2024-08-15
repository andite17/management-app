package com.iam.server.dto;

public record MemberResponse(
        String id,
        String name,
        String img,
        String position,
        String reportTo
) {
}

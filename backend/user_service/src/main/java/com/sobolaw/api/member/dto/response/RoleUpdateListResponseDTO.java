package com.sobolaw.api.member.dto.response;

/**
 * 등업 요청 리스트 Response.
 */
public record RoleUpdateListResponseDTO(Long articleId, String name) {

    public static RoleUpdateListResponseDTO of(Long articleId, String name) {
        return new RoleUpdateListResponseDTO(articleId, name);
    }
}

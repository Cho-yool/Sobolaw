package com.sobolaw.api.member.dto.response;

import com.sobolaw.api.member.entity.Type.RoleType;

/**
 * ROLE 업데이트 후 Response Dto.
 */
public record RoleUpdateResponseDTO(Long memberId, RoleType role) {

    public static RoleUpdateResponseDTO of(Long memberId, RoleType role) {
        return new RoleUpdateResponseDTO(memberId, role);
    }
}

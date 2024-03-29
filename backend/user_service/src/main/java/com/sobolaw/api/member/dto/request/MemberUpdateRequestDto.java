package com.sobolaw.api.member.dto.request;

import com.sobolaw.api.member.entity.Type.RoleType;

/**
 * 수정시 멤버 정보 받을 request Dto.
 */
public record MemberUpdateRequestDto(String name, String email, RoleType role) {

    public static MemberUpdateRequestDto of(String name, String email, RoleType role) {
        return new MemberUpdateRequestDto(name, email, role);
    }
}


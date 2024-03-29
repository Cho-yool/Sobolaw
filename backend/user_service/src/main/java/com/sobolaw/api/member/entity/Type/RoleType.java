package com.sobolaw.api.member.entity.Type;

import lombok.RequiredArgsConstructor;

/**
 * 멤버 타입.
 * ROLE_USER : 사용자.
 * ROLE_ADMIN : 관리자.
 */
@RequiredArgsConstructor
public enum RoleType {
    ROLE_USER(0),
    ROLE_ADMIN(1),
    ROLE_LAWYER(2);

    private final int value;
}

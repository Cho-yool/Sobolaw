package com.sobolaw.api.member.dto.response;

import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.entity.Type.RoleType;
import java.time.LocalDate;

/**
 * Admin 이 관리하기 위한 정보 Dto.
 */
public record AdminMemberResponseDTO(Long memberId, String name, String email, LocalDate birthday, RoleType role) {

    /**
     * 파라미터로 생성하는 팩토리 메서드.
     */
    public static AdminMemberResponseDTO of(Long memberId, String name, String email, LocalDate birthday, RoleType role) {
        return new AdminMemberResponseDTO(memberId, name, email, birthday, role);
    }

    /**
     * 멤버엔티티로 부터 변환한다.
     */
    public static AdminMemberResponseDTO from(Member entity) {
        return new AdminMemberResponseDTO(
            entity.getMemberId(),
            entity.getName(),
            entity.getEmail(),
            entity.getBirthday(),
            entity.getRole()
        );
    }
}


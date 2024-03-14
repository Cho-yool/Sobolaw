package com.sobolaw.global.security.auth;

import com.sobolaw.api.member.entity.Member;
import java.time.LocalDate;
import java.util.Map;

/**
 * 소셜 로그인 입력 DTO.
 */
public record OAuth2UserInfoDTO(String name, String email, LocalDate birthday){


    public Member toEntity(OAuth2UserInfoDTO dto) {
        return Member.of(
            dto.name(), dto.email(), dto.birthday()
        );
    }
}

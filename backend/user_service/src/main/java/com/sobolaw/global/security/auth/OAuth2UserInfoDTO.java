package com.sobolaw.global.security.auth;

import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.exception.MemberErrorCode;
import com.sobolaw.api.member.exception.MemberException;
import java.time.LocalDate;
import java.util.Map;
import lombok.Builder;

/**
 * 소셜 로그인 입력 DTO.
 */
@Builder
public record OAuth2UserInfoDTO(String name, String email, LocalDate birthday) {

    private static final String ILLEGAL_OAUTHCLIENT_NAME = "A";

    public static OAuth2UserInfoDTO of(String oauthClientName, Map<String, Object> attributes) {
        return switch (oauthClientName) { // oauthClientName 별로 userInfo 생성
            case "naver" -> ofNaver(attributes);
            case "kakao" -> ofKakao(attributes);
            default -> throw new MemberException(MemberErrorCode.ILLEGAL_OAUTH2CLIENT_NAME);
        };
    }

    private static OAuth2UserInfoDTO ofNaver(Map<String, Object> attributes) {
        System.out.println("naver");
        System.out.println("attributes = " + attributes);
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        System.out.println("response = " + response);
        LocalDate birthday = LocalDate.parse(
            response.get("birthyear") + "-" + response.get("birthday"));
        return OAuth2UserInfoDTO.builder()
            .name((String) response.get("name"))
            .email((String) response.get("email"))
            .birthday((birthday))
            .build();
    }

    private static OAuth2UserInfoDTO ofKakao(Map<String, Object> attributes) {
        System.out.println("kakao");
        System.out.println("attributes = " + attributes);
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        System.out.println("account = " + account);
        Map<String, Object> profile = (Map<String, Object>) account.get("profile");
        System.out.println("profile = " + profile);

        return OAuth2UserInfoDTO.builder()
            .name((String) profile.get("nickname"))
            .email((String) account.get("email"))
            .build();
    }


    public Member toEntity() {
        return Member.of(
            name, email, birthday
        );
    }
}

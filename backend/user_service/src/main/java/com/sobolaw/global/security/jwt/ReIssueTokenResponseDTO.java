package com.sobolaw.global.security.jwt;

/**
 * Access Token 재발급에 대한 응답 정보를 담은 DTO 클래스.
 */
public record ReIssueTokenResponseDTO(String refreshToken, String accessToken) {
    public static ReIssueTokenResponseDTO of(String refreshToken, String accessToken) {
        return new ReIssueTokenResponseDTO(refreshToken, accessToken);
    }
}
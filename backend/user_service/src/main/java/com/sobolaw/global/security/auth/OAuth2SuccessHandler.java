package com.sobolaw.global.security.auth;

import com.sobolaw.global.security.jwt.JwtAuthenticationFilter.TokenKey;
import com.sobolaw.global.security.jwt.JwtProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

/**
 * 소셜 로그인이 성공적으로 이루어졌다면 Token 을 발급하고 redirect. (2)
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider tokenProvider;
    //    private static final String URI = "https://j10a604.p.ssafy.io";
    private static final String URI = "http://localhost:5173";

    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication
    ) throws IOException, ServletException {

        // memberId 가져오기
        Long memberId = getMemberId(authentication);
        log.info("memberId = " + memberId);

        // accessToken, refreshToken 발급
        String accessToken = tokenProvider.generateAccessToken(authentication, memberId);
        tokenProvider.generateRefreshToken(authentication, memberId);

        log.info("accessToken = " + accessToken);

        // 토큰 전달을 위한 redirect
        // 토큰을 헤더에 추가하여 전달
        response.addHeader("Authorization", TokenKey.TOKEN_PREFIX + accessToken);

        // 리다이렉트 URL로 이동
        response.sendRedirect(URI);
    }


    // 사용자 인증 정보에서 memberId 추출하는 메서드
    private Long getMemberId(Authentication authentication) {
        log.info("authentication = " + authentication);
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        log.info("authentication.Principle = " + authentication.getPrincipal());
        log.info("userDetails = " + userDetails);
        return userDetails.getMemberId();
    }
}
package com.sobolaw.global.security.auth;

import com.sobolaw.global.security.jwt.JwtProvider;
import jakarta.persistence.Column;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider tokenProvider;
    private static final String URI = "/auth/success";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {
        // accessToken, refreshToken 발급
        String accessToken = tokenProvider.createAccessToken(authentication);
        tokenProvider.generateRefreshToken(authentication, accessToken);

        // 토큰 전달을 위한 redirect
        String redirectUrl = UriComponentsBuilder.fromUriString(URI)
            .queryParam("accessToken", accessToken)
            .build().toUriString();

        response.sendRedirect(redirectUrl);
    }
}
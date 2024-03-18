package com.sobolaw.global.security.jwt;

import org.springframework.security.core.token.Token;
import org.springframework.security.core.token.TokenService;

public interface JwtService extends TokenService {

    Token findByAccessTokenOrThrow(String accessToken);

    void saveOrUpdate(String username, String refreshToken, String accessToken);

    void updateToken(String newAccessToken, Token token);

}
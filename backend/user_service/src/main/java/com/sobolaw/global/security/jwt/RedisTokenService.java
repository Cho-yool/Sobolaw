package com.sobolaw.global.security.jwt;

import com.sobolaw.global.security.jwt.exception.TokenErrorCode;
import com.sobolaw.global.security.jwt.exception.TokenException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.token.Token;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RedisTokenService implements JwtService {

    private final RedisTemplate<String, CustomToken> redisTemplate;

    @Override
    public CustomToken findByAccessTokenOrThrow(String accessToken) {
        CustomToken token = redisTemplate.opsForValue().get(accessToken);
        if (token == null) {
            throw new TokenException(TokenErrorCode.NOT_EXIST_TOKEN);
        }
        return token;
    }

    @Override
    public void saveOrUpdate(String username, String refreshToken, String accessToken) {
        CustomToken token = new CustomToken();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        redisTemplate.opsForValue().set(accessToken, token);
    }

    @Override
    public void updateToken(String newAccessToken, Token token) {
        redisTemplate.opsForValue().set(newAccessToken, (CustomToken) token);
        redisTemplate.delete(((CustomToken) token).getAccessToken());

    }

    @Override
    public Token allocateToken(String extendedInformation) {
        return null;
    }

    @Override
    public Token verifyToken(String key) {
        return null;
    }

    // allocateToken과 verifyToken 메소드의 구현은 필요에 따라 추가하세요.
}
package com.sobolaw.global.security.jwt;

import com.sobolaw.global.security.jwt.exception.TokenErrorCode;
import com.sobolaw.global.security.jwt.exception.TokenException;
import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Redis를 사용하여 토큰을 저장하고 관리.
 */
@Service
@RequiredArgsConstructor
public class RedisTokenService {

    private final RedisTemplate<String, String> redisTemplate;


    /**
     * accessToken으로 refreshToken을 가져옵니다.
     *
     * @param accessToken accessToken
     * @return refreshToken
     */
    @Transactional
    public String findRefreshTokenByAccessToken(String accessToken) {
        Set<String> keys = redisTemplate.keys("*" + accessToken + "*");
        if (keys.isEmpty()) {
            throw new TokenException(TokenErrorCode.NOT_EXIST_TOKEN);
        }
        return keys.iterator().next();
    }


    /**
     * 주어진 memberId로 해당하는 RefreshToken을 찾습니다.
     *
     * @param memberId 멤버 Id
     * @return 해당 memberId에 대한 RefreshToken
     * @throws TokenException 토큰을 찾지 못한 경우 발생하는 예외
     */
    @Transactional
    public String findRefreshTokenByMemberId(Long memberId) {
        String refreshToken = redisTemplate.opsForValue().get(String.valueOf(memberId));
        if (refreshToken == null) {
            throw new TokenException(TokenErrorCode.NOT_EXIST_TOKEN);
        }
        return refreshToken;
    }

    /**
     * 주어진 RefreshToken으로 해당하는 MemberId를 찾습니다.
     *
     * @param refreshToken RefreshToken
     * @return 해당 RefreshToken 에 대한 MemberId
     * @throws TokenException 토큰을 찾지 못한 경우 발생하는 예외
     */
    @Transactional
    public Long findMemberIdByRefreshToken(String refreshToken) {
        String memberId = redisTemplate.opsForValue().get(refreshToken);
        if (memberId == null) {
            throw new TokenException(TokenErrorCode.NOT_EXIST_TOKEN);
        }
        return Long.parseLong(memberId);
    }


    /**
     * 사용자의 RefreshToken을 저장하거나 업데이트합니다.
     *
     * @param refreshToken 저장할 RefreshToken
     * @param memberId     memberId
     */
    @Transactional
    public void saveOrUpdate(String refreshToken, Long memberId) {
        redisTemplate.opsForValue().set(refreshToken, String.valueOf(memberId));
    }


    /**
     * 로그아웃 시 Redis 내 RefreshToken 삭제.
     *
     * @param memberId 멤버 Id
     */
    @Transactional
    public void deleteRefreshTokenByMemberId(Long memberId) {
        redisTemplate.delete(String.valueOf(memberId));
    }

    /**
     * 현재 로그인한 사용자의 Refresh Token 을 찾음.
     */
    public String getRefreshTokenByUserId(Long memberId) {
        String stringMemberId = memberId.toString();

        Optional<String> refreshToken = Optional.ofNullable(redisTemplate.keys("*"))
            .stream().flatMap(Collection::stream)
            .map(key -> redisTemplate.opsForValue().get(key))
            .filter(stringMemberId::equals)
            .findFirst();

        return refreshToken.orElseThrow(() -> new TokenException(TokenErrorCode.NOT_EXIST_TOKEN));
    }


    /**
     * refreshToken 삭제.
     */
    @Transactional
    public void deleteRefreshToken(String refreshToken) {
        redisTemplate.delete(refreshToken);
    }


}
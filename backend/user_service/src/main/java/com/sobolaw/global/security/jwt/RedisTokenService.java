package com.sobolaw.global.security.jwt;

import com.sobolaw.global.security.jwt.exception.TokenErrorCode;
import com.sobolaw.global.security.jwt.exception.TokenException;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Redis를 사용하여 토큰을 저장하고 관리.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RedisTokenService {

    private final RedisTemplate<String, String> redisTemplate;


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
            throw new TokenException(TokenErrorCode.NOT_EXIST_REFRESH_TOKEN);
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
        log.info("save refreshToken = " + refreshToken);
        redisTemplate.opsForValue().set(refreshToken, String.valueOf(memberId));
    }


    /**
     * refreshToken 삭제.
     */
    @Transactional
    public void deleteRefreshToken(String refreshToken) {
        redisTemplate.delete(refreshToken);
    }


}
package com.sobolaw.global.security.jwt;

import com.sobolaw.global.security.auth.CustomUserDetails;
import com.sobolaw.global.security.jwt.exception.TokenErrorCode;
import com.sobolaw.global.security.jwt.exception.TokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * 토큰 생성, 유효성 검사, 재발급 등의 관리.
 */
@Component
@RequiredArgsConstructor
public class JwtProvider {

    @Value("${jwt.expiration.access}")
    private Long accessExpiration;

    @Value("${jwt.expiration.refresh}")
    private Long refreshExpiration;

    @Value("${jwt.secret-key.access}")
    private String key;

    @Value("${jwt.secret-key.refresh}")
    private String refreshKey;

    private SecretKey secretKey;

    private SecretKey secretRefreshKey;

    private final RedisTokenService redisTokenService;

    private final RedisTemplate<String, String> redisTemplate;

    @PostConstruct
    private void setAccessSecretKey() {
        this.secretKey = Keys.hmacShaKeyFor(key.getBytes()); // Decoders.BASE64URL.decode(key)
    }



    /**
     * AccessToken 발급.
     */
    public String generateAccessToken(Authentication authentication, Long memberId) {
        return generateToken(authentication, accessExpiration, memberId, secretKey);
    }

    /**
     * refreshToken 발급.
     */
    public void generateRefreshToken(Authentication authentication, Long memberId) {
        String refreshToken = generateToken(authentication, refreshExpiration, memberId, secretKey);
        redisTokenService.saveOrUpdate(refreshToken, memberId); // redis에 저장
    }

    /**
     * 토큰 생성.
     */
    private String generateToken(Authentication authentication, Long expireTime, Long memberId, SecretKey secretKey) {
        Date now = new Date();
        Date expiredDate = new Date(now.getTime() + expireTime);

        String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining());

        return Jwts.builder()
            .subject(authentication.getName())
            .claim("role", authorities)
            .claim("memberId", memberId)
            .issuedAt(now)
            .expiration(expiredDate)
            .signWith(secretKey, Jwts.SIG.HS512)
            .compact();
    }

    /**
     * 토큰으로부터 사용자의 인증 정보를 가져오고 Spring Security의 Authentication 객체를 생성.
     */
    public Authentication getAuthentication(String token) {
        Claims claims = parseClaims(token);
        List<SimpleGrantedAuthority> authorities = getAuthorities(claims);

        // security의 User 객체 생성
        User principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    /**
     * 토큰으로부터 유저 권한 가져오기.
     */
    private List<SimpleGrantedAuthority> getAuthorities(Claims claims) {
        return Collections.singletonList(new SimpleGrantedAuthority(claims.get("role").toString()));
    }

    /**
     * accessToken 재발급.
     */
    public String reissueAccessToken(String accessToken) {
        // 현재 accessToken이 유효한지 확인
        if (StringUtils.hasText(accessToken)) {
            // refreshToken 가져오기
            String refreshToken = redisTokenService.findRefreshTokenByAccessToken(accessToken);

            // refreshToken이 유효한지 확인
            if (validateToken(refreshToken)) {
                // memberId 가져오기
                Long memberId = getMemberIdByToken(refreshToken);
                Authentication authentication = getAuthentication(refreshToken);
                // 새로운 accessToken 생성
                String reissueAccessToken = generateAccessToken(authentication, memberId);
                // 재발급된 accessToken 반환
                return reissueAccessToken;
            }
        }
        return null;
    }

    /**
     * 토큰 유효성(권한 만료) 검사.
     */
    public boolean validateToken(String token) {
        if (!StringUtils.hasText(token)) {
            return false;
        }

        Claims claims = parseClaims(token);
        return claims.getExpiration().after(new Date());
    }

    /**
     * 토큰 해독하여 payload 추출.
     */
    private Claims parseClaims(String token) {
        try {
            return Jwts.parser().verifyWith(secretKey).build()
                .parseSignedClaims(token).getPayload();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        } catch (MalformedJwtException e) {
            throw new TokenException(TokenErrorCode.INVALID_TOKEN);
        } catch (SecurityException e) {
            throw new TokenException(TokenErrorCode.INVALID_JWT_SIGNATURE);
        }
    }

    /**
     * 토큰에서 memberId 추출.
     */
    public Long getMemberId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof CustomUserDetails) {
                return ((CustomUserDetails) principal).getMemberId();
            } else if (principal instanceof UserDetails) {
                return Long.valueOf(((UserDetails) principal).getUsername());
            } else {
                // 만약 principal이 UserDetails가 아닌 다른 타입이면, 해당 타입에 맞게 처리
                return Long.valueOf(principal.toString());
            }
        }
        return null; // 인증된 사용자가 없는 경우
    }

    /**
     * Token 으로부터 회원 아이디를 가져온다.
     *
     * @param token AccessToken
     */
    public Long getMemberIdByToken(String token) {
        return parseClaims(token).get("memberId", Long.class);
    }


}
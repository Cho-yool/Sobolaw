package com.sobolaw.global.security.jwt;

import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.exception.MemberErrorCode;
import com.sobolaw.api.member.exception.MemberException;
import com.sobolaw.api.member.repository.MemberRepository;
import com.sobolaw.global.security.auth.CustomUserDetails;
import com.sobolaw.global.security.jwt.exception.TokenErrorCode;
import com.sobolaw.global.security.jwt.exception.TokenException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * 토큰 생성, 유효성 검사, 재발급 등의 관리.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final MemberRepository memberRepository;

    @Value("${jwt.expiration.access}")
    private Long accessExpiration;

    @Value("${jwt.expiration.refresh}")
    private Long refreshExpiration;

    @Value("${jwt.secret-key.access}")
    private String key;

    @Value("${jwt.secret-key.refresh}")
    private String refreshKey;

    private SecretKey secretAccessKey;

    private SecretKey secretRefreshKey;

    private final RedisTokenService redisTokenService;

    private final RedisTemplate<String, String> redisTemplate;

    @PostConstruct
    private void setAccessSecretKey() {
        this.secretAccessKey = Keys.hmacShaKeyFor(key.getBytes()); // Decoders.BASE64URL.decode(key)
    }

    @PostConstruct
    private void setRefreshSecretKey() {
        this.secretRefreshKey = Keys.hmacShaKeyFor(refreshKey.getBytes()); // Decoders.BASE64URL.decode(key)
    }

    /**
     * AccessToken 발급.
     */
    public String generateAccessToken(Authentication authentication, Long memberId) {
        return generateToken(authentication, accessExpiration, memberId, secretAccessKey);
    }

    /**
     * refreshToken 발급.
     */
    public String generateRefreshToken(Authentication authentication, Long memberId) {
        String refreshToken = generateToken(authentication, refreshExpiration, memberId, secretRefreshKey);
        log.info("만들어진 refreshToken : " + refreshToken);
        redisTokenService.saveOrUpdate(refreshToken, memberId); // redis에 저장
        return refreshToken;
    }

    /**
     * 토큰 생성.
     */
    private String generateToken(Authentication authentication, Long expireTime, Long memberId, SecretKey code) {
        Date now = new Date();
        Date expiredDate = new Date(now.getTime() + expireTime);

        String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining());

        return Jwts.builder()
            .subject(authentication.getName())
            .claim("role", authorities)
            .claim("memberId", memberId)
            .issuedAt(now)
            .expiration(expiredDate)
            .signWith(code, Jwts.SIG.HS512)
            .compact();
    }

    /**
     * accessToken 서버에 저장.
     */
    protected void setAuthentication(String accessToken) {
        log.info("토큰 서버 저장 ");
        Authentication authentication = getAuthentication(accessToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    /**
     * access 토큰으로부터 사용자의 인증 정보를 가져오고 Spring Security의 Authentication 객체를 생성.
     */
    public Authentication getAuthentication(String token) {
        Claims claims = parseClaims(token);
        List<SimpleGrantedAuthority> authorities = getAuthorities(claims);
        Long memberId = getMemberIdByToken(token);

        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));
        log.info("claims = " + claims);
        log.info("subject = " + claims.getSubject());

        // CustomUserDetails 객체 생성
        CustomUserDetails userDetails = new CustomUserDetails(member, null, null);
        log.info("커스텀 유저 : " + userDetails);
        log.info("usernamePasswordToken : " + new UsernamePasswordAuthenticationToken(userDetails, token, authorities));
        return new UsernamePasswordAuthenticationToken(userDetails, token, authorities);
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
    public ReIssueTokenResponseDTO reissueAccessToken(String refreshToken) {
        log.info("리프레쉬 토큰 검증 : " + validateRefreshToken(refreshToken));
        if (validateRefreshToken(refreshToken)) {
            // memberId 가져오기
            Long memberId = getMemberIdByRefreshToken(refreshToken);
            log.info("멤버 ID : " + memberId);
            Authentication authentication = getAuthenticationByRefreshToken(refreshToken);
            log.info("refresh Authentication : " + authentication);
            log.info("유효한 리프레쉬 토큰인가? : " + Objects.equals(memberId, redisTokenService.findMemberIdByRefreshToken(refreshToken)));
            if (!Objects.equals(memberId, redisTokenService.findMemberIdByRefreshToken(refreshToken))) {
                throw new TokenException(TokenErrorCode.INVALID_REFRESH_TOKEN);
            }
            // 새로운 accessToken 생성
            String reissueAccessToken = generateAccessToken(authentication, memberId);
            setAuthentication(reissueAccessToken);
            // 새로운 refreshToken 생성
            String reissueRefreshToken = generateRefreshToken(authentication, memberId);
            log.info("accessToken = " + reissueAccessToken);
            log.info("refreshToken = " + reissueRefreshToken);

            return ReIssueTokenResponseDTO.of(reissueRefreshToken, reissueAccessToken);
        } else {
            throw new TokenException(TokenErrorCode.INVALID_REFRESH_TOKEN);
        }

    }

    /**
     * access 토큰 유효성(권한 만료) 검사.
     */
    public boolean validateToken(String token) {
        if (!StringUtils.hasText(token)) {
            return false;
        }

        Claims claims = parseClaims(token);
        log.info("AccessToken Expiration : " + claims.getExpiration().after(new Date()));
        return claims.getExpiration().after(new Date());
    }

    /**
     * access 토큰 해독하여 payload 추출.
     */
    private Claims parseClaims(String token) {
        try {
            log.info("accessToken 분해");
            log.info("JWTS : " + Jwts.parser().verifyWith(secretAccessKey).build().parseSignedClaims(token).getPayload());
            return Jwts.parser().verifyWith(secretAccessKey).build()
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
     * 현재 서버에 setting 된 토큰에서 memberId 추출.
     */
    public Long getMemberId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("security" + SecurityContextHolder.getContext());
        log.info("auth = " + authentication);
        log.info("isAuth = " + authentication.isAuthenticated());
        log.info("principle = " + authentication.getPrincipal());
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof CustomUserDetails) {
                return ((CustomUserDetails) principal).getMemberId();
            } else if (principal instanceof UserDetails) {
                String name = ((UserDetails) principal).getUsername();
                Member member = memberRepository.findByName(name);
                return member.getMemberId();
            } else {
                // 만약 principal이 UserDetails가 아닌 다른 타입이면, 해당 타입에 맞게 처리
                return Long.valueOf(principal.toString());
            }
        } else {
            throw new MemberException(MemberErrorCode.NOT_LOGGED_USER); // 인증된 사용자가 없는 경우 예외 발생
        }
    }

    /**
     * accessToken 으로부터 회원 아이디를 가져온다.
     *
     * @param token AccessToken
     */
    public Long getMemberIdByToken(String token) {
        return ((Number) parseClaims(token).get("memberId")).longValue();
    }

    /**
     * refresh 토큰으로부터 사용자의 인증 정보를 가져오고 Spring Security의 Authentication 객체를 생성.
     */
    public Authentication getAuthenticationByRefreshToken(String token) {
        Claims claims = parseRefreshClaims(token);
        List<SimpleGrantedAuthority> authorities = getAuthorities(claims);
        Long memberId = getMemberIdByRefreshToken(token);

        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));
        log.info("RefreshClaims = " + claims);
        log.info("RefreshSubject = " + claims.getSubject());
        // CustomUserDetails 객체 생성
        CustomUserDetails userDetails = new CustomUserDetails(member, null, null);

        return new UsernamePasswordAuthenticationToken(userDetails, token, authorities);
    }

    /**
     * refresh 토큰 유효성(권한 만료) 검사.
     */
    public boolean validateRefreshToken(String token) {
        log.info("권한 확인 중 :" + StringUtils.hasText(token));
        if (!StringUtils.hasText(token)) {
            return false;
        }
        log.info("리프레쉬 토큰 분해하러 가기");
        Claims claims = parseRefreshClaims(token);
        log.info("claims : " + claims);
        return claims.getExpiration().after(new Date());
    }

    /**
     * refresh 토큰 해독하여 payload 추출.
     */
    private Claims parseRefreshClaims(String token) {
        String refreshKey = "1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r1q2w3e4r";
        SecretKey secretRefreshKey = Keys.hmacShaKeyFor(refreshKey.getBytes());
        try {
            log.info("token : " + token);
            log.info("JWTS : " + Jwts.parser().verifyWith(secretRefreshKey).build().parseSignedClaims(token).getPayload());
            return Jwts.parser().verifyWith(secretRefreshKey).build()
                .parseSignedClaims(token).getPayload();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        } catch (MalformedJwtException e) {
            throw new TokenException(TokenErrorCode.INVALID_REFRESH_TOKEN);
        } catch (SecurityException e) {
            throw new TokenException(TokenErrorCode.INVALID_JWT_SIGNATURE);
        }
    }

    /**
     * accessToken 으로부터 회원 아이디를 가져온다.
     *
     * @param token RefreshToken
     */
    public Long getMemberIdByRefreshToken(String token) {
        return ((Number) parseRefreshClaims(token).get("memberId")).longValue();
    }


}
package com.sobolaw.global.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtProvider {

//    @Value("${jwt.secret}")
//    private final String secretKey;

    @Value("${jwt.expiration}")
    private long accessExpiration;

    private final SecretKey secretKey;

    public JwtProvider(@Value("${jwt.secret-key}") String secretKey) {
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(secretKey));
    }

    /**
     * JWT 토큰 생성.
     */
    public String createAccessToken(String memberName) {
        Claims claims = (Claims) Jwts.claims().subject(memberName);
        Date now = new Date();
        Date validity = new Date(now.getTime() + accessExpiration);

        return Jwts.builder()
            .claims(claims)
            .issuedAt(now)
            .expiration(validity)
            .signWith(secretKey)
            .compact();
    }

    /**
     *  JWT 토큰에서 사용자 이름 추출.
     */
    public String getUsername(String jwtToken) {
        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(jwtToken)
            .getPayload()
            .getSubject();
    }

    /**
     *  JWT 토큰 유효성 검사.
     *  반환값 Boolean 시 try 내 return ture;
      */
    public String validateToken(String jwtToken) {
        try {
            Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(jwtToken);
            return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(jwtToken).getPayload().getSubject();

        } catch (JwtException | IllegalArgumentException e) {
            throw new IllegalArgumentException("Expired or invalid JWT token");
        }
    }

}
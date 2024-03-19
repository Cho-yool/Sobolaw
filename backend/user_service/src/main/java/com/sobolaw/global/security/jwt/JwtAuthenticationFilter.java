package com.sobolaw.global.security.jwt;

import com.sobolaw.api.member.repository.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;


/**
 * AccessToken 권한 검사 및 만료시 재발급 처리.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final MemberRepository memberRepository;

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {

        String servletPath = request.getServletPath();
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.info("header =" + header);
        String accessToken = resolveToken(request);
//        BaseResponse<Void> responseDto = null;
//
//        // 스웨거나 이외 요청이라면 토큰 검사 X
//        if (servletPath.startsWith("/api/user-service/swagger-ui") || (servletPath.startsWith("/api/user-service/oauth2/")) || servletPath.equals("/api/user-service/oauth2/login")) {
//            filterChain.doFilter(request, response);
//        } else if (header == null || !header.startsWith(TokenKey.TOKEN_PREFIX)) {
//            // 토큰값이 없거나 정상적이지 않다면 400 오류
//            log.info("CustomAuthorizationFilter : JWT Token 이 존재하지 않습니다.");
//
//            responseDto = new BaseResponse<>(HttpStatus.NOT_ACCEPTABLE.value(), "access token 이 존재하지 않음.", null);
//            response.setStatus(HttpStatus.NOT_ACCEPTABLE.value());
//            response.setContentType("application/json");
//            response.setCharacterEncoding("UTF-8");
//            response.getWriter().write(new ObjectMapper().writeValueAsString(responseDto));
//        } else {
//            Long memberId = jwtProvider.getMemberIdByToken(accessToken);
        // accessToken 검증
        if (jwtProvider.validateToken(accessToken)) {
            setAuthentication(accessToken);
        } else {
            // 만료되었을 경우 accessToken 재발급
            String reissueAccessToken = jwtProvider.reissueAccessToken(accessToken);
            if (StringUtils.hasText(reissueAccessToken)) {
                setAuthentication(reissueAccessToken);

                // 재발급된 accessToken 다시 전달
                response.setHeader("AUTHORIZATION", TokenKey.TOKEN_PREFIX + reissueAccessToken);
            }
        }

        filterChain.doFilter(request, response);
    }

    private void setAuthentication(String accessToken) {
        Authentication authentication = jwtProvider.getAuthentication(accessToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    /**
     * AccessToken을 Header에 넣어 요청을 보낸 경우 Token의 Prefix를 제거한다.
     *
     * @param request 요청
     * @return Bearer가 제거된 AccessToken
     */
    private String resolveToken(HttpServletRequest request) {
        String token = request.getHeader("AUTHORIZATION");
        if (ObjectUtils.isEmpty(token) || !token.startsWith(TokenKey.TOKEN_PREFIX)) {
            return null;
        }
        return token.substring(TokenKey.TOKEN_PREFIX.length());
    }

    /**
     * Token의 Prefix 지정.
     */
    public static class TokenKey {

        public static final String TOKEN_PREFIX = "Bearer ";
    }

}

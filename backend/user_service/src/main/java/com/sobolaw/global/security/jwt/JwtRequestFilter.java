package com.sobolaw.global.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.repository.MemberRepository;
import com.sobolaw.global.common.response.BaseResponse;
import com.sobolaw.global.security.jwt.exception.TokenErrorCode;
import com.sobolaw.global.security.jwt.exception.TokenException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;


/**
 * AccessToken 권한 검사 및 만료시 재발급 처리.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

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
        BaseResponse<Void> responseDto = null;

        log.info("header = " + header);
        log.info("servletPath : " + servletPath);
//        log.info("예외처리 주소 : " + servletPath.contains("/api/user-service/swagger-ui/index.html"));
        if (
            servletPath.contains("swaggers") || servletPath.startsWith("/oauth2") || servletPath.startsWith("/login") || servletPath.startsWith("/token/refresh")
        ) {
            log.info("토큰 검사 pass");
            filterChain.doFilter(request, response);
        } else if (header == null) {
            log.info("토큰이 없습니다.");
            filterChain.doFilter(request, response);
        } else if (!header.startsWith("Bearer ")) {
            log.info("토큰형식이 잘못되었습니다.");
            filterChain.doFilter(request, response);
        } else {
            try {
                String accessToken = resolveToken(request);
                log.info("accessToken 헤더 분리 = " + accessToken);
                log.info("토큰 검사 중 ");
                /*
                 * Expired 되었을 경우
                 * RefreshToken 과 대조해야한다.
                 */
                if (jwtProvider.validateToken(accessToken)) {
                    Long memberId = jwtProvider.getMemberIdByToken(accessToken);
                    log.info("멤버 id 값 : " + memberId);
                    if (memberId != null) {
                        Member member = memberRepository.findById(memberId).orElse(null);
                        log.info("멤버 값:" + member);
                        if (member == null) {
                            SecurityContextHolder.clearContext();
                        }
                        // 인증 처리 후 정상적으로 다음 Filter 수행
                        jwtProvider.setAuthentication(accessToken);
                        filterChain.doFilter(request, response);
                    }
                } else {
                    throw new TokenException(TokenErrorCode.INVALID_TOKEN);
                }
            } catch (TokenException exception) {
                log.info("SecurityException : " + exception);
                responseDto = new BaseResponse<>(HttpStatus.UNAUTHORIZED.value(), "Access Token이 만료되었습니다.", null);

                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(new ObjectMapper().writeValueAsString(responseDto));

            } catch (NullPointerException e) {
                log.info("NullPointerException : " + e);
                responseDto = new BaseResponse<>(HttpStatus.NOT_FOUND.value(), "해당 객체를 찾을 수 없습니다.", null);

                response.setStatus(HttpStatus.NOT_FOUND.value());
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(new ObjectMapper().writeValueAsString(responseDto));
            } catch (Exception e) {
                log.info("AuthorizationFilter에서 에러 : {} ", e.toString());
                responseDto = new BaseResponse<>(HttpStatus.NOT_ACCEPTABLE.value(), "잘못된 Access Token입니다.", null);

                response.setStatus(HttpStatus.NOT_ACCEPTABLE.value());
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(new ObjectMapper().writeValueAsString(responseDto));
            }
        }
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

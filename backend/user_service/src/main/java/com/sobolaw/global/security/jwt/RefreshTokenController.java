package com.sobolaw.global.security.jwt;

import com.sobolaw.global.common.response.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * refreshToken controller.
 */
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/token")
public class RefreshTokenController {

    private final JwtProvider jwtProvider;

    /**
     * Token 재발급.
     */
    @PostMapping("refresh")
    @PermitAll
    @Operation(summary = "accessToken 재발급", description = "accessToken 을 재발급합니다.", tags = {"토큰"})
    public ResponseEntity<BaseResponse<?>> reissueAccessToken(@RequestBody String refreshToken) {
        log.info("토큰 재발급");
        ReIssueTokenResponseDTO responseDTO = jwtProvider.reissueAccessToken(refreshToken);
        // 새로 발급한 Access Token 을 헤더에 넣어 클라이언트에게 전달
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + responseDTO.accessToken());
        return ResponseEntity.ok().headers(headers).body(BaseResponse.success(HttpStatus.OK.value(), "Access Token 이 재발급 되었습니다.", responseDTO.refreshToken()));
    }

}


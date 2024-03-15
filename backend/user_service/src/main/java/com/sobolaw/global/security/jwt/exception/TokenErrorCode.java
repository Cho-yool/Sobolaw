package com.sobolaw.global.security.jwt.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * Token 에러 코드.
 */
@Getter
@AllArgsConstructor
public enum TokenErrorCode {
    NOT_EXIST_TOKEN(HttpStatus.BAD_REQUEST, "리프레시 토큰을 찾을 수 없습니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),
    INVALID_JWT_SIGNATURE(HttpStatus.UNAUTHORIZED, "JWT 서명이 유효하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
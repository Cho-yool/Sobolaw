package com.sobolaw.global.security.jwt.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Token 관련 Exception.
 */
@Getter
@AllArgsConstructor
public class TokenException extends RuntimeException {

    private TokenErrorCode errorCode;
    private String message;

    /**
     * 메세지가 없는 생성자.
     */
    public TokenException(TokenErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }
}
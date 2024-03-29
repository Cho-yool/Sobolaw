package com.sobolaw.api.email.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 메일 관련 ErrorCode.
 */
@Getter
@AllArgsConstructor
public enum EmailErrorCode {
    FAIL_SEND_MAIL(HttpStatus.BAD_REQUEST, "메일 전송에 실패했습니다.");


    private final HttpStatus httpStatus;
    private final String message;
}

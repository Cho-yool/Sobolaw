package com.sobolaw.api.lawsuit.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 소장 관련 ErrorCode.
 */
@Getter
@AllArgsConstructor
public enum LawsuitErrorCode {
    NOT_FOUND_LAWSUIT(HttpStatus.BAD_REQUEST, "존재하지 않는 소장입니다.");

    private final HttpStatus httpStatus;
    private final String message;
}

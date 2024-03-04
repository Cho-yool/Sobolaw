package com.sobolaw.lawsuit.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 회원 관련 Exception.
 */
@Getter
@AllArgsConstructor
public class LawsuitException extends RuntimeException {

    private LawsuitErrorCode errorCode;
    private String message;

    /**
     * 메세지가 없는 생성자.
     */
    public LawsuitException(LawsuitErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }
}

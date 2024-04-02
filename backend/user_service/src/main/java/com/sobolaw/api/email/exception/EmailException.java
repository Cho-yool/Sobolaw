package com.sobolaw.api.email.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;


/**
 * 메일 관련 Exception.
 */
@Getter
@AllArgsConstructor
public class EmailException extends Throwable {
    private EmailErrorCode errorCode;
    private String message;

    /**
     * 메세지가 없는 생성자.
     */
    public EmailException(EmailErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }
}

package com.sobolaw.api.mail.exception;

import com.sobolaw.api.lawsuit.exception.LawsuitErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;


/**
 * 메일 관련 Exception.
 */
@Getter
@AllArgsConstructor
public class MailException extends Throwable {
    private MailErrorCode errorCode;
    private String message;

    /**
     * 메세지가 없는 생성자.
     */
    public MailException(MailErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }
}

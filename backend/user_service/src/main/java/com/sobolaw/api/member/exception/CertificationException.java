package com.sobolaw.api.member.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 등업 관련 exception.
 */
@Getter
@AllArgsConstructor
public class CertificationException extends RuntimeException {

    private CertificationErrorCode errorCode;
    private String message;

    public CertificationException(CertificationErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }

}

package com.sobolaw.api.media.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 미디어 관련 Exception.
 */
@Getter
@AllArgsConstructor
public class MediaException extends RuntimeException {

    private MediaErrorCode errorCode;
    private String message;

    public MediaException(MediaErrorCode errorCode) {
        this.errorCode = errorCode;
        this.message = errorCode.getMessage();
    }
}

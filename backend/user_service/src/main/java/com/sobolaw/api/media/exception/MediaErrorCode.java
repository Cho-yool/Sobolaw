package com.sobolaw.api.media.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 미디어 에러 코드.
 */
@Getter
@AllArgsConstructor
public enum MediaErrorCode {
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버에서 이미지 처리 중 오류가 발생했습니다."),
    NOT_EXIST_FILE_NAME(HttpStatus.BAD_REQUEST, "이름이 존재하지 않는 파일이 포함되어 있습니다."),
    WRONG_FILE_EXTENSION(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일이 포함되어 있습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}

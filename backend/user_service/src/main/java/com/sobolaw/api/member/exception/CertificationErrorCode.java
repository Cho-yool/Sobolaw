package com.sobolaw.api.member.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 등업 에러 코드.
 */
@Getter
@AllArgsConstructor
public enum CertificationErrorCode {
    NOT_FOUND_MEMBER(HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."),
    NO_ARTICLE(HttpStatus.NO_CONTENT, "게시글이 존재하지 않습니다.");
    private final HttpStatus httpStatus;
    private final String message;
}

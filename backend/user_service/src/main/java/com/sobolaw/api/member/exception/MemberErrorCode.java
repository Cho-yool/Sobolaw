package com.sobolaw.api.member.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * 회원관련 ErrorCode.
 */
@Getter
@AllArgsConstructor
public enum MemberErrorCode {
    NOT_FOUND_MEMBER(HttpStatus.BAD_REQUEST, "존재하지 않는 사용자입니다."),
    NOT_FOUND_PRECEDENT(HttpStatus.BAD_REQUEST, "존재하지 않는 저장 판례입니다."),
    NOT_FOUND_RECENT(HttpStatus.BAD_REQUEST, "존재하지 않는 최근 판례입니다."),
    NOT_FOUND_KEYWORD(HttpStatus.BAD_REQUEST, "존재하지 않는 키워드입니다."),
    NOT_FOUND_HIGHLIGHT(HttpStatus.BAD_REQUEST, "존재하지 않는 하이라이트입니다.");

    private final HttpStatus httpStatus;
    private final String message;
}

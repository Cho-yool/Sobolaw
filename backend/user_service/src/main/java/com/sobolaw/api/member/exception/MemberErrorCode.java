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
    NOT_FOUND_MEMBER(HttpStatus.NOT_FOUND, "존재하지 않는 사용자입니다."),
    DUPLICATED_EMAIL(HttpStatus.CONFLICT, "이미 가입된 이메일 입니다."),
    NOT_FOUND_PRECEDENT(HttpStatus.NOT_FOUND, "저장된 판례가 존재하지 않습니다."),
    NOT_FOUND_RECENT(HttpStatus.NOT_FOUND, "최근 본 판례가 존재하지 않습니다."),
    DUPLICATE_PRECEDENT(HttpStatus.CONFLICT, "이미 저장된 판례 입니다."),
    NOT_FOUND_KEYWORD(HttpStatus.NOT_FOUND, "존재하지 않는 키워드입니다."),
    DUPLICATE_KEYWORD(HttpStatus.CONFLICT, "이미 저장된 키워드 입니다."),
    NOT_FOUND_HIGHLIGHT(HttpStatus.NOT_FOUND, "존재하지 않는 하이라이트입니다."),
    ILLEGAL_OAUTH2CLIENT_NAME(HttpStatus.UNAUTHORIZED, "유효하지 않은 수단입니다."),
    NO_AUTHORITY(HttpStatus.UNAUTHORIZED, "권한이 없습니다."),
    NOT_LOGGED_USER(HttpStatus.UNAUTHORIZED, "로그인 되어있지 않습니다.");


    private final HttpStatus httpStatus;
    private final String message;
}

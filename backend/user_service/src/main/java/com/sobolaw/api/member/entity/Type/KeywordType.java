package com.sobolaw.api.member.entity.Type;

import lombok.RequiredArgsConstructor;

/**
 * 키워드 타입.
 * DIRECT : 직접 추가한 키워드.
 * RELATE : 판례 관련으로 추가.
 */
@RequiredArgsConstructor
public enum KeywordType {
    DIRECT(0),
    RELATED(1);

    private final int value;

}

package com.sobolaw.member.entity.Type;


import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 멤버 하이라이트 시 타입 정의 ENUM.
 */
@Getter
@AllArgsConstructor
public enum HighlightType {
    MEMO(0),
    RED(1),
    YELLOW(2),
    GREEN(3),
    BLUE(4),
    PURPLE(5);

    private final int value;
}

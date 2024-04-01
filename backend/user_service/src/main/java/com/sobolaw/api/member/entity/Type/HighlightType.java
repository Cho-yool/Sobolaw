package com.sobolaw.api.member.entity.Type;


import lombok.AllArgsConstructor;

/**
 * 멤버 하이라이트 시 타입 정의 ENUM.
 * HC + color code
 * H = Highlight
 * C = Color
 */
@AllArgsConstructor
public enum HighlightType {
    MEMO(0),
    HCF3E7C0(1), //HC + color code
    HCFEDA89(2), //H = Highlight
    HCEAA854(3), //C = Color
    HCBF8438(4),
    HC644419(5);

    private final int value;
}

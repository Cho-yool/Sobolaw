package com.sobolaw.member.dto.request;

import com.sobolaw.member.entity.Type.HighlightType;

/**
 * 판례 하이라이트 생성 변경 DTO.
 */
public record HighlightCreateUpdateRequestDTO(String location, HighlightType highlightType, String content) {

}

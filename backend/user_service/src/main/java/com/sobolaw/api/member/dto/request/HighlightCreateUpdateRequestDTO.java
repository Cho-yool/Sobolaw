package com.sobolaw.api.member.dto.request;

import com.sobolaw.api.member.entity.Type.HighlightType;
import java.util.List;

/**
 * 판례 하이라이트 생성 변경 DTO.
 */
public record HighlightCreateUpdateRequestDTO(String main, List<Integer> location, HighlightType highlightType, String content) {

}

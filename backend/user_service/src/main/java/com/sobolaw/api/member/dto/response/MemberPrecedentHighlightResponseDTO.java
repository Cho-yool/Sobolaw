package com.sobolaw.api.member.dto.response;

import com.sobolaw.api.member.entity.MemberPrecedentHighlight;
import com.sobolaw.api.member.entity.Type.HighlightType;
import java.io.Serializable;

/**
 * DTO for {@link MemberPrecedentHighlight}.
 */

public record MemberPrecedentHighlightResponseDTO(Long memberPrecedentHighlightId, String main, Long startPoint, Long endPoint, HighlightType highlightType, String content) implements Serializable {

    public static MemberPrecedentHighlightResponseDTO of(Long memberPrecedentHighlightId, String main, Long startPoint, Long endPoint, HighlightType highlightType, String content) {
        return new MemberPrecedentHighlightResponseDTO(memberPrecedentHighlightId, main, startPoint, endPoint, highlightType, content);
    }

    /**
     * MemberPrecedentHighlight 엔터티를 MemberPrecedentHighlightDTO로 변환하는 메소드.
     */
    public static MemberPrecedentHighlightResponseDTO from(MemberPrecedentHighlight entity) {
        return new MemberPrecedentHighlightResponseDTO(entity.getMemberPrecedentHighlightId(),
            entity.getMain(), entity.getStartPoint(), entity.getEndPoint(), entity.getHighlightType(), entity.getContent());
    }

    /**
     * MemberPrecedentHighlightDTO를 MemberPrecedentHighlight 엔터티로 변환하는 메소드.
     */
    public static MemberPrecedentHighlight toEntity(MemberPrecedentHighlightResponseDTO dto) {
        return MemberPrecedentHighlight.of(dto.main(), dto.startPoint(), dto.endPoint(), dto.highlightType(), dto.content());
    }
}
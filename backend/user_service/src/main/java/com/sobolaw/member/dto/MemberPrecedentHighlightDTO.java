package com.sobolaw.member.dto;

import com.sobolaw.member.entity.MemberPrecedentHighlight;
import com.sobolaw.member.entity.Type.HighlightType;
import java.io.Serializable;

/**
 * DTO for {@link MemberPrecedentHighlight}.
 */

public record MemberPrecedentHighlightDTO(Long memberPrecedentHighlightId, MemberPrecedentDTO memberPrecedent, String location, HighlightType highlightType, Long content) implements Serializable {

    public static MemberPrecedentHighlightDTO of(Long memberPrecedentHighlightId, MemberPrecedentDTO memberPrecedent, String location, HighlightType highlightType, Long content) {
        return new MemberPrecedentHighlightDTO(memberPrecedentHighlightId, memberPrecedent, location, highlightType, content);
    }

    /**
     * MemberPrecedentHighlight 엔터티를 MemberPrecedentHighlightDTO로 변환하는 메소드.
     */
    public static MemberPrecedentHighlightDTO from(MemberPrecedentHighlight entity) {
        return new MemberPrecedentHighlightDTO(entity.getMemberPrecedentHighlightId(), MemberPrecedentDTO.from(entity.getMemberPrecedent()), // MemberPrecedent 엔터티를 MemberPrecedentDTO로 변환
            entity.getLocation(), entity.getHighlightType(), entity.getContent());
    }

    /**
     * MemberPrecedentHighlightDTO를 MemberPrecedentHighlight 엔터티로 변환하는 메소드.
     */
    public static MemberPrecedentHighlight toEntity(MemberPrecedentHighlightDTO dto) {
        return MemberPrecedentHighlight.of(dto.location(), dto.highlightType(), dto.content());
    }
}
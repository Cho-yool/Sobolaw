package com.sobolaw.api.member.dto;

import com.sobolaw.api.member.entity.MemberPrecedentHighlight;
import com.sobolaw.api.member.entity.Type.HighlightType;
import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link MemberPrecedentHighlight}.
 */

public record MemberPrecedentHighlightDTO(Long memberPrecedentHighlightId, Long memberPrecedentId, String main, List<Integer> location, HighlightType highlightType, String content) implements Serializable {

    public static MemberPrecedentHighlightDTO of(Long memberPrecedentHighlightId, Long memberPrecedentId, String main, List<Integer> location, HighlightType highlightType, String content) {
        return new MemberPrecedentHighlightDTO(memberPrecedentHighlightId, memberPrecedentId, main, location, highlightType, content);
    }

    /**
     * MemberPrecedentHighlight 엔터티를 MemberPrecedentHighlightDTO로 변환하는 메소드.
     */
    public static MemberPrecedentHighlightDTO from(MemberPrecedentHighlight entity) {
        return new MemberPrecedentHighlightDTO(entity.getMemberPrecedentHighlightId(), entity.getMemberPrecedent().getMemberPrecedentId(), // MemberPrecedent 엔터티를 MemberPrecedentDTO로 변환
            entity.getMain(), entity.getLocation(), entity.getHighlightType(), entity.getContent());
    }

    /**
     * MemberPrecedentHighlightDTO를 MemberPrecedentHighlight 엔터티로 변환하는 메소드.
     */
    public static MemberPrecedentHighlight toEntity(MemberPrecedentHighlightDTO dto) {
        return MemberPrecedentHighlight.of(dto.main(), dto.location(), dto.highlightType(), dto.content());
    }
}
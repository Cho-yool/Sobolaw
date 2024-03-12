package com.sobolaw.api.member.dto;

import com.sobolaw.api.member.entity.MemberPrecedent;
import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link MemberPrecedent}.
 */
public record MemberPrecedentDTO(Long memberPrecedentId, Long memberId, Long precedentId, List<MemberPrecedentHighlightDTO> highlights) implements Serializable {

    public static MemberPrecedentDTO of(Long memberPrecedentId, Long memberId, Long precedentId, List<MemberPrecedentHighlightDTO> highlights) {
        return new MemberPrecedentDTO(memberPrecedentId, memberId, precedentId, highlights);
    }

    /**
     * MemberPrecedent 엔터티를 MemberPrecedentDTO로 변환하는 메소드.
     */
    public static MemberPrecedentDTO from(MemberPrecedent entity) {
        List<MemberPrecedentHighlightDTO> memberPrecedentHighlightDTOS = null;

        if (entity.getHighlights() != null) {
            memberPrecedentHighlightDTOS = entity.getHighlights().stream().map(MemberPrecedentHighlightDTO::from).toList();
        }

        return new MemberPrecedentDTO(
            entity.getMemberPrecedentId(),
            entity.getMember().getMemberId(),
            entity.getPrecedentId(),
            memberPrecedentHighlightDTOS
        );
    }

    /**
     * MemberPrecedentDTO를 MemberPrecedent 엔터티로 변환하는 메소드.
     */
    public static MemberPrecedent toEntity(MemberPrecedentDTO dto) {
        return MemberPrecedent.of(dto.precedentId());
    }
}
package com.sobolaw.api.member.dto.response;

import com.sobolaw.api.member.entity.MemberPrecedent;
import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link MemberPrecedent}.
 */
public record MemberPrecedentResponseDTO(Long memberPrecedentId, Long precedentId, List<MemberPrecedentHighlightResponseDTO> highlights) implements Serializable {

    public static MemberPrecedentResponseDTO of(Long memberPrecedentId, Long precedentId, List<MemberPrecedentHighlightResponseDTO> highlights) {
        return new MemberPrecedentResponseDTO(memberPrecedentId, precedentId, highlights);
    }

    /**
     * MemberPrecedent 엔터티를 MemberPrecedentDTO로 변환하는 메소드.
     */
    public static MemberPrecedentResponseDTO from(MemberPrecedent entity) {
        List<MemberPrecedentHighlightResponseDTO> memberPrecedentHighlightDTOS = null;
        if (!entity.getHighlights().isEmpty()) {
            memberPrecedentHighlightDTOS = entity.getHighlights().stream().map(MemberPrecedentHighlightResponseDTO::from).toList();
        }

        return new MemberPrecedentResponseDTO(
            entity.getMemberPrecedentId(),
            entity.getPrecedentId(),
            memberPrecedentHighlightDTOS
        );

    }

    /**
     * MemberPrecedentDTO를 MemberPrecedent 엔터티로 변환하는 메소드.
     */
    public static MemberPrecedent toEntity(MemberPrecedentResponseDTO dto) {
        return MemberPrecedent.of(dto.precedentId());
    }
}
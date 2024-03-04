package com.sobolaw.member.dto;

import com.sobolaw.member.entity.MemberPrecedent;
import com.sobolaw.member.entity.MemberPrecedentHighlight;
import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

/**
 * DTO for {@link MemberPrecedent}
 */
public record MemberPrecedentDTO(Long memberPrecedentId, Long memberId, Long precedentId, List<MemberPrecedentHighlightDTO> highlights) implements Serializable {

    public static MemberPrecedentDTO of(Long memberPrecedentId, Long memberId, Long precedentId, List<MemberPrecedentHighlightDTO> highlights) {
        return new MemberPrecedentDTO(memberPrecedentId, memberId, precedentId, highlights);
    }

    /**
     * MemberPrecedent 엔터티를 MemberPrecedentDTO로 변환하는 메소드.
     */
    public static MemberPrecedentDTO from(MemberPrecedent entity) {
        List<MemberPrecedentHighlightDTO> memberPrecedentHighlightDTOS = entity.getHighlights()
            .stream()
            .map(MemberPrecedentHighlightDTO::from)
            .toList();
        return new MemberPrecedentDTO(
            entity.getMemberPrecedentId(),
            MemberDTO.from(entity.getMemberId()).memberId(), // Member 엔터티를 MemberDTO로 변환
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
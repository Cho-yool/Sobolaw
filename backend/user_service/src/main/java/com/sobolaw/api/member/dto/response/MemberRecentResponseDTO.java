package com.sobolaw.api.member.dto.response;

import com.sobolaw.api.member.entity.MemberRecent;
import java.io.Serializable;

/**
 * DTO for {@link MemberRecent}.
 */
public record MemberRecentResponseDTO(Long recentPrecedentId, Long precedentId) implements Serializable {

    public static MemberRecentResponseDTO of(Long recentPrecedentId, Long precedentId) {
        return new MemberRecentResponseDTO(recentPrecedentId, precedentId);
    }

    /**
     * MemberRecent 엔터티를 MemberRecentDTO로 변환하는 메소드.
     */
    public static MemberRecentResponseDTO from(MemberRecent entity) {
        return new MemberRecentResponseDTO(entity.getRecentPrecedentId(), entity.getPrecedentId());
    }

    /**
     * MemberRecentDTO를 MemberRecent 엔터티로 변환하는 메소드.
     */
    public static MemberRecent toEntity(MemberRecentResponseDTO dto) {
        return MemberRecent.of(dto.precedentId());
    }

}
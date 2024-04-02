package com.sobolaw.api.member.dto.response;

import com.sobolaw.api.member.dto.MemberKeywordDTO;
import com.sobolaw.api.member.entity.MemberKeyword;
import com.sobolaw.api.member.entity.Type.KeywordType;
import java.io.Serializable;

/**
 * 멤버 함께 조회시 반환 DTO.
 */
public record MemberKeywordResponseDTO(Long memberKeywordId, Long memberPrecedentId, String word, KeywordType keywordType) implements Serializable {

    public static MemberKeywordResponseDTO of(Long memberKeywordId, Long memberPrecedentId, String word, KeywordType keywordType) {
        return new MemberKeywordResponseDTO(memberKeywordId, memberPrecedentId, word, keywordType);
    }

    /**
     * MemberKeyword 엔터티를 MemberKeywordResponseDTO 변환하는 메소드.
     */
    public static MemberKeywordResponseDTO from(MemberKeyword entity) {
        return new MemberKeywordResponseDTO(
            entity.getMemberKeywordId(),
            (entity.getMemberPrecedent() != null) ? entity.getMemberPrecedent().getMemberPrecedentId() : null,
            entity.getWord(),
            entity.getKeywordType());
    }

    /**
     * MemberKeywordDTO를 MemberKeyword 엔터티로 변환하는 메소드.
     */
    public static MemberKeyword toEntity(MemberKeywordDTO dto) {
        return MemberKeyword.of(dto.word(), dto.keywordType());
    }

}

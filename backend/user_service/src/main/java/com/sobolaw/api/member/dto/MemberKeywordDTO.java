package com.sobolaw.api.member.dto;

import com.sobolaw.api.member.entity.MemberKeyword;
import com.sobolaw.api.member.entity.Type.KeywordType;
import java.io.Serializable;

/**
 * DTO for {@link MemberKeyword}.
 */
public record MemberKeywordDTO(Long memberKeywordId, Long memberId, Long memberPrecedentId, String word, KeywordType keywordType) implements Serializable {

    public static MemberKeywordDTO of(Long memberKeywordId, Long memberId, Long memberPrecedentId, String word, KeywordType keywordType) {
        return new MemberKeywordDTO(memberKeywordId, memberId, memberPrecedentId, word, keywordType);
    }

    /**
     * MemberKeyword 엔터티를 MemberKeywordDTO로 변환하는 메소드.
     */
    public static MemberKeywordDTO from(MemberKeyword entity) {
        return new MemberKeywordDTO(
            entity.getMemberKeywordId(),
            entity.getMember().getMemberId(), // Member 엔터티를 MemberDTO로 변환 후 memberId GET
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
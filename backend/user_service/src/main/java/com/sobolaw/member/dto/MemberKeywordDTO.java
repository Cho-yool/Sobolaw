package com.sobolaw.member.dto;

import com.sobolaw.member.entity.MemberKeyword;
import java.io.Serializable;

/**
 * DTO for {@link MemberKeyword}.
 */
public record MemberKeywordDTO(Long memberKeywordId, Long memberId, String word) implements Serializable {

    public static MemberKeywordDTO of(Long memberKeywordId, Long memberId, String word) {
        return new MemberKeywordDTO(memberKeywordId, memberId, word);
    }

    /**
     * MemberKeyword 엔터티를 MemberKeywordDTO로 변환하는 메소드.
     */
    public static MemberKeywordDTO from(MemberKeyword entity) {
        return new MemberKeywordDTO(entity.getMemberKeywordId(), entity.getMember().getMemberId(), // Member 엔터티를 MemberDTO로 변환 후 memberId GET
            entity.getWord());
    }

    /**
     * MemberKeywordDTO를 MemberKeyword 엔터티로 변환하는 메소드.
     */
    public static MemberKeyword toEntity(MemberKeywordDTO dto) {
        return MemberKeyword.of(dto.word());
    }

}
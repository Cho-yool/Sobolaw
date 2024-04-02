package com.sobolaw.api.member.dto.response;

/**
 * 변호사 등업 게시글 상세보기.
 */
public record MemberRoleUpdateDetailResponseDTO(Long articleId, String name, String belongDocumentPath) {

    public static MemberRoleUpdateDetailResponseDTO of(Long articleId, String name, String belongDocumentPath) {
        return new MemberRoleUpdateDetailResponseDTO(articleId, name, belongDocumentPath);
    }
}


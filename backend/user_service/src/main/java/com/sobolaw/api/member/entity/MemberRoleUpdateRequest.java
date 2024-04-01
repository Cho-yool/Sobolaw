package com.sobolaw.api.member.entity;

import com.sobolaw.global.common.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.SQLRestriction;

/**
 * Mentor ROLE 업데이트 요청 엔티티.
 */
@Getter
@Table(name = "mentor_role_update_request")
@Entity
@SQLRestriction("is_deleted = false")
public class MemberRoleUpdateRequest extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Member member;

    private String originalFileName;

    private String belongDocumentPath; // 소속 증명 이미지 파일을 저장하는 리스트

    private MemberRoleUpdateRequest(Member member, String originalFileName, String belongDocumentPath) {
        this.member = member;
        this.originalFileName = originalFileName;
        this.belongDocumentPath = belongDocumentPath;
    }

    protected MemberRoleUpdateRequest() {
    }

    /**
     * 팩토리 메서드.
     *
     * @param member 멤버
     * @param originalFileName 원본파일명
     * @param belongDocumentPath 저장파일명
     * @return MentorRoleUpdateRequest
     */
    public static MemberRoleUpdateRequest of(Member member, String originalFileName, String belongDocumentPath) {
        return new MemberRoleUpdateRequest(member, originalFileName, belongDocumentPath);
    }
}

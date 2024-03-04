package com.sobolaw.member.entity;

import com.sobolaw.api.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;

/**
 * 멤버 최근 본 판례.                         `
 */
@Table(name = "member_recent")
@Getter
@Entity
public class MemberRecent extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recentPrecedentId;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member memberId;

    @Column(nullable = false)
    private Long precedentId;

    protected MemberRecent() {
    }

    /**
     * 멤버 최근 판례 파라미터 생성자.
     */
    private MemberRecent(Long precedentId) {
        this.precedentId = precedentId;
    }

    /**
     * 파라미터로 멤버 최근 판례 엔티티 객체 생성하는 함수.
     */
    public static MemberRecent of(Long precedentId) {
        return new MemberRecent(precedentId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MemberRecent memberRecent)) {
            return false;
        }
        return recentPrecedentId != null && recentPrecedentId.equals(memberRecent.getRecentPrecedentId());
    }
}

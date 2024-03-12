package com.sobolaw.api.member.entity;

import com.sobolaw.global.common.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

/**
 * 멤버 저장 판례.                         `
 */
@SQLRestriction("is_deleted = false")
@Table(name = "member_precedent")
@Getter
@Entity
public class MemberPrecedent extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberPrecedentId;

    @Setter
    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    private Long precedentId;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "memberPrecedent")
    private List<MemberPrecedentHighlight> highlights;

    protected MemberPrecedent() {
    }

    /**
     * 멤버 저장 판례 파라미터 생성자.
     */
    private MemberPrecedent(Long precedentId) {
        this.precedentId = precedentId;
    }

    /**
     * 파라미터로 멤버 저장 판례 엔티티 객체 생성하는 함수.
     */
    public static MemberPrecedent of(Long precedentId) {
        return new MemberPrecedent(precedentId);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MemberPrecedent memberRecent)) {
            return false;
        }
        return memberPrecedentId != null && memberPrecedentId.equals(memberRecent.getMemberPrecedentId());
    }
}

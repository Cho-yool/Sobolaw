package com.sobolaw.api.member.entity;

import com.sobolaw.api.member.entity.Type.KeywordType;
import com.sobolaw.global.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

/**
 * 멤버 관심 키워드.                         `
 */
@SQLRestriction("is_deleted = false")
@Table(name = "member_keyword")
@Getter
@Entity
public class MemberKeyword extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberKeywordId;

    @Setter
    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Setter
    @ManyToOne
    @JoinColumn(name = "member_precedent_id", nullable = true)
    private MemberPrecedent memberPrecedent;

    @Column(nullable = false, unique = true)
    private String word;

    @Setter
    @Column
    @Enumerated(EnumType.STRING)
    private KeywordType keywordType;

    protected MemberKeyword() {
    }

    /**
     * 멤버 관심키워드 파라미터 생성자.
     */
    private MemberKeyword(String word, KeywordType keywordType) {
        this.word = word;
        this.keywordType = keywordType;
    }

    /**
     * 파라미터로 멤버 키워드 엔티티 객체 생성하는 함수.
     */
    public static MemberKeyword of(String word, KeywordType keywordType) {
        return new MemberKeyword(word, keywordType);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MemberKeyword memberKeyword)) {
            return false;
        }
        return memberKeywordId != null && memberKeywordId.equals(memberKeyword.getMemberKeywordId());
    }
}

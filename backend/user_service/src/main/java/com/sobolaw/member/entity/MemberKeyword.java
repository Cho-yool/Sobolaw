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
 * 멤버 관심 키워드.                         `
 */
@Table(name = "member_keyword")
@Getter
@Entity
public class MemberKeyword extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberKeywordId;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member memberId;

    @Column(nullable = false)
    private String word;

    protected MemberKeyword() {
    }

    /**
     * 멤버 관심키워드 파라미터 생성자.
     */
    private MemberKeyword(String word) {
        this.word = word;
    }

    /**
     * 파라미터로 멤버 키워드 엔티티 객체 생성하는 함수.
     */
    public static MemberKeyword of(String word) {
        return new MemberKeyword(word);
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

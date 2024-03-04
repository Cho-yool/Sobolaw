package com.sobolaw.member.entity;

import com.sobolaw.api.entity.BaseEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import lombok.Getter;

/**
 * 멤버 엔티티.
 */
@Table(name = "member")
@Getter
@Entity
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String name; // 유저 이름

    @Column
    private String email; // 이메일

    @Column
    private LocalDate birthday; // 생일

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "memberId")
    private List<MemberKeyword> memberKeyword; // 관심 키워드 리스트

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "memberId")
    private List<MemberRecent> memberRecents;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "memberId")
    private List<MemberPrecedent> memberPrecedents;

//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "author")
//    private List<Lawsuit> lawsuits; // 저장한 소장



    protected Member() {
    }

    /**
     * 멤버 파라미터 생성자.
     */
    private Member(String name, String email, LocalDate birthday) {
        this.name = name;
        this.email = email;
        this.birthday = birthday;
    }

    /**
     * 파라미터로 멤버 엔티티 객체 생성하는 함수.
     */
    public static Member of(String name, String email, LocalDate birthday) {
        return new Member(name, email, birthday);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Member member)) {
            return false;
        }
        return memberId != null && memberId.equals(member.getMemberId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(memberId);
    }
}

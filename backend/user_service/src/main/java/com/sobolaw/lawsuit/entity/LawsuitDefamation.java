package com.sobolaw.lawsuit.entity;

import com.sobolaw.api.entity.BaseEntity;
import com.sobolaw.member.entity.Member;
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
 * 멤버 작성 소장.                         `
 */
@Table(name = "lawsuit_defamation")
@Getter
@Entity
public class LawsuitDefamation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lawsuitDefamationId;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member memberId;

    @Column
    private String delator;  // 고소인

    @Column
    private String delatorAddress;  // 고소인 주소

    @Column
    private String respondent;  // 피고소인

    @Column
    private String respondentAddress;  // 피고소인 주소

    @Column
    private String content;  // 고소내용

    @Column
    private String policeStation;  // 담당경찰서

    @Column
    private String prosecutor;  // 담당검사

    protected LawsuitDefamation() {
    }

    /**
     * 멤버 파라미터 생성자.
     */
    private LawsuitDefamation(String delator, String delatorAddress, String respondent, String respondentAddress, String content, String policeStation, String prosecutor) {
        this.delator = delator;
        this.delatorAddress = delatorAddress;
        this.respondent = respondent;
        this.respondentAddress = respondentAddress;
        this.content = content;
        this.policeStation = policeStation;
        this.prosecutor = prosecutor;

    }

    /**
     * 파라미터로 멤버 엔티티 객체 생성하는 함수.
     */
    public static LawsuitDefamation of(String delator, String delatorAddress, String respondent, String respondentAddress, String content, String policeStation, String prosecutor) {
        return new LawsuitDefamation(delator, delatorAddress, respondent, respondentAddress, content, policeStation, prosecutor);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LawsuitDefamation lawsuitDefamation)) {
            return false;
        }
        return lawsuitDefamationId != null && lawsuitDefamationId.equals(lawsuitDefamation.getLawsuitDefamationId());
    }
}

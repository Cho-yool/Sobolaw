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
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLRestriction;

/**
 * 멤버 작성 소장(명예훼손).                         `
 */
@SQLRestriction("is_deleted = false")
@Table(name = "lawsuit_defamation")
@Getter
@Entity
public class LawsuitDefamation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lawsuitDefamationId;

    @Setter
    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Setter
    @Column
    private String title; // 소장 저장 제목

    // 원고(고소인) 정보
    @Setter
    @Column
    private String plaintiffName;  // 성명

    @Setter
    @Column
    private String plaintiffResidentRegistrationNumber;  // 주민등록번호

    @Setter
    @Column
    private String plaintiffAddress;  // 주소

    @Setter
    @Column
    private String plaintiffPhoneNumber;  // 전화번호

    // 피고(피고소인) 정보
    @Setter
    @Column
    private String defendantName;  // 이름

    @Setter
    @Column
    private String defendantAddress;  // 주소

    @Setter
    @Column
    private String defendantPhoneNumber;  // 전화번호

    @Setter
    @Column
    private String defendantIdentificationDetails;  // 기타(피고소인 식별 특정 사항)

    // 사건 관련 내용
    @Setter
    @Column
    private LocalDate incidentDate;  // 사건 일자

    @Setter
    @Column
    private LocalTime incidentTime;  // 사건 시간

    @Setter
    @Column
    private String location;  // 장소

    @Setter
    @Column
    private String defamationContent;  // 명예훼손 내용

    @Setter
    @Column
    private boolean isFalseAccusation;  // 허위 인지 아닌지 여부

    @Setter
    @Column
    private String relatedPeople;  // 관련 인원

    @Setter
    @Column
    private String evidence;  // 증거자료

    @Setter
    @Column
    private LocalDate submissionDate;  // 제출날짜

    @Setter
    @Column
    private String policeStationTeam;  // 해당 경찰서 팀

    protected LawsuitDefamation() {
    }

    private LawsuitDefamation(String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress, String plaintiffPhoneNumber, String defendantName,
        String defendantAddress, String defendantPhoneNumber, String defendantIdentificationDetails, LocalDate incidentDate, LocalTime incidentTime, String location, String defamationContent,
        boolean isFalseAccusation, String relatedPeople, String evidence, LocalDate submissionDate, String policeStationTeam) {
        this.title = title;
        this.plaintiffName = plaintiffName;
        this.plaintiffResidentRegistrationNumber = plaintiffResidentRegistrationNumber;
        this.plaintiffAddress = plaintiffAddress;
        this.plaintiffPhoneNumber = plaintiffPhoneNumber;
        this.defendantName = defendantName;
        this.defendantAddress = defendantAddress;
        this.defendantPhoneNumber = defendantPhoneNumber;
        this.defendantIdentificationDetails = defendantIdentificationDetails;
        this.incidentDate = incidentDate;
        this.incidentTime = incidentTime;
        this.location = location;
        this.defamationContent = defamationContent;
        this.isFalseAccusation = isFalseAccusation;
        this.relatedPeople = relatedPeople;
        this.evidence = evidence;
        this.submissionDate = submissionDate;
        this.policeStationTeam = policeStationTeam;
    }

    public static LawsuitDefamation of(String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress, String plaintiffPhoneNumber, String defendantName,
        String defendantAddress, String defendantPhoneNumber, String defendantIdentificationDetails, LocalDate incidentDate, LocalTime incidentTime, String location, String defamationContent,
        boolean isFalseAccusation, String relatedPeople, String evidence, LocalDate submissionDate, String policeStationTeam) {
        return new LawsuitDefamation(title, plaintiffName, plaintiffResidentRegistrationNumber, plaintiffAddress, plaintiffPhoneNumber, defendantName, defendantAddress, defendantPhoneNumber,
            defendantIdentificationDetails, incidentDate, incidentTime, location, defamationContent, isFalseAccusation, relatedPeople, evidence, submissionDate, policeStationTeam);
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
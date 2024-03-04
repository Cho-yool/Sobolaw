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

/**
 * 멤버 작성 소장(모욕죄).                         `
 */
@Table(name = "lawsuit_insult")
@Getter
@Entity
public class LawsuitInsult extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lawsuitInsultId;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // 원고(고소인) 정보
    @Column
    private String plaintiffName;  // 성명

    @Column
    private String plaintiffResidentRegistrationNumber;  // 주민등록번호

    @Column
    private String plaintiffAddress;  // 주소

    @Column
    private String plaintiffPhoneNumber;  // 전화번호

    // 피고(피고소인) 정보
    @Column
    private String defendantName;  // 이름

    @Column
    private String defendantNickname;  // ID(닉네임)

    @Column
    private String defendantAddress;  // 주소

    @Column
    private String defendantPhoneNumber;  // 전화번호

    @Column
    private String defendantIdentificationDetails;  // 기타(피고소인 식별 특정 사항)

    // 사건 관련 내용
    @Column
    private LocalDate incidentDate;  // 사건 일자

    @Column
    private LocalTime incidentTime;  // 사건 시간

    @Column
    private String location;  // 장소

    @Column
    private String defamationContent;  // 명예훼손 내용

    @Column
    private boolean isFalseAccusation;  // 허위 인지 아닌지 여부

    @Column
    private String relatedPeople;  // 관련 인원

    @Column
    private String evidence;  // 증거자료

    @Column
    private LocalDate submissionDate;  // 제출날짜

    @Column
    private String policeStationTeam;  // 해당 경찰서

    protected LawsuitInsult() {
    }

    private LawsuitInsult(String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress,
        String plaintiffPhoneNumber, String defendantName, String defendantNickname, String defendantAddress,
        String defendantPhoneNumber, String defendantIdentificationDetails, LocalDate incidentDate,
        LocalTime incidentTime, String location, String defamationContent,
        boolean isFalseAccusation, String relatedPeople, String evidence,
        LocalDate submissionDate, String policeStationTeam) {
        this.plaintiffName = plaintiffName;
        this.plaintiffResidentRegistrationNumber = plaintiffResidentRegistrationNumber;
        this.plaintiffAddress = plaintiffAddress;
        this.plaintiffPhoneNumber = plaintiffPhoneNumber;
        this.defendantName = defendantName;
        this.defendantNickname = defendantNickname;
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

    public static LawsuitInsult of(String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress,
        String plaintiffPhoneNumber, String defendantName, String defendantNickname, String defendantAddress,
        String defendantPhoneNumber, String defendantIdentificationDetails, LocalDate incidentDate,
        LocalTime incidentTime, String location, String defamationContent,
        boolean isFalseAccusation, String relatedPeople, String evidence,
        LocalDate submissionDate, String policeStationTeam) {
        return new LawsuitInsult(plaintiffName, plaintiffResidentRegistrationNumber, plaintiffAddress,
            plaintiffPhoneNumber, defendantName, defendantNickname, defendantAddress, defendantPhoneNumber,
            defendantIdentificationDetails, incidentDate, incidentTime, location, defamationContent,
            isFalseAccusation, relatedPeople, evidence, submissionDate, policeStationTeam);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LawsuitInsult lawsuitDefamation)) {
            return false;
        }
        return lawsuitInsultId != null && lawsuitInsultId.equals(lawsuitDefamation.getLawsuitInsultId());
    }
}
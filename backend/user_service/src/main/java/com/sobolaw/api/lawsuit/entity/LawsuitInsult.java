package com.sobolaw.api.lawsuit.entity;

import com.sobolaw.api.member.entity.Member;
import com.sobolaw.global.common.entity.BaseEntity;
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
 * 멤버 작성 소장(모욕죄).
 */
@SQLRestriction("is_deleted = false")
@Table(name = "lawsuit_insult")
@Getter
@Entity
public class LawsuitInsult extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lawsuitInsultId;

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

    @Setter
    @Column
    private String plaintiffNickname; // ID(닉네임)

    // 피고(피고소인) 정보
    @Setter
    @Column
    private String defendantName;  // 이름

    @Setter
    @Column
    private String defendantNickname;  // ID(닉네임)

    @Setter
    @Column
    private String defendantAddress;  // 주소

    @Setter
    @Column
    private String defendantPhoneNumber;  // 전화번호

    // 사건 관련 내용
    @Setter
    @Column
    private LocalDate incidentDate;  // 사건 일자

    @Setter
    @Column
    private LocalTime incidentTime;  // 사건 시간

    @Setter
    @Column
    private String onlineServiceType;  // 온라인서비스 유형

    @Setter
    @Column
    private String webServiceDetails;  // 웹서비스의 이름이나 주소(단체카톡방명 혹은 SNS내 페이지 명 등)

    @Setter
    @Column
    private String problemSpeech;  // 문제 발언

    @Setter
    @Column
    private String reasonsForInsult;  // 모욕한 이유

    @Setter
    @Column
    private String relatedPeopleCount;  // 관련 인원수

    @Setter
    @Column
    private String witness1;  // 목격자1

    @Setter
    @Column
    private String witness2;  // 목격자2

    @Setter
    @Column
    private String witness3;  // 목격자3

    @Setter
    @Column
    private String insultDuration;  // 모욕 지속 시간

    @Setter
    @Column
    private String insultFrequency;  // 모욕 횟수

    @Setter
    @Column
    private String circumstancesForIdentification;  // (나를 특정할 만한 상황)

    @Setter
    @Column
    private String evidence;  // 증거자료

    @Setter
    @Column
    private LocalDate submissionDate;  // 제출날짜

    @Setter
    @Column
    private String policeStationTeam;  // 해당 경찰서

    protected LawsuitInsult() {
    }

    private LawsuitInsult(String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress, String plaintiffPhoneNumber, String plaintiffNickname,
        String defendantName, String defendantNickname, String defendantAddress, String defendantPhoneNumber, LocalDate incidentDate, LocalTime incidentTime, String onlineServiceType,
        String webServiceDetails, String problemSpeech, String reasonsForInsult, String relatedPeopleCount, String witness1, String witness2, String witness3, String insultDuration,
        String insultFrequency, String circumstancesForIdentification, String evidence, LocalDate submissionDate, String policeStationTeam) {
        this.title = title;
        this.plaintiffName = plaintiffName;
        this.plaintiffResidentRegistrationNumber = plaintiffResidentRegistrationNumber;
        this.plaintiffAddress = plaintiffAddress;
        this.plaintiffPhoneNumber = plaintiffPhoneNumber;
        this.plaintiffNickname = plaintiffNickname;
        this.defendantName = defendantName;
        this.defendantNickname = defendantNickname;
        this.defendantAddress = defendantAddress;
        this.defendantPhoneNumber = defendantPhoneNumber;
        this.incidentDate = incidentDate;
        this.incidentTime = incidentTime;
        this.onlineServiceType = onlineServiceType;
        this.webServiceDetails = webServiceDetails;
        this.problemSpeech = problemSpeech;
        this.reasonsForInsult = reasonsForInsult;
        this.relatedPeopleCount = relatedPeopleCount;
        this.witness1 = witness1;
        this.witness2 = witness2;
        this.witness3 = witness3;
        this.insultDuration = insultDuration;
        this.insultFrequency = insultFrequency;
        this.circumstancesForIdentification = circumstancesForIdentification;
        this.evidence = evidence;
        this.submissionDate = submissionDate;
        this.policeStationTeam = policeStationTeam;
    }

    @SQLRestriction("is_deleted is false")

    public static LawsuitInsult of(String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress, String plaintiffPhoneNumber, String plaintiffNickname,
        String defendantName, String defendantNickname, String defendantAddress, String defendantPhoneNumber, LocalDate incidentDate, LocalTime incidentTime, String onlineServiceType,
        String webServiceDetails, String problemSpeech, String reasonsForInsult, String relatedPeopleCount, String witness1, String witness2, String witness3, String insultDuration,
        String insultFrequency, String circumstancesForIdentification, String evidence, LocalDate submissionDate, String policeStationTeam) {
        return new LawsuitInsult(title, plaintiffName, plaintiffResidentRegistrationNumber, plaintiffAddress, plaintiffPhoneNumber, plaintiffNickname, defendantName, defendantNickname,
            defendantAddress, defendantPhoneNumber, incidentDate, incidentTime, onlineServiceType, webServiceDetails, problemSpeech, reasonsForInsult, relatedPeopleCount, witness1, witness2, witness3,
            insultDuration, insultFrequency, circumstancesForIdentification, evidence, submissionDate, policeStationTeam);
    }
}

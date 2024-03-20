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
 * 멤버 작성 소장(사기죄).
 */
@SQLRestriction("is_deleted = false")
@Table(name = "lawsuit_fraud")
@Getter
@Entity
public class LawsuitFraud extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lawsuitFraudId;

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

    // 거래 관련 내용
    @Setter
    @Column
    private LocalDate contactDate;  // 연락 날짜

    @Setter
    @Column
    private LocalTime contactTime;  // 연락 시간

    @Setter
    @Column
    private String tradeSite;  // 중고거래 사이트명

    @Setter
    @Column
    private String tradedItem;  // 거래 물건

    @Setter
    @Column
    private LocalDate depositDate;  // 입금 날짜

    @Setter
    @Column
    private LocalTime depositTime;  // 입금 시간

    @Setter
    @Column
    private Long depositAmount;  // 입금 금액(원)

    @Setter
    @Column
    private String contactMethod;  // 연락 수단

    @Setter
    @Column
    private boolean isCashDeposit;  // 현금 지급 혹은 계좌 이체 여부

    @Setter
    @Column
    private String bankName;  // 은행명

    @Setter
    @Column
    private String accountNumber;  // 계좌번호

    // 증거자료
    @Setter
    @Column
    private String evidence;  // 증거자료

    // 해당 경찰서 팀
    @Setter
    @Column
    private String policeStationTeam;  // 해당 경찰서 팀

    protected LawsuitFraud() {
    }

    private LawsuitFraud(String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress, String plaintiffPhoneNumber, String defendantName,
        String defendantAddress, String defendantPhoneNumber, LocalDate contactDate, LocalTime contactTime, String tradeSite, String tradedItem, LocalDate depositDate, LocalTime depositTime,
        long depositAmount, String contactMethod, boolean isCashDeposit, String bankName, String accountNumber, String evidence, String policeStationTeam) {
        this.title = title;
        this.plaintiffName = plaintiffName;
        this.plaintiffResidentRegistrationNumber = plaintiffResidentRegistrationNumber;
        this.plaintiffAddress = plaintiffAddress;
        this.plaintiffPhoneNumber = plaintiffPhoneNumber;
        this.defendantName = defendantName;
        this.defendantAddress = defendantAddress;
        this.defendantPhoneNumber = defendantPhoneNumber;
        this.contactDate = contactDate;
        this.contactTime = contactTime;
        this.tradeSite = tradeSite;
        this.tradedItem = tradedItem;
        this.depositDate = depositDate;
        this.depositTime = depositTime;
        this.depositAmount = depositAmount;
        this.contactMethod = contactMethod;
        this.isCashDeposit = isCashDeposit;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.evidence = evidence;
        this.policeStationTeam = policeStationTeam;
    }

    public static LawsuitFraud of(String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress, String plaintiffPhoneNumber, String defendantName,
        String defendantAddress, String defendantPhoneNumber, LocalDate contactDate, LocalTime contactTime, String tradeSite, String tradedItem, LocalDate depositDate, LocalTime depositTime,
        long depositAmount, String contactMethod, boolean isCashDeposit, String bankName, String accountNumber, String evidence, String policeStationTeam) {
        return new LawsuitFraud(title, plaintiffName, plaintiffResidentRegistrationNumber, plaintiffAddress, plaintiffPhoneNumber, defendantName, defendantAddress, defendantPhoneNumber, contactDate,
            contactTime, tradeSite, tradedItem, depositDate, depositTime, depositAmount, contactMethod, isCashDeposit, bankName, accountNumber, evidence, policeStationTeam);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LawsuitFraud lawsuitFraud)) {
            return false;
        }
        return lawsuitFraudId != null && lawsuitFraudId.equals(lawsuitFraud.getLawsuitFraudId());
    }
}
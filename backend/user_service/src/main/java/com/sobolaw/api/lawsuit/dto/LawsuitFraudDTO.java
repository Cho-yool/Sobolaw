package com.sobolaw.api.lawsuit.dto;

import com.sobolaw.api.lawsuit.entity.LawsuitFraud;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * DTO for {@link LawsuitFraud}.
 */
public record LawsuitFraudDTO(Long lawsuitFraudId, Long memberId, String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress, String plaintiffPhoneNumber,
                              String defendantName, String defendantAddress, String defendantPhoneNumber, LocalDate contactDate, LocalTime contactTime, String tradeSite, String tradedItem,
                              LocalDate depositDate, LocalTime depositTime, Long depositAmount, String contactMethod, boolean isCashDeposit, String bankName, String accountNumber, String evidence,
                              String policeStationTeam) {

    public static LawsuitFraudDTO of(Long lawsuitFraudId, Long memberId, String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress,
        String plaintiffPhoneNumber, String defendantName, String defendantAddress, String defendantPhoneNumber, LocalDate contactDate, LocalTime contactTime, String tradeSite, String tradedItem,
        LocalDate depositDate, LocalTime depositTime, Long depositAmount, String contactMethod, boolean isCashDeposit, String bankName, String accountNumber, String evidence,
        String policeStationTeam) {
        return new LawsuitFraudDTO(lawsuitFraudId, memberId, title, plaintiffName, plaintiffResidentRegistrationNumber, plaintiffAddress, plaintiffPhoneNumber, defendantName, defendantAddress,
            defendantPhoneNumber, contactDate, contactTime, tradeSite, tradedItem, depositDate, depositTime, depositAmount, contactMethod, isCashDeposit, bankName, accountNumber, evidence,
            policeStationTeam);
    }

    /**
     * LawsuitFraud 엔티티를 LawsuitFraudDTO로 변환하는 메소드.
     */
    public static LawsuitFraudDTO from(LawsuitFraud entity) {
        return LawsuitFraudDTO.of(entity.getLawsuitFraudId(), entity.getMember().getMemberId(), entity.getTitle(), entity.getPlaintiffName(), entity.getPlaintiffResidentRegistrationNumber(),
            entity.getPlaintiffAddress(), entity.getPlaintiffPhoneNumber(), entity.getDefendantName(), entity.getDefendantAddress(), entity.getDefendantPhoneNumber(), entity.getContactDate(),
            entity.getContactTime(), entity.getTradeSite(), entity.getTradedItem(), entity.getDepositDate(), entity.getDepositTime(), entity.getDepositAmount(), entity.getContactMethod(),
            entity.isCashDeposit(), entity.getBankName(), entity.getAccountNumber(), entity.getEvidence(), entity.getPoliceStationTeam());
    }
}
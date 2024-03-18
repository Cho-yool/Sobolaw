package com.sobolaw.api.lawsuit.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 사기죄 소장 생성 DTO.
 */
public record LawsuitFraudCreateUpdateRequestDTO(String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress, String plaintiffPhoneNumber,
                                                 String defendantName, String defendantAddress, String defendantPhoneNumber, LocalDate contactDate, LocalTime contactTime, String tradeSite,
                                                 String tradedItem, LocalDate depositDate, LocalTime depositTime, long depositAmount, String contactMethod, boolean isCashDeposit, String bankName,
                                                 String accountNumber, String evidence, String policeStationTeam) {

}

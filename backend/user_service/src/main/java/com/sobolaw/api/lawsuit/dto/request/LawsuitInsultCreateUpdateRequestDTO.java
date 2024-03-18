package com.sobolaw.api.lawsuit.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 모욕죄 소장 생성 DTO.
 */
public record LawsuitInsultCreateUpdateRequestDTO(String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress, String plaintiffPhoneNumber,
                                                  String plaintiffNickname, String defendantName, String defendantNickname, String defendantAddress, String defendantPhoneNumber,
                                                  LocalDate incidentDate, LocalTime incidentTime, String onlineServiceType, String webServiceDetails, String problemSpeech, String reasonsForInsult,
                                                  String relatedPeopleCount, String witness1, String witness2, String witness3, String insultDuration, String insultFrequency,
                                                  String circumstancesForIdentification, String evidence, LocalDate submissionDate, String policeStationTeam) {

}
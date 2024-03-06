package com.sobolaw.lawsuit.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 명예훼손 소장 생성 DTO.
 */
public record LawsuitDefamationCreateUpdateRequestDTO(Long lawsuitId, String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress,
                                                      String plaintiffPhoneNumber,
                                                      String defendantName,
                                                      String defendantAddress, String defendantPhoneNumber, String defendantIdentificationDetails, LocalDate incidentDate, LocalTime incidentTime,
                                                      String location,
                                                      String defamationContent, boolean isFalseAccusation, String relatedPeople, String evidence, LocalDate submissionDate,
                                                      String policeStationTeam) {

}


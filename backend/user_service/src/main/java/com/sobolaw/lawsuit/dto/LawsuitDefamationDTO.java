package com.sobolaw.lawsuit.dto;

import com.sobolaw.lawsuit.entity.LawsuitDefamation;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * DTO for {@link LawsuitDefamation}.
 */
public record LawsuitDefamationDTO(
    Long lawsuitId,
    String plaintiffName,
    String plaintiffResidentRegistrationNumber,
    String plaintiffAddress,
    String plaintiffPhoneNumber,
    String defendantName,
    String defendantAddress,
    String defendantPhoneNumber,
    String defendantZipCode,
    LocalDate incidentDate,
    LocalTime incidentTime,
    String location,
    String defamationContent,
    boolean isFalseAccusation,
    String relatedPeople,
    String evidence,
    LocalDate submissionDate,
    String policeStationTeam
) implements Serializable {

    public static LawsuitDefamationDTO of(
        Long lawsuitId,
        String plaintiffName,
        String plaintiffResidentRegistrationNumber,
        String plaintiffAddress,
        String plaintiffPhoneNumber,
        String defendantName,
        String defendantAddress,
        String defendantPhoneNumber,
        String defendantZipCode,
        LocalDate incidentDate,
        LocalTime incidentTime,
        String location,
        String defamationContent,
        boolean isFalseAccusation,
        String relatedPeople,
        String evidence,
        LocalDate submissionDate,
        String policeStationTeam
    ) {
        return new LawsuitDefamationDTO(
            lawsuitId,
            plaintiffName,
            plaintiffResidentRegistrationNumber,
            plaintiffAddress,
            plaintiffPhoneNumber,
            defendantName,
            defendantAddress,
            defendantPhoneNumber,
            defendantZipCode,
            incidentDate,
            incidentTime,
            location,
            defamationContent,
            isFalseAccusation,
            relatedPeople,
            evidence,
            submissionDate,
            policeStationTeam
        );
    }

    /**
     * LawsuitDefamation 엔티티를 LawsuitDefamationDTO 변환하는 메소드.
     */
    public static LawsuitDefamationDTO from(LawsuitDefamation entity) {
        return LawsuitDefamationDTO.of(
            entity.getLawsuitDefamationId(),
            entity.getPlaintiffName(),
            entity.getPlaintiffResidentRegistrationNumber(),
            entity.getPlaintiffAddress(),
            entity.getPlaintiffPhoneNumber(),
            entity.getDefendantName(),
            entity.getDefendantAddress(),
            entity.getDefendantPhoneNumber(),
            entity.getDefendantIdentificationDetails(),
            entity.getIncidentDate(),
            entity.getIncidentTime(),
            entity.getLocation(),
            entity.getDefamationContent(),
            entity.isFalseAccusation(),
            entity.getRelatedPeople(),
            entity.getEvidence(),
            entity.getSubmissionDate(),
            entity.getPoliceStationTeam()
        );
    }
}

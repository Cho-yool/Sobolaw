package com.sobolaw.lawsuit.dto;

import com.sobolaw.lawsuit.entity.LawsuitInsult;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * DTO for {@link LawsuitInsult}.
 */
public record LawsuitInsultDTO(Long lawsuitInsultId, Long memberId, String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress,
                               String plaintiffPhoneNumber, String plaintiffNickname, String defendantName, String defendantNickname, String defendantAddress, String defendantPhoneNumber,
                               LocalDate incidentDate, LocalTime incidentTime, String onlineServiceType, String webServiceDetails, String problemSpeech, String reasonsForInsult,
                               String relatedPeopleCount, String witness1, String witness2, String witness3, String insultDuration, String insultFrequency, String circumstancesForIdentification,
                               String evidence, LocalDate submissionDate, String policeStationTeam) {

    public static LawsuitInsultDTO of(Long lawsuitInsultId, Long memberId, String title, String plaintiffName, String plaintiffResidentRegistrationNumber, String plaintiffAddress,
        String plaintiffPhoneNumber, String plaintiffNickname, String defendantName, String defendantNickname, String defendantAddress, String defendantPhoneNumber, LocalDate incidentDate,
        LocalTime incidentTime, String onlineServiceType, String webServiceDetails, String problemSpeech, String reasonsForInsult, String relatedPeopleCount, String witness1, String witness2,
        String witness3, String insultDuration, String insultFrequency, String circumstancesForIdentification, String evidence, LocalDate submissionDate, String policeStationTeam) {
        return new LawsuitInsultDTO(lawsuitInsultId, memberId, title, plaintiffName, plaintiffResidentRegistrationNumber, plaintiffAddress, plaintiffPhoneNumber, plaintiffNickname, defendantName,
            defendantNickname, defendantAddress, defendantPhoneNumber, incidentDate, incidentTime, onlineServiceType, webServiceDetails, problemSpeech, reasonsForInsult, relatedPeopleCount, witness1,
            witness2, witness3, insultDuration, insultFrequency, circumstancesForIdentification, evidence, submissionDate, policeStationTeam);
    }

    /**
     * LawsuitInsult 엔티티를 LawsuitInsultDTO로 변환하는 메소드.
     */
    public static LawsuitInsultDTO from(LawsuitInsult entity) {
        return LawsuitInsultDTO.of(entity.getLawsuitInsultId(), entity.getMember().getMemberId(), entity.getTitle(), entity.getPlaintiffName(), entity.getPlaintiffResidentRegistrationNumber(),
            entity.getPlaintiffAddress(), entity.getPlaintiffPhoneNumber(), entity.getPlaintiffNickname(), entity.getDefendantName(), entity.getDefendantNickname(), entity.getDefendantAddress(),
            entity.getDefendantPhoneNumber(), entity.getIncidentDate(), entity.getIncidentTime(), entity.getOnlineServiceType(), entity.getWebServiceDetails(), entity.getProblemSpeech(),
            entity.getReasonsForInsult(), entity.getRelatedPeopleCount(), entity.getWitness1(), entity.getWitness2(), entity.getWitness3(), entity.getInsultDuration(), entity.getInsultFrequency(),
            entity.getCircumstancesForIdentification(), entity.getEvidence(), entity.getSubmissionDate(), entity.getPoliceStationTeam());
    }
}
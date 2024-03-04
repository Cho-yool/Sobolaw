package com.sobolaw.lawsuit.dto;

import com.sobolaw.lawsuit.entity.LawsuitDefamation;
import java.io.Serializable;

/**
 * DTO for {@link LawsuitDefamation}.
 */
public record LawsuitDefamationDTO(Long lawsuitId, String delator, String delatorAddress, String respondent, String respondentAddress, String content, String policeStation, String prosecutor) implements
    Serializable {

    public static LawsuitDefamationDTO of(Long lawsuitId, String delator, String delatorAddress, String respondent, String respondentAddress, String content, String policeStation, String prosecutor) {
        return new LawsuitDefamationDTO(lawsuitId, delator, delatorAddress, respondent, respondentAddress, content, policeStation, prosecutor);
    }

    /**
     * Interest 엔티티를 InterestDto 변환하는 메소드.
     */
    public static LawsuitDefamationDTO from(LawsuitDefamation entity) {
        return new LawsuitDefamationDTO(
            entity.getLawsuitDefamationId(),
            entity.getDelator(),
            entity.getDelatorAddress(),
            entity.getRespondent(),
            entity.getRespondentAddress(),
            entity.getContent(),
            entity.getPoliceStation(),
            entity.getProsecutor()
        );
    }

}
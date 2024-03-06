package com.sobolaw.api.precedent.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PrecedentDTO {

    private Long precedentId;
    private String caseName;
    private String caseNumber;
    private String judgmentDate;
    private String judgment;
    private String courtName;
    private String caseType;
    private String verdictType;
    private String judicialNotice;
    private String verdictSummary;
    private String referencedStatute;
    private String referencedCase;
    private String caseContent;

    public PrecedentDTO(String caseName, String caseNumber, String caseName1, String judgmentDate, String judgment, String courtName, String caseName2, String verdictType, String judicialNotice, String verdictSummary, String referencedStatute, String referencedCase) {
    }
}

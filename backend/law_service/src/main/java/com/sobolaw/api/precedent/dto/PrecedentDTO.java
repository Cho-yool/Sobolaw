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
    private String caseNumber;
    private String caseName;
    private String caseType;
    private String caseContent;
    private String judgment;
    private String judgmentDate;
    private String judicialNotice;
    private String courtName;
    private String verdictType;
    private String verdictSummary;
    private String referencedCase;
    private String referencedStatute;
    private Long hit;

}

package com.sobolaw.feign.dto;

import lombok.Data;
@Data
public class PrecedentDto {

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
    private Long hit;

}

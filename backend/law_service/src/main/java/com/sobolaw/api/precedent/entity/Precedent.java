package com.sobolaw.api.precedent.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "precedent")
public class Precedent {

    @Id
    @Column(name = "precedent_id")
    private Long precedentId;

    @Column(name = "case_name", length = 21845)
    private String caseName;

    @Column(name = "case_number", length = 255)
    private String caseNumber;

    @Column(name = "judgment_date", length = 255)
    private String judgmentDate;

    @Column(name = "judgment", length = 21845)
    private String judgment;

    @Column(name = "court_name", length = 21845)
    private String courtName;

    @Column(name = "case_type", length = 21845)
    private String caseType;

    @Column(name = "verdict_type", length = 255)
    private String verdictType;

    @Column(name = "judicial_notice", length = 21845)
    private String judicialNotice;

    @Column(name = "verdict_summary", length = 21845)
    private String verdictSummary;

    @Column(name = "referenced_statute", length = 21845)
    private String referencedStatute;

    @Column(name = "referenced_case", length = 21845)
    private String referencedCase;

    @Column(name = "case_content", columnDefinition = "LONGTEXT")
    private String caseContent;

}

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
    @Column()
    private Long precedentId;

    @Column(columnDefinition = "TEXT")
    private String caseName;

    @Column
    private String caseNumber;

    @Column
    private String judgmentDate;

    @Column(columnDefinition = "TEXT")
    private String judgment;

    @Column(columnDefinition = "TEXT")
    private String courtName;

    @Column(columnDefinition = "TEXT")
    private String caseType;

    @Column
    private String verdictType;

    @Column(columnDefinition = "TEXT")
    private String judicialNotice;

    @Column(columnDefinition = "TEXT")
    private String verdictSummary;

    @Column(columnDefinition = "TEXT")
    private String referencedStatute;

    @Column(columnDefinition = "TEXT")
    private String referencedCase;

    @Column(columnDefinition = "LONGTEXT")
    private String caseContent;

}

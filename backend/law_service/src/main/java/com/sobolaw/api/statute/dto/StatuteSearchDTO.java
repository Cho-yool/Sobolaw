package com.sobolaw.api.statute.dto;

public class StatuteSearchDTO {

    private Long statuteId;
    private String statuteName;
    private String statuteType;
    private String department;
    private String amendmentType;
    private String publicationNumber;
    private String publicationDate;
    private String enforcementDate;
    private String statuteNumber;

    // StatuteText 관련 정보는 요약 형태로 제공할 수 있습니다.
    private Long articleNumber;
    private String articleTitle;
    private String articleContent; // 조문 내용은 전문 또는 요약 형태로 제공할 수 있습니다.

    // Getter, Setter, Constructors

    // 필요에 따라 toString, hashCode, equals 메소드 구현

}

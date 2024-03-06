package com.sobolaw.api.statute.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StatuteSearchDTO {

    private Long statuteId;
    private String amendmentType;
    private String department;
    private String enforcementDate;
    private String publicationDate;
    private String publicationNumber;
    private String statuteName;
    private String statuteNumber;
    private String statuteType;

    // 법령 내용은 추후에 추가 해야함

}

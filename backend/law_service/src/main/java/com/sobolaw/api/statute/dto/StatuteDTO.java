package com.sobolaw.api.statute.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StatuteDTO {

    private Long statuteNumber;
    private String statuteName;
    private String statuteType;
    private String amendmentType;
    private String department;
    private String enforcementDate;
    private String publicationDate;
    private String publicationNumber;
    private Long hit;
    private List<StatuteTextDTO> statuteTexts;

}

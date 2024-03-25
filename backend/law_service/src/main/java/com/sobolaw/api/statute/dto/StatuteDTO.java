package com.sobolaw.api.statute.dto;

import com.sobolaw.api.statute.document.StatuteTextDocument;
import java.util.List;

import lombok.*;

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
    private List<StatuteTextDocument> statuteTexts;

    public void setStatuteTexts(List<StatuteTextDocument> statuteTexts) {
        this.statuteTexts = statuteTexts;
    }
}

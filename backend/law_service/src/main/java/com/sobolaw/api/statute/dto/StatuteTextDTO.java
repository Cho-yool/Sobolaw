package com.sobolaw.api.statute.dto;

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
public class StatuteTextDTO {

    private Long statuteId;
    private Long statuteNumber;
    private String articleContent;
    private String articleContentSub;
    private String articleEffectiveDate;
    private Long articleNumber;
    private Long articleNumberSub;
    private String articleTitle;
    private String articleType;

    public StatuteTextDTO(Long statuteId, String articleContent, String articleContentSub, String articleEffectiveDate, Long articleNumber, Long articleNumberSub, String articleTitle, String articleType) {
        this.statuteId = statuteId;
        this.articleContent = articleContent;
        this.articleContentSub = articleContentSub;
        this.articleEffectiveDate = articleEffectiveDate;
        this.articleNumber = articleNumber;
        this.articleNumberSub = articleNumberSub;
        this.articleTitle = articleTitle;
        this.articleType = articleType;

    }
}

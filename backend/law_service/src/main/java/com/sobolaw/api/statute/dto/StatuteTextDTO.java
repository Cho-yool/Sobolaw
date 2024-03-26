package com.sobolaw.api.statute.dto;

import com.sobolaw.api.statute.entity.Statute;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

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
    }
}

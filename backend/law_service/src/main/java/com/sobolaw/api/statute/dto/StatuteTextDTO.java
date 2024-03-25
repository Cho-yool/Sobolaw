package com.sobolaw.api.statute.dto;

import com.sobolaw.api.statute.document.StatuteDocument;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StatuteTextDTO {

    private Long statuteId;
    private String articleContent;
    private String articleContentSub;
    private String articleEffectiveDate;
    private String articleNumber;
    private String articleNumberSub;
    private String articleTitle;
    private String articleType;

}

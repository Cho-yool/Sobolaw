package com.sobolaw.api.precedent.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

@Document(indexName = "precedent_index")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
@Setting(settingPath = "elastic/es-setting.json")
@Mapping(mappingPath = "elastic/precedent-mapping.json")
public class PrecedentDocument {
    @Id
    @JsonProperty("precedent_id")
    private Long precedentId;

    @JsonProperty("case_number")
    private String caseNumber;

    @JsonProperty("case_name")
    private String caseName;

    @JsonProperty("case_type")
    private String caseType;

    @JsonProperty("case_content")
    private String caseContent;

    @JsonProperty("judgment")
    private String judgment;

    @JsonProperty("judgment_date")
    private String judgmentDate;

    @JsonProperty("judicial_notice")
    private String judicialNotice;

    @JsonProperty("court_name")
    private String courtName;

    @JsonProperty("verdict_type")
    private String verdictType;

    @JsonProperty("verdict_summary")
    private String verdictSummary;

    @JsonProperty("referenced_case")
    private String referencedCase;

    @JsonProperty("referenced_statute")
    private String referencedStatute;

    @JsonProperty("hit")
    private Long hit;

}

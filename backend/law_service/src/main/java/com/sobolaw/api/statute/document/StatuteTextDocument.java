package com.sobolaw.api.statute.document;


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

@Document(indexName = "statutetext_index")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
@Setting(settingPath = "elastic/es-setting.json")
@Mapping(mappingPath = "elastic/statutetext-mapping.json")
public class StatuteTextDocument {

    @Id
    @JsonProperty("statute_id")
    private Long statuteId;

    @JsonProperty("statute_number")
    private Long statuteNumber;

    @JsonProperty("article_content")
    private String articleContent;

    @JsonProperty("article_content_sub")
    private String articleContentSub;

    @JsonProperty("article_effective_date")
    private String articleEffectiveDate;

    @JsonProperty("article_number")
    private Long articleNumber;

    @JsonProperty("article_number_sub")
    private Long articleNumberSub;

    @JsonProperty("article_title")
    private String articleTitle;

    @JsonProperty("article_type")
    private String articleType;

}

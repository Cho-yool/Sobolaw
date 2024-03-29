package com.sobolaw.api.term.document;

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

@Document(indexName = "term_index")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
@Setting(settingPath = "elastic/es-setting.json")
@Mapping(mappingPath = "elastic/term-mapping.json")
public class TermDocument {
    @Id
    @JsonProperty("term_id")
    private Long termId;

    @JsonProperty("term_definition")
    private String termDefinition;

    @JsonProperty("term_name")
    private String termName;

}

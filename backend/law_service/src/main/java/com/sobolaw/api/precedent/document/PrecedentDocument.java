package com.sobolaw.api.precedent.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sobolaw.api.statute.document.StatuteDocument;
import com.sobolaw.api.statute.dto.StatuteDTO;
import java.util.Map;
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

    @JsonProperty("case_content")
    private String caseContent;

    @JsonProperty("case_name")
    private String caseName;

    @JsonProperty("case_number")
    private String caseNumber;

    @JsonProperty("case_type")
    private String caseType;

    @JsonProperty("court_name")
    private String courtName;

    @JsonProperty("judgment")
    private String judgment;

    @JsonProperty("judgment_date")
    private String judgmentDate;

    @JsonProperty("judicial_notice")
    private String judicialNotice;

    @JsonProperty("referenced_case")
    private String referencedCase;

    @JsonProperty("referenced_statute")
    private String referencedStatute;

    @JsonProperty("verdict_summary")
    private String verdictSummary;

    @JsonProperty("verdict_type")
    private String verdictType;

    @JsonProperty("hit")
    private Long hit;


    // Elasticsearch로부터 받은 source 맵을 기반으로 StatuteDocument 객체를 생성하는 생성자
//    public StatuteDocument(Map source) {
//        this.statuteNumber = Long.parseLong(source.get("statuteNumber").toString());
//        this.statuteName = source.get("statuteName").toString();
//        this.statuteType = source.get("statuteType").toString();
//        this.department = source.get("department").toString();
//        this.amendmentType = source.get("amendmentType").toString();
//        this.publicationNumber = source.get("publicationNumber").toString();
//        this.publicationDate = source.get("publicationDate").toString();
//        this.enforcementDate = source.get("enforcementDate").toString();
//    }

//    public static StatuteDocument of(StatuteDTO dto) {
//        return StatuteDocument.builder()
//            .statuteNumber(dto.getStatuteNumber())
//            .statuteName(dto.getStatuteName())
//            .statuteType(dto.getStatuteType())
//            .department(dto.getDepartment())
//            .amendmentType(dto.getAmendmentType())
//            .publicationNumber(dto.getPublicationNumber())
//            .publicationDate(dto.getPublicationDate())
//            .enforcementDate(dto.getEnforcementDate())
//            .build();
//    }
}

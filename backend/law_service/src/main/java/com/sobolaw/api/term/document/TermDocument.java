package com.sobolaw.api.term.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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

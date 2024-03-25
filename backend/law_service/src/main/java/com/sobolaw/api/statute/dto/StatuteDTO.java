package com.sobolaw.api.statute.dto;

import com.sobolaw.api.statute.document.StatuteDocument;
import com.sobolaw.api.statute.document.StatuteTextDocument;
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

    public StatuteDTO(Long statuteNumber) {
        this.statuteNumber = statuteNumber;
    }

    // StatuteDocument 객체로부터 StatuteSearchDTO 객체를 생성하는 정적 팩토리 메서드
    public static StatuteDTO of(StatuteDocument document, List<Map<String, Object>> statuteTexts) {
        StatuteDTO dto = new StatuteDTO();
        try {
            Long statuteNumber = document.getStatuteNumber();
            dto.setStatuteNumber(statuteNumber);
        } catch (NumberFormatException e) {
            // 변환에 실패한 경우, 예외 처리 로직을 구현합니다.
            // 예: statuteId가 잘못된 포맷이어서 변환할 수 없는 경우
            // 여기서는 예외를 무시하거나, 로깅하거나, 기본값을 설정할 수 있습니다.
            // 예를 들어, dto.setStatuteId(null); 또는 특정 기본값 설정
            System.err.println("Statute ID format error: " + e.getMessage());
            dto.setStatuteNumber(null); // 또는 적절한 기본값으로 설정
        }
        dto.setStatuteName(document.getStatuteName());
        dto.setStatuteType(document.getStatuteType());
        dto.setAmendmentType(document.getAmendmentType());
        dto.setDepartment(document.getDepartment());
        dto.setEnforcementDate(document.getEnforcementDate());
        dto.setPublicationDate(document.getPublicationDate());
        dto.setPublicationNumber(document.getPublicationNumber());
        return dto;
    }

    public void setStatuteTexts(List<StatuteTextDocument> statuteTexts) {
        this.statuteTexts = statuteTexts;
    }
}

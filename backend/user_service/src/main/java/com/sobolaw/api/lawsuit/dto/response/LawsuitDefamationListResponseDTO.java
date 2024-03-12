package com.sobolaw.api.lawsuit.dto.response;

import com.sobolaw.api.lawsuit.entity.LawsuitDefamation;
import java.time.LocalDateTime;

/**
 * 소장 리스트 출력 DTO.
 */
public record LawsuitDefamationListResponseDTO(String type, String title, LocalDateTime createdTime, String defendantName) implements LawsuitListResponseDTO {

    /**
     * LawsuitDefamation 엔티티를 LawsuitDefamationListResponseDTO 변환하는 메소드.
     */
    public static LawsuitDefamationListResponseDTO from(LawsuitDefamation lawsuitDefamation) {
        return new LawsuitDefamationListResponseDTO(
            "Defamation",
            lawsuitDefamation.getTitle(),
            lawsuitDefamation.getCreatedTime(),
            lawsuitDefamation.getDefendantName()
        );

    }

    @Override
    public String getType() {
        return type;
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    @Override
    public String getDefendantName() {
        return defendantName;
    }
}

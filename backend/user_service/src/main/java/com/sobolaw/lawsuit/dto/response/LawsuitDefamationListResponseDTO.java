package com.sobolaw.lawsuit.dto.response;

import com.sobolaw.lawsuit.entity.LawsuitDefamation;
import java.time.LocalDateTime;

/**
 * 소장 리스트 출력 DTO.
 */
public record LawsuitDefamationListResponseDTO(String title, LocalDateTime createdTime, String defendantName) {

    /**
     * LawsuitDefamation 엔티티를 LawsuitDefamationListResponseDTO 변환하는 메소드.
     */
    public static LawsuitDefamationListResponseDTO from(LawsuitDefamation lawsuitDefamation) {
        return new LawsuitDefamationListResponseDTO(
            lawsuitDefamation.getTitle(),
            lawsuitDefamation.getCreatedTime(),
            lawsuitDefamation.getDefendantName()
        );

    }
}

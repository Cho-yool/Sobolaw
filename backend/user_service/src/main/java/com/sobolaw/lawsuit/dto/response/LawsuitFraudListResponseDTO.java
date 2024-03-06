package com.sobolaw.lawsuit.dto.response;

import com.sobolaw.lawsuit.entity.LawsuitFraud;
import java.time.LocalDateTime;

/**
 * 소장 리스트 출력 DTO.
 */
public record LawsuitFraudListResponseDTO(String title, LocalDateTime createdTime, String defendantName) {

    /**
     * LawsuitFraud 엔티티를 LawsuitFraudListResponseDTO 변환하는 메소드.
     */
    public static LawsuitFraudListResponseDTO from(LawsuitFraud lawsuitFraud) {
        return new LawsuitFraudListResponseDTO(
            lawsuitFraud.getTitle(),
            lawsuitFraud.getCreatedTime(),
            lawsuitFraud.getDefendantName()
        );
    }
}

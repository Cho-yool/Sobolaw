package com.sobolaw.api.lawsuit.dto.response;

import com.sobolaw.api.lawsuit.entity.LawsuitFraud;
import java.time.LocalDateTime;

/**
 * 소장 리스트 출력 DTO.
 */
public record LawsuitFraudListResponseDTO(Long id, String type, String title, LocalDateTime createdTime, String defendantName) implements LawsuitListResponseDTO {

    /**
     * LawsuitFraud 엔티티를 LawsuitFraudListResponseDTO 변환하는 메소드.
     */
    public static LawsuitFraudListResponseDTO from(LawsuitFraud lawsuitFraud) {
        return new LawsuitFraudListResponseDTO(
            lawsuitFraud.getLawsuitFraudId(),
            "Fraud",
            lawsuitFraud.getTitle(),
            lawsuitFraud.getCreatedTime(),
            lawsuitFraud.getDefendantName()
        );
    }

    @Override
    public Long getId() {
        return id;
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

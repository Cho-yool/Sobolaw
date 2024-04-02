package com.sobolaw.api.lawsuit.dto.response;

import com.sobolaw.api.lawsuit.entity.LawsuitInsult;
import java.time.LocalDateTime;

/**
 * 소장 리스트 출력 DTO.
 */
public record LawsuitInsultListResponseDTO(Long id, String type, String title, LocalDateTime createdTime, String defendantName) implements LawsuitListResponseDTO {

    /**
     * LawsuitInsult 엔티티를 LawsuitInsultListResponseDTO 변환하는 메소드.
     */
    public static LawsuitInsultListResponseDTO from(LawsuitInsult lawsuitInsult) {
        return new LawsuitInsultListResponseDTO(
            lawsuitInsult.getLawsuitInsultId(),
            "Insult",
            lawsuitInsult.getTitle(),
            lawsuitInsult.getCreatedTime(),
            lawsuitInsult.getDefendantName()
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

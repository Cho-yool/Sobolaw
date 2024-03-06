package com.sobolaw.lawsuit.dto.response;

import com.sobolaw.lawsuit.entity.LawsuitInsult;
import java.time.LocalDateTime;

/**
 * 소장 리스트 출력 DTO.
 */
public record LawsuitInsultListResponseDTO(String title, LocalDateTime createdTime, String defendantName) {

    /**
     * LawsuitInsult 엔티티를 LawsuitInsultListResponseDTO 변환하는 메소드.
     */
    public static LawsuitInsultListResponseDTO from(LawsuitInsult lawsuitInsult) {
        return new LawsuitInsultListResponseDTO(
            lawsuitInsult.getTitle(),
            lawsuitInsult.getCreatedTime(),
            lawsuitInsult.getDefendantName()
        );
    }
}

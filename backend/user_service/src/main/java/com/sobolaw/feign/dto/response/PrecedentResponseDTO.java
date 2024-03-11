package com.sobolaw.feign.dto.response;

/**
 * 판례 특정 DTO.
 */
public record PrecedentResponseDTO(Long precedentId, String caseName, String caseNumber, String judgmentDate, String judgment, String courtName, String caseType, String verdictType,
                                   String judicialNotice, String verdictSummary, String referencedStatute, String referencedCase, String caseContent, Long hit) {

}

package com.sobolaw.feign.dto.response;

/**
 * 판례 리스트 DTO.
 */
public record PrecedentListResponseDTO(Long precedentId, String caseName, String caseNumber, String judgmentDate, String judgment, String courtName, String caseType, String verdictType,
                                       String judicialNotice, String verdictSummary, String referencedStatute, String referencedCase, String caseContent) {

}

package com.sobolaw.api.member.dto.response;

public record MemberPrecedentContentResponseDTO(Long memberPrecedentId, Long precedentId, String caseName, String caseNumber, String judgmentDate, String judgment, String courtName, String caseType, String verdictType,
                                                String judicialNotice, String verdictSummary, String referencedStatute, String referencedCase, String caseContent, Long hit) {


}

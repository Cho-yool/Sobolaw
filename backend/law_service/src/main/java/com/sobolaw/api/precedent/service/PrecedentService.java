package com.sobolaw.api.precedent.service;

import com.sobolaw.api.precedent.dto.PrecedentDTO;
import com.sobolaw.api.precedent.entity.Precedent;
import com.sobolaw.api.precedent.repository.PrecedentRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrecedentService {

    private final PrecedentRepository precedentRepository;

    // precedentId로 판례 내용 조회
    public PrecedentDTO findPrecedentById(Long precedentId) {

        Precedent precedent = precedentRepository.findById(precedentId)
            .orElseThrow(() -> new IllegalArgumentException("해당 판례가 없습니다. precedentId=" + precedentId));

        return convertToPrecedentDTO(precedent);
    }

    // precedentIds로 판례 목록 조회
    public List<PrecedentDTO> findPrecedentsById(List<Long> precedentIds) {
        List<Precedent> precedents = precedentRepository.findByPrecedentIdIn(precedentIds);

        if (precedents.isEmpty()) {
            throw new IllegalArgumentException("해당 판례가 없습니다. precedentIds = " + precedentIds);
        }

        return precedents.stream()
            .map(this::convertToPrecedentDTO)
            .collect(Collectors.toList());
    }

    // searchKeyword로 키워드 일치하는 판례 검색 (일단 판례 내용에서만 검색)
    public List<PrecedentDTO> searchByKeyword(String searchKeyword) {

        List<Precedent> precedents = precedentRepository.findByCaseContentContaining(searchKeyword);

        if (precedents.isEmpty()) {
            throw new IllegalArgumentException("해당 키워드 관련 판례가 없습니다. searchKeyword=" + searchKeyword);
        }

        return precedents.stream()
            .map(this::convertToPrecedentDTO)
            .collect(Collectors.toList());
    }

    private PrecedentDTO convertToPrecedentDTO(Precedent entity) {
        return new PrecedentDTO(
            entity.getPrecedentId(),
            entity.getCaseName(),
            entity.getCaseNumber(),
            entity.getJudgmentDate(),
            entity.getJudgment(),
            entity.getCourtName(),
            entity.getCaseType(),
            entity.getVerdictType(),
            entity.getJudicialNotice(),
            entity.getVerdictSummary(),
            entity.getReferencedStatute(),
            entity.getReferencedCase(),
            entity.getCaseContent()
        );
    }

}
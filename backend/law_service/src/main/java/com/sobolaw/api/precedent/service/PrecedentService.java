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

    public PrecedentDTO findPrecedentById(Long precedentId) {

        Precedent precedent = precedentRepository.findById(precedentId)
            .orElseThrow(() -> new IllegalArgumentException("해당 판례가 없습니다. precedentId=" + precedentId));

        return convertToPrecedentDTO(precedent);
    }

    public List<PrecedentDTO> findPrecedentsById(List<Long> precedentIds) {
        List<Precedent> precedents = precedentRepository.findByPrecedentIdIn(precedentIds);

        if (precedents.isEmpty()) {
            throw new IllegalArgumentException("해당 판례가 없습니다. precedentIds = " + precedentIds);
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
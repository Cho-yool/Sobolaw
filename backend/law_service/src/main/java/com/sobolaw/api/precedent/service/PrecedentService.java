package com.sobolaw.api.precedent.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.sobolaw.api.precedent.document.PrecedentDocument;
import com.sobolaw.api.precedent.dto.PrecedentDTO;
import com.sobolaw.api.precedent.entity.Precedent;
import com.sobolaw.api.precedent.repository.PrecedentRepository;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PrecedentService {

    private final PrecedentRepository precedentRepository;
    private final ElasticsearchClient elasticsearchClient;

    // precedentId로 판례 내용 조회
    public PrecedentDTO findPrecedentById(Long precedentId) {

        Precedent precedent = precedentRepository.findByPrecedentId(precedentId)
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

    // elasticsearch 판례검색
    public List<PrecedentDTO> searchByKeyword(String searchKeyword) throws IOException {

        SearchResponse<PrecedentDocument> precedentResponse = elasticsearchClient.search(s -> s
                .index("precedent_index")
                .query(q -> q
                    .multiMatch(m -> m
                        .query(searchKeyword)
                        .fields(
                            "case_content", "case_name", "case_number",
                            "judicial_notice", "referenced_case", "referenced_statute", "verdict_summary"
                        )
                    )
                ),
            PrecedentDocument.class
        );

        List<PrecedentDTO> precedents = precedentResponse.hits().hits().stream()
            .map(Hit::source)
            .map(precedentDocument -> {
                return new PrecedentDTO (
                    precedentDocument.getPrecedentId(),
                    precedentDocument.getCaseContent(),
                    precedentDocument.getCaseName(),
                    precedentDocument.getCaseNumber(),
                    precedentDocument.getCaseType(),
                    precedentDocument.getCourtName(),
                    precedentDocument.getJudgment(),
                    precedentDocument.getJudgmentDate(),
                    precedentDocument.getJudicialNotice(),
                    precedentDocument.getReferencedCase(),
                    precedentDocument.getReferencedStatute(),
                    precedentDocument.getVerdictSummary(),
                    precedentDocument.getVerdictType(),
                    precedentDocument.getHit()
                );
            })
            .collect(Collectors.toList());

        return precedents;
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
            entity.getCaseContent(),
                entity.getHit()
        );
    }

    @Transactional
    public void updateHit(Long precedentId){
        Precedent precedent = precedentRepository.findByPrecedentId(precedentId)
                .orElseThrow(() -> new IllegalArgumentException("해당 판례가 없습니다. precedentId=" + precedentId));
        precedent.setHit(precedent.getHit()+1);
    }

    public List<PrecedentDTO> findTop20ByOrderByHitDesc(){
        List<Precedent> precedents = precedentRepository.findTop20ByOrderByHitDesc();

        return precedents.stream()
                .map(this::convertToPrecedentDTO)
                .collect(Collectors.toList());
    }

}
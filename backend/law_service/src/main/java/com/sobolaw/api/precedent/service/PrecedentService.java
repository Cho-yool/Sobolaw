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
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PrecedentService {

    private final PrecedentRepository precedentRepository;
    private final ElasticsearchClient elasticsearchClient;

    // 기능 : precedentId로 판례 내용 조회
    public PrecedentDTO findPrecedentById(Long precedentId) {
        Precedent precedent = precedentRepository.findByPrecedentId(precedentId)
            .orElseThrow(() -> new IllegalArgumentException("해당 판례가 없습니다. precedentId=" + precedentId));
        updateHit(precedentId);
        return convertToPrecedentDTO(precedent);
    }

    // 조회수 + 1
    @Transactional
    public void updateHit(Long precedentId){
        Precedent precedent = precedentRepository.findByPrecedentId(precedentId)
            .orElseThrow(() -> new IllegalArgumentException("해당 판례가 없습니다. precedentId=" + precedentId));
        precedent.setHit(precedent.getHit()+1);
        precedentRepository.save(precedent);
    }

    // 기능 : precedentIds로 판례 목록 조회
    public List<PrecedentDTO> findPrecedentsById(List<Long> precedentIds) {
        List<Precedent> precedents = precedentRepository.findByPrecedentIdIn(precedentIds);

        if (precedents.isEmpty()) {
            throw new IllegalArgumentException("해당 판례가 없습니다. precedentIds = " + precedentIds);
        }

        return precedents.stream()
            .map(this::convertToPrecedentDTO)
            .collect(Collectors.toList());
    }

    // 기능 : 조회수 높은 순으로 20개 반환
    public List<PrecedentDTO> findTop20ByOrderByHitDesc(){
        List<Precedent> precedents = precedentRepository.findTop20ByOrderByHitDesc();

        return precedents.stream()
            .map(this::convertToPrecedentDTO)
            .collect(Collectors.toList());
    }

    // 기능 : elasticsearch 판례검색
    public List<PrecedentDTO> searchByKeyword(String searchKeyword, int pageNumber) throws IOException {

        int pageSize = 10; // 기본 10개씩

        SearchResponse<PrecedentDocument> precedentResponse = elasticsearchClient.search(s -> s
                .index("precedent_index")
                .from((pageNumber - 1) * pageSize)
                .size(pageSize)
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

        // 검색 결과 총 개수
        long totalHits = precedentResponse.hits().total().value();

        List<PrecedentDTO> precedents = precedentResponse.hits().hits().stream()
            .map(Hit::source)
            .filter(Objects::nonNull)
            .map(precedentDocument -> { // 아래 변환방식 사용할 때 : DTO랑 순서 동일하게 작성
                return new PrecedentDTO (
                    precedentDocument.getPrecedentId(),
                    precedentDocument.getCaseNumber(),
                    precedentDocument.getCaseName(),
                    precedentDocument.getCaseType(),
                    precedentDocument.getCaseContent(),
                    precedentDocument.getJudgment(),
                    precedentDocument.getJudgmentDate(),
                    precedentDocument.getJudicialNotice(),
                    precedentDocument.getCourtName(),
                    precedentDocument.getVerdictType(),
                    precedentDocument.getVerdictSummary(),
                    precedentDocument.getReferencedCase(),
                    precedentDocument.getReferencedStatute(),
                    precedentDocument.getHit(),
                    totalHits
                );
            }).collect(Collectors.toList());

        return precedents;
    }

    // entity -> DTO 변환
    private PrecedentDTO convertToPrecedentDTO(Precedent entity) { // 아래 변환방식 사용할 때 : DTO랑 순서 동일하게 작성
        return new PrecedentDTO(
            entity.getPrecedentId(),
            entity.getCaseNumber(),
            entity.getCaseName(),
            entity.getCaseType(),
            entity.getCaseContent(),
            entity.getJudgment(),
            entity.getJudgmentDate(),
            entity.getJudicialNotice(),
            entity.getCourtName(),
            entity.getVerdictType(),
            entity.getVerdictSummary(),
            entity.getReferencedCase(),
            entity.getReferencedStatute(),
            entity.getHit(),
            0L
        );
    }
}
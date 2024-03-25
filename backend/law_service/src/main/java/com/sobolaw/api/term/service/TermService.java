package com.sobolaw.api.term.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.sobolaw.api.term.document.TermDocument;
import com.sobolaw.api.term.dto.TermDTO;
import com.sobolaw.api.term.entity.Term;
import com.sobolaw.api.term.repository.TermRepository;
import jakarta.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TermService {

    private final TermRepository termRepository;
    private final ElasticsearchClient elasticsearchClient;

    // elasticsearch 키워드 검색
    public List<TermDTO> searchByKeyword (String searchKeyword) throws IOException {

        SearchResponse<TermDocument> termResponse = elasticsearchClient.search(s -> s
            .index("term_index")
            .query(q -> q
                .multiMatch(m -> m
                    .query(searchKeyword)
                    .fields("term_definition", "term_name")
                )
            ),
            TermDocument.class
        );

        List<TermDTO> terms = termResponse.hits().hits().stream()
            .map(Hit::source)
            .map(termDocument -> { // 아래 변환방식 사용할 때 : DTO랑 순서 동일하게 작성
                return new TermDTO(
                    termDocument.getTermId(),
                    termDocument.getTermName(),
                    termDocument.getTermDefinition()
                );
            })
            .collect(Collectors.toList());

        return terms;
    }

    // 법령용어 전체 목록
    public Page<TermDTO> getTermsByPage(int page) {
        List<Sort.Order> sorts = new ArrayList<>();

        // termName 오름차순 , 20개씩
        sorts.add(Sort.Order.asc("termName"));
        Pageable pageable = PageRequest.of(page, 20, Sort.by(sorts));

        Page<Term> termPage = termRepository.findAll(pageable);

        return termPage.map(this::convertToTermDTO);
    }

    public TermDTO findTermByTermId(Long termId) {
        Term term = termRepository.findById(termId)
            .orElseThrow(() -> new EntityNotFoundException("해당 법령용어가 없습니다. termId = " + termId));
        return convertToTermDTO(term);
    }

    // entity -> DTO 변환
    private TermDTO convertToTermDTO(Term entity) { // 아래 변환방식 사용할 때 : DTO랑 순서 동일하게 작성
        return new TermDTO(
            entity.getTermId(),
            entity.getTermName(),
            entity.getTermDefinition()
        );
    }
}
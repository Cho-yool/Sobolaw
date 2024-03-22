package com.sobolaw.api.term.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.sobolaw.api.term.document.TermDocument;
import com.sobolaw.api.term.dto.TermDTO;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TermService {

    private final ElasticsearchClient elasticsearchClient;

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
            .map(termDocument -> {
                return new TermDTO(
                    termDocument.getTermId(),
                    termDocument.getTermDefinition(),
                    termDocument.getTermName()
                );
            })
            .collect(Collectors.toList());

        return terms;
    }
}
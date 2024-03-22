package com.sobolaw.api.statute.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.sobolaw.api.statute.document.StatuteDocument;
import com.sobolaw.api.statute.document.StatuteTextDocument;
import com.sobolaw.api.statute.dto.StatuteDTO;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.client.RestClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StatuteSearchService {

    private final ElasticsearchClient elasticsearchClient;

    public List<StatuteDTO> searchByKeyword(String searchKeyword) throws Exception {
        // 첫 번째 단계: 검색 키워드로 statuteNumbers 검색
        Set<Long> statuteNumbers = searchAndGetStatuteNumbers(searchKeyword);

        // 두 번째 단계: 얻은 statuteNumbers로 Statute와 StatuteText 정보 조회
        return fetchStatutesWithTexts(statuteNumbers);
    }

    public Set<Long> searchAndGetStatuteNumbers(String searchKeyword) throws Exception {

        // statuteNumber 만 가져오는 쿼리 실행
        // 중복 제거
        Set<Long> statuteNumbers = new HashSet<>();

        // statute_index에서 검색
        SearchResponse<StatuteDocument> statuteResponse = elasticsearchClient.search(s -> s
            .index("statute_index")
            .query(q -> q
                .multiMatch(m -> m
                    .query(searchKeyword)
                    .fields("statute_name")
                )
            )
            .source(src -> src
                .fetch(true) // ㅅㅂ 여기서 statueNumber만 가져와야한다고!!!!!!!!!!!!!!!!!!
            ),
            StatuteDocument.class
        );

        // statute_text_index에서 검색
        SearchResponse<StatuteTextDocument> statuteTextResponse = elasticsearchClient.search(s -> s
            .index("statutetext_index")
            .query(q -> q
                .multiMatch(m -> m
                    .query(searchKeyword)
                    .fields("article_content", "article_contentSub")
                )
            )
            .source(src -> src
                .fetch(true) // ㅅㅂ 여기서 statueNumber만 가져와야한다고!!!!!!!!!!!!!!!!!!
            ),
            StatuteTextDocument.class
        );

        // statuteNumber 추출
        statuteResponse.hits().hits().forEach(hit -> statuteNumbers.add(hit.source().getStatuteNumber()));
        statuteTextResponse.hits().hits().forEach(hit -> statuteNumbers.add(hit.source().getStatuteNumber()));

        return statuteNumbers;
    }


    public List<StatuteDTO> fetchStatutesWithTexts(Set<Long> statuteNumbers) throws IOException {
        List<StatuteDTO> statutes = new ArrayList<>();

        for (Long statuteNumber : statuteNumbers) {
            // statute 정보 가져오기
            SearchResponse<StatuteDocument> statuteResponse = elasticsearchClient.search(s -> s
                    .index("statute_index")
                    .query(q -> q
                        .term(t -> t
                            .field("statute_number")
                            .value(statuteNumber.toString())
                        )
                    ),
                StatuteDocument.class
            );

            StatuteDocument statuteDocument = statuteResponse.hits().hits().get(0).source();

            // 관련 statute_text 문서들 가져오기
            SearchResponse<StatuteTextDocument> statuteTextResponse = elasticsearchClient.search(s -> s
                    .index("statutetext_index")
                    .query(q -> q
                        .term(t -> t
                            .field("statute_number")
                            .value(statuteNumber.toString())
                        )
                    ),
                StatuteTextDocument.class
            );

            List<StatuteTextDocument> statuteTexts = statuteTextResponse.hits().hits().stream()
                .map(Hit::source)
                .collect(Collectors.toList());

            // StatuteDTO 구성
            StatuteDTO statuteDTO = new StatuteDTO();
            statuteDTO.setStatuteNumber(statuteDocument.getStatuteNumber());
            statuteDTO.setStatuteName(statuteDocument.getStatuteName());
            statuteDTO.setAmendmentType(statuteDocument.getAmendmentType());
            statuteDTO.setDepartment(statuteDocument.getDepartment());
            statuteDTO.setEnforcementDate(statuteDocument.getEnforcementDate());
            statuteDTO.setPublicationDate(statuteDocument.getPublicationDate());
            statuteDTO.setPublicationNumber(statuteDocument.getPublicationNumber());
            statuteDTO.setStatuteType(statuteDocument.getStatuteType());
            statuteDTO.setStatuteTexts(statuteTexts); // StatuteTextDocument 리스트 설정

            statutes.add(statuteDTO);
        }

        return statutes;
    }

}
package com.sobolaw.api.statute.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import com.sobolaw.api.statute.document.StatuteDocument;
import com.sobolaw.api.statute.document.StatuteTextDocument;
import com.sobolaw.api.statute.dto.StatuteDTO;
import com.sobolaw.api.statute.dto.StatuteTextDTO;
import com.sobolaw.api.statute.entity.Statute;
import com.sobolaw.api.statute.entity.StatuteText;
import com.sobolaw.api.statute.repository.StatuteRepository;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StatuteService {

    private final StatuteRepository statuteRepository;
    private final ElasticsearchClient elasticsearchClient;

    public List<StatuteDTO> searchByKeyword(String searchKeyword, int pageNumber) throws Exception {
        // 첫 번째 단계: 검색 키워드로 statuteNumbers 검색
        Set<Long> statuteNumbers = searchAndGetStatuteNumbers(searchKeyword);

        // 두 번째 단계: 얻은 statuteNumbers로 Statute와 StatuteText 정보 조회
        return fetchStatutesWithTexts(statuteNumbers, pageNumber);
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


    public List<StatuteDTO> fetchStatutesWithTexts(Set<Long> statuteNumbers, int pageNumber) throws IOException {

        int pageSize = 10; // 기본 10개씩

        List<Query> shouldQueries = statuteNumbers.stream()
                .map(statuteNumber ->
                        Query.of(q -> q
                                .term(t -> t
                                        .field("statute_number")
                                        .value(statuteNumber.toString())
                                )
                        )
                ).collect(Collectors.toList());

        // statute 정보 가져오기
        SearchResponse<StatuteDocument> statuteResponse = elasticsearchClient.search(s -> s
                .index("statute_index")
                .from((pageNumber-1) * pageSize)
                .size(pageSize)
                .query(q -> q
                        .bool(b -> b
                                .should(shouldQueries)
                        )
                ),
            StatuteDocument.class
        );

        // 검색 결과 총 개수
        long totalHits = statuteResponse.hits().total().value();

        List<StatuteDTO> statutes = statuteResponse.hits().hits().stream()
                .map(hit -> {
                    StatuteDocument statuteDocument = hit.source();
                    StatuteDTO statuteDTO = new StatuteDTO();
                    if (statuteDocument != null) {
                        statuteDTO.setStatuteNumber(statuteDocument.getStatuteNumber());
                        statuteDTO.setStatuteName(statuteDocument.getStatuteName());
                        statuteDTO.setAmendmentType(statuteDocument.getAmendmentType());
                        statuteDTO.setDepartment(statuteDocument.getDepartment());
                        statuteDTO.setEnforcementDate(statuteDocument.getEnforcementDate());
                        statuteDTO.setPublicationDate(statuteDocument.getPublicationDate());
                        statuteDTO.setPublicationNumber(statuteDocument.getPublicationNumber());
                        statuteDTO.setStatuteType(statuteDocument.getStatuteType());
                        statuteDTO.setHit(statuteDocument.getHit());
                        statuteDTO.setTotal(totalHits);
                    }
                    return statuteDTO;
                })
                .collect(Collectors.toList());

        return statutes;
    }

    // Document -> DTO 변환
    private StatuteTextDTO DocumentToStatuteTextDTO(StatuteTextDocument document) {
        return new StatuteTextDTO(
            document.getStatuteId(),
            document.getStatuteNumber(),
            document.getArticleContent(),
            document.getArticleContentSub(),
            document.getArticleEffectiveDate(),
            document.getArticleNumber(),
            document.getArticleNumberSub(),
            document.getArticleTitle(),
            document.getArticleType()
        );
    }

    // statuteNumber로 법령 내용 조회
    public StatuteDTO getStatuteByNumber(Long statuteNumber) {
        Statute statute = statuteRepository.findByStatuteNumber(statuteNumber)
                .orElseThrow(() -> new IllegalArgumentException("해당 법령이 없습니다. statute = " + statuteNumber));

        return convertToStatuteDTO(statute);
    }

    // 법령 조회수 높은 순으로 20개 반환
    public List<StatuteDTO> findTop20ByOrderByHitDesc(){
        List<Statute> statutes = statuteRepository.findTop20ByOrderByHitDesc();

        return statutes.stream()
                .map(this::convertToStatuteDTO)
                .collect(Collectors.toList());
    }


    // entity -> DTO 변환
    private StatuteDTO convertToStatuteDTO(Statute entity) {
        StatuteDTO statuteDTO = new StatuteDTO();
        statuteDTO.setStatuteNumber(entity.getStatuteNumber());
        statuteDTO.setStatuteName(entity.getStatuteName());
        statuteDTO.setStatuteType(entity.getStatuteType());
        statuteDTO.setAmendmentType(entity.getAmendmentType());
        statuteDTO.setDepartment(entity.getDepartment());
        statuteDTO.setEnforcementDate(entity.getEnforcementDate());
        statuteDTO.setPublicationDate(entity.getPublicationDate());
        statuteDTO.setPublicationNumber(entity.getPublicationNumber());
        statuteDTO.setHit(entity.getHit());

        // StatuteText 리스트를 StatuteDTO에 설정
        List<StatuteTextDTO> statuteTexts = entity.getStatuteTexts().stream()
                .map(this::convertToStatuteTextDTO)
                .collect(Collectors.toList());
        statuteDTO.setStatuteTexts(statuteTexts);

        return statuteDTO;
    }

    // entity -> DTO 변환
    private StatuteTextDTO convertToStatuteTextDTO(StatuteText entity) { // 아래 변환방식 사용할 때 : DTO랑 순서 동일하게 작성
        return new StatuteTextDTO(
            entity.getStatuteId(),
            entity.getArticleContent(),
            entity.getArticleContentSub(),
            entity.getArticleEffectiveDate(),
            entity.getArticleNumber(),
            entity.getArticleNumberSub(),
            entity.getArticleTitle(),
            entity.getArticleType()
        );
    }
}
package com.sobolaw.api.statute.index;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class StatuteDatabaseIndexer {

    private static final Logger logger = LoggerFactory.getLogger(StatuteDatabaseIndexer.class);
    private final JdbcTemplate jdbcTemplate;
    private final RestClient restClient;
    private final ObjectMapper objectMapper = new ObjectMapper(); // ObjectMapper 인스턴스 추가

    public void indexDataFromDatabase() throws IOException {
        // 작업 시작 로그
        logger.info("Starting the indexing : statute_index");

        String query = "SELECT s.* FROM statute s";

        // 퀴리 결과 (MaridDB에서 데이터 select 한것들 )
        List<Map<String, Object>> queryResults = jdbcTemplate.queryForList(query);

        int indexedCount = 0; // 성공적으로 색인된 문서의 수

        for (Map<String, Object> row : queryResults) {
            String statuteNumber = String.valueOf(row.get("statute_number"));
            try {
                // ObjectMapper를 사용해 Map을 JSON 문자열로 변환
                String jsonString = objectMapper.writeValueAsString(row);

                // Elasticsearch에 데이터 색인을 위한 요청 생성
                Request request = new Request("POST", "/statute_index/_doc/" + statuteNumber);
                request.setJsonEntity(jsonString);

                // Elasticsearch에 요청 보내기
                Response response = restClient.performRequest(request);
                indexedCount++;
            } catch (IOException e) {
                logger.error("Error indexing document with ID: " + statuteNumber, e);
            }
        }
        // 작업 완료 로그
        logger.info("Completed indexing data  : statute_index / Total documents indexed: " + indexedCount);
    }
}

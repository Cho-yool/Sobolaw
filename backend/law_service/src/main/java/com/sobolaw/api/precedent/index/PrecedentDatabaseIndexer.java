package com.sobolaw.api.precedent.index;

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
public class PrecedentDatabaseIndexer {

    private static final Logger logger = LoggerFactory.getLogger(PrecedentDatabaseIndexer.class);
    private final JdbcTemplate jdbcTemplate;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public void indexDataFromDatabase() throws IOException {
        String query = "SELECT p.* FROM precedent p";

        // 퀴리 결과 (MaridDB에서 데이터 select 한것들 )
        List<Map<String, Object>> queryResults = jdbcTemplate.queryForList(query);

        for (Map<String, Object> row : queryResults) {
            String precedentId = String.valueOf(row.get("precedent_id"));
            try {
                // ObjectMapper를 사용해 Map을 JSON 문자열로 변환
                String jsonString = objectMapper.writeValueAsString(row);

                // Elasticsearch에 데이터 색인을 위한 요청 생성
                Request request = new Request("POST", "/precedent_index/_doc/" + precedentId);
                request.setJsonEntity(jsonString);

                // Elasticsearch에 요청 보내기
                Response response = restClient.performRequest(request);
                logger.info("Indexed document with ID: " + precedentId + ", Response: " + response.getStatusLine());
            } catch (IOException e) {
                logger.error("Error indexing document with ID: " + precedentId, e);
            }
        }
    }
}

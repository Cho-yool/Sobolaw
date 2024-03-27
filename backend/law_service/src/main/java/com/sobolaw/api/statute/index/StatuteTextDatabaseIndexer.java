package com.sobolaw.api.statute.index;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.transport.endpoints.BooleanResponse;
import co.elastic.clients.util.ContentType;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import lombok.AllArgsConstructor;
import org.apache.http.entity.StringEntity;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class StatuteTextDatabaseIndexer {

    private static final Logger logger = LoggerFactory.getLogger(StatuteTextDatabaseIndexer.class);
    private final JdbcTemplate jdbcTemplate;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public void indexDataFromDatabase() throws IOException {
        // 작업 시작 로그
        logger.info("Starting the indexing : statutetext_index");

        String query = "SELECT st.* FROM statute_text st";

        // 퀴리 결과 (MariaDB에서 데이터 select 한 것들)
        List<Map<String, Object>> queryResults = jdbcTemplate.queryForList(query);

        int indexedCount = 0; // 성공적으로 색인된 문서의 수

        for (Map<String, Object> row : queryResults) {
            String statuteId = String.valueOf(row.get("statute_id"));
            try {
                // ObjectMapper를 사용해 Map을 JSON 문자열로 변환
                String jsonString = objectMapper.writeValueAsString(row);

                // Elasticsearch에 데이터 색인을 위한 요청 생성
                Request request = new Request("POST", "/statutetext_index/_doc/" + statuteId);
                request.setJsonEntity(jsonString);

                // Elasticsearch에 요청 보내기
                Response response = restClient.performRequest(request);
                indexedCount++;
            } catch (IOException e) {
                logger.error("Error indexing document with ID: " + statuteId, e);
            }
        }
        // 작업 완료 로그
        logger.info("Completed indexing data  : statutetext_index / Total documents indexed: " + indexedCount);
    }
}
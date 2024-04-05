package com.sobolaw.api.dataIndex.index;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.ResponseException;
import org.elasticsearch.client.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class TermDatabaseIndexer {

    private static final Logger logger = LoggerFactory.getLogger(TermDatabaseIndexer.class);
    private final JdbcTemplate jdbcTemplate;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public void ensureIndexWithSettingsAndMappings() throws IOException {
        Resource resource = new ClassPathResource("elastic/term-setting-mapping.json");
        String settingsAndMappingsJson = new String(Files.readAllBytes(resource.getFile().toPath()));

        try {
            // 인덱스 생성 요청
            Request request = new Request("PUT", "/term_index");
            request.setJsonEntity(settingsAndMappingsJson);
            Response response = restClient.performRequest(request);
            logger.info("Index term_index created with custom settings and mappings. Response: " + response.getStatusLine().getStatusCode());
        } catch (ResponseException e) {
            String responseBody = "";
            try {
                // Response 본문을 문자열로 변환
                responseBody = EntityUtils.toString(e.getResponse().getEntity());
            } catch (IOException ioException) {
                logger.error("Error reading response body", ioException);
            }
            logger.error("Failed to create index term_index. Status: " + e.getResponse().getStatusLine().getStatusCode());
            logger.error("Response body: " + responseBody);

            if (e.getResponse().getStatusLine().getStatusCode() == 400) {
                // 인덱스가 이미 존재하는 경우의 처리
                logger.info("Index term_index already exists.");
            } else {
                throw e;
            }
        }
    }

    public void indexDataFromDatabase() throws IOException {

        // index 존재 확인 및 설정 추가
        ensureIndexWithSettingsAndMappings();

        // 작업 시작 로그
        logger.info("Starting the indexing : term_index");

        String query = "SELECT lt.* FROM legal_term lt";

        // 퀴리 결과 (MaridDB에서 데이터 select 한것들 )
        List<Map<String, Object>> queryResults = jdbcTemplate.queryForList(query);

        int indexedCount = 0; // 성공적으로 색인된 문서의 수

        for (Map<String, Object> row : queryResults) {
            String termId = String.valueOf(row.get("term_id"));
            try {
                // ObjectMapper를 사용해 Map을 JSON 문자열로 변환
                String jsonString = objectMapper.writeValueAsString(row);

                // Elasticsearch에 데이터 색인을 위한 요청 생성
                Request request = new Request("POST", "/term_index/_doc/" + termId);
                request.setJsonEntity(jsonString);

                // Elasticsearch에 요청 보내기
                Response response = restClient.performRequest(request);
                indexedCount++;
            } catch (IOException e) {
                logger.error("Error indexing document with ID: " + termId, e);
            }
        }
        // 작업 완료 로그
        logger.info("Completed indexing data  : term_index / Total documents indexed: " + indexedCount);
    }
}

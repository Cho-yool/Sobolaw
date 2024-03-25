package com.sobolaw.api.statute.index;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import lombok.AllArgsConstructor;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.nio.entity.NStringEntity;
import org.apache.http.util.EntityUtils;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
        String query = "SELECT s.* FROM statute s";

        // 퀴리 결과 (MaridDB에서 데이터 select 한것들 )
        List<Map<String, Object>> queryResults = jdbcTemplate.queryForList(query);

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
                logger.info("Indexed document with ID: " + statuteNumber + ", Response: " + response.getStatusLine());
            } catch (IOException e) {
                logger.error("Error indexing document with ID: " + statuteNumber, e);
            }
        }





        // 결과를 반복하면서 Elasticsearch에 색인
//        for (Map<String, Object> row : queryResults) {
//            // 각 행에서 필요한 데이터 추출
//            // Long 타입의 데이터가 String으로 안전하게 변환되어 ClassCastException 오류를 방지
//            String statuteName = String.valueOf(row.get("statute_name"));
//            String statuteNumber = String.valueOf(row.get("statute_number"));
//            String statuteType = String.valueOf(row.get("statute_type"));
//            String amendmentType = String.valueOf(row.get("amendment_type"));
//            String department = String.valueOf(row.get("department"));
//            String enforcementDate = String.valueOf(row.get("enforcement_date"));
//            String publicationDate = String.valueOf(row.get("publication_date"));
//            String publicationNumber = String.valueOf(row.get("publication_number"));
//
//            // Elasticsearch에 데이터 색인을 위한 JSON 문자열 생성
//            String jsonString = String.format(
//                "{\"statuteName\": \"%s\", " +
//                    "\"statuteNumber\": \"%s\", " +
//                    "\"statuteType\": \"%s\", " +
//                    "\"amendmentType\": \"%s\", " +
//                    "\"department\": \"%s\", " +
//                    "\"enforcementDate\": \"%s\", " +
//                    "\"publicationDate\": \"%s\", " +
//                    "\"publicationNumber\": \"%s\"}",
//                statuteName, statuteNumber, statuteType, amendmentType, department, enforcementDate, publicationDate, publicationNumber);
//
//
//            // Elasticsearch에 데이터 색인을 위한 요청 생성
//            Request request = new Request("POST", "/statute_index/_doc/" + statuteNumber); // ID를 statute_number로 지정
//            request.setEntity(new NStringEntity(jsonString, ContentType.APPLICATION_JSON));
//
//            try {
//                // Elasticsearch에 요청 보내기
//                Response response = restClient.performRequest(request);
//                // 응답을 문자열로 변환하여 로그에 출력
//                logger.info("Indexed document with ID: " + row.get("id") + ", Response: " + EntityUtils.toString(response.getEntity()));
//            } catch (IOException e) {
//                // 색인 중 에러 발생 시 예외 처리
//                logger.error("Error indexing document", e);
//            }
//        }
    }
}

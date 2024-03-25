package com.sobolaw.api.term.index;

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
public class TermDatabaseIndexer {

    private static final Logger logger = LoggerFactory.getLogger(TermDatabaseIndexer.class);
    private final JdbcTemplate jdbcTemplate;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public void indexDataFromDatabase() throws IOException {
        String query = "SELECT lt.* FROM legal_term lt";

        // 퀴리 결과 (MaridDB에서 데이터 select 한것들 )
        List<Map<String, Object>> queryResults = jdbcTemplate.queryForList(query);

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
                logger.info("Indexed document with ID: " + termId + ", Response: " + response.getStatusLine());
            } catch (IOException e) {
                logger.error("Error indexing document with ID: " + termId, e);
            }
        }

        // 결과를 반복하면서 Elasticsearch에 색인
//        for (Map<String, Object> row : queryResults) {
//            // 각 행에서 필요한 데이터 추출
//            // Long 타입의 데이터가 String으로 안전하게 변환되어 ClassCastException 오류를 방지
//            String precedentId = String.valueOf(row.get("precedent_id"));
//            String caseContent = String.valueOf(row.get("case_content"));
//            String caseName = String.valueOf(row.get("case_name"));
//            String caseNumber = String.valueOf(row.get("case_number"));
//            String courtName = String.valueOf(row.get("court_name"));
//            String judgment = String.valueOf(row.get("judgment"));
//            String judgmentDate = String.valueOf(row.get("judgment_date"));
//            String judicialNotice = String.valueOf(row.get("judicial_notice"));
//            String referencedCase = String.valueOf(row.get("referenced_case"));
//            String referencedStatute = String.valueOf(row.get("referenced_statute"));
//            String verdictSummary = String.valueOf(row.get("verdict_summary"));
//            String verdictType = String.valueOf(row.get("verdict_type"));
//            String hit = String.valueOf(row.get("hit"));
//
//            // Elasticsearch에 데이터 색인을 위한 JSON 문자열 생성
//            String jsonString = String.format(
//                "{\"precedentId\": \"%s\", " +
//                    "\"caseContent\": \"%s\", " +
//                    "\"caseName\": \"%s\", " +
//                    "\"caseNumber\": \"%s\", " +
//                    "\"courtName\": \"%s\", " +
//                    "\"judgment\": \"%s\", " +
//                    "\"judgmentDate\": \"%s\", " +
//                    "\"judicialNotice\": \"%s\", " +
//                    "\"referencedCase\": \"%s\", " +
//                    "\"referencedStatute\": \"%s\", " +
//                    "\"verdictSummary\": \"%s\", " +
//                    "\"verdictType\": \"%s\", " +
//                    "\"hit\": \"%s\"}",
//
//                precedentId, caseContent, caseName, caseNumber, courtName, judgment, judgmentDate, judicialNotice,
//                referencedCase, referencedStatute, verdictSummary, verdictType, hit);
//
//
//            ObjectMapper objectMapper = new ObjectMapper();
//            String jsonString = objectMapper.writeValueAsString(jsonString);

            // Elasticsearch에 데이터 색인을 위한 요청 생성
//            Request request = new Request("POST", "/percedent_index/_doc/" + precedentId); // ID를 statute_number로 지정
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

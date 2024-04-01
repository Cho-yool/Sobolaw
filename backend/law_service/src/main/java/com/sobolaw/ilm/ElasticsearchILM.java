package com.sobolaw.ilm;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.RestClient;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@Slf4j
public class ElasticsearchILM {

    private RestClient restClient;

    public void applyILMPolicy() throws Exception {
        // ILM 정책 JSON 파일 읽기
        String ilmPolicyJson = new String(Files.readAllBytes(Paths.get(new ClassPathResource("elastic/ilm-policy.json").getURI())), StandardCharsets.UTF_8);

        // ILM 정책 설정을 위한 REST API 요청 생성 및 실행
        Request ilmPolicyRequest = new Request("PUT", "/_ilm/policy/my_policy_01");
        ilmPolicyRequest.setJsonEntity(ilmPolicyJson);
        restClient.performRequest(ilmPolicyRequest);

        // 인덱스에 ILM 정책 적용
        applyPolicyToIndex("statute_index");
        applyPolicyToIndex("statutetext_index");
        applyPolicyToIndex("precedent_index");
        applyPolicyToIndex("term_index");

        log.info("ILM Policy applied to all specified indexes.");
    }

    private void applyPolicyToIndex(String indexName) throws Exception {
        String jsonString = "{\"index.lifecycle.name\": \"my_policy_01\"}";
        Request request = new Request("PUT", "/" + indexName + "/_settings");
        request.setJsonEntity(jsonString);
        restClient.performRequest(request);
        log.info("ILM Policy applied to " + indexName);
    }
}

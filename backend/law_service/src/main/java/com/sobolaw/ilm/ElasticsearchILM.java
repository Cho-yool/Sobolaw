package com.sobolaw.ilm;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ElasticsearchILM implements CommandLineRunner {

    private RestClient restClient;
    @Autowired
    public ElasticsearchILM(RestClient restClient) {
        this.restClient = restClient;
    }
    @Override
    public void run(String... args) throws Exception {
        // ILM 정책 JSON 파일 읽기
        String ilmPolicyJson = new String(Files.readAllBytes(Paths.get(new ClassPathResource("elastic/ilm-policy.json").getURI())), StandardCharsets.UTF_8);

        // ILM 정책 설정을 위한 REST API 요청 생성 및 실행
        Request request = new Request("PUT", "/_ilm/policy/my_policy_01");
        request.setJsonEntity(ilmPolicyJson);
        restClient.performRequest(request);

        log.info("ILM Policy applied");
    }
}

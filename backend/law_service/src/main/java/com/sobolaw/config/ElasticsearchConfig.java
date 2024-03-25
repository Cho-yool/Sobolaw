package com.sobolaw.config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@Slf4j
@EnableElasticsearchRepositories
public class ElasticsearchConfig {

    @Value("${spring.elasticsearch.host}")
    private String host;

    @Value("${spring.elasticsearch.port}")
    private int port;

    @Bean
    public RestClient restClient() { // http클라이언트
        RestClientBuilder builder = RestClient.builder(
            new HttpHost(host, port, "http"));
        return builder.build();
    }

    @Bean
    public ElasticsearchClient elasticsearchClient() {
        // RestClient만 사용하면 응답 처리를 위한 추가적인 작업이 필요함
        // service 계층에서 검색 요청을 구성하고 응답을 처리하는 코드를 직접 작성 해야함
        // ElasticsearchClient를 사용하면 구현이 보다 간단해짐

        log.info("host " + host);
        log.info("port " + port);
        RestClientTransport transport = new RestClientTransport(restClient(), new JacksonJsonpMapper());

        return new ElasticsearchClient(transport);
    }
}

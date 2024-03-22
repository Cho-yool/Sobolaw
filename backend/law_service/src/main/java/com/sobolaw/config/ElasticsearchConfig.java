package com.sobolaw.config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.sobolaw.api.statute.repository.elasticsearch")
public class ElasticsearchConfig {

    @Value("${elasticsearch.host:localhost}")
    private String host;

    @Value("${elasticsearch.port:9200}")
    private int port;

    @Bean
    public ElasticsearchClient elasticsearchClient() {
//        Logger log = null;
//        log.info("Connecting to Elasticsearch at {}:{}", host, port);

        RestClient restClient = RestClient.builder(new HttpHost(host, port)).build();
        RestClientTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());
        return new ElasticsearchClient(transport);
    
        
        
        
        
//        // REST 클라이언트 생성
//        RestClient restClient = RestClient.builder(new HttpHost(host, port)).build();
//
//        // RestClientTransport 객체를 생성
//        // 객체는 RestClient와 ElasticsearchClient 사이의 통신을 담당
//        RestClientTransport transport = new RestClientTransport(
//            restClient, new JacksonJsonpMapper());
//
//        // ElasticsearchClient 객체를 생성합니다.
//        ElasticsearchClient client = new ElasticsearchClient(transport);
//
//        return client;
    }

}

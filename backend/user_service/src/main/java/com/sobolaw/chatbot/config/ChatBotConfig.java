package com.sobolaw.chatbot.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

/**
 * ChatGPT에서 사용하는 환경 구성.
 */
@Configuration
public class ChatBotConfig {

    @Value("${openai.secret-key}")
    private String secretKey;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public HttpHeaders httpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(secretKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
}

//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.client.RestTemplate;
//
//@Configuration
//public class GPTConfig {
//
//    @Value("${gpt.api.key}")
//    private String apiKey;
//    @Bean
//    public RestTemplate restTemplate(){
//        RestTemplate template = new RestTemplate();
//        template.getInterceptors().add((request, body, execution) -> {
//            request.getHeaders().add(
//                "Authorization"
//                ,"Bearer "+apiKey);
//            return execution.execute(request,body);
//        });
//
//        return template;
//
//    }
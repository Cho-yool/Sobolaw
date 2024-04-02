package com.sobolaw.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sobolaw.api.entity.PrecedentSummary;
import com.sobolaw.api.model.dto.ChatBotResponseDTO;
import com.sobolaw.api.model.dto.MessageRequestDTO;
import com.sobolaw.api.repository.PrecedentSummaryRepository;
import com.sobolaw.config.ChatBotConfig;
import com.sobolaw.feign.dto.PrecedentDto;
import com.sobolaw.feign.service.LawServiceClient;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AIService {

    private final PrecedentSummaryRepository precedentSummaryRepository;
    private final LawServiceClient lawServiceClient;
    private final ChatBotConfig chatBotConfig;

    @Value("${openai.url}")
    private String promptUrl;

    @Value("${openai.model}")
    private String model;

    /**
     * 판례 내 내용 요약 반환(없을 시 AI 이용한 요약).
     */
    public PrecedentSummary getSummary(Long precedentId) {
        PrecedentSummary precedentSummary = precedentSummaryRepository.findById(precedentId).orElse(null);
        if (precedentSummary == null) {
            PrecedentDto precedentDto = lawServiceClient.getPrecedent(precedentId).getData();
            precedentSummary = new PrecedentSummary();
            precedentSummary.setPrecedentId(precedentDto.getPrecedentId());
            precedentSummary.setSummary(summary(precedentDto.getCaseContent()));
            precedentSummaryRepository.save(precedentSummary);
        }
        return precedentSummary;
    }

    /**
     * 받은 판례 내용 GPT 통해 요약하기.
     */
    @SuppressWarnings("unchecked")
    public String summary(String content) {
        String summary = null;

        // 토큰 정보가 포함된 Header를 가져옵니다.
        HttpHeaders headers = chatBotConfig.httpHeaders();

        // 두 번째 메시지 생성
        MessageRequestDTO userMessage = new MessageRequestDTO("user", content);

        // 입력으로 받은 ChatBotResponseDTO에 model 정보와 메시지 추가하여 사용
        ChatBotResponseDTO chatBotResponseDTO = ChatBotResponseDTO.builder()
            .model(model)
            .messages(Arrays.asList(
                new MessageRequestDTO("system", "보내준 글에 대해서 이해하기 쉽게 요약해줘"),
                userMessage
            ))
            .build();

        // 통신을 위한 RestTemplate을 구성합니다.
        HttpEntity<ChatBotResponseDTO> requestEntity = new HttpEntity<>(chatBotResponseDTO, headers);
        ResponseEntity<String> response = chatBotConfig
            .restTemplate()
            .exchange(promptUrl, HttpMethod.POST, requestEntity, String.class);

        try {
            // String -> HashMap 역직렬화를 구성합니다.
            ObjectMapper om = new ObjectMapper();
            Map<String, Object> resultMap = om.readValue(response.getBody(), new TypeReference<>() {
            });
            summary = ((Map<String, Object>)
                ((List<Map<String, Object>>) resultMap.get("choices")).get(0).get("message")).get("content").toString();

            log.info(resultMap.toString());
        } catch (JsonProcessingException e) {
            log.info("JsonMappingException :: " + e.getMessage());
        } catch (RuntimeException e) {
            log.info("RuntimeException :: " + e.getMessage());
        }
        return summary
            ;
    }

    /**
     * GPT 3.5 모델에 대한 프롬프트.
     */
    public Map<String, Object> chat(ChatBotResponseDTO responseDTO) {
        log.info("[+] 신규 프롬프트를 수행합니다.");

        Map<String, Object> resultMap = new HashMap<>();

        // 토큰 정보가 포함된 Header를 가져옵니다.
        HttpHeaders headers = chatBotConfig.httpHeaders();

        // 입력으로 받은 ChatBotResponseDTO에 model 정보를 추가하여 사용
        ChatBotResponseDTO chatBotResponseDTO = ChatBotResponseDTO.builder()
            .model(model)
            .messages(responseDTO.getMessages())
            .build();

        // 통신을 위한 RestTemplate을 구성합니다.
        HttpEntity<ChatBotResponseDTO> requestEntity = new HttpEntity<>(chatBotResponseDTO, headers);
        ResponseEntity<String> response = chatBotConfig
            .restTemplate()
            .exchange(promptUrl, HttpMethod.POST, requestEntity, String.class);

        try {
            // String -> HashMap 역직렬화를 구성합니다.
            ObjectMapper om = new ObjectMapper();
            resultMap = om.readValue(response.getBody(), new TypeReference<>() {
            });
            log.info(resultMap.toString());
        } catch (JsonProcessingException e) {
            log.info("JsonMappingException :: " + e.getMessage());
        } catch (RuntimeException e) {
            log.info("RuntimeException :: " + e.getMessage());
        }
        return resultMap;
    }
}

package com.sobolaw.api.controller;

import com.sobolaw.api.entity.PrecedentSummary;
import com.sobolaw.api.model.dto.ChatBotResponseDTO;
import com.sobolaw.api.service.AIService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "AIController", description = "GPT3.5-turbo를 이용한 기능 담당")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping
public class AIController {

    private final AIService aiService;

    @Operation(summary = "판례 내용 요약 기능", description = "판례번호를 받아서 해당 판례의 요약을 반환")
    @ApiResponse(responseCode = "201", description = "요약 성공",
        content = @Content(examples = {
            @ExampleObject(value = "{\"precedentId\":10, \"summary\":\"[요약]\"}")
        }, mediaType = "application/json"))
    @GetMapping("/summarys/{precedentId}")
    public ResponseEntity<?> summary(@PathVariable("precedentId") Long precedentId) {
        PrecedentSummary precedentSummary = aiService.getSummary(precedentId);
        return ResponseEntity.status(201).body(precedentSummary);
    }

    /**
     * 챗봇에게 질문 하기. gpt-3.5-turbo.
     */
    @PostMapping("/chat-bot")
    @ApiResponse(responseCode = "201", description = "문답 성공",
        content = @Content(examples = {
            @ExampleObject(value = "{\"message\":\"[GPT4의 답변#####################################]\"}")
        }, mediaType = "application/json"))
    @Operation(summary = "챗봇 기능", description = "전달받은 message를 GPT4에게 전달하고, 답변을 응답.")
    public ResponseEntity<Map<String, Object>> chat(@RequestBody ChatBotResponseDTO chatBotResponseDTO) {
        log.info("param :: " + chatBotResponseDTO.toString());
        Map<String, Object> result = aiService.chat(chatBotResponseDTO);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}

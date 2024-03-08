package com.sobolaw.api.controller;

import com.sobolaw.api.entity.PrecedentSummary;
import com.sobolaw.api.model.dto.Message;
import com.sobolaw.api.service.AIService;
import com.sobolaw.feign.service.LawServiceClient;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Tag(name = "AIController", description = "GPT4를 이용한 기능 담당")
@RestController
@RequiredArgsConstructor
@RequestMapping
public class AIController {

    private final AIService aiService;

    @Operation(summary = "판례 내용 요약 기능", description="판례번호를 받아서 해당 판례의 요약을 반환")
    @ApiResponse(responseCode = "201", description = "요약 성공",
            content = @Content(examples = {
                    @ExampleObject(value = "{\"precedentId\":10, \"summary\":\"[요약]\"}")
            }, mediaType = "application/json"))
    @GetMapping("/summarys/{precedentId}")
    public ResponseEntity<?> summary(@PathVariable("precedentId") Long precedentId){
        PrecedentSummary precedentSummary = aiService.getSummary(precedentId);
        return ResponseEntity.status(201).body(precedentSummary);
    }

    @Operation(summary = "챗봇 기능", description="전달받은 message를 GPT4에게 전달하고, 답변을 응답.")
    @ApiResponse(responseCode = "201", description = "문답 성공",
            content = @Content(examples = {
                            @ExampleObject(value = "{\"message\":\"[GPT4의 답변#####################################]\"}")
                    }, mediaType = "application/json"))
    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody Message message){
        // GPT4 호출 해서 message 전달
        String answer = aiService.chat(message.getMessage());
        Message data = new Message();
        data.setMessage(answer);
        return ResponseEntity.status(201).body(data);
    }

}

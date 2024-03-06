package com.sobolaw.api.controller;

import com.sobolaw.api.model.dto.Message;
import com.sobolaw.feign.dto.PrecedentSummaryDto;
import com.sobolaw.feign.service.LawServiceClient;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "AIController", description = "GPT4를 이용한 기능 담당")
@RestController
@RequiredArgsConstructor
@RequestMapping
public class AIController {

    private final LawServiceClient lawServiceClient;

    @Operation(summary = "판례 내용 요약 기능", description="판례번호를 받아서 해당 판례의 요약을 반환")
    @ApiResponse(responseCode = "201", description = "요약 성공",
            content = @Content(examples = {
                    @ExampleObject(value = "{\"id\":10, \"summaryShort\":\"[짧은 요약]\", \"summaryLong\":\"[긴 요약]\"}")
            }, mediaType = "application/json"))
    @GetMapping("/summarys/{precedentId}")
    public ResponseEntity<?> summary(@PathVariable("precedentId") Long precedentId){
        PrecedentSummaryDto summary = lawServiceClient.getSummary(precedentId);
        if(summary == null){
            // GPT4 API 호출해서 요약
            // summary 저장
        }
        return ResponseEntity.status(201).body(summary);
    }

    @Operation(summary = "챗봇 기능", description="전달받은 message를 GPT4에게 전달하고, 답변을 응답.")
    @ApiResponse(responseCode = "201", description = "문답 성공",
            content = @Content(examples = {
                            @ExampleObject(value = "{\"message\":\"[GPT4의 답변#####################################]\"}")
                    }, mediaType = "application/json"))
    @PostMapping("/chat")
    public ResponseEntity<?> chat(@RequestBody Message message){
        // GPT4 호출 해서 message 전달
        Message answer = new Message();
        answer.setMessage("[GPT4의 답변#####################################]");
        return ResponseEntity.status(201).body(answer);
    }

}

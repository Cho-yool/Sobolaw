package com.sobolaw.chatbot.controller;

import com.sobolaw.chatbot.dto.response.ChatBotResponseDTO;
import com.sobolaw.chatbot.service.ChatBotService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 챗봇 controller.
 */
@Slf4j
@RestController
@RequestMapping("/chat-bot")
@RequiredArgsConstructor
public class ChatBotController {

    private final ChatBotService chatBotService;

    /**
     * [API] 최신 ChatGPT 프롬프트 명령어를 수행합니다. : gpt-4, gpt-4 turbo, gpt-3.5-turbo.
     *
     */
    @PostMapping("/prompt")
    public ResponseEntity<Map<String, Object>> selectPrompt(@RequestBody ChatBotResponseDTO chatBotResponseDTO) {
        log.debug("param :: " + chatBotResponseDTO.toString());
        Map<String, Object> result = chatBotService.prompt(chatBotResponseDTO);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}

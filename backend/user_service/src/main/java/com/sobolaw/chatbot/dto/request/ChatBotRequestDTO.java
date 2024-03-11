package com.sobolaw.chatbot.dto.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatBotRequestDTO {

    private String role;

    private String content;

    @Builder
    public ChatBotRequestDTO(String role, String content) {
        this.role = role;
        this.content = content;
    }
}

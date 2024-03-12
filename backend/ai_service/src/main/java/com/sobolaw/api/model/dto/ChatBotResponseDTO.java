package com.sobolaw.api.model.dto;

import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * ChatBot Output DTO.
 */
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatBotResponseDTO {

    private String model;

    private List<MessageRequestDTO> messages;

    @Builder
    public ChatBotResponseDTO(String model, List<MessageRequestDTO> messages) {
        this.model = model;
        this.messages = messages;
    }
}

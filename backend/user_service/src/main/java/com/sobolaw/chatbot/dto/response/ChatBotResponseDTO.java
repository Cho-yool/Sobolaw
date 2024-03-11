package com.sobolaw.chatbot.dto.response;

import com.sobolaw.chatbot.dto.request.ChatBotRequestDTO;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.aspectj.bridge.Message;

@Data
@NoArgsConstructor
public class ChatBotResponseDTO {

    private String model;

    private List<ChatBotRequestDTO> messages;

    @Builder
    public ChatBotResponseDTO(String model, List<ChatBotRequestDTO> messages) {
        this.model = model;
        this.messages = messages;
    }
}

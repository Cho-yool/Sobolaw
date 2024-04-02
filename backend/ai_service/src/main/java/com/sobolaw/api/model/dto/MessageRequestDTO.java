package com.sobolaw.api.model.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * ChatBot 요청내 message DTO.
 */
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MessageRequestDTO {

    private String role;

    private String content;

    @Builder
    public MessageRequestDTO(String role, String content) {
        this.role = role;
        this.content = content;
    }
}

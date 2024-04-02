package com.sobolaw.api.model.dto;

import com.sobolaw.feign.dto.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDto {

    private long commentId;
    private long boardId;
    private Member member;
    private String content;
    private LocalDateTime createdTime;
}

package com.sobolaw.api.model.dto;

import com.sobolaw.feign.dto.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponseDto {

    private long boardId;
    private Member member;
    private String title;
    private String content;
    private long hit;
    private LocalDateTime createdTime;
    private boolean isPublic;
    private List<CommentResponseDto> comments;

}

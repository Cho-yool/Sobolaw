package com.sobolaw.api.controller;

import com.sobolaw.api.model.dto.CommentResponseDto;
import com.sobolaw.api.model.entity.Comment;
import com.sobolaw.api.service.BoardService;
import com.sobolaw.feign.dto.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "CommentController", description = "댓글 관련 기능")
@RestController
@RequiredArgsConstructor
@RequestMapping("/comments")
public class CommentController {

    private final BoardService boardService;

    @PostMapping
    @Operation(summary = "댓글 생성")
    public BaseResponse<?> registerBoard(@RequestBody Comment comment) {
        CommentResponseDto data = boardService.registerComment(comment);
        return new BaseResponse<>(201, "댓글 생성 성공", data);
    }

    @PatchMapping
    @Operation(summary = "댓글 수정")
    public BaseResponse<?> updateBoard(@RequestBody Comment comment) {
        CommentResponseDto data = boardService.updateComment(comment);
        if (data == null) return new BaseResponse<>(404, "댓글을 찾을 수 없습니다", null);
        return new BaseResponse<>(200, "댓글 수정 성공", data);
    }

    @DeleteMapping("/{commentId}")
    @Operation(summary = "댓글 삭제")
    public BaseResponse<?> deleteBoard(@PathVariable("commentId") long commentId) {
        boardService.deleteComment(commentId);
        return new BaseResponse<>(200, "댓글 삭제 성공", null);
    }


}

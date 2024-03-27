package com.sobolaw.api.controller;

import com.sobolaw.api.model.dto.BoardResponseDto;
import com.sobolaw.api.model.entity.Board;
import com.sobolaw.api.service.BoardService;
import com.sobolaw.feign.dto.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "BoardController", description = "게시판 관련 기능")
@RestController
@RequiredArgsConstructor
@RequestMapping("/boards")
public class BoardController {

    private final BoardService boardService;

    @GetMapping
    @Operation(summary = "게시판 목록 조회")
    public BaseResponse<?> getBoardList() {
        List<BoardResponseDto> data = boardService.getBoardList();
        return new BaseResponse<>(200, "게시물 리스트 반환 성공", data);
    }

    @GetMapping("/{boardId}")
    @Operation(summary = "게시판 상세 조회")
    public BaseResponse<?> getBoard(@PathVariable("boardId") long boardId) {
        BoardResponseDto data = boardService.getBoard(boardId);
        if (data == null) return new BaseResponse<>(404, "게시물을 찾을 수 없습니다", null);
        return new BaseResponse<>(200, "게시물 반환 성공", data);
    }

    @PostMapping
    @Operation(summary = "게시물 생성")
    public BaseResponse<?> registerBoard(@RequestBody Board board) {
        BoardResponseDto data = boardService.registerBoard(board);
        return new BaseResponse<>(201, "게시물 생성 성공", data);
    }

    @PatchMapping
    @Operation(summary = "게시물 수정")
    public BaseResponse<?> updateBoard(@RequestBody Board board) {
        BoardResponseDto data = boardService.updateBoard(board);
        if (data == null) return new BaseResponse<>(404, "게시물을 찾을 수 없습니다", null);
        return new BaseResponse<>(200, "게시물 수정 성공", data);
    }

    @DeleteMapping("/{boardId}")
    @Operation(summary = "게시물 삭제")
    public BaseResponse<?> deleteBoard(@PathVariable("boardId") long boardId) {
        boardService.deleteBoard(boardId);
        return new BaseResponse<>(200, "게시물 삭제 성공", null);
    }


}

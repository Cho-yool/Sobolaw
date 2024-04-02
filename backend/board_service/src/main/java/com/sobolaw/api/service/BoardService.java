package com.sobolaw.api.service;

import com.sobolaw.api.model.dto.BoardResponseDto;
import com.sobolaw.api.model.dto.CommentResponseDto;
import com.sobolaw.api.model.entity.Board;
import com.sobolaw.api.model.entity.Comment;
import com.sobolaw.api.repository.BoardRepository;
import com.sobolaw.api.repository.CommentRepository;
import com.sobolaw.feign.dto.BaseResponse;
import com.sobolaw.feign.dto.Member;
import com.sobolaw.feign.dto.Notification;
import com.sobolaw.feign.service.NotificationServiceClient;
import com.sobolaw.feign.service.UserServiceClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardService {

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final UserServiceClient userServiceClient;
    private final NotificationServiceClient notificationServiceClient;

    // ---------------------------------Board-------------------------------------
    public List<BoardResponseDto> getBoardList() {
        List<Board> boards = boardRepository.findAllByOrderByCreatedTimeDesc();

        List<BoardResponseDto> list = new ArrayList<>();
        for (Board board : boards) list.add(changeBoard(board));
        return list;
    }

    @Transactional
    public BoardResponseDto getBoard(long boardId) {
        Board board = boardRepository.findByBoardId(boardId, Board.class).orElse(null);
        if (board == null) return null;
        board.setHit(board.getHit() + 1);
        List<CommentResponseDto> list = new ArrayList<>();
        for (Comment comment : board.getComments()) {
            list.add(changeComment(comment));
        }
        BoardResponseDto boardResponseDto = changeBoard(board);
        boardResponseDto.setComments(list);
        return boardResponseDto;
    }

    public BoardResponseDto registerBoard(Board board) {
        return changeBoard(boardRepository.save(board));
    }

    @Transactional
    public BoardResponseDto updateBoard(Board board) {
        Board data = boardRepository.findByBoardId(board.getBoardId(), Board.class).orElse(null);
        if (data == null) return null;
        if (board.getTitle() != null && !board.getTitle().isEmpty()) data.setTitle(board.getTitle());
        if (board.getContent() != null && !board.getContent().isEmpty()) data.setContent(board.getContent());
        return changeBoard(data);
    }

    @Transactional
    public void deleteBoard(long boardId) {
        Board data = boardRepository.findByBoardId(boardId, Board.class).orElse(null);
        if (data == null) return;
        data.softDelete();
    }

    // ---------------------------------Comment-------------------------------------

    public CommentResponseDto registerComment(Comment comment) {
        Board board = boardRepository.findByBoardId(comment.getBoardId(), Board.class).orElse(null);
        if(board == null){
            return null;
        }
        else{
            BaseResponse<Notification> response = notificationServiceClient.sendNotification(new Notification(board.getMemberId(),
                    "댓글 생성 알림", "["+board.getTitle()+"] 상담글에 답변이 작성되었습니다."));
            log.info("notificationServiceClient response: {}", response);
            return changeComment(commentRepository.save(comment));
        }
    }

    @Transactional
    public CommentResponseDto updateComment(Comment comment) {
        Comment data = commentRepository.findById(comment.getCommentId()).orElse(null);
        if (data == null) return null;
        if (comment.getContent() != null && !comment.getContent().isEmpty()) data.setContent(comment.getContent());
        return changeComment(data);
    }

    @Transactional
    public void deleteComment(long commentId) {
        Comment data = commentRepository.findById(commentId).orElse(null);
        if (data == null) return;
        data.softDelete();
    }


    // ------------------------------Util-----------------------------------------

    public BoardResponseDto changeBoard(Board board) {
        Member member = null;
        try{
            member = userServiceClient.getMember(board.getMemberId()).getData();
        }catch (Exception e){
            member = new Member(-1, "***", "ROLE_USER");
        }
            return new BoardResponseDto(board.getBoardId(), member, board.getTitle(), board.getContent(), board.getHit(), board.getCreatedTime(), board.isPublic(), null);
    }

    public CommentResponseDto changeComment(Comment comment) {
        Member member = null;
        try {
            member = userServiceClient.getMember(comment.getMemberId()).getData();
        }catch (Exception e){
            member = new Member(-1, "***", "ROLE_USER");
        }
        return new CommentResponseDto(comment.getCommentId(), comment.getBoardId(), member, comment.getContent(), comment.getCreatedTime());
    }


}

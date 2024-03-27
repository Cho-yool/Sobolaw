package com.sobolaw.api.repository;

import com.sobolaw.api.model.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    <T> Optional<T> findByBoardId(long boardId, Class<T> type);

    List<Board> findAllByOrderByCreatedTimeDesc();

}

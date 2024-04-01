package com.sobolaw.api.term.repository;

import com.sobolaw.api.term.entity.Term;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TermRepository extends JpaRepository<Term, Long> {

    // 중복 없이 모든 용어명을 조회하는 쿼리
    @Query("SELECT DISTINCT lt.termName FROM legal_term lt")
    List<String> findAllDistinctTermNames();
}

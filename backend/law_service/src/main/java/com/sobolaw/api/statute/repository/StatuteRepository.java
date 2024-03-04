package com.sobolaw.api.statute.repository;

import com.sobolaw.api.statute.entity.Statute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatuteRepository extends JpaRepository<Statute, Long> {

    @Query(value = "SELECT s.statute_id, s.statute_name, st.article_title, st.article_content " +
            "FROM statute s " +
            "JOIN statute_text st ON s.statute_id = st.statute_id " +
            "WHERE s.statute_name LIKE %:searchKeyword%", nativeQuery = true)
    List<Object[]> getSearchStatute(String searchKeyword);
}

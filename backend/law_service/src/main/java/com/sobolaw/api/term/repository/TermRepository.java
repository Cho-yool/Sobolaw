package com.sobolaw.api.term.repository;

import com.sobolaw.api.term.entity.Term;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TermRepository extends JpaRepository<Term, Long> {

    List<Term> findByTermNameContaining(String searchKeyword);

}

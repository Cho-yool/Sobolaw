package com.sobolaw.api.term.repository;

import com.sobolaw.api.term.entity.LegalTerm;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LegalTermRepository extends JpaRepository<LegalTerm, Long> {

    List<LegalTerm> findByTermNameContaining(String searchKeyword);

}

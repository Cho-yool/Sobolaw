package com.sobolaw.api.statute.repository;

import com.sobolaw.api.statute.entity.Statute;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatuteRepository extends JpaRepository<Statute, Long> {

    List<Statute> findByStatuteNameContaining(String searchKeyword);

}

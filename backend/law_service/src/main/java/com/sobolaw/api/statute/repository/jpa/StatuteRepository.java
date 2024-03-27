package com.sobolaw.api.statute.repository.jpa;

import com.sobolaw.api.statute.entity.Statute;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatuteRepository extends JpaRepository<Statute, Long> {
    // 법령 상세 조회
    Optional<Statute> findByStatuteNumber(Long statuteNumber);
}

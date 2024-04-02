package com.sobolaw.api.statute.repository;

import com.sobolaw.api.precedent.entity.Precedent;
import com.sobolaw.api.statute.entity.Statute;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatuteRepository extends JpaRepository<Statute, Long> {
    // 법령 상세 조회
    Optional<Statute> findByStatuteNumber(Long statuteNumber);

    // 법령 조회순 20개
    List<Statute> findTop20ByOrderByHitDesc();
}

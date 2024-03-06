package com.sobolaw.lawsuit.repository;

import com.sobolaw.lawsuit.entity.LawsuitDefamation;
import com.sobolaw.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 명예훼손 소장 repository.
 */
@Repository
public interface LawsuitDefamationRepository extends JpaRepository<LawsuitDefamation, Long> {

    Optional<LawsuitDefamation> findByMemberAndLawsuitDefamationId(Member member, Long lawsuitId);

    List<LawsuitDefamation> findByMember(Member member);
}
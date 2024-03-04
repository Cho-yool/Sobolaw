package com.sobolaw.lawsuit.repository;

import com.sobolaw.lawsuit.entity.LawsuitDefamation;
import com.sobolaw.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 소장 repository.
 */
public interface LawsuitDefamationRepository extends JpaRepository<LawsuitDefamation, Long> {

    List<LawsuitDefamation> findByMember_memberId(Long memberId);

    LawsuitDefamation findByMember_memberIdAndLawsuitDefamationId(Long memberId, Long lawsuitId);
}
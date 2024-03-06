package com.sobolaw.lawsuit.repository;

import com.sobolaw.lawsuit.entity.LawsuitFraud;
import com.sobolaw.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 사기죄 소장 repository.
 */
@Repository
public interface LawsuitFraudRepository extends JpaRepository<LawsuitFraud, Long> {

    List<LawsuitFraud> findByMember(Member member);

    Optional<LawsuitFraud> findByMemberAndLawsuitFraudId(Member member, Long fraudId);
}
package com.sobolaw.member.repository;

import com.sobolaw.member.entity.Member;
import com.sobolaw.member.entity.MemberPrecedent;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 멤버 최근 본 판례 repository.
 */
@Repository
public interface MemberPrecedentRepository extends JpaRepository<MemberPrecedent, Long> {

    Optional<MemberPrecedent> findByMemberAndMemberPrecedentId(Member member, Long precedentId);
}
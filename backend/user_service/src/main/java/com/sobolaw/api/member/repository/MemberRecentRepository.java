package com.sobolaw.api.member.repository;

import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.entity.MemberRecent;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 멤버 최근 본 판례 repository.
 */
@Repository
public interface MemberRecentRepository extends JpaRepository<MemberRecent, Long> {

    Optional<MemberRecent> findByPrecedentIdAndMember(Long precedentId, Member member);
}
package com.sobolaw.member.repository;

import com.sobolaw.member.entity.Member;
import com.sobolaw.member.entity.MemberRecent;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 멤버 최근 본 판례 repository.
 */
public interface MemberRecentRepository extends JpaRepository<MemberRecent, Long> {

    Optional<MemberRecent> findByMemberIdAndRecentPrecedentId(Member member, Long recentId);
}
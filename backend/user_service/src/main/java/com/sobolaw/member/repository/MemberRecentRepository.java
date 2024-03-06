package com.sobolaw.member.repository;

import com.sobolaw.member.entity.Member;
import com.sobolaw.member.entity.MemberRecent;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 멤버 최근 본 판례 repository.
 */
@Repository
public interface MemberRecentRepository extends JpaRepository<MemberRecent, Long> {

    Optional<MemberRecent> findByMemberAndRecentPrecedentId(Member member, Long recentId);
}
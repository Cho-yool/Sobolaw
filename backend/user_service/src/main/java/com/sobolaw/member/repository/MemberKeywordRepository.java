package com.sobolaw.member.repository;

import com.sobolaw.member.entity.Member;
import com.sobolaw.member.entity.MemberKeyword;
import com.sobolaw.member.entity.MemberPrecedent;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 멤버 관심키워드 repository.
 */
public interface MemberKeywordRepository extends JpaRepository<MemberKeyword, Long> {

    Optional<MemberKeyword> findByMemberIdAndMemberKeywordId(Member member, Long keywordId);
}
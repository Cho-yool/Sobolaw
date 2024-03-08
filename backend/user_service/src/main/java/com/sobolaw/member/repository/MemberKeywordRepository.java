package com.sobolaw.member.repository;

import com.sobolaw.member.entity.Member;
import com.sobolaw.member.entity.MemberKeyword;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 멤버 관심키워드 repository.
 */
@Repository
public interface MemberKeywordRepository extends JpaRepository<MemberKeyword, Long> {

    Optional<MemberKeyword> findByMemberAndMemberKeywordId(Member member, Long keywordId);

    Optional<MemberKeyword> findByMemberKeywordId(Long memberKeywordId);

    MemberKeyword findByMemberPrecedent_MemberPrecedentId(Long precedentId);
}
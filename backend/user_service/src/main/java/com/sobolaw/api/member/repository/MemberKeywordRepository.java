package com.sobolaw.api.member.repository;

import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.entity.MemberKeyword;
import com.sobolaw.api.member.entity.MemberPrecedent;
import java.util.List;
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

    MemberKeyword findByMemberPrecedent(MemberPrecedent memberPrecedent);

    List<MemberKeyword> findByMember(Member member);
}
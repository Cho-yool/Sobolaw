package com.sobolaw.api.member.repository;

import com.sobolaw.api.member.entity.MemberPrecedent;
import com.sobolaw.api.member.entity.MemberPrecedentHighlight;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 멤버 최근 본 판례의 하이라이트 repository.
 */
@Repository
public interface MemberPrecedentHighlightRepository extends JpaRepository<MemberPrecedentHighlight, Long> {

    List<MemberPrecedentHighlight> findListByMemberPrecedent(MemberPrecedent memberPrecedent);
}
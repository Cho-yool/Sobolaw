package com.sobolaw.member.repository;

import com.sobolaw.member.entity.MemberPrecedent;
import com.sobolaw.member.entity.MemberPrecedentHighlight;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 멤버 최근 본 판례의 하이라이트 repository.
 */
public interface MemberPrecedentHighlightRepository extends JpaRepository<MemberPrecedentHighlight, Long> {

}
package com.sobolaw.member.repository;

import com.sobolaw.member.entity.MemberPrecedentHighlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 멤버 최근 본 판례의 하이라이트 repository.
 */
@Repository
public interface MemberPrecedentHighlightRepository extends JpaRepository<MemberPrecedentHighlight, Long> {

}
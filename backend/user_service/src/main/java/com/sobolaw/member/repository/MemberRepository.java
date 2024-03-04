package com.sobolaw.member.repository;

import com.sobolaw.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 멤버 repository.
 */
public interface MemberRepository extends JpaRepository<Member, Long> {

}
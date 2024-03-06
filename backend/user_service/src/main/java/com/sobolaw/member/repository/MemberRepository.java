package com.sobolaw.member.repository;

import com.sobolaw.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 멤버 repository.
 */
@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

}
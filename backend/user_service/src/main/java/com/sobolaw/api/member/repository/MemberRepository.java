package com.sobolaw.api.member.repository;

import com.sobolaw.api.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 멤버 repository.
 */
@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByName(String name);

    Optional<Member> findByEmail(String email);
}
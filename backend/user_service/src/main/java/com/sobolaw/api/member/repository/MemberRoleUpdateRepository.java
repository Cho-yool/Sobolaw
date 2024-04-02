package com.sobolaw.api.member.repository;

import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.entity.MemberRoleUpdateRequest;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 멤버 권한 변경 요청 repository.
 */
public interface MemberRoleUpdateRepository extends JpaRepository<MemberRoleUpdateRequest, Long> {

    MemberRoleUpdateRequest findByMember(Member member);
}

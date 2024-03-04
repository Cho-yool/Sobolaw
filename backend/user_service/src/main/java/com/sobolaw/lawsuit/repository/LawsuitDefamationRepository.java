package com.sobolaw.lawsuit.repository;

import com.sobolaw.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 소장 repository.
 */
public interface LawsuitDefamationRepository extends JpaRepository<Member, Long> {

}
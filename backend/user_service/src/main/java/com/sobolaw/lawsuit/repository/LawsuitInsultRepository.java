package com.sobolaw.lawsuit.repository;

import com.sobolaw.lawsuit.entity.LawsuitInsult;
import com.sobolaw.member.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 모욕죄 소장 repository.
 */
@Repository
public interface LawsuitInsultRepository extends JpaRepository<LawsuitInsult, Long> {

    List<LawsuitInsult> findByMember(Member member);

    Optional<LawsuitInsult> findByMemberAndLawsuitInsultId(Member member, Long insultId);

}
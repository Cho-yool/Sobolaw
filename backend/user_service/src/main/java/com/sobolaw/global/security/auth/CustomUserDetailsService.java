package com.sobolaw.global.security.auth;

import com.sobolaw.api.member.dto.MemberDTO;
import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.exception.MemberErrorCode;
import com.sobolaw.api.member.exception.MemberException;
import com.sobolaw.api.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Security User 정보를 관리하는 클래스.
 */
@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {

        log.info("loginId : {}", memberId);

        Member member = memberRepository.findById(Long.parseLong(memberId))
            .orElseThrow(() ->
                new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        return new CustomUserDetails(member);
    }

}

package com.sobolaw.api.member.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.repository.MemberRepository;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OAuth2MemberService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(request);
        String oauthClientName = request.getClientRegistration().getClientName();

        try {
            System.out.println(" ObjectMapper().oAuth2User = " + new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
        } catch (Exception e) {
//            throw new RuntimeException(e);
            e.printStackTrace();
        }

        Member member = null;

        if (oauthClientName.equals("kakao")) {
            member = Member.of(
                oAuth2User.getAttribute("properties.nickname"),
                oAuth2User.getAttribute("kakao_account.email"),
                null);
            memberRepository.save(member);
        }

        if (oauthClientName.equals("naver")) {
            LocalDate birthday = LocalDate.parse(oAuth2User.getAttribute("birthyear") + "-" + oAuth2User.getAttribute("birthday"));
            member = Member.of(
                oAuth2User.getAttribute("name"),
                oAuth2User.getAttribute("email"),
                birthday);
            memberRepository.save(member);
        }



        return oAuth2User;
    }

    private Member getOrSave(OAuth2UserInfo oAuth2UserInfo) {
        Member member = memberRepository.findByEmail(oAuth2UserInfo.email)
            .orElseGet(oAuth2UserInfo::toEntity);
        return memberRepository.save(member);
    }


}

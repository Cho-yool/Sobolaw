package com.sobolaw.global.security.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.repository.MemberRepository;
import com.sobolaw.global.security.auth.OAuth2UserInfoDTO;
import java.time.LocalDate;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2MemberService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(request);
        log.info("oAuth2User = " + oAuth2User);
        Map<String, Object> oAuth2UserAttributes = oAuth2User.getAttributes();
        log.info("oAuth2UserAttributes = " + oAuth2UserAttributes);

        String oauthClientName = request.getClientRegistration().getClientName();

        try {
            log.info(" oAuth2User = " + new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
        } catch (Exception e) {
//            throw new RuntimeException(e);
            e.printStackTrace();
        }

        String userNameAttributeName = request.getClientRegistration().getProviderDetails()
            .getUserInfoEndpoint().getUserNameAttributeName();
        log.info ("userNameAttributeName = " + userNameAttributeName);

        OAuth2UserInfoDTO oAuth2UserInfoDTO = OAuth2UserInfoDTO.of(oauthClientName, oAuth2UserAttributes);
        log.info("oAuth2UserInfoDTO = " + oAuth2UserInfoDTO);

        Member member = getOrSave(oAuth2UserInfoDTO);
        log.info("member = " + member);

        return new CustomUserDetails(member, oAuth2UserAttributes, userNameAttributeName);
    }

    private Member getOrSave(OAuth2UserInfoDTO oAuth2UserInfo) {
        Member member = memberRepository.findByEmail(oAuth2UserInfo.email())
            .orElseGet(oAuth2UserInfo::toEntity);
        return memberRepository.save(member);
    }

}

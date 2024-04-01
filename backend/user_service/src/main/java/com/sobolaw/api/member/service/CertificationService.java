package com.sobolaw.api.member.service;

import com.sobolaw.api.member.dto.response.MemberRoleUpdateDetailResponseDTO;
import com.sobolaw.api.member.dto.response.RoleUpdateResponseDTO;
import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.entity.MemberRoleUpdateRequest;
import com.sobolaw.api.member.entity.Type.RoleType;
import com.sobolaw.api.member.exception.CertificationErrorCode;
import com.sobolaw.api.member.exception.CertificationException;
import com.sobolaw.api.member.repository.MemberRepository;
import com.sobolaw.api.member.repository.MemberRoleUpdateRepository;
import com.sobolaw.global.security.jwt.JwtProvider;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 등업 요청을 관리하기 위한 서비스.
 */
@AllArgsConstructor
@Slf4j
@Service
public class CertificationService {

    private final MemberRoleUpdateRepository memberRoleUpdateRepository;
    private final MemberRepository memberRepository;
    private final JwtProvider jwtProvider;

    /**
     * 유효성 검사 후 MentorRoleUpdateRequest 저장.
     */
    @Transactional
    public void saveLawyer(String originalFile, String savedFile) {
        Member member = memberRepository.findById(jwtProvider.getMemberId()).orElseThrow(
            () -> new CertificationException(CertificationErrorCode.NOT_FOUND_MEMBER)
        );

        MemberRoleUpdateRequest memberRoleUpdateRequest
            = MemberRoleUpdateRequest.of(member, originalFile, savedFile);
        memberRoleUpdateRepository.save(memberRoleUpdateRequest);
        log.info("등업 요청 생성");
        member.setRole(RoleType.ROLE_WAITING);
        log.info("멤버 waiting 설정 완");
        memberRepository.save(member);
    }

    /**
     * ROLE_ADMIN 을 가진 관리자 계정만 사용가능 memberId로 가져온 뒤 Role 을 update 함.
     */
    @Transactional
    public RoleUpdateResponseDTO updateRole(Long memberId, RoleType role) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new CertificationException(CertificationErrorCode.NOT_FOUND_MEMBER)
            );
        if (isAuthorizedForRoleChange()) {
            member.setRole(role);
        } else {
            throw new CertificationException(CertificationErrorCode.NO_AUTHORITY);
        }
        return RoleUpdateResponseDTO.of(memberId, role);
    }

    /**
     * 멘토 등업 리스트 전체 조회.
     */
    @Transactional(readOnly = true)
    public List<MemberRoleUpdateRequest> findLawyerAll() {
        if (isAuthorizedForRoleChange()) {
            log.info("권한 여부 : " + isAuthorizedForRoleChange());
            throw new CertificationException(CertificationErrorCode.NO_AUTHORITY);
        }
        return memberRoleUpdateRepository.findAll();
    }


    /**
     * 멘토 등업 요청 상세 조회.
     */
    @Transactional(readOnly = true)
    public MemberRoleUpdateDetailResponseDTO findLawyerUpdateRequestDto(Long articleId) {
        if (isAuthorizedForRoleChange()) {
            throw new CertificationException(CertificationErrorCode.NO_AUTHORITY);
        }
        MemberRoleUpdateRequest request = memberRoleUpdateRepository.findById(articleId).orElseThrow(
            () -> new CertificationException(CertificationErrorCode.NO_ARTICLE)
        );
        return MemberRoleUpdateDetailResponseDTO.of(articleId, request.getMember().getName(), request.getBelongDocumentPath());
    }


    /**
     * 멘토 등업 글로부터 유저 아이디를 가져온다.
     */
    @Transactional(readOnly = true)
    public Long findLawyerIdByArticleId(Long articleId) {
        MemberRoleUpdateRequest memberRoleUpdateRequest = memberRoleUpdateRepository.findById(articleId).orElseThrow(
            () -> new CertificationException(CertificationErrorCode.NO_ARTICLE)
        );
        return memberRoleUpdateRequest.getMember().getMemberId();
    }

    /**
     * 멘토 요청이 완료되거나 거절시 삭제.
     */
    @Transactional
    public void deleteLawyerArticleByArticleId(Long articleId) {
        MemberRoleUpdateRequest memberRoleUpdateRequest = memberRoleUpdateRepository.findById(articleId)
            .orElseThrow(() -> new CertificationException(CertificationErrorCode.NO_ARTICLE));
        memberRoleUpdateRequest.softDelete();
        memberRoleUpdateRepository.save(memberRoleUpdateRequest);
    }

    /**
     * ADMIN 유저만 role을 변경할 수 있다.
     */
    private boolean isAuthorizedForRoleChange() {
        Long currentMemberId = jwtProvider.getMemberId();
        Member currentMember = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new CertificationException(CertificationErrorCode.NOT_FOUND_MEMBER));
        RoleType userRole = currentMember.getRole();

        return userRole != RoleType.ROLE_ADMIN;
    }

}

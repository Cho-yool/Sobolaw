package com.sobolaw.member.service;

import com.sobolaw.feign.service.LawServiceClient;
import com.sobolaw.member.dto.MemberDTO;
import com.sobolaw.member.dto.MemberKeywordDTO;
import com.sobolaw.member.dto.MemberPrecedentDTO;
import com.sobolaw.member.dto.MemberPrecedentHighlightDTO;
import com.sobolaw.member.dto.MemberRecentDTO;
import com.sobolaw.member.entity.Member;
import com.sobolaw.member.entity.MemberKeyword;
import com.sobolaw.member.entity.MemberPrecedent;
import com.sobolaw.member.entity.MemberRecent;
import com.sobolaw.member.exception.MemberErrorCode;
import com.sobolaw.member.exception.MemberException;
import com.sobolaw.member.repository.MemberKeywordRepository;
import com.sobolaw.member.repository.MemberPrecedentHighlightRepository;
import com.sobolaw.member.repository.MemberPrecedentRepository;
import com.sobolaw.member.repository.MemberRecentRepository;
import com.sobolaw.member.repository.MemberRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 멤버 Service.
 */
@Service
@Transactional
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberPrecedentRepository memberPrecedentRepository;
    private final MemberRecentRepository memberRecentRepository;
    private final MemberKeywordRepository memberKeywordRepository;
    private final MemberPrecedentHighlightRepository memberPrecedentHighlightRepository;
    private final LawServiceClient lawServiceClient;

    /**
     * 멤버 정보.
     *
     * @param memberId 멤버Id
     * @return 멤버 정보들.
     */
    public MemberDTO getMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        return MemberDTO.from(member);
    }

    /**
     * 멤버의 최근 본 판례들.
     *
     * @param memberId 멤버Id
     * @return 최근 본 판례 리스트.
     */
    public List<MemberRecentDTO> getMemberRecents(Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        return member.getMemberRecents().stream()
            .map(MemberRecentDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 멤버의 관심 키워드들.
     *
     * @param memberId 멤버Id
     * @return 관심 키워드 리스트.
     */
    public List<MemberKeywordDTO> getMemberKeywords(Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        return member.getMemberKeyword().stream()
            .map(MemberKeywordDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 멤버가 저장한 판례들.
     *
     * @param memberId 멤버Id
     * @return 저장한 판례 리스트.
     */
    public List<MemberPrecedentDTO> getMemberPrecedents(Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        return member.getMemberPrecedents().stream()
            .map(MemberPrecedentDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 멤버의 저장 판례의 메모.
     *
     * @param memberId    멤버Id
     * @param precedentId 판례Id
     * @return 저장 판례의 하이라이트들.
     */
    public List<MemberPrecedentHighlightDTO> getMemberPrecedentHighlightsByPrecedentId(Long memberId, Long precedentId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        MemberPrecedent matchingPrecedent = memberPrecedentRepository.findByMemberAndMemberPrecedentId(member, precedentId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_PRECEDENT));

        return matchingPrecedent.getHighlights().stream()
            .map(MemberPrecedentHighlightDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 멤버의 특정 저장 판례.
     *
     * @param memberId    멤버Id
     * @param precedentId 판례Id
     * @return 특정 저장 판례.
     */
    public MemberPrecedentDTO getMemberPrecedentDetail(Long memberId, Long precedentId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        MemberPrecedent precedent = memberPrecedentRepository.findByMemberAndMemberPrecedentId(member, precedentId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_PRECEDENT));

        return MemberPrecedentDTO.from(precedent);
    }

    /**
     * 멤버의 특정 최근 본 판례 조회.
     *
     * @param memberId 멤버Id
     * @param recentId 최근 판례Id
     * @return 특정 최근 본 판례.
     */
    public MemberRecentDTO getMemberRecentDetail(Long memberId, Long recentId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        MemberRecent recent = memberRecentRepository.findByMemberAndRecentPrecedentId(member, recentId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_RECENT));

        return MemberRecentDTO.from(recent);
    }

//    public MemberRecentDTO getMemberRecentDetail(Long memberId, Long recentId) {
//        Member member = memberRepository.findById(memberId)
//            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));
//
//        MemberRecent recent = memberRecentRepository.findByMemberIdAndRecentPrecedentId(member, recentId)
//            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_RECENT));
//
//        // Law 서비스의 Feign Client를 이용하여 판례 데이터 가져오기
//        Long precedentId = recent.getPrecedentId();
//        LawDto lawDto = lawServiceClient.getLawById(precedentId);
//
//        // LawDto를 사용하여 MemberRecentDTO 생성
//        return MemberRecentDTO.from(recent, lawDto);
//    }

    /**
     * 멤버의 특정 관심키워드 조회.
     *
     * @param memberId  멤버 Id
     * @param keywordId 키워드 Id
     * @return 관심키워드.
     */
    public MemberKeywordDTO getMemberKeywordDetail(Long memberId, Long keywordId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        MemberKeyword keyword = memberKeywordRepository.findByMemberAndMemberKeywordId(member, keywordId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_KEYWORD));

        return MemberKeywordDTO.from(keyword);
    }


    /**
     * 멤버 전체 조회.
     */
    public List<MemberDTO> getAllMembers() {
        List<Member> members = memberRepository.findAll();
        return members.stream()
            .map(MemberDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 저장된 판례 전체 조회.
     */
    public List<MemberPrecedentDTO> getAllMemberPrecedents() {
        List<MemberPrecedent> allPrecedents = memberPrecedentRepository.findAll();
        return allPrecedents.stream()
            .map(MemberPrecedentDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 최근 본 판례 전체 조회.
     */
    public List<MemberRecentDTO> getAllMemberRecents() {
        List<MemberRecent> allRecents = memberRecentRepository.findAll();
        return allRecents.stream()
            .map(MemberRecentDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 관심 키워드 전체 조회.
     */
    public List<MemberKeywordDTO> getAllMemberKeywords() {
        List<MemberKeyword> allKeywords = memberKeywordRepository.findAll();
        return allKeywords.stream()
            .map(MemberKeywordDTO::from)
            .collect(Collectors.toList());
    }
}

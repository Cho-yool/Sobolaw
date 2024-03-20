package com.sobolaw.api.member.service;

import com.sobolaw.api.member.dto.MemberDTO;
import com.sobolaw.api.member.dto.MemberKeywordDTO;
import com.sobolaw.api.member.dto.MemberPrecedentDTO;
import com.sobolaw.api.member.dto.MemberPrecedentHighlightDTO;
import com.sobolaw.api.member.dto.MemberRecentDTO;
import com.sobolaw.api.member.dto.request.HighlightCreateUpdateRequestDTO;
import com.sobolaw.api.member.dto.request.KeywordSaveRequestDTO;
import com.sobolaw.api.member.dto.request.PrecedentSaveRequestDTO;
import com.sobolaw.api.member.dto.response.MemberResponseDTO;
import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.entity.MemberKeyword;
import com.sobolaw.api.member.entity.MemberPrecedent;
import com.sobolaw.api.member.entity.MemberPrecedentHighlight;
import com.sobolaw.api.member.entity.MemberRecent;
import com.sobolaw.api.member.entity.Type.KeywordType;
import com.sobolaw.api.member.exception.MemberErrorCode;
import com.sobolaw.api.member.exception.MemberException;
import com.sobolaw.api.member.repository.MemberKeywordRepository;
import com.sobolaw.api.member.repository.MemberPrecedentHighlightRepository;
import com.sobolaw.api.member.repository.MemberPrecedentRepository;
import com.sobolaw.api.member.repository.MemberRecentRepository;
import com.sobolaw.api.member.repository.MemberRepository;
import com.sobolaw.feign.dto.response.PrecedentKeywordResponseDTO;
import com.sobolaw.feign.dto.response.PrecedentListResponseDTO;
import com.sobolaw.feign.dto.response.PrecedentResponseDTO;
import com.sobolaw.feign.service.LawServiceClient;
import com.sobolaw.feign.service.RecommendServiceClient;
import com.sobolaw.global.common.response.BaseResponse;
import com.sobolaw.global.security.jwt.JwtProvider;
import com.sobolaw.global.security.jwt.RedisTokenService;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 멤버 Service.
 */
@Service
@Slf4j
@Transactional
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberPrecedentRepository memberPrecedentRepository;
    private final MemberRecentRepository memberRecentRepository;
    private final MemberKeywordRepository memberKeywordRepository;
    private final MemberPrecedentHighlightRepository memberPrecedentHighlightRepository;
    private final LawServiceClient lawServiceClient;
    private final RecommendServiceClient recommendServiceClient;
    private final JwtProvider jwtProvider;
    private final RedisTokenService redisTokenService;

    /**
     * 멤버 정보.
     *
     * @return 멤버 정보들.
     */
    public MemberResponseDTO getMember() {
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        return MemberResponseDTO.from(member);
    }

    /**
     * 멤버의 최근 본 판례들.
     *
     * @return 최근 본 판례 리스트.
     */
    public List<PrecedentListResponseDTO> getMemberRecents() {
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        List<Long> recentIds = member.getMemberRecents().stream().map(MemberRecent::getPrecedentId).toList();

        Map<String, List<Long>> requestBody = Collections.singletonMap("precedentId", recentIds);
        BaseResponse<List<PrecedentListResponseDTO>> baseResponse = lawServiceClient.getPrecedentList(requestBody);
        return baseResponse.getData();

    }

    /**
     * 멤버의 관심 키워드들.
     *
     * @return 관심 키워드 리스트.
     */
    public List<MemberKeywordDTO> getMemberKeywords() {
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        return member.getMemberKeyword().stream().map(MemberKeywordDTO::from).collect(Collectors.toList());
    }

    /**
     * 멤버가 저장한 판례들.
     *
     * @return 저장한 판례 리스트.
     */
    public List<PrecedentListResponseDTO> getMemberPrecedents() {
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        List<Long> precedentIds = member.getMemberPrecedents().stream().map(MemberPrecedent::getPrecedentId).toList();

        Map<String, List<Long>> requestBody = Collections.singletonMap("precedentId", precedentIds);
        BaseResponse<List<PrecedentListResponseDTO>> baseResponse = lawServiceClient.getPrecedentList(requestBody);
        return baseResponse.getData();
    }


    /**
     * 멤버의 저장 판례의 메모.
     *
     * @param precedentId 판례Id
     * @return 저장 판례의 하이라이트들.
     */
    public List<MemberPrecedentHighlightDTO> getMemberPrecedentHighlights(Long precedentId) {
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        MemberPrecedent matchingPrecedent = memberPrecedentRepository.findByMemberAndPrecedentId(member, precedentId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_PRECEDENT));

        return matchingPrecedent.getHighlights().stream().map(MemberPrecedentHighlightDTO::from).collect(Collectors.toList());
    }

    /**
     * 멤버의 특정 저장 판례.
     *
     * @param precedentId 판례Id
     * @return 특정 저장 판례.
     */
    public PrecedentResponseDTO getMemberPrecedentDetail(Long precedentId) {
        MemberPrecedent memberPrecedent = memberPrecedentRepository.findById(precedentId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_PRECEDENT));

        BaseResponse<PrecedentResponseDTO> baseResponse = lawServiceClient.getPrecedentDetail(memberPrecedent.getPrecedentId());
        return baseResponse.getData();
    }

    /**
     * 멤버의 특정 최근 본 판례 조회.
     *
     * @param recentId 최근 판례Id
     * @return 특정 최근 본 판례.
     */
    public PrecedentResponseDTO getMemberRecentDetail(Long recentId) {
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        MemberRecent memberRecent = memberRecentRepository.findById(recentId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_RECENT));

        // lawServiceClient.getPrecedentDetail이 BaseResponse<PrecedentDTO>를 반환한다고 가정합니다.
        BaseResponse<PrecedentResponseDTO> baseResponse = lawServiceClient.getPrecedentDetail(memberRecent.getPrecedentId());

        // BaseResponse에서 PrecedentDTO를 추출하여 반환합니다.
        return baseResponse.getData();
    }


    /**
     * 멤버의 특정 관심키워드 조회.
     *
     * @param keywordId 키워드 Id
     * @return 관심키워드.
     */
    public MemberKeywordDTO getMemberKeywordDetail(Long keywordId) {
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        MemberKeyword keyword = memberKeywordRepository.findByMemberAndMemberKeywordId(member, keywordId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_KEYWORD));

        return MemberKeywordDTO.from(keyword);
    }

    /**
     * 멤버 전체 조회.
     */
    public List<MemberDTO> getAllMembers() {
        List<Member> members = memberRepository.findAll();
        return members.stream().map(MemberDTO::from).collect(Collectors.toList());
    }


    /**
     * 저장된 판례 전체 조회.
     */
    public List<PrecedentListResponseDTO> getAllMemberPrecedents() {
        List<MemberPrecedent> allPrecedents = memberPrecedentRepository.findAll();
        List<Long> precedentIds = allPrecedents.stream().map(MemberPrecedent::getPrecedentId).toList();

        Map<String, List<Long>> requestBody = Collections.singletonMap("precedentId", precedentIds);
        BaseResponse<List<PrecedentListResponseDTO>> baseResponse = lawServiceClient.getPrecedentList(requestBody);
        return baseResponse.getData();
    }

    /**
     * 최근 본 판례 전체 조회.
     */
    public List<PrecedentListResponseDTO> getAllMemberRecents() {
        List<MemberRecent> allRecents = memberRecentRepository.findAll();
        List<Long> recentIds = allRecents.stream().map(MemberRecent::getPrecedentId).toList();

        Map<String, List<Long>> requestBody = Collections.singletonMap("precedentId", recentIds);
        BaseResponse<List<PrecedentListResponseDTO>> baseResponse = lawServiceClient.getPrecedentList(requestBody);
        return baseResponse.getData();
    }

    /**
     * 관심 키워드 전체 조회.
     */
    public List<MemberKeywordDTO> getAllMemberKeywords() {
        List<MemberKeyword> allKeywords = memberKeywordRepository.findAll();
        return allKeywords.stream().map(MemberKeywordDTO::from).collect(Collectors.toList());
    }

    /**
     * 판례 ID를 받아서 멤버 저장 판례를 생성하고 저장.
     *
     * @return 저장된 멤버 저장 판례 DTO
     */
    @Transactional
    public MemberPrecedentDTO saveMemberPrecedent(PrecedentSaveRequestDTO request) {
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 멤버 저장 판례 생성 및 저장
        MemberPrecedent newMemberPrecedent = MemberPrecedent.of(request.precedentId());
        newMemberPrecedent.setMember(member);
        MemberPrecedent memberPrecedent = memberPrecedentRepository.save(newMemberPrecedent);

        // 키워드를 받아오기.
        BaseResponse<List<PrecedentKeywordResponseDTO>> baseResponse = recommendServiceClient.getPrecedentKeyword(request.precedentId());
        // 가져온 10개의 키워드 리스트 중에서 가장 높은 value값을 가진 단어 추출
        PrecedentKeywordResponseDTO maxKeyword = Collections.max(baseResponse.getData(), Comparator.comparingDouble(PrecedentKeywordResponseDTO::value));
        MemberKeyword newMemberKeyword = MemberKeyword.of(maxKeyword.word(), KeywordType.RELATED);
        newMemberKeyword.setMemberPrecedent(memberPrecedent);
        newMemberKeyword.setMember(member);

        memberKeywordRepository.save(newMemberKeyword);

        // 저장된 멤버 저장 판례 DTO로 변환
        return MemberPrecedentDTO.from(memberPrecedent);
    }

    /**
     * 판례 ID를 받아서 멤버가 최근 본 판례에 저장.
     */
    @Transactional
    public MemberRecentDTO saveMemberRecent(PrecedentSaveRequestDTO request) {
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 멤버 저장 판례 생성 및 저장
        MemberRecent newMemberRecent = MemberRecent.of(request.precedentId());
        newMemberRecent.setMember(member);
        MemberRecent memberRecent = memberRecentRepository.save(newMemberRecent);

        // 저장된 멤버 저장 판례 DTO로 변환
        return MemberRecentDTO.from(memberRecent);
    }

    /**
     * 키워드들 저장.
     */
    @Transactional
    public List<MemberKeywordDTO> saveMemberKeywords(KeywordSaveRequestDTO request) {
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        List<MemberKeywordDTO> result = new ArrayList<>();

        for (String word : request.words()) {
            MemberKeyword newMemberKeyword = MemberKeyword.of(word, KeywordType.DIRECT);
            newMemberKeyword.setMember(member);
            MemberKeyword memberKeyword = memberKeywordRepository.save(newMemberKeyword);
            result.add(MemberKeywordDTO.from(memberKeyword));
        }

        return result;
    }

    /**
     * 멤버의 판례 삭제.
     *
     * @param precedentId 삭제할 판례 ID.
     */
    @Transactional
    public void deleteMemberPrecedent(Long precedentId) {
        // 멤버 찾기
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 멤버의 판례 중에서 삭제할 판례 찾기
        MemberPrecedent precedent = memberPrecedentRepository.findById(precedentId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_PRECEDENT));

        // 저장된 키워드 찾기
        MemberKeyword memberKeyword = memberKeywordRepository.findByMemberPrecedent_MemberPrecedentId(precedentId);

        // 키워드가 존재할 경우에만 삭제 처리
        if (memberKeyword != null) {
            memberKeyword.softDelete();
        }

        // 판례를 삭제 처리
        precedent.softDelete();

        // 업데이트된 판례 엔티티를 저장하여 삭제되었음을 표시
        memberPrecedentRepository.save(precedent);
    }

    /**
     * 멤버가 본 판례 삭제.
     *
     * @param recentId 삭제할 조회한 판례 ID.
     */
    @Transactional
    public void deleteMemberRecent(Long recentId) {
        // 멤버 찾기
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 멤버의 조회한 판례 중에서 삭제할 조회한 판례 찾기
        MemberRecent recent = memberRecentRepository.findById(recentId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_RECENT));

        // 조회한 판례를 삭제 처리
        recent.softDelete();

        // 업데이트된 조회한 판례 엔티티를 저장하여 삭제되었음을 표시
        memberRecentRepository.save(recent);
    }

    /**
     * 멤버의 키워드 삭제.
     *
     * @param keywordId 삭제할 키워드 ID.
     */
    @Transactional
    public void deleteMemberKeyword(Long keywordId) {
        // 멤버의 키워드 중에서 삭제할 키워드 찾기
        MemberKeyword keyword = memberKeywordRepository.findByMemberKeywordId(keywordId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_KEYWORD));

        // 키워드를 삭제 처리
        keyword.softDelete();

        // 업데이트된 키워드 엔티티를 저장하여 삭제되었음을 표시
        memberKeywordRepository.save(keyword);
    }

    /**
     * 하이라이트 저장.
     */
    @Transactional
    public MemberPrecedentHighlightDTO saveMemberPrecedentHighlight(Long precedentId, HighlightCreateUpdateRequestDTO request) {
        MemberPrecedent precedent = memberPrecedentRepository.findById(precedentId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_PRECEDENT));

        MemberPrecedentHighlight newMemberPrecedentHighlight = MemberPrecedentHighlight.of(request.location(), request.highlightType(), request.content());
        newMemberPrecedentHighlight.setMemberPrecedent(precedent);
        MemberPrecedentHighlight memberPrecedentHighlight = memberPrecedentHighlightRepository.save(newMemberPrecedentHighlight);

        return MemberPrecedentHighlightDTO.from(memberPrecedentHighlight);
    }

    /**
     * 하이라이트 삭제.
     */
    @Transactional
    public void deleteMemberPrecedentHighlight(Long highlightId) {
        MemberPrecedentHighlight highlight = memberPrecedentHighlightRepository.findById(highlightId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_HIGHLIGHT));

        highlight.softDelete();

        memberPrecedentHighlightRepository.save(highlight);
    }

    /**
     * 하이라이트 수정.
     */
    @Transactional
    public MemberPrecedentHighlightDTO updateMemberPrecedentHighlgiht(Long highlightId, HighlightCreateUpdateRequestDTO request) {
        MemberPrecedentHighlight highlight = memberPrecedentHighlightRepository.findById(highlightId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_HIGHLIGHT));
        if (request.location() != null) {
            highlight.setLocation(request.location());
        }
        if (request.highlightType() != null) {
            highlight.setHighlightType(request.highlightType());
        }
        if (request.content() != null) {
            highlight.setContent(request.content());
        }

        // 업데이트된 defamation 엔터티를 저장합니다.
        MemberPrecedentHighlight updatedHighlight = memberPrecedentHighlightRepository.save(highlight);

        return MemberPrecedentHighlightDTO.from(updatedHighlight);
    }

    /**
     * 멤버 삭제(탈퇴).
     */
    public void deleteMember() {
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        redisTokenService.deleteRefreshTokenByMemberId(currentMemberId);

        member.softDelete();
        memberRepository.save(member);
    }
}

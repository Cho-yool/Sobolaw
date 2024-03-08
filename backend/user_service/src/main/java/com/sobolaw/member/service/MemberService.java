package com.sobolaw.member.service;

import com.sobolaw.feign.dto.response.PrecedentKeywordResponseDTO;
import com.sobolaw.feign.dto.response.PrecedentListResponseDTO;
import com.sobolaw.feign.dto.response.PrecedentResponseDTO;
import com.sobolaw.feign.service.LawServiceClient;
import com.sobolaw.feign.service.RecommendServiceClient;
import com.sobolaw.global.common.response.BaseResponse;
import com.sobolaw.member.dto.MemberDTO;
import com.sobolaw.member.dto.MemberKeywordDTO;
import com.sobolaw.member.dto.MemberPrecedentDTO;
import com.sobolaw.member.dto.MemberPrecedentHighlightDTO;
import com.sobolaw.member.dto.MemberRecentDTO;
import com.sobolaw.member.dto.request.HighlightCreateUpdateRequestDTO;
import com.sobolaw.member.dto.request.KeywordSaveRequestDTO;
import com.sobolaw.member.dto.request.PrecedentSaveRequestDTO;
import com.sobolaw.member.entity.Member;
import com.sobolaw.member.entity.MemberKeyword;
import com.sobolaw.member.entity.MemberPrecedent;
import com.sobolaw.member.entity.MemberPrecedentHighlight;
import com.sobolaw.member.entity.MemberRecent;
import com.sobolaw.member.entity.Type.KeywordType;
import com.sobolaw.member.exception.MemberErrorCode;
import com.sobolaw.member.exception.MemberException;
import com.sobolaw.member.repository.MemberKeywordRepository;
import com.sobolaw.member.repository.MemberPrecedentHighlightRepository;
import com.sobolaw.member.repository.MemberPrecedentRepository;
import com.sobolaw.member.repository.MemberRecentRepository;
import com.sobolaw.member.repository.MemberRepository;
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

    /**
     * 멤버 정보.
     *
     * @param memberId 멤버Id
     * @return 멤버 정보들.
     */
    public MemberDTO getMember(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        return MemberDTO.from(member);
    }

    /**
     * 멤버의 최근 본 판례들.
     *
     * @param memberId 멤버Id
     * @return 최근 본 판례 리스트.
     */
    public List<PrecedentListResponseDTO> getMemberRecents(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        List<Long> recentIds = member.getMemberRecents().stream().map(MemberRecent::getPrecedentId).collect(Collectors.toList());

        Map<String, List<Long>> requestBody = Collections.singletonMap("precedentId", recentIds);
        BaseResponse<List<PrecedentListResponseDTO>> baseResponse = lawServiceClient.getPrecedentList(requestBody);
        return baseResponse.getData();

    }

    /**
     * 멤버의 관심 키워드들.
     *
     * @param memberId 멤버Id
     * @return 관심 키워드 리스트.
     */
    public List<MemberKeywordDTO> getMemberKeywords(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        return member.getMemberKeyword().stream().map(MemberKeywordDTO::from).collect(Collectors.toList());
    }

    /**
     * 멤버가 저장한 판례들.
     *
     * @param memberId 멤버Id
     * @return 저장한 판례 리스트.
     */
    public List<PrecedentListResponseDTO> getMemberPrecedents(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        List<Long> precedentIds = member.getMemberPrecedents().stream().map(MemberPrecedent::getPrecedentId).collect(Collectors.toList());

        Map<String, List<Long>> requestBody = Collections.singletonMap("precedentId", precedentIds);
        BaseResponse<List<PrecedentListResponseDTO>> baseResponse = lawServiceClient.getPrecedentList(requestBody);
        return baseResponse.getData();
    }


    /**
     * 멤버의 저장 판례의 메모.
     *
     * @param memberId    멤버Id
     * @param precedentId 판례Id
     * @return 저장 판례의 하이라이트들.
     */
    public List<MemberPrecedentHighlightDTO> getMemberPrecedentHighlights(Long memberId, Long precedentId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        MemberPrecedent matchingPrecedent = memberPrecedentRepository.findByMemberAndPrecedentId(member, precedentId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_PRECEDENT));

        return matchingPrecedent.getHighlights().stream().map(MemberPrecedentHighlightDTO::from).collect(Collectors.toList());
    }

    /**
     * 멤버의 특정 저장 판례.
     *
     * @param memberId    멤버Id
     * @param precedentId 판례Id
     * @return 특정 저장 판례.
     */
    public PrecedentResponseDTO getMemberPrecedentDetail(Long memberId, Long precedentId) {
        MemberPrecedent memberPrecedent = memberPrecedentRepository.findById(precedentId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_RECENT));
        // lawServiceClient.getPrecedentDetail이 BaseResponse<PrecedentDTO>를 반환한다고 가정합니다.
        BaseResponse<PrecedentResponseDTO> baseResponse = lawServiceClient.getPrecedentDetail(memberPrecedent.getPrecedentId());

        // BaseResponse에서 PrecedentDTO를 추출하여 반환합니다.
        return baseResponse.getData();
    }

    /**
     * 멤버의 특정 최근 본 판례 조회.
     *
     * @param memberId 멤버Id
     * @param recentId 최근 판례Id
     * @return 특정 최근 본 판례.
     */
    public PrecedentResponseDTO getMemberRecentDetail(Long memberId, Long recentId) {
        MemberRecent memberRecent = memberRecentRepository.findById(recentId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_RECENT));
        // lawServiceClient.getPrecedentDetail이 BaseResponse<PrecedentDTO>를 반환한다고 가정합니다.
        BaseResponse<PrecedentResponseDTO> baseResponse = lawServiceClient.getPrecedentDetail(memberRecent.getPrecedentId());

        // BaseResponse에서 PrecedentDTO를 추출하여 반환합니다.
        return baseResponse.getData();
    }


    /**
     * 멤버의 특정 관심키워드 조회.
     *
     * @param memberId  멤버 Id
     * @param keywordId 키워드 Id
     * @return 관심키워드.
     */
    public MemberKeywordDTO getMemberKeywordDetail(Long memberId, Long keywordId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

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
        List<Long> precedentIds = allPrecedents.stream().map(MemberPrecedent::getPrecedentId).collect(Collectors.toList());

        Map<String, List<Long>> requestBody = Collections.singletonMap("precedentId", precedentIds);
        BaseResponse<List<PrecedentListResponseDTO>> baseResponse = lawServiceClient.getPrecedentList(requestBody);
        return baseResponse.getData();
    }

    /**
     * 최근 본 판례 전체 조회.
     */
    public List<PrecedentListResponseDTO> getAllMemberRecents() {
        List<MemberRecent> allRecents = memberRecentRepository.findAll();
        List<Long> recentIds = allRecents.stream().map(MemberRecent::getPrecedentId).collect(Collectors.toList());

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
    public MemberPrecedentDTO saveMemberPrecedent(Long memberId, PrecedentSaveRequestDTO request) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

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
    public MemberRecentDTO saveMemberRecent(Long memberId, PrecedentSaveRequestDTO request) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 멤버 저장 판례 생성 및 저장
        MemberRecent newMemberRecent = MemberRecent.of(request.precedentId());
        newMemberRecent.setMember(member);
        MemberRecent memberRecent = memberRecentRepository.save(newMemberRecent);

        // 저장된 멤버 저장 판례 DTO로 변환
        return MemberRecentDTO.from(memberRecent);
    }

    /**
     * 키워드 저장.
     */
    @Transactional
    public MemberKeywordDTO saveMemberKeyword(Long memberId, KeywordSaveRequestDTO request) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));
        // 멤버 저장 판례 생성 및 저장
        MemberKeyword newMemberKeyword = MemberKeyword.of(request.word(), KeywordType.DIRECT);
        newMemberKeyword.setMember(member);
        MemberKeyword memberKeyword = memberKeywordRepository.save(newMemberKeyword);
        // 저장된 멤버 저장 판례 DTO로 변환
        log.info(String.valueOf(memberKeyword));
        return MemberKeywordDTO.from(memberKeyword);
    }

    /**
     * 멤버의 판례 삭제.
     *
     * @param memberId    멤버 ID.
     * @param precedentId 삭제할 판례 ID.
     */
    @Transactional
    public void deleteMemberPrecedent(Long memberId, Long precedentId) {
        // 멤버 찾기
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 멤버의 판례 중에서 삭제할 판례 찾기
        MemberPrecedent precedent = memberPrecedentRepository.findById(precedentId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_PRECEDENT));

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
     * @param memberId 멤버 ID.
     * @param recentId 삭제할 조회한 판례 ID.
     */
    @Transactional
    public void deleteMemberRecent(Long memberId, Long recentId) {
        // 멤버 찾기
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 멤버의 조회한 판례 중에서 삭제할 조회한 판례 찾기
        MemberRecent recent = memberRecentRepository.findById(recentId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_RECENT));

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
    public void deleteMemberPrecedentHighlight(Long highlightId) {
        MemberPrecedentHighlight highlight = memberPrecedentHighlightRepository.findById(highlightId).orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_HIGHLIGHT));

        highlight.softDelete();

        memberPrecedentHighlightRepository.save(highlight);
    }

    /**
     * 하이라이트 수정.
     */
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
}

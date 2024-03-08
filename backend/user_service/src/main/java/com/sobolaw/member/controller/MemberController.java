package com.sobolaw.member.controller;

import com.sobolaw.feign.dto.response.PrecedentListResponseDTO;
import com.sobolaw.feign.dto.response.PrecedentResponseDTO;
import com.sobolaw.global.common.response.BaseResponse;
import com.sobolaw.member.dto.MemberDTO;
import com.sobolaw.member.dto.MemberKeywordDTO;
import com.sobolaw.member.dto.MemberPrecedentDTO;
import com.sobolaw.member.dto.MemberPrecedentHighlightDTO;
import com.sobolaw.member.dto.MemberRecentDTO;
import com.sobolaw.member.dto.request.HighlightCreateUpdateRequestDTO;
import com.sobolaw.member.dto.request.KeywordSaveRequestDTO;
import com.sobolaw.member.dto.request.PrecedentSaveRequestDTO;
import com.sobolaw.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 멤버 controller.
 */
@RequestMapping("/members")
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /**
     * 멤버 조회.
     */
    @GetMapping("/{memberId}")
    @Operation(summary = "멤버 조회", description = "멤버를 조회합니다.", tags = {"멤버"})
    public BaseResponse<MemberDTO> getMember(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버 조회에 성공하였습니다!", memberService.getMember(memberId));
    }

    /**
     * 멤버의 최근 본 판례 조회.
     */
    @GetMapping("/{memberId}/recent")
    @Operation(summary = "멤버의 최근 본 판례 조회", description = "최근 본 판례 리스트를 조회합니다.", tags = {"판례"})
    public BaseResponse<List<PrecedentListResponseDTO>> getMemberRecent(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 최근 본 판례 조회에 성공하였습니다!", memberService.getMemberRecents(memberId));
    }

    /**
     * 멤버의 관심 키워드 조회.
     */
    @GetMapping("/{memberId}/keyword")
    @Operation(summary = "멤버의 관심 키워드 조회", description = "멤버의 관심 키워드 리스트를 조회합니다.", tags = {"키워드"})
    public BaseResponse<List<MemberKeywordDTO>> getMemberKeyword(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 키워드 조회에 성공하였습니다!", memberService.getMemberKeywords(memberId));
    }

    /**
     * 멤버의 저장한 판례 조회.
     */
    @GetMapping("/{memberId}/precedent")
    @Operation(summary = "멤버의 저장된 판례 조회", description = "멤버의 저장 판례 리스트를 조회합니다.", tags = {"판례"})
    public BaseResponse<List<PrecedentListResponseDTO>> getMemberPrecedents(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 저장 판례 조회에 성공하였습니다!", memberService.getMemberPrecedents(memberId));
    }

    /**
     * 멤버의 저장된 특정 판례 조회.
     */
    @GetMapping("/{memberId}/precedent/{precedentId}")
    @Operation(summary = "멤버의 저장된 특정 판례 조회", description = "멤버의 저장된 특정 판례를 조회합니다.", tags = {"판례"})
    public BaseResponse<PrecedentResponseDTO> getSingleMemberPrecedent(
        @PathVariable Long memberId,
        @PathVariable Long precedentId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 저장 판례 조회에 성공하였습니다!",
            memberService.getMemberPrecedentDetail(memberId, precedentId));
    }

    /**
     * 멤버의 최근 본 특정 판례 조회.
     */
    @GetMapping("/{memberId}/recent/{recentId}")
    @Operation(summary = "멤버의 최근 본 특정 판례를 조회", description = "멤버의 최근 본 특정 판례를 조회합니다.", tags = {"판례"})
    public BaseResponse<PrecedentResponseDTO> getSingleMemberRecent(
        @PathVariable Long memberId,
        @PathVariable Long recentId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 최근 판례 조회에 성공하였습니다!",
            memberService.getMemberRecentDetail(memberId, recentId));
    }

    /**
     * 멤버의 특정 관심 키워드 조회.
     */
    @GetMapping("/{memberId}/keyword/{keywordId}")
    @Operation(summary = "멤버의 특정 관심 키워드를 조회", description = "멤버의 특정 관심 키워드를 조회합니다.", tags = {"키워드"})
    public BaseResponse<MemberKeywordDTO> getSingleMemberKeyword(
        @PathVariable Long memberId,
        @PathVariable Long keywordId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 관심 키워드 조회에 성공하였습니다!",
            memberService.getMemberKeywordDetail(memberId, keywordId));
    }


    /**
     * 멤버 전체 조회.
     */
    @GetMapping
    @Operation(summary = "멤버 전체 리스트 조회", description = "멤버 전체 리스트 조회합니다.", tags = {"멤버"})
    public BaseResponse<List<MemberDTO>> getAllMembers() {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버 전체 리스트 조회에 성공하였습니다!", memberService.getAllMembers());
    }

    /**
     * 저장 판례 전체 조회.
     */
    @GetMapping("/precedents")
    @Operation(summary = "전체 저장 판례 조회", description = "전체 저장 판례를 조회합니다.", tags = {"판례"})
    public BaseResponse<List<PrecedentListResponseDTO>> getAllMemberPrecedents() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 저장 판례 조회에 성공하였습니다!", memberService.getAllMemberPrecedents());
    }

    /**
     * 최근 본 판례 전체 조회.
     */
    @GetMapping("/recents")
    @Operation(summary = "전체 최근 본 판례 조회", description = "전체 최근 본 판례를 조회합니다.", tags = {"판례"})
    public BaseResponse<List<PrecedentListResponseDTO>> getAllMemberRecents() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 최근 본 판례 조회에 성공하였습니다!", memberService.getAllMemberRecents());
    }

    /**
     * 관심 키워드 전체 조회.
     */
    @GetMapping("/keywords")
    @Operation(summary = "전체 관심 키워드 조회", description = "전체 관심 키워드를 조회합니다.", tags = {"키워드"})
    public BaseResponse<List<MemberKeywordDTO>> getAllMemberKeywords() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 관심 키워드 조회에 성공하였습니다!", memberService.getAllMemberKeywords());
    }


    /**
     * 멤버에게 새로운 판례를 저장.
     */
    @PostMapping("/{memberId}/precedents")
    @Operation(summary = "판례 저장", description = "판례를 저장합니다.", tags = {"판례"})
    public BaseResponse<MemberPrecedentDTO> saveMemberPrecedent(@PathVariable Long memberId, @RequestBody PrecedentSaveRequestDTO precedentSaveRequestDTO) {
        return BaseResponse.success(HttpStatus.OK.value(), "판례를 저장합니다.", memberService.saveMemberPrecedent(memberId, precedentSaveRequestDTO));
    }

    /**
     * 멤버가 본 판례를 저장.
     */
    @PostMapping("/{memberId}/recents")
    @Operation(summary = "조회한 판례 저장", description = "조회한 판례를 저장합니다.", tags = {"판례"})
    public BaseResponse<MemberRecentDTO> saveMemberRecent(@PathVariable Long memberId, @RequestBody PrecedentSaveRequestDTO precedentSaveRequestDTO) {
        return BaseResponse.success(HttpStatus.OK.value(), "판례를 저장합니다.", memberService.saveMemberRecent(memberId, precedentSaveRequestDTO));
    }

    /**
     * 멤버가 키워드 저장.
     */
    @PostMapping("/{memberId}/keywords")
    @Operation(summary = "키워드 저장", description = "관심 키워드를 저장합니다.", tags = {"키워드"})
    public BaseResponse<MemberKeywordDTO> saveMemberKeyword(@PathVariable Long memberId, @RequestBody KeywordSaveRequestDTO keywordSaveRequestDTO) {
        return BaseResponse.success(HttpStatus.OK.value(), "키워드를 저장합니다.", memberService.saveMemberKeyword(memberId, keywordSaveRequestDTO));
    }

    /**
     * 멤버의 판례를 삭제.
     */
    @DeleteMapping("/{memberId}/precedents/{precedentId}")
    @Operation(summary = "판례 삭제", description = "특정 판례를 삭제합니다.", tags = {"판례"})
    public BaseResponse<Void> deleteMemberPrecedent(@PathVariable Long memberId, @PathVariable Long precedentId) {
        memberService.deleteMemberPrecedent(memberId, precedentId);
        return BaseResponse.success(HttpStatus.OK.value(), "판례를 삭제했습니다.", null);
    }

    /**
     * 멤버가 본 판례를 삭제.
     */
    @DeleteMapping("/{memberId}/recents/{recentId}")
    @Operation(summary = "조회한 판례 삭제", description = "조회한 판례를 삭제합니다.", tags = {"판례"})
    public BaseResponse<Void> deleteMemberRecent(@PathVariable Long memberId, @PathVariable Long recentId) {
        memberService.deleteMemberRecent(memberId, recentId);
        return BaseResponse.success(HttpStatus.OK.value(), "조회한 판례를 삭제했습니다.", null);
    }

    /**
     * 멤버의 키워드를 삭제.
     */
    @DeleteMapping("/{memberId}/keywords/{keywordId}")
    @Operation(summary = "키워드 삭제", description = ".관심 키워드를 삭제합니다.", tags = {"키워드"})
    public BaseResponse<Void> deleteMemberKeyword(@PathVariable Long memberId, @PathVariable Long keywordId) {
        memberService.deleteMemberKeyword(keywordId);
        return BaseResponse.success(HttpStatus.OK.value(), "키워드를 삭제했습니다.", null);
    }


    /**
     * 멤버의 저장 판례의 하이라이트 조회.
     */
    @GetMapping("/{memberId}/precedents/{precedentId}/highlights")
    @Operation(summary = "멤버의 저장된 판례의 하이라이트 조회", description = "멤버의 저장된 판례의 하이라이트를 조회합니다.", tags = {"하이라이트"})
    public BaseResponse<List<MemberPrecedentHighlightDTO>> getMemberPrecedentHighlights(
        @PathVariable Long memberId,
        @PathVariable Long precedentId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 저장 판례의 하이라이트 조회에 성공하였습니다!", memberService.getMemberPrecedentHighlights(memberId, precedentId));
    }

    /**
     * 멤버의 저장 판례에 하이라이트 추가.
     */
    @PostMapping("/{memberId}/precedents/{precedentId}/highlights")
    @Operation(summary = "멤버의 저장된 판례에 하이라이트 저장", description = "멤버의 저장된 판례에 하이라이트를 추가합니다.", tags = {"하이라이트"})
    public BaseResponse<MemberPrecedentHighlightDTO> saveMemberPrecedentHighlight(
        @PathVariable Long memberId,
        @PathVariable Long precedentId,
        @RequestBody HighlightCreateUpdateRequestDTO request) {
        return BaseResponse.success(HttpStatus.CREATED.value(), "멤버의 저장된 판례에 하이라이트를 추가하였습니다!", memberService.saveMemberPrecedentHighlight(precedentId, request));
    }

    /**
     * 멤버의 저장 판례의 하이라이트 삭제.
     */
    @DeleteMapping("/{memberId}/precedents/{precedentId}/highlights/{highlightId}")
    @Operation(summary = "멤버의 저장된 판례의 하이라이트 삭제", description = "멤버의 저장된 판례의 하이라이트를 삭제합니다.", tags = {"하이라이트"})
    public BaseResponse<Void> deleteMemberPrecedentHighlight(
        @PathVariable Long memberId,
        @PathVariable Long precedentId,
        @PathVariable Long highlightId) {
        memberService.deleteMemberPrecedentHighlight(highlightId);
        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "멤버의 저장된 판례의 하이라이트를 삭제하였습니다!", null);
    }

    /**
     * 멤버의 저장 판례의 하이라이트 수정.
     */
    @PatchMapping("/{memberId}/precedents/{precedentId}/highlights/{highlightId}")
    @Operation(summary = "멤버의 저장된 판례의 하이라이트 수정", description = "멤버의 저장된 판례의 하이라이트를 수정합니다.", tags = {"하이라이트"})
    public BaseResponse<MemberPrecedentHighlightDTO> updateMemberPrecedentHighlight(
        @PathVariable Long memberId,
        @PathVariable Long precedentId,
        @PathVariable Long highlightId,
        @RequestBody HighlightCreateUpdateRequestDTO request) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 저장된 판례의 하이라이트를 수정하였습니다!", memberService.updateMemberPrecedentHighlgiht(highlightId, request));
    }
}
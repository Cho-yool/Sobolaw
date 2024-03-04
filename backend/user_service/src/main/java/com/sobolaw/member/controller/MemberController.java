package com.sobolaw.member.controller;

import com.sobolaw.global.common.response.BaseResponse;
import com.sobolaw.member.dto.MemberDTO;
import com.sobolaw.member.dto.MemberKeywordDTO;
import com.sobolaw.member.dto.MemberPrecedentDTO;
import com.sobolaw.member.dto.MemberPrecedentHighlightDTO;
import com.sobolaw.member.dto.MemberRecentDTO;
import com.sobolaw.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 멤버 controller.
 */
@RequestMapping("/api/members")
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /**
     * 멤버 조회.
     */
    @GetMapping("/{memberId}")
    @Operation(summary = "멤버 조회", description = "멤버를 조회합니다.", tags = { "멤버" })
    public BaseResponse<MemberDTO> getMember(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버 조회에 성공하였습니다!", memberService.getMember(memberId));
    }

    /**
     * 멤버의 최근 본 판례 조회.
     */
    @GetMapping("/{memberId}/recent")
    @Operation(summary = "멤버의 최근 본 판례 조회", description = "최근 본 판례 리스트를 조회합니다.", tags = { "판례" })
    public BaseResponse<List<MemberRecentDTO>> getMemberRecent(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 최근 본 판례 조회에 성공하였습니다!", memberService.getMemberRecents(memberId));
    }

    /**
     * 멤버의 관심 키워드 조회.
     */
    @GetMapping("/{memberId}/keyword")
    @Operation(summary = "멤버의 관심 키워드 조회", description = "멤버의 관심 키워드 리스트를 조회합니다.", tags = { "키워드" })
    public BaseResponse<List<MemberKeywordDTO>> getMemberKeyword(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 키워드 조회에 성공하였습니다!", memberService.getMemberKeywords(memberId));
    }

    /**
     * 멤버의 저장한 판례 조회.
     */
    @GetMapping("/{memberId}/precedents")
    @Operation(summary = "멤버의 저장된 판례 조회", description = "멤버의 저장 판례 리스트를 조회합니다.", tags = { "판례" })
    public BaseResponse<List<MemberPrecedentDTO>> getMemberPrecedents(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 저장 판례 조회에 성공하였습니다!", memberService.getMemberPrecedents(memberId));
    }
    
    /**
     * 멤버의 저장된 특정 판례 조회.
     */
    @GetMapping("/{memberId}/precedents/{precedentId}")
    @Operation(summary = "멤버의 저장된 특정 판례 조회", description = "멤버의 저장된 특정 판례를 조회합니다.", tags = { "판례" })
    public BaseResponse<MemberPrecedentDTO> getSingleMemberPrecedent(
        @PathVariable Long memberId,
        @PathVariable Long precedentId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 저장 판례 조회에 성공하였습니다!",
            memberService.getMemberPrecedentDetail(memberId, precedentId));
    }
    
    /**
     * 멤버의 저장 판례의 하이라이트 조회.
     */
    @GetMapping("/{memberId}/precedents/{precedentId}/highlights")
    @Operation(summary = "멤버의 저장된 판례의 하이라이트 조회", description = "멤버의 저장된 판례의 하이라이트를 조회합니다.", tags = { "하이라이트" })
    public BaseResponse<List<MemberPrecedentHighlightDTO>> getMemberPrecedentHighlights(
        @PathVariable Long memberId,
        @PathVariable Long precedentId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 저장 판례의 하이라이트 조회에 성공하였습니다!", memberService.getMemberPrecedentHighlightsByPrecedentId(memberId, precedentId));
    }

    /**
     * 멤버의 최근 본 특정 판례 조회.
     */
    @GetMapping("/{memberId}/recents/{recentId}")
    @Operation(summary = "멤버의 최근 본 특정 판례를 조회", description = "멤버의 최근 본 특정 판례를 조회합니다.", tags = { "판례" })
    public BaseResponse<MemberRecentDTO> getSingleMemberRecent(
        @PathVariable Long memberId,
        @PathVariable Long recentId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 최근 판례 조회에 성공하였습니다!",
            memberService.getMemberRecentDetail(memberId, recentId));
    }

    /**
     * 멤버의 특정 관심 키워드 조회.
     */
    @GetMapping("/{memberId}/keywords/{keywordId}")
    @Operation(summary = "멤버의 특정 관심 키워드를 조회", description = "멤버의 특정 관심 키워드를 조회합니다.", tags = { "키워드" })
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
    @Operation(summary = "멤버 전체 리스트 조회", description = "멤버 전체 리스트 조회합니다.", tags = { "멤버" })
    public BaseResponse<List<MemberDTO>> getAllMembers() {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버 전체 리스트 조회에 성공하였습니다!", memberService.getAllMembers());
    }
    /**
     * 저장 판례 전체 조회.
     */
    @GetMapping("/precedents")
    @Operation(summary = "전체 저장 판례 조회", description = "전체 저장 판례를 조회합니다.", tags = { "판례" })
    public BaseResponse<List<MemberPrecedentDTO>> getAllMemberPrecedents() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 저장 판례 조회에 성공하였습니다!", memberService.getAllMemberPrecedents());
    }

    /**
     * 최근 본 판례 전체 조회.
     */
    @GetMapping("/recents")
    @Operation(summary = "전체 최근 본 판례 조회", description = "전체 최근 본 판례를 조회합니다.", tags = { "판례" })
    public BaseResponse<List<MemberRecentDTO>> getAllMemberRecents() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 최근 본 판례 조회에 성공하였습니다!", memberService.getAllMemberRecents());
    }

    /**
     * 관심 키워드 전체 조회.
     */
    @GetMapping("/keywords")
    @Operation(summary = "전체 관심 키워드 조회", description = "전체 관심 키워드를 조회합니다.", tags = { "키워드" })
    public BaseResponse<List<MemberKeywordDTO>> getAllMemberKeywords() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 관심 키워드 조회에 성공하였습니다!", memberService.getAllMemberKeywords());
    }

}

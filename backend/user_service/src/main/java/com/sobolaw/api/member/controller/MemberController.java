package com.sobolaw.api.member.controller;

import com.sobolaw.api.member.dto.MemberDTO;
import com.sobolaw.api.member.dto.MemberKeywordDTO;
import com.sobolaw.api.member.dto.MemberPrecedentDTO;
import com.sobolaw.api.member.dto.MemberPrecedentHighlightDTO;
import com.sobolaw.api.member.dto.MemberRecentDTO;
import com.sobolaw.api.member.dto.request.HighlightCreateUpdateRequestDTO;
import com.sobolaw.api.member.dto.request.KeywordSaveRequestDTO;
import com.sobolaw.api.member.dto.request.MemberUpdateRequestDto;
import com.sobolaw.api.member.dto.request.PrecedentSaveRequestDTO;
import com.sobolaw.api.member.dto.response.AdminMemberResponseDto;
import com.sobolaw.api.member.dto.response.MemberPrecedentResponseDTO;
import com.sobolaw.api.member.dto.response.MemberRecentResponseDTO;
import com.sobolaw.api.member.dto.response.MemberResponseDTO;
import com.sobolaw.api.member.service.MemberService;
import com.sobolaw.global.common.response.BaseResponse;
import com.sobolaw.global.security.jwt.JwtProvider;
import com.sobolaw.global.security.jwt.RedisTokenService;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * 멤버 controller.
 */
@Slf4j
@RequestMapping("/members")
@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final JwtProvider jwtProvider;
    private final RedisTokenService redisTokenService;

    /**
     * 멤버 로그아웃.
     */
    @PostMapping("/logout")
    @Operation(summary = "멤버 로그아웃", description = "로그아웃 합니다.", tags = {"멤버"})
    public BaseResponse<Long> logoutMember(
        @RequestBody String refreshToken
    ) {
        Long memberId = jwtProvider.getMemberId();
        log.info("memberId = " + memberId);
        log.info("refreshToken = " + refreshToken);
        redisTokenService.deleteRefreshToken(refreshToken);

        return BaseResponse.success(HttpStatus.OK.value(), "로그아웃 하였습니다.", memberId);
    }

    /**
     * 멤버 회원탈퇴.
     */
    @DeleteMapping("/delete")
    @Operation(summary = "멤버 회원탈퇴", description = "회원 탈퇴합니다.", tags = {"멤버"})
    public BaseResponse<Void> deleteMember(
        @RequestBody String refreshToken
    ) {
        redisTokenService.deleteRefreshToken(refreshToken);
        memberService.deleteMember();

        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "회원 탈퇴 하였습니다.", null);
    }

    /**
     * 멤버 조회.
     */
    @GetMapping
    @Operation(summary = "멤버 조회", description = "멤버를 조회합니다.", tags = {"멤버"})
    public BaseResponse<MemberResponseDTO> getMember() {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버 조회에 성공하였습니다!", memberService.getMember());
    }

    /**
     * 멤버 정보 조회.
     */
    @GetMapping("/{memberId}")
    @Operation(summary = "멤버 조회", description = "멤버 정보를 조회합니다.", tags = {"멤버(괸리자)"})
    public BaseResponse<MemberResponseDTO> getMemberInfo(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버 조회에 성공하였습니다!", memberService.getMemberInfo(memberId));
    }

    /**
     * 멤버 정보 수정 메서드(관리자).
     */
    @Operation(summary = "멤버 정보 수정", description = "관리자가 특정 멤버의 정보를 수정할 수 있습니다.", tags = { "멤버(관리자)" })
    @PatchMapping("/{memberId}")
    public BaseResponse<AdminMemberResponseDto> updateMember(@PathVariable Long memberId, @RequestBody MemberUpdateRequestDto updatedMemberDto) {
        AdminMemberResponseDto updatedMember = memberService.updateMember(memberId, updatedMemberDto);
        return BaseResponse.success(HttpStatus.OK.value(), "멤버 수정에 성공하였습니다.", updatedMember);
    }

    /**
     * 멤버의 최근 본 판례 조회.
     */
    @GetMapping("/recents")
    @Operation(summary = "멤버의 최근 본 판례 조회", description = "최근 본 판례 리스트를 조회합니다.", tags = {"판례"})
    public BaseResponse<List<MemberRecentResponseDTO>> getMemberRecent() {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 최근 본 판례 조회에 성공하였습니다!", memberService.getMemberRecents());
    }

    /**
     * 멤버의 관심 키워드 조회.
     */
    @GetMapping("/keywords")
    @Operation(summary = "멤버의 관심 키워드 조회", description = "멤버의 관심 키워드 리스트를 조회합니다.", tags = {"키워드"})
    public BaseResponse<List<MemberKeywordDTO>> getMemberKeyword() {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 키워드 조회에 성공하였습니다!", memberService.getMemberKeywords());
    }

    /**
     * 멤버의 저장한 판례 조회.
     */
    @GetMapping("/precedents")
    @Operation(summary = "멤버의 저장된 판례 조회", description = "멤버의 저장 판례 리스트를 조회합니다.", tags = {"판례"})
    public BaseResponse<List<MemberPrecedentResponseDTO>> getMemberPrecedents() {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 저장 판례 조회에 성공하였습니다!", memberService.getMemberPrecedents());
    }

    /**
     * 멤버의 저장된 특정 판례 조회.
     */
    @GetMapping("/precedents/{precedentId}")
    @Operation(summary = "멤버의 저장된 특정 판례 조회", description = "멤버의 저장된 특정 판례를 조회합니다.", tags = {"판례"})
    public BaseResponse<MemberPrecedentResponseDTO> getSingleMemberPrecedent(
        @PathVariable Long precedentId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 저장 판례 조회에 성공하였습니다!",
            memberService.getMemberPrecedentDetail(precedentId));
    }

    /**
     * 멤버의 최근 본 특정 판례 조회.
     */
    @GetMapping("/recents/{recentId}")
    @Operation(summary = "멤버의 최근 본 특정 판례를 조회", description = "멤버의 최근 본 특정 판례를 조회합니다.", tags = {"판례"})
    public BaseResponse<MemberRecentResponseDTO> getSingleMemberRecent(
        @PathVariable Long recentId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 최근 판례 조회에 성공하였습니다!",
            memberService.getMemberRecentDetail(recentId));
    }

    /**
     * 멤버의 특정 관심 키워드 조회.
     */
    @GetMapping("/keywords/{keywordId}")
    @Operation(summary = "멤버의 특정 관심 키워드를 조회", description = "멤버의 특정 관심 키워드를 조회합니다.", tags = {"키워드"})
    public BaseResponse<MemberKeywordDTO> getSingleMemberKeyword(
        @PathVariable Long keywordId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 관심 키워드 조회에 성공하였습니다!",
            memberService.getMemberKeywordDetail(keywordId));
    }


    /**
     * 멤버 전체 조회.
     */
    @GetMapping("/list")
    @Operation(summary = "멤버 전체 리스트 조회", description = "멤버 전체 리스트 조회합니다.", tags = {"멤버(관리자)"})
    public BaseResponse<List<MemberDTO>> getAllMembers() {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버 전체 리스트 조회에 성공하였습니다!", memberService.getAllMembers());
    }

    /**
     * 저장 판례 전체 조회.
     */
    @GetMapping("/precedents/list")
    @Operation(summary = "전체 저장 판례 조회", description = "전체 저장 판례를 조회합니다.", tags = {"멤버(관리자)"})
    public BaseResponse<List<MemberPrecedentResponseDTO>> getAllMemberPrecedents() {

        return BaseResponse.success(HttpStatus.OK.value(), "전체 저장 판례 조회에 성공하였습니다!", memberService.getAllMemberPrecedents());
    }

    /**
     * 최근 본 판례 전체 조회.
     */
    @GetMapping("/recents/list")
    @Operation(summary = "전체 최근 본 판례 조회", description = "전체 최근 본 판례를 조회합니다.", tags = {"멤버(관리자)"})
    public BaseResponse<List<MemberRecentResponseDTO>> getAllMemberRecents() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 최근 본 판례 조회에 성공하였습니다!", memberService.getAllMemberRecents());
    }

    /**
     * 관심 키워드 전체 조회.
     */
    @GetMapping("/keywords/list")
    @Operation(summary = "전체 관심 키워드 조회", description = "전체 관심 키워드를 조회합니다.", tags = {"멤버(관리자)"})
    public BaseResponse<List<MemberKeywordDTO>> getAllMemberKeywords() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 관심 키워드 조회에 성공하였습니다!", memberService.getAllMemberKeywords());
    }


    /**
     * 멤버에게 새로운 판례를 저장.
     */
    @PostMapping("/precedents")
    @Operation(summary = "판례 저장", description = "판례를 저장합니다.", tags = {"판례"})
    public BaseResponse<MemberPrecedentDTO> saveMemberPrecedent(@RequestBody PrecedentSaveRequestDTO precedentSaveRequestDTO) {
        return BaseResponse.success(HttpStatus.CREATED.value(), "판례를 저장합니다.", memberService.saveMemberPrecedent(precedentSaveRequestDTO));
    }

    /**
     * 멤버가 본 판례를 저장.
     */
    @PostMapping("/recents")
    @Operation(summary = "조회한 판례 저장", description = "조회한 판례를 저장합니다.", tags = {"판례"})
    public BaseResponse<MemberRecentDTO> saveMemberRecent(@RequestBody PrecedentSaveRequestDTO precedentSaveRequestDTO) {
        return BaseResponse.success(HttpStatus.CREATED.value(), "판례를 저장합니다.", memberService.saveMemberRecent(precedentSaveRequestDTO));
    }

    /**
     * 멤버가 키워드 저장.
     */
    @PostMapping("/keywords")
    @Operation(summary = "키워드 저장", description = "관심 키워드를 저장합니다.", tags = {"키워드"})
    public BaseResponse<List<MemberKeywordDTO>> saveMemberKeyword(@RequestBody KeywordSaveRequestDTO keywordSaveRequestDTO) {
        return BaseResponse.success(HttpStatus.CREATED.value(), "키워드를 저장합니다.", memberService.saveMemberKeywords(keywordSaveRequestDTO));
    }

    /**
     * 멤버가 키워드 저장.
     */
    @PatchMapping("/keywords")
    @Operation(summary = "키워드 수정", description = "관심 키워드를 수정합니다.", tags = {"키워드"})
    public BaseResponse<List<MemberKeywordDTO>> patchMemberKeyword(@RequestBody KeywordSaveRequestDTO keywordSaveRequestDTO) {
        return BaseResponse.success(HttpStatus.ACCEPTED.value(), "키워드를 저장합니다.", memberService.patchMemberKeywords(keywordSaveRequestDTO));
    }

    /**
     * 멤버의 판례를 삭제.
     */
    @DeleteMapping("/precedents/{precedentId}")
    @Operation(summary = "판례 삭제", description = "특정 판례를 삭제합니다.", tags = {"판례"})
    public BaseResponse<Void> deleteMemberPrecedent(@PathVariable Long precedentId) {
        memberService.deleteMemberPrecedent(precedentId);
        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "판례를 삭제했습니다.", null);
    }

    /**
     * 멤버가 본 판례를 삭제.
     */
    @DeleteMapping("/recents/{recentId}")
    @Operation(summary = "조회한 판례 삭제", description = "조회한 판례를 삭제합니다.", tags = {"판례"})
    public BaseResponse<Void> deleteMemberRecent(@PathVariable Long recentId) {
        memberService.deleteMemberRecent(recentId);
        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "조회한 판례를 삭제했습니다.", null);
    }

    /**
     * 멤버의 키워드를 삭제.
     */
    @DeleteMapping("/keywords/{keywordId}")
    @Operation(summary = "키워드 삭제", description = ".관심 키워드를 삭제합니다.", tags = {"키워드"})
    public BaseResponse<Void> deleteMemberKeyword(@PathVariable Long keywordId) {
        memberService.deleteMemberKeyword(keywordId);
        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "키워드를 삭제했습니다.", null);
    }


    /**
     * 멤버의 저장 판례의 하이라이트 조회.
     */
    @GetMapping("/precedents/{precedentId}/highlights")
    @Operation(summary = "멤버의 저장된 판례의 하이라이트 조회", description = "멤버의 저장된 판례의 하이라이트를 조회합니다.", tags = {"하이라이트"})
    public BaseResponse<List<MemberPrecedentHighlightDTO>> getMemberPrecedentHighlights(
        @PathVariable Long precedentId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 저장 판례의 하이라이트 조회에 성공하였습니다!", memberService.getMemberPrecedentHighlights(precedentId));
    }

    /**
     * 멤버의 저장 판례에 하이라이트 추가.
     */
    @PostMapping("/precedents/{precedentId}/highlights")
    @Operation(summary = "멤버의 저장된 판례에 하이라이트 저장", description = "멤버의 저장된 판례에 하이라이트를 추가합니다.", tags = {"하이라이트"})
    public BaseResponse<MemberPrecedentHighlightDTO> saveMemberPrecedentHighlight(
        @PathVariable Long precedentId,
        @RequestBody HighlightCreateUpdateRequestDTO request) {
        return BaseResponse.success(HttpStatus.CREATED.value(), "멤버의 저장된 판례에 하이라이트를 추가하였습니다!", memberService.saveMemberPrecedentHighlight(precedentId, request));
    }

    /**
     * 멤버의 저장 판례의 하이라이트 전체 삭제.
     */
    @DeleteMapping("/precedents/{precedentId}/highlights")
    @Operation(summary = "멤버의 저장된 판례에 하이라이트 삭제", description = "멤버의 저장된 판례에 하이라이트를 모두 삭제합니다.", tags = {"하이라이트"})
    public BaseResponse<Void> deleteAllMemberPrecedentHighlight(
        @PathVariable Long precedentId) {
        memberService.deleteAllMemberPrecedentHighlight(precedentId);
        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "멤버의 저장된 판례의 하이라이트를 삭제하였습니다!", null);
    }



    /**
     * 멤버의 저장 판례의 하이라이트 삭제.
     */
    @DeleteMapping("/precedents/{precedentId}/highlights/{highlightId}")
    @Operation(summary = "멤버의 저장된 판례의 하이라이트 삭제", description = "멤버의 저장된 판례의 하이라이트를 삭제합니다.", tags = {"하이라이트"})
    public BaseResponse<Void> deleteMemberPrecedentHighlight(
        @PathVariable Long precedentId,
        @PathVariable Long highlightId) {
        memberService.deleteMemberPrecedentHighlight(highlightId);
        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "멤버의 저장된 판례의 하이라이트를 삭제하였습니다!", null);
    }

    /**
     * 멤버의 저장 판례의 하이라이트 수정.
     */
    @PatchMapping("/precedents/{precedentId}/highlights/{highlightId}")
    @Operation(summary = "멤버의 저장된 판례의 하이라이트 수정", description = "멤버의 저장된 판례의 하이라이트를 수정합니다.", tags = {"하이라이트"})
    public BaseResponse<MemberPrecedentHighlightDTO> updateMemberPrecedentHighlight(
        @PathVariable Long precedentId,
        @PathVariable Long highlightId,
        @RequestBody HighlightCreateUpdateRequestDTO request) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 저장된 판례의 하이라이트를 수정하였습니다!", memberService.updateMemberPrecedentHighlgiht(highlightId, request));
    }

}
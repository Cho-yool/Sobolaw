package com.sobolaw.api.member.controller;

import com.sobolaw.api.member.dto.response.MemberRoleUpdateDetailResponseDTO;
import com.sobolaw.api.member.dto.response.RoleUpdateListResponseDTO;
import com.sobolaw.api.member.dto.response.RoleUpdateResponseDTO;
import com.sobolaw.api.member.entity.Type.RoleType;
import com.sobolaw.api.member.service.CertificationService;
import com.sobolaw.global.common.response.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * ADMIN 입장에서 등업 요청을 관리하기 위한 컨트롤러.
 */
@RestController
@RequestMapping("/members/certification")
@RequiredArgsConstructor
public class CertificationController {

    private final CertificationService certificationService;

    /**
     * 변호사 등업 리스트 조회.
     */
    @Operation(summary = "변호사 등업 리스트 조회", description = "변호사 등업 리스트를 조회합니다.", tags = {"등업"})
    @GetMapping("/lawyer")
    public BaseResponse<List<RoleUpdateListResponseDTO>> getLawyerUpdateRequestList() {
        List<RoleUpdateListResponseDTO> listResult =
            certificationService.findLawyerAll().stream()
                .map(request ->
                    RoleUpdateListResponseDTO.of(request.getId(), request.getMember().getName()))
                .toList();
        return BaseResponse.success(HttpStatus.OK.value(), "등업 리스트 조회성공", listResult);
    }


    /**
     * 변호사 등업 상세 조회.
     */
    @Operation(summary = "변호사 등업글 상세 조회", description = "변호사 등업요청을 상세조회합니다.", tags = {"등업"})
    @GetMapping("/lawyer/{articleId}")
    public BaseResponse<MemberRoleUpdateDetailResponseDTO> getLawyerUpdateRequestDetail(@PathVariable(name = "articleId") Long articleId) {
        MemberRoleUpdateDetailResponseDTO dto = certificationService.findLawyerUpdateRequestDto(articleId);
        return BaseResponse.success(HttpStatus.OK.value(), "등업글 리스트 조회성공", dto);
    }

    /**
     * 변호사 등업 승인.
     */
    @Operation(summary = "변호사 등업 승인", description = "변호사 등업요청을 승인합니다.", tags = {"등업"})
    @PostMapping("/lawyer/{articleId}/approve")
    public BaseResponse<RoleUpdateResponseDTO> approveMentorRoleUpdate(@PathVariable(name = "articleId") Long articleId) {
        Long lawyerId = certificationService.findLawyerIdByArticleId(articleId);
        RoleUpdateResponseDTO result = certificationService.updateRole(lawyerId, RoleType.ROLE_LAWYER);
        certificationService.deleteLawyerArticleByArticleId(articleId);
        return BaseResponse.success(HttpStatus.OK.value(), "멘토 등업 성공", result);
    }


    /**
     * 변호사 등업 거절.
     */
    @Operation(summary = "멘토 등업 거절", description = "멘토 등업요청을 거절합니다.", tags = {"등업"})
    @PostMapping("/lawyer/{articleId}/deny")
    public BaseResponse<RoleUpdateResponseDTO> denyMentorRoleUpdate(@PathVariable(name = "articleId") Long articleId) {
        Long lawyerId = certificationService.findLawyerIdByArticleId(articleId);
        RoleUpdateResponseDTO result = certificationService.updateRole(lawyerId, RoleType.ROLE_USER);
        certificationService.deleteLawyerArticleByArticleId(articleId);
        return BaseResponse.success(HttpStatus.OK.value(), "멘토 등업 거절. 요청 삭제.", result);
    }
}

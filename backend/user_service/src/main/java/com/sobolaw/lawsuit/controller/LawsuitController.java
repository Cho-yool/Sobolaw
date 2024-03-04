package com.sobolaw.lawsuit.controller;

import com.sobolaw.global.common.response.BaseResponse;
import com.sobolaw.lawsuit.dto.LawsuitDefamationDTO;
import com.sobolaw.lawsuit.service.LawsuitService;
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
@RequestMapping("/api/lawsuit")
@RestController
@RequiredArgsConstructor
public class LawsuitController {

    private LawsuitService lawsuitService;

    /**
     * 멤버의 소장 리스트 조회.
     *
     * @param memberId 멤버 Id
     * @return 멤버의 소장 리스트.
     */
    @GetMapping("/member/{memberId}")
    @Operation(summary = "멤버의 소장 리스트 조회", description = "멤버에 속한 소장 리스트를 조회합니다.", tags = { "소장" })
    public BaseResponse<List<LawsuitDefamationDTO>> getLawsuitsByMemberId(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 소장 리스트 조회에 성공하였습니다!", lawsuitService.getLawsuitsByMemberId(memberId));
    }

    /**
     * 멤버의 특정 소장 조회.
     *
     * @param memberId 멤버 Id
     * @param lawsuitId 멤버가 조회할 소장 Id
     * @return 특정 소장 내용.
     */
    @GetMapping("/{memberId}/{lawsuitId}")
    @Operation(summary = "멤버의 특정 소장 조회", description = "멤버에 속한 특정 소장을 조회합니다.", tags = { "소장" })
    public BaseResponse<LawsuitDefamationDTO> getLawsuit(@PathVariable Long memberId, @PathVariable Long lawsuitId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 소장 조회에 성공하였습니다!", lawsuitService.getLawsuit(memberId, lawsuitId));
    }

    /**
     * 전체 소장 리스트.
     *
     * @return 전체 소장 리스트.
     */
    @GetMapping
    @Operation(summary = "전체 소장 리스트 조회", description = "전체 소장 리스트를 조회합니다.", tags = { "소장" })
    public BaseResponse<List<LawsuitDefamationDTO>> getAllLawsuits() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 소장 리스트 조회에 성공하였습니다!", lawsuitService.getAllLawsuits());
    }
}

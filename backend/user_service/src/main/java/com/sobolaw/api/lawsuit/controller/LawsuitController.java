package com.sobolaw.api.lawsuit.controller;

import com.sobolaw.api.lawsuit.dto.LawsuitDefamationDTO;
import com.sobolaw.api.lawsuit.dto.LawsuitFraudDTO;
import com.sobolaw.api.lawsuit.dto.LawsuitInsultDTO;
import com.sobolaw.api.lawsuit.dto.request.LawsuitDefamationCreateUpdateRequestDTO;
import com.sobolaw.api.lawsuit.dto.request.LawsuitFraudCreateUpdateRequestDTO;
import com.sobolaw.api.lawsuit.dto.request.LawsuitInsultCreateUpdateRequestDTO;
import com.sobolaw.api.lawsuit.dto.response.LawsuitDefamationListResponseDTO;
import com.sobolaw.api.lawsuit.dto.response.LawsuitFraudListResponseDTO;
import com.sobolaw.api.lawsuit.dto.response.LawsuitInsultListResponseDTO;
import com.sobolaw.api.lawsuit.dto.response.LawsuitListResponseDTO;
import com.sobolaw.api.lawsuit.service.LawsuitService;
import com.sobolaw.global.common.response.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import java.util.List;
import lombok.AllArgsConstructor;
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
 * 소송장 controller.
 */
@RequestMapping("/lawsuit")
@RestController
@AllArgsConstructor
//@RequiredArgsConstructor
public class LawsuitController {

    private LawsuitService lawsuitService;

    /**
     * 전체 소장 리스트 조회.
     */
    @GetMapping("/{memberId}")
    @Operation(summary = "멤버의 전체 소장 리스트 조회", description = "멤버가 저장한 전체 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitListResponseDTO>> getAllLawsuits(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 전체 소장 리스트 조회에 성공하였습니다.", lawsuitService.getAllLawsuits(memberId));
    }

    /**
     * 멤버의 명예훼손 소장 리스트 조회.
     *
     * @param memberId 멤버 Id
     * @return 멤버의 명예훼손 소장 리스트.
     */
    @GetMapping("/defamations/{memberId}")
    @Operation(summary = "멤버의 명예훼손 소장 리스트 조회", description = "멤버에 속한 명예훼손 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitDefamationListResponseDTO>> getDefamations(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 명예훼손 소장 리스트 조회에 성공하였습니다!", lawsuitService.getDefamations(memberId));
    }

    /**
     * 멤버의 특정 명예훼손 소장 조회.
     *
     * @param memberId     멤버 Id
     * @param defamationId 멤버가 조회할 명예훼손 소장 Id
     * @return 특정 명예훼손 소장 내용.
     */
    @GetMapping("/defamations/{memberId}/{defamationId}")
    @Operation(summary = "멤버의 특정 명예훼손 소장 조회", description = "멤버에 속한 특정 명예훼손 소장을 조회합니다.", tags = {"소장"})
    public BaseResponse<LawsuitDefamationDTO> getDefamtion(@PathVariable Long memberId, @PathVariable Long defamationId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 명예훼손 소장 조회에 성공하였습니다!", lawsuitService.getDefamtion(memberId, defamationId));
    }

    /**
     * 전체 명예훼손 소장 리스트.
     *
     * @return 전체 명예훼손 소장 리스트.
     */
    @GetMapping("/defamations")
    @Operation(summary = "전체 명예훼손 소장 리스트 조회", description = "전체 명예훼손 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitDefamationDTO>> getAllDefamations() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 명예훼손 소장 리스트 조회에 성공하였습니다!", lawsuitService.getAllDefamations());
    }

    /**
     * 멤버의 명예훼손 소장 추가.
     *
     * @param memberId 멤버 ID.
     * @param request  추가할 명예훼손 소장 정보.
     * @return 추가된 명예훼손 소장 정보.
     */
    @PostMapping("/defamations/{memberId}")
    @Operation(summary = "멤버의 명예훼손 소장 추가", description = "멤버에 속한 명예훼손 소장을 추가합니다.", tags = {"소장"})
    public BaseResponse<LawsuitDefamationDTO> createDefamation(
        @PathVariable Long memberId,
        @RequestBody @Valid LawsuitDefamationCreateUpdateRequestDTO request) {
        LawsuitDefamationDTO createDefamation = lawsuitService.createDefamation(memberId, request);
        return BaseResponse.success(HttpStatus.CREATED.value(), "명예훼손 소장이 추가되었습니다.", createDefamation);
    }

    /**
     * 멤버의 명예훼손 소장 삭제.
     *
     * @param memberId     멤버 ID
     * @param defamationId 삭제할 명예훼손 소장 ID
     */
    @DeleteMapping("/defamations/{memberId}/{defamationId}")
    @Operation(summary = "멤버의 명예훼손 소장 삭제", description = "멤버에 속한 명예훼손 소장을 삭제합니다.", tags = {"소장"})
    public BaseResponse<Void> deleteDefamation(
        @PathVariable Long memberId,
        @PathVariable Long defamationId) {
        lawsuitService.deleteDefamation(memberId, defamationId);
        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "명예훼손 소장이 삭제되었습니다.", null);
    }

    /**
     * 멤버의 명예훼손 소장 수정.
     *
     * @param memberId     멤버 ID
     * @param defamationId 수정할 명예훼손 소장 ID
     * @param request      수정할 명예훼손 소장 정보
     * @return 수정된 명예훼손 소장 정보
     */
    @PatchMapping("/defamations/{memberId}/{defamationId}")
    @Operation(summary = "멤버의 명예훼손 소장 수정", description = "멤버에 속한 명예훼손 소장을 수정합니다.", tags = {"소장"})
    public BaseResponse<LawsuitDefamationDTO> updateDefamation(
        @PathVariable Long memberId,
        @PathVariable Long defamationId,
        @RequestBody @Valid LawsuitDefamationCreateUpdateRequestDTO request) {
        LawsuitDefamationDTO updatedDefamation = lawsuitService.updateDefamation(memberId, defamationId, request);
        return BaseResponse.success(HttpStatus.OK.value(), "명예훼손 소장이 수정되었습니다.", updatedDefamation);
    }

    /**
     * 멤버의 모욕죄 리스트 조회.
     *
     * @param memberId 멤버 Id
     * @return 멤버의 모욕죄 리스트.
     */
    @GetMapping("/insults/{memberId}")
    @Operation(summary = "멤버의 모욕죄 소장 리스트 조회", description = "멤버에 속한 모욕죄 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitInsultListResponseDTO>> getInsults(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 모욕죄 소장 리스트 조회에 성공하였습니다!", lawsuitService.getInsults(memberId));
    }

    /**
     * 멤버의 모욕죄 특정 소장 조회.
     *
     * @param memberId 멤버 Id
     * @param insultId 멤버가 조회할 모욕죄 Id
     * @return 특정 모욕죄 내용.
     */
    @GetMapping("/insults/{memberId}/{insultId}")
    @Operation(summary = "멤버의 모욕죄 소장 특정 소장 조회", description = "멤버에 속한 특정 모욕죄 소장을 조회합니다.", tags = {"소장"})
    public BaseResponse<LawsuitInsultDTO> getInsult(@PathVariable Long memberId, @PathVariable Long insultId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 모욕죄 소장 조회에 성공하였습니다!", lawsuitService.getInsult(memberId, insultId));
    }

    /**
     * 전체 모욕죄 리스트 조회.
     *
     * @return 전체 모욕죄 리스트.
     */
    @GetMapping("/insults")
    @Operation(summary = "전체 모욕죄 소장 리스트 조회", description = "전체 모욕죄 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitInsultDTO>> getAllInsults() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 모욕죄 리스트 조회에 성공하였습니다!", lawsuitService.getAllInsults());
    }

    /**
     * 멤버의 모욕죄 소장 추가.
     *
     * @param memberId 멤버 ID
     * @param request  추가할 모욕죄 소장 정보.
     * @return 추가된 모욕죄 소장 정보.
     */
    @PostMapping("/insults/{memberId}")
    @Operation(summary = "멤버의 모욕죄 소장 추가", description = "멤버에 속한 사기죄 소장을 추가합니다.", tags = {"소장"})
    public BaseResponse<LawsuitInsultDTO> createInsult(
        @PathVariable Long memberId,
        @RequestBody @Valid LawsuitInsultCreateUpdateRequestDTO request) {
        LawsuitInsultDTO createdInsult = lawsuitService.createInsult(memberId, request);
        return BaseResponse.success(HttpStatus.CREATED.value(), "모욕죄 소장이 추가되었습니다.", createdInsult);
    }

    /**
     * 멤버의 모욕죄 소장 삭제.
     *
     * @param memberId 멤버 ID
     * @param insultId 삭제할 모욕죄 소장 ID
     */
    @DeleteMapping("/insults/{memberId}/{insultId}")
    @Operation(summary = "멤버의 모욕죄 소장 삭제", description = "멤버에 속한 모욕죄 소장을 삭제합니다.", tags = {"소장"})
    public BaseResponse<Void> deleteInsult(
        @PathVariable Long memberId,
        @PathVariable Long insultId) {
        lawsuitService.deleteInsult(memberId, insultId);
        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "모욕죄 소장이 삭제되었습니다.", null);
    }

    @PatchMapping("/insults/{memberId}/{insultId}")
    @Operation(summary = "멤버의 모욕죄 소장 수정", description = "멤버에 속한 모욕죄 소장을 수정합니다.", tags = {"소장"})
    public BaseResponse<LawsuitInsultDTO> updateInsult(
        @PathVariable Long memberId,
        @PathVariable Long insultId,
        @RequestBody @Valid LawsuitInsultCreateUpdateRequestDTO request) {
        LawsuitInsultDTO updatedInsult = lawsuitService.updateInsult(memberId, insultId, request);
        return BaseResponse.success(HttpStatus.OK.value(), "모욕죄 소장이 수정되었습니다.", updatedInsult);
    }

    /**
     * 멤버의 사기죄 리스트 조회.
     *
     * @param memberId 멤버 Id
     * @return 멤버의 사기죄 리스트.
     */
    @GetMapping("/frauds/{memberId}")
    @Operation(summary = "멤버의 사기죄 소장 리스트 조회", description = "멤버에 속한 사기죄 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitFraudListResponseDTO>> getFrauds(@PathVariable Long memberId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 사기죄 소장 리스트 조회에 성공하였습니다!", lawsuitService.getFrauds(memberId));
    }

    /**
     * 멤버의 사기죄 특정 소장 조회.
     *
     * @param memberId 멤버 Id
     * @param fraudId  멤버가 조회할 사기죄 Id
     * @return 특정 사기죄 내용.
     */
    @GetMapping("/frauds/{memberId}/{fraudId}")
    @Operation(summary = "멤버의 사기죄 소장 특정 소장 조회", description = "멤버에 속한 특정 사기죄 소장을 조회합니다.", tags = {"소장"})
    public BaseResponse<LawsuitFraudDTO> getFraud(@PathVariable Long memberId, @PathVariable Long fraudId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 사기죄 소장 조회에 성공하였습니다!", lawsuitService.getFraud(memberId, fraudId));
    }

    /**
     * 전체 사기죄 리스트 조회.
     *
     * @return 전체 사기죄 리스트.
     */
    @GetMapping("/frauds")
    @Operation(summary = "전체 사기죄 소장 리스트 조회", description = "전체 사기죄 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitFraudDTO>> getAllFrauds() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 사기죄 리스트 조회에 성공하였습니다!", lawsuitService.getAllFrauds());
    }

    /**
     * 멤버의 사기죄 소장 추가.
     *
     * @param memberId 멤버 ID.
     * @param request  추가할 사기죄 소장 정보.
     * @return 추가된 사기죄 소장 정보.
     */
    @PostMapping("/frauds/{memberId}")
    @Operation(summary = "멤버의 사기죄 소장 추가", description = "멤버에 속한 사기죄 소장을 추가합니다.", tags = {"소장"})
    public BaseResponse<LawsuitFraudDTO> createFraud(
        @PathVariable Long memberId,
        @RequestBody @Valid LawsuitFraudCreateUpdateRequestDTO request) {
        LawsuitFraudDTO createdFraud = lawsuitService.createFraud(memberId, request);
        return BaseResponse.success(HttpStatus.CREATED.value(), "사기죄 소장이 추가되었습니다.", createdFraud);
    }

    /**
     * 멤버의 사기죄 소장 삭제.
     *
     * @param memberId 멤버 ID
     * @param fraudId  삭제할 사기죄 소장 ID
     */
    @DeleteMapping("/frauds/{memberId}/{fraudId}")
    @Operation(summary = "멤버의 사기죄 소장 삭제", description = "멤버에 속한 사기죄 소장을 삭제합니다.", tags = {"소장"})
    public BaseResponse<Void> deleteFraud(
        @PathVariable Long memberId,
        @PathVariable Long fraudId) {
        lawsuitService.deleteFraud(memberId, fraudId);
        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "사기죄 소장이 삭제되었습니다.", null);
    }

    /**
     * 멤버의 사기죄 소장 수정.
     *
     * @param memberId 멤버 ID
     * @param fraudId  수정할 사기죄 소장 ID
     * @param request  수정할 사기죄 소장 정보
     * @return 수정된 사기죄 소장 정보
     */
    @PatchMapping("/frauds/{memberId}/{fraudId}")
    @Operation(summary = "멤버의 사기죄 소장 수정", description = "멤버에 속한 사기죄 소장을 수정합니다.", tags = {"소장"})
    public BaseResponse<LawsuitFraudDTO> updateFraud(
        @PathVariable Long memberId,
        @PathVariable Long fraudId,
        @RequestBody @Valid LawsuitFraudCreateUpdateRequestDTO request) {
        LawsuitFraudDTO updatedFraud = lawsuitService.updateFraud(memberId, fraudId, request);
        return BaseResponse.success(HttpStatus.OK.value(), "사기죄 소장이 수정되었습니다.", updatedFraud);
    }

}

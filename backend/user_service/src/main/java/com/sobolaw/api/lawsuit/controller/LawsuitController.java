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
public class LawsuitController {

    private LawsuitService lawsuitService;

    /**
     * 전체 소장 리스트 조회.
     */
    @GetMapping("list")
    @Operation(summary = "전체 소장 리스트 조회", description = "저장된 전체 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitListResponseDTO>> getLawsuits() {
        return BaseResponse.success((HttpStatus.OK.value()), "저장된 소장을 모두 조회했습니다.", lawsuitService.getLawsuits());
    }

    
    /**
     * 멤버의 전체 소장 리스트 조회.
     */
    @GetMapping("")
    @Operation(summary = "멤버의 전체 소장 리스트 조회", description = "멤버가 저장한 전체 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitListResponseDTO>> getAllLawsuits() {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 전체 소장 리스트 조회에 성공하였습니다.", lawsuitService.getAllLawsuits());
    }

    /**
     * 전체 명예훼손 소장 리스트.
     *
     * @return 전체 명예훼손 소장 리스트.
     */
    @GetMapping("/allDefamations")
    @Operation(summary = "전체 명예훼손 소장 리스트 조회", description = "전체 명예훼손 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitDefamationDTO>> getAllDefamations() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 명예훼손 소장 리스트 조회에 성공하였습니다!", lawsuitService.getAllDefamations());
    }

    /**
     * 멤버의 명예훼손 소장 리스트 조회.
     *
     * @return 멤버의 명예훼손 소장 리스트.
     */
    @GetMapping("/defamations/{memberId}")
    @Operation(summary = "멤버의 명예훼손 소장 리스트 조회", description = "멤버에 속한 명예훼손 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitDefamationListResponseDTO>> getDefamations() {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 명예훼손 소장 리스트 조회에 성공하였습니다!", lawsuitService.getDefamations());
    }

    /**
     * 멤버의 특정 명예훼손 소장 조회.
     *
     * @param defamationId 멤버가 조회할 명예훼손 소장 Id
     * @return 특정 명예훼손 소장 내용.
     */
    @GetMapping("/defamations/{defamationId}")
    @Operation(summary = "멤버의 특정 명예훼손 소장 조회", description = "멤버에 속한 특정 명예훼손 소장을 조회합니다.", tags = {"소장"})
    public BaseResponse<LawsuitDefamationDTO> getDefamtion(@PathVariable Long defamationId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 명예훼손 소장 조회에 성공하였습니다!", lawsuitService.getDefamtion(defamationId));
    }


    /**
     * 멤버의 명예훼손 소장 추가.
     *
     * @param request 추가할 명예훼손 소장 정보.
     * @return 추가된 명예훼손 소장 정보.
     */
    @PostMapping("/defamations")
    @Operation(summary = "멤버의 명예훼손 소장 추가", description = "멤버에 속한 명예훼손 소장을 추가합니다.", tags = {"소장"})
    public BaseResponse<LawsuitDefamationDTO> createDefamation(
        @RequestBody @Valid LawsuitDefamationCreateUpdateRequestDTO request) {
        LawsuitDefamationDTO createDefamation = lawsuitService.createDefamation(request);
        return BaseResponse.success(HttpStatus.CREATED.value(), "명예훼손 소장이 추가되었습니다.", createDefamation);
    }

    /**
     * 멤버의 명예훼손 소장 삭제.
     *
     * @param defamationId 삭제할 명예훼손 소장 ID
     */
    @DeleteMapping("/defamations/{defamationId}")
    @Operation(summary = "멤버의 명예훼손 소장 삭제", description = "멤버에 속한 명예훼손 소장을 삭제합니다.", tags = {"소장"})
    public BaseResponse<Void> deleteDefamation(
        @PathVariable Long defamationId) {
        lawsuitService.deleteDefamation(defamationId);
        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "명예훼손 소장이 삭제되었습니다.", null);
    }

    /**
     * 멤버의 명예훼손 소장 수정.
     *
     * @param defamationId 수정할 명예훼손 소장 ID
     * @param request      수정할 명예훼손 소장 정보
     * @return 수정된 명예훼손 소장 정보
     */
    @PatchMapping("/defamations/{defamationId}")
    @Operation(summary = "멤버의 명예훼손 소장 수정", description = "멤버에 속한 명예훼손 소장을 수정합니다.", tags = {"소장"})
    public BaseResponse<LawsuitDefamationDTO> updateDefamation(
        @PathVariable Long defamationId,
        @RequestBody @Valid LawsuitDefamationCreateUpdateRequestDTO request) {
        LawsuitDefamationDTO updatedDefamation = lawsuitService.updateDefamation(defamationId, request);
        return BaseResponse.success(HttpStatus.OK.value(), "명예훼손 소장이 수정되었습니다.", updatedDefamation);
    }

    /**
     * 전체 모욕죄 리스트 조회.
     *
     * @return 전체 모욕죄 리스트.
     */
    @GetMapping("/allInsults")
    @Operation(summary = "전체 모욕죄 소장 리스트 조회", description = "전체 모욕죄 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitInsultDTO>> getAllInsults() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 모욕죄 리스트 조회에 성공하였습니다!", lawsuitService.getAllInsults());
    }

    /**
     * 멤버의 모욕죄 리스트 조회.
     *
     * @return 멤버의 모욕죄 리스트.
     */
    @GetMapping("/insults")
    @Operation(summary = "멤버의 모욕죄 소장 리스트 조회", description = "멤버에 속한 모욕죄 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitInsultListResponseDTO>> getInsults() {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 모욕죄 소장 리스트 조회에 성공하였습니다!", lawsuitService.getInsults());
    }

    /**
     * 멤버의 모욕죄 특정 소장 조회.
     *
     * @param insultId 멤버가 조회할 모욕죄 Id
     * @return 특정 모욕죄 내용.
     */
    @GetMapping("/insults/{insultId}")
    @Operation(summary = "멤버의 모욕죄 소장 특정 소장 조회", description = "멤버에 속한 특정 모욕죄 소장을 조회합니다.", tags = {"소장"})
    public BaseResponse<LawsuitInsultDTO> getInsult(@PathVariable Long insultId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 모욕죄 소장 조회에 성공하였습니다!", lawsuitService.getInsult(insultId));
    }

    /**
     * 멤버의 모욕죄 소장 추가.
     *
     * @param request 추가할 모욕죄 소장 정보.
     * @return 추가된 모욕죄 소장 정보.
     */
    @PostMapping("/insults")
    @Operation(summary = "멤버의 모욕죄 소장 추가", description = "멤버에 속한 사기죄 소장을 추가합니다.", tags = {"소장"})
    public BaseResponse<LawsuitInsultDTO> createInsult(
        @RequestBody @Valid LawsuitInsultCreateUpdateRequestDTO request) {
        LawsuitInsultDTO createdInsult = lawsuitService.createInsult(request);
        return BaseResponse.success(HttpStatus.CREATED.value(), "모욕죄 소장이 추가되었습니다.", createdInsult);
    }

    /**
     * 멤버의 모욕죄 소장 삭제.
     *
     * @param insultId 삭제할 모욕죄 소장 ID
     */
    @DeleteMapping("/insults/{insultId}")
    @Operation(summary = "멤버의 모욕죄 소장 삭제", description = "멤버에 속한 모욕죄 소장을 삭제합니다.", tags = {"소장"})
    public BaseResponse<Void> deleteInsult(
        @PathVariable Long insultId) {
        lawsuitService.deleteInsult(insultId);
        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "모욕죄 소장이 삭제되었습니다.", null);
    }

    /**
     * 멤버의 모욕죄 소장 수정.
     *
     * @param insultId 소장 ID
     * @param request  수정내용
     * @return 수정된 소장
     */
    @PatchMapping("/insults/{insultId}")
    @Operation(summary = "멤버의 모욕죄 소장 수정", description = "멤버에 속한 모욕죄 소장을 수정합니다.", tags = {"소장"})
    public BaseResponse<LawsuitInsultDTO> updateInsult(
        @PathVariable Long insultId,
        @RequestBody @Valid LawsuitInsultCreateUpdateRequestDTO request) {
        LawsuitInsultDTO updatedInsult = lawsuitService.updateInsult(insultId, request);
        return BaseResponse.success(HttpStatus.OK.value(), "모욕죄 소장이 수정되었습니다.", updatedInsult);
    }

    /**
     * 전체 사기죄 리스트 조회.
     *
     * @return 전체 사기죄 리스트.
     */
    @GetMapping("/allFrauds")
    @Operation(summary = "전체 사기죄 소장 리스트 조회", description = "전체 사기죄 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitFraudDTO>> getAllFrauds() {
        return BaseResponse.success(HttpStatus.OK.value(), "전체 사기죄 리스트 조회에 성공하였습니다!", lawsuitService.getAllFrauds());
    }

    /**
     * 멤버의 사기죄 리스트 조회.
     *
     * @return 멤버의 사기죄 리스트.
     */
    @GetMapping("/frauds")
    @Operation(summary = "멤버의 사기죄 소장 리스트 조회", description = "멤버에 속한 사기죄 소장 리스트를 조회합니다.", tags = {"소장"})
    public BaseResponse<List<LawsuitFraudListResponseDTO>> getFrauds() {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 사기죄 소장 리스트 조회에 성공하였습니다!", lawsuitService.getFrauds());
    }

    /**
     * 멤버의 사기죄 특정 소장 조회.
     *
     * @param fraudId 멤버가 조회할 사기죄 Id
     * @return 특정 사기죄 내용.
     */
    @GetMapping("/frauds/{fraudId}")
    @Operation(summary = "멤버의 사기죄 소장 특정 소장 조회", description = "멤버에 속한 특정 사기죄 소장을 조회합니다.", tags = {"소장"})
    public BaseResponse<LawsuitFraudDTO> getFraud(@PathVariable Long fraudId) {
        return BaseResponse.success(HttpStatus.OK.value(), "멤버의 특정 사기죄 소장 조회에 성공하였습니다!", lawsuitService.getFraud(fraudId));
    }

    /**
     * 멤버의 사기죄 소장 추가.
     *
     * @param request 추가할 사기죄 소장 정보.
     * @return 추가된 사기죄 소장 정보.
     */
    @PostMapping("/frauds")
    @Operation(summary = "멤버의 사기죄 소장 추가", description = "멤버에 속한 사기죄 소장을 추가합니다.", tags = {"소장"})
    public BaseResponse<LawsuitFraudDTO> createFraud(
        @RequestBody @Valid LawsuitFraudCreateUpdateRequestDTO request) {
        LawsuitFraudDTO createdFraud = lawsuitService.createFraud(request);
        return BaseResponse.success(HttpStatus.CREATED.value(), "사기죄 소장이 추가되었습니다.", createdFraud);
    }

    /**
     * 멤버의 사기죄 소장 삭제.
     *
     * @param fraudId 삭제할 사기죄 소장 ID
     */
    @DeleteMapping("/frauds/{fraudId}")
    @Operation(summary = "멤버의 사기죄 소장 삭제", description = "멤버에 속한 사기죄 소장을 삭제합니다.", tags = {"소장"})
    public BaseResponse<Void> deleteFraud(
        @PathVariable Long fraudId) {
        lawsuitService.deleteFraud(fraudId);
        return BaseResponse.success(HttpStatus.NO_CONTENT.value(), "사기죄 소장이 삭제되었습니다.", null);
    }

    /**
     * 멤버의 사기죄 소장 수정.
     *
     * @param fraudId 수정할 사기죄 소장 ID
     * @param request 수정할 사기죄 소장 정보
     * @return 수정된 사기죄 소장 정보
     */
    @PatchMapping("/frauds/{fraudId}")
    @Operation(summary = "멤버의 사기죄 소장 수정", description = "멤버에 속한 사기죄 소장을 수정합니다.", tags = {"소장"})
    public BaseResponse<LawsuitFraudDTO> updateFraud(
        @PathVariable Long fraudId,
        @RequestBody @Valid LawsuitFraudCreateUpdateRequestDTO request) {
        LawsuitFraudDTO updatedFraud = lawsuitService.updateFraud(fraudId, request);
        return BaseResponse.success(HttpStatus.OK.value(), "사기죄 소장이 수정되었습니다.", updatedFraud);
    }

}

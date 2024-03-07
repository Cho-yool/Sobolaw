package com.sobolaw.api.precedent.controller;

import com.sobolaw.api.common.response.BaseResponse;
import com.sobolaw.api.precedent.dto.PrecedentDTO;
import com.sobolaw.api.precedent.service.PrecedentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/precedent")
@Tag(name = "PrecedentController", description = "판례 관련 기능")
@RequiredArgsConstructor
public class PrecedentController {

    private final PrecedentService precedentService;

    @GetMapping("/detail/{precedentId}")
    @Operation(summary = "관심판례 내용 조회", description = "저장된 판례ID로 판례 내용 조회")
    public BaseResponse<PrecedentDTO> getPrecedentDetail (@PathVariable Long precedentId) {
        PrecedentDTO precedent = precedentService.findPrecedentById(precedentId);
        return BaseResponse.success(HttpStatus.OK.value(), "판례 상세 조회 성공!", precedent);
    }

    @PostMapping("/list")
    @Operation(summary = "관심판례 목록 조회", description = "해당 판례ID 배열로 판례 목록 조회")
    public BaseResponse<List<PrecedentDTO>> getPrecedentList(@RequestBody Map<String, List<Long>> requestBody) {
        List<Long> precedentIds = requestBody.get("precedentId");
        List<PrecedentDTO> precedents = precedentService.findPrecedentsById(precedentIds);
        return BaseResponse.success(HttpStatus.OK.value(), "관심판례 목록 조회 성공!", precedents);
    }

    @GetMapping("/search/{searchKeyword}")
    @Operation(summary = "판례 검색", description = "키워드를 사용하여 판례 내용을 검색합니다.")
    public BaseResponse<List<PrecedentDTO>> searchStatutes(@PathVariable String searchKeyword) {
        List<PrecedentDTO> searchResults = precedentService.searchByKeyword(searchKeyword);
        return BaseResponse.success(HttpStatus.OK.value(), "판례 검색 성공!",searchResults);
    }

}
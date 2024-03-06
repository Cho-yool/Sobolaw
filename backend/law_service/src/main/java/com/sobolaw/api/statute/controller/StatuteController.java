package com.sobolaw.api.statute.controller;

import com.sobolaw.api.common.response.BaseResponse;
import com.sobolaw.api.statute.dto.StatuteSearchDTO;
import com.sobolaw.api.statute.service.StatuteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "StatuteController", description = "법령 검색 기능")
@RestController
@RequestMapping
public class StatuteController {

    private final StatuteService statuteService;

    public StatuteController(StatuteService statuteService) {
        this.statuteService = statuteService;
    }

    @GetMapping("/statute/search")
    @Operation(summary = "법령 검색", description = "키워드를 사용하여 법령 타이틀을 검색합니다.")
    public BaseResponse<List<StatuteSearchDTO>> searchStatutes(@RequestParam String searchKeyword) {
        List<StatuteSearchDTO> searchResults = statuteService.searchByKeyword(searchKeyword);
        return BaseResponse.success(HttpStatus.OK.value(), "법령 검색 성공!",searchResults);
    }
}
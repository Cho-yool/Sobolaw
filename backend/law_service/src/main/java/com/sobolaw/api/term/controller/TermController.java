package com.sobolaw.api.term.controller;

import com.sobolaw.api.common.response.BaseResponse;
import com.sobolaw.api.term.dto.TermDTO;
import com.sobolaw.api.term.service.TermService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/terms")
@Tag(name = "TermController", description = "법령 용어 관련 기능")
@RequiredArgsConstructor
public class TermController {

    private final TermService termService;

    @GetMapping("/search/{searchKeyword}")
    @Operation(summary = "법령용어 검색", description = "키워드를 사용하여 법령용어명, 법령용어정의 컬럼을 검색합니다.")
    public BaseResponse<List<TermDTO>> searchLegalTerm(@PathVariable String searchKeyword) throws IOException {
        List<TermDTO> searchResults = termService.searchByKeyword(searchKeyword);
        if (searchResults.isEmpty()) {
            return BaseResponse.success(HttpStatus.OK.value(), "해당 용어 정보가 없습니다.",searchResults);
        }
        return BaseResponse.success(HttpStatus.OK.value(), "법령용어 검색 성공!",searchResults);
    }
}
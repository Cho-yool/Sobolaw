package com.sobolaw.api.term.controller;

import com.sobolaw.api.common.response.BaseResponse;
import com.sobolaw.api.term.dto.LegalTermDTO;
import com.sobolaw.api.term.service.LegalTermService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/terms")
@Tag(name = "LegalTermController", description = "법령 용어 관련 기능")
@RequiredArgsConstructor
public class LegalTermController {

    private final LegalTermService legalTermService;

    @GetMapping("/search/{searchKeyword}")
    @Operation(summary = "법령용어 검색", description = "키워드를 사용하여 법령용어를 검색합니다.")
    public BaseResponse<List<LegalTermDTO>> searchLegalTerm(@PathVariable String searchKeyword) {
        List<LegalTermDTO> searchResults = legalTermService.searchByKeyword(searchKeyword);
        return BaseResponse.success(HttpStatus.OK.value(), "법령 검색 성공!",searchResults);
    }
}
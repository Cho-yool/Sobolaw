package com.sobolaw.api.statute.controller;

import com.sobolaw.api.statute.service.StatuteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "StatuteController", description = "법령 검색 기능")
@RestController
@RequestMapping
public class StatuteController {

    private final StatuteService statuteService;

    public StatuteController(StatuteService statuteService) {
        this.statuteService = statuteService;
    }

    @GetMapping("/statute/search")
    @Operation(summary = "법령 검색", description = "키워드를 사용하여 법령 타이틀과 내용을 검색합니다.")
    public ResponseEntity<List<Object[]>> searchStatutes(@RequestParam String keyword) {
        List<Object[]> searchList = statuteService.getSearchStatute(keyword);
        return ResponseEntity.ok(searchList);
    }
}
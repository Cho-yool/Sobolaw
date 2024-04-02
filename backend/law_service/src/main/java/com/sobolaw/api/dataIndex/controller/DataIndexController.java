package com.sobolaw.api.dataIndex.controller;

import com.sobolaw.api.dataIndex.service.DataIndexService;
import com.sobolaw.api.news.service.NewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/index")
@Tag(name = "DataIndexController", description = "색인작업 API")
@RequiredArgsConstructor
public class DataIndexController {

    private final DataIndexService dataIndexService;

    @PostMapping("/all")
    @Operation(summary = "색인 작업", description = "데이터베이스에 있는 데이터 -> 엘라스틱 서치 색인")
    public ResponseEntity<String> indexAllData() throws Exception {
        dataIndexService.indexAllData();
        return ResponseEntity.ok("Data indexing started.");
    }
}

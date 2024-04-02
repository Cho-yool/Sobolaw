package com.sobolaw.api.news.controller;

import com.sobolaw.api.news.service.NewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/news")
@Tag(name = "NewsController", description = "네이버 뉴스 API")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @GetMapping("/search/{searchKeyword}")
    @Operation(summary = "뉴스 검색", description = "키워드를 사용하여 네이버 뉴스를 검색")
    public ResponseEntity<String> searchNews(@PathVariable String searchKeyword) {
        try {
            String response = newsService.searchNews(searchKeyword);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

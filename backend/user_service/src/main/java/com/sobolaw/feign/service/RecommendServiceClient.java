package com.sobolaw.feign.service;

import com.sobolaw.feign.dto.response.PrecedentKeywordResponseDTO;
import com.sobolaw.global.common.response.BaseResponse;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * 다른 프로젝트와 통신.
 */
//@FeignClient(name = "recommend-service", path = "/api/recommend-service")
@FeignClient(name="recommend-service", url = "https://j10a604.p.ssafy.io/api/recommend-service")
public interface RecommendServiceClient {

    /**
     * 판례의 키워드 가져오기.
     */
    @GetMapping("/precedents/{precedentsId}/keywords")
    BaseResponse<List<PrecedentKeywordResponseDTO>> getPrecedentKeyword(@PathVariable Long precedentsId);
}

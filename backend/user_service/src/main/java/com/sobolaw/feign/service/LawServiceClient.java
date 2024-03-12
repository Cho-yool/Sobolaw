package com.sobolaw.feign.service;

import com.sobolaw.feign.dto.response.PrecedentListResponseDTO;
import com.sobolaw.feign.dto.response.PrecedentResponseDTO;
import com.sobolaw.global.common.response.BaseResponse;
import java.util.List;
import java.util.Map;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * 다른 프로젝트와 통신.
 */
@FeignClient(name = "law-service", path = "/api/law-service")
//@FeignClient(name="law-service", url = "https://j10a604.p.ssafy.io/api/law-service")
public interface LawServiceClient {

    /**
     * 판례 하나 가져오기.
     */
    @GetMapping("/precedent/detail/{precedentId}")
    BaseResponse<PrecedentResponseDTO> getPrecedentDetail(@PathVariable("precedentId") Long precedentId);

    /**
     * 판례 리스트 가져오기.
     */
    @PostMapping("/precedent/list")
    BaseResponse<List<PrecedentListResponseDTO>> getPrecedentList(@RequestBody Map<String, List<Long>> requestBody);


}

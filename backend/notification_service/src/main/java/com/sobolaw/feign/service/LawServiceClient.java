package com.sobolaw.feign.service;

import com.sobolaw.feign.dto.BaseResponse;
import com.sobolaw.feign.dto.PrecedentDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "law-service", path = "/api/law-service")
public interface LawServiceClient {

    @GetMapping("/precedent/detail/{precedentId}")
    BaseResponse<PrecedentDto> getPrecedent(@PathVariable("precedentId") Long precedentId);

}

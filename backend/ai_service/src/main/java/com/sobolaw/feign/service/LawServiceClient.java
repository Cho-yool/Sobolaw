package com.sobolaw.feign.service;

import com.sobolaw.feign.dto.LawDto;
import com.sobolaw.feign.dto.PrecedentSummaryDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="law-service", path = "/api/law-service")
public interface LawServiceClient {

    @GetMapping("/precedents/{precedentId}")
    LawDto getPrecedent(@PathVariable("precedentId") Long precedentId);

    @GetMapping("/precedents/summarys/{precedentSummaryId}")
    PrecedentSummaryDto getSummary(@PathVariable("precedentSummaryId") Long precedentSummaryId);

}

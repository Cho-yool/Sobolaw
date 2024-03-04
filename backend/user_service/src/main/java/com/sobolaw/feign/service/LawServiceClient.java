package com.sobolaw.feign.service;

import com.sobolaw.feign.dto.LawDto;
import java.util.List;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "law-service", path = "/api/law-service")
public interface LawServiceClient {

    @GetMapping("/{id}")
    LawDto get(@PathVariable("id") Long id);

    @GetMapping("/precedents")
    List<LawDto> getAllPrecedents();

}

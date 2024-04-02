package com.sobolaw.feign.service;

import com.sobolaw.feign.dto.BaseResponse;
import com.sobolaw.feign.dto.Member;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", path = "/api/user-service", fallback = UserServiceClientFallback.class)
//@FeignClient(name = "user-service", url = "https://j10a604.p.ssafy.io/api/user-service", fallback = UserServiceClientFallback.class)
public interface UserServiceClient {

    @GetMapping("/members/{memberId}")
    BaseResponse<Member> getMember(@PathVariable("memberId") long memberId);

}

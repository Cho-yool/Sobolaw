package com.sobolaw.feign.service;

import com.sobolaw.feign.dto.BaseResponse;
import com.sobolaw.feign.dto.Member;
import org.springframework.stereotype.Component;

@Component
public class UserServiceClientFallback implements UserServiceClient{

    @Override
    public BaseResponse<Member> getMember(Long memberId) {
        return new BaseResponse<>(201, "익명 사용자 생성", new Member(-1, "***", "ROLE_USER"));
    }
}

package com.sobolaw.feign.service;

import com.sobolaw.feign.dto.response.BaseResponse;
import com.sobolaw.feign.dto.response.Notification;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service", path = "/api/notification-service")
//@FeignClient(name = "notification-service", url = "https://j10a604.p.ssafy.io/api/notification-service")
public interface NotificationServiceClient {

    @PostMapping("/notifications")
    BaseResponse<Notification> sendNotification(@RequestBody Notification notification);

}

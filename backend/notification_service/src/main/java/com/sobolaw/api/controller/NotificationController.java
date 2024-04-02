package com.sobolaw.api.controller;

import com.sobolaw.api.model.dto.FCMToken;
import com.sobolaw.api.model.dto.Message;
import com.sobolaw.api.model.dto.Notification;
import com.sobolaw.api.service.NotificationService;
import com.sobolaw.feign.dto.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "NotificationController")
@RestController
@RequestMapping
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(summary = "토큰 확인", description = "해당 멤버의 FCMToken이 저장되어 있는지 확인")
    @GetMapping("/tokens/{memberId}")
    public BaseResponse<?> registerToken(@PathVariable long memberId) {
        FCMToken fcmToken = notificationService.getToken(memberId);
        if (fcmToken != null)
            return new BaseResponse<>(201, "저장된 토큰입니다", fcmToken);
        else
            return new BaseResponse<>(404, "저장되어 있지 않은 토큰 입니다.", null);
    }

    @Operation(summary = "토큰 저장", description = "memberId와 token을 받아 redis에 저장")
    @PostMapping("/tokens")
    public BaseResponse<?> registerToken(@RequestBody FCMToken fcmToken) {
        fcmToken = notificationService.registerToken(fcmToken);
        if (fcmToken != null)
            return new BaseResponse<>(201, "토큰이 저장되었습니다", fcmToken);
        else
            return new BaseResponse<>(400, "토큰 저장에 실패했습니다", null);
    }

    @Operation(summary = "알림 전송", description = "대상에게 알림 전송")
    @PostMapping("/notifications")
    public BaseResponse<?> sendNotification(@RequestBody Message message) {
        Notification data = notificationService.sendNotification(message);
        if (data == null)
            return new BaseResponse<>(404, "존재하지 않는 대상 입니다.", null);
        else if (data.getMemberId() == 0)
            return new BaseResponse<>(201, "알림이 저장되었고, 실시간 전송은 실패했습니다.", null);
        else
            return new BaseResponse<>(201, "알림이 실시간으로 전송되었습니다.", null);
    }

    @Operation(summary = "알림 목록 반환")
    @GetMapping("/notifications/{memberId}")
    public BaseResponse<?> getNotificationList(@PathVariable("memberId") long memberId){
        List<Notification> list =  notificationService.getNotificationList(memberId);
        return new BaseResponse<>(200, "알림 목록이 성공적으로 반환되었습니다", list);
    }

    @Operation(summary = "알림 읽음 처리")
    @PatchMapping("/notifications/{notificationId}")
    public BaseResponse<?> readNotification(@PathVariable("notificationId") long notificationId){
        Notification data = notificationService.readNotification(notificationId);
        return new BaseResponse<>(200, "알림 읽음 처리 완료", data);
    }

    @Operation(summary = "알림 삭제 처리")
    @DeleteMapping("/notifications/{notificationId}")
    public BaseResponse<?> deleteNotification(@PathVariable("notificationId") long notificationId){
        notificationService.deleteNotification(notificationId);
        return new BaseResponse<>(200, "알림 삭제 처리 완료", null);
    }


}

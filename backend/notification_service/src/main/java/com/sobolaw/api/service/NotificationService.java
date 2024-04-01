package com.sobolaw.api.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.sobolaw.api.model.dto.FCMToken;
import com.sobolaw.api.model.dto.Message;
import com.sobolaw.api.model.dto.Notification;
import com.sobolaw.api.repository.FCMTokenRepository;
import com.sobolaw.api.repository.NotificationRepository;
import com.sobolaw.feign.dto.Member;
import com.sobolaw.feign.service.UserServiceClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final FCMTokenRepository fcmTokenRepository;
    private final FirebaseMessaging firebaseMessaging;
    private final UserServiceClient userServiceClient;
    private final NotificationRepository notificationRepository;

    public FCMToken getToken(long memberId) {
        return fcmTokenRepository.findById(memberId).orElse(null);
    }

    public FCMToken registerToken(FCMToken fcmToken) {
        fcmToken = fcmTokenRepository.save(fcmToken);
        return fcmToken;
    }

    public Notification sendNotification(Message message) {

        FCMToken fcmToken = fcmTokenRepository.findById(message.getMemberId()).orElse(null);
        if (fcmToken == null)
            return null;

        com.google.firebase.messaging.Notification notification = com.google.firebase.messaging.Notification.builder()
                .setTitle(message.getTitle())
                .setBody(message.getBody())
                .build();
        com.google.firebase.messaging.Message msg = com.google.firebase.messaging.Message.builder()
                .setToken(fcmToken.getToken())
                .setNotification(notification)
                .build();

        try {
            firebaseMessaging.send(msg);

            Notification saveNotification = new Notification();
            saveNotification.setMemberId(message.getMemberId());
            saveNotification.setTitle(message.getTitle());
            saveNotification.setBody(message.getBody());
            registerNotification(saveNotification);

            return saveNotification;
        } catch (Exception e) {
            return null;
        }

    }

    public List<Notification> getNotificationList(long memberId){
        return notificationRepository.findAllByMemberId(memberId);
    }

    public Notification registerNotification(Notification notification){
        Member member = null;
        try{
            member = userServiceClient.getMember(notification.getMemberId()).getData();
        }catch (Exception e){
            return null;
        }
        if (member == null)
            return null;
        else
            return notificationRepository.save(notification);
    }

    @Transactional
    public Notification readNotification(long notificationId){
        Notification notification = notificationRepository.findByNotificationId(notificationId, Notification.class).orElse(null);
        if(notification != null)
            notification.setState(1);
        return notification;
    }
    @Transactional
    public void deleteNotification(long notificationId){
        Notification notification = notificationRepository.findByNotificationId(notificationId, Notification.class).orElse(null);
        if(notification != null)
            notification.setState(2);
    }


}

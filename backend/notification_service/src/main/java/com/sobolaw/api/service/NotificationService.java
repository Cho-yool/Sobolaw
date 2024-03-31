package com.sobolaw.api.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Notification;
import com.sobolaw.api.model.dto.FCMToken;
import com.sobolaw.api.model.dto.Message;
import com.sobolaw.api.repository.FCMTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final FCMTokenRepository fcmTokenRepository;
    private final FirebaseMessaging firebaseMessaging;

    public FCMToken getToken(long memberId) {
        return fcmTokenRepository.findById(memberId).orElse(null);
    }

    public FCMToken registerToken(FCMToken fcmToken) {
        fcmToken = fcmTokenRepository.save(fcmToken);
        return fcmToken;
    }

    public Message sendNotification(Message message) {

        FCMToken fcmToken = fcmTokenRepository.findById(message.getMemberId()).orElse(null);
        if (fcmToken == null)
            return null;

        if (message.getToken() != null) {
            Notification notification = Notification.builder()
                    .setTitle(message.getTitle())
                    .setBody(message.getBody())
                    .build();
            com.google.firebase.messaging.Message msg = com.google.firebase.messaging.Message.builder()
                    .setToken(fcmToken.getToken())
                    .setNotification(notification)
                    .build();

            try {
                firebaseMessaging.send(msg);
                return message;
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }

        } else {
            return null;
        }

    }


}

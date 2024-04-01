package com.sobolaw.api.repository;

import com.sobolaw.api.model.dto.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    <T> Optional<T> findByNotificationId(long notificationId, Class<T> type);
    List<Notification> findAllByMemberId(long memberId);
}

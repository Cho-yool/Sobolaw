package com.sobolaw.api.model.dto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@ToString
@Setter
@Getter
@Where(clause = "state in (0, 1)")
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Notification  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long notificationId;

    private long memberId;

    private String title;

    @Column(length = 21845)
    private String body;

    private int state = 0;

    @Column(name = "created_time", updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @CreatedDate
    private LocalDateTime createdTime;

}


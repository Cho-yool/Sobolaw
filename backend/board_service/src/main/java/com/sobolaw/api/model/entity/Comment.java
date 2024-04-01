package com.sobolaw.api.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

@Setter
@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Where(clause = "is_deleted = 0")
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    private long boardId;

    private long memberId;

    @Column(length = 21845)
    private String content;

}

package com.sobolaw.api.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Setter
@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Board extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;

    private long memberId;

    private String title;

    @Column(length = 21845)
    private String content;

    private long hit;

    private boolean isPublic;

    @OneToMany(mappedBy = "boardId", fetch = FetchType.LAZY)
    private List<Comment> comments;

}

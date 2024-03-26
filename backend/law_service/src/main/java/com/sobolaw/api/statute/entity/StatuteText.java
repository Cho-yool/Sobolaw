package com.sobolaw.api.statute.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "statute_text")
public class StatuteText {

    @Id
    private Long statuteId;

//    @Column
//    private Long statuteNumber;

    @Column
    private Long articleNumber;

    @Column
    private Long articleNumberSub;

    @Column
    private String articleType;

    @Column
    private String articleTitle;

    @Column(columnDefinition = "TEXT")
    private String articleContent;

    @Column(columnDefinition = "TEXT")
    private String articleContentSub;

    @Column
    private String articleEffectiveDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "statuteNumber")
    private Statute statute; // Statute 엔티티와의 Many-to-One 관계를 나타냄
}

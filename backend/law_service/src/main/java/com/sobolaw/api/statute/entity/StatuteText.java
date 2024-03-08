package com.sobolaw.api.statute.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "statute_text")
public class StatuteText {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long statuteId;

    @Column
    private Long statuteNumber;

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

}

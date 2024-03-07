package com.sobolaw.api.statute.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "statute_text")
public class StatuteText {

    @Id
    @Column
    private Long lawId;

    @Column
    private Long articleKey;

    @Column
    private Long articleNumber;

    @Column
    private String articleType;

    @Column
    private String articleTitle;

    @Column
    private String articleContent;

    @Column(columnDefinition = "TEXT")
    private String articleSubContent;

    @Column
    private String articleEffectiveDate;

}

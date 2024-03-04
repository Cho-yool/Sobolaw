package com.sobolaw.statute.entity;

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
    @Column(name = "statute_id")
    private Long lawId;

    @Column(name = "article_key")
    private Long articleKey;

    @Column(name = "article_number")
    private Long articleNumber;

    @Column(name = "article_type", length = 225)
    private String articleType;

    @Column(name = "article_title", length = 225)
    private String articleTitle;

    @Column(name = "article_content", length = 225)
    private String articleContent;

    @Column(name = "article_sub_content", length = 21845)
    private String articleSubContent;

    @Column(name = "article_effective_date", length = 225)
    private String articleEffectiveDate;

}

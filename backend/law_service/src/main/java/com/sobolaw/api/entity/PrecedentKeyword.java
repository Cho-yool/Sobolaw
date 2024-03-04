package com.sobolaw.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "precedent_keyword")
public class PrecedentKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "precedent_keyword_id")
    private Long precedentKeywordId;

    @Column(name = "precedent_id", nullable = false)
    private Long precedentId;

    @Column(name = "keyword", length = 255)
    private String keyword;

}

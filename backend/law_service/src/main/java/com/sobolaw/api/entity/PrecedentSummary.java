package com.sobolaw.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "precedent_summary")
public class PrecedentSummary {

    @Id
    @Column(name = "precedent_id")
    private Long precedentId;

    @Column(name = "summary_short", length = 21845)
    private String summaryShort;

    @Column(name = "summary_long", length = 21845)
    private String summaryLong;

}

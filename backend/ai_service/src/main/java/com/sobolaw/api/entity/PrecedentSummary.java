package com.sobolaw.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class PrecedentSummary {

    @Id
    private Long precedentId;

    @Column(columnDefinition = "TEXT")
    private String summary;

}

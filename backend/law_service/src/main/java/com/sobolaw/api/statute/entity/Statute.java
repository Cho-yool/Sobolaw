package com.sobolaw.api.statute.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "statute")
public class Statute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long statuteId;

    @Column(columnDefinition = "TEXT")
    private String statuteName;

    @Column
    private String statuteType;

    @Column
    private String department;

    @Column
    private String amendmentType;

    @Column
    private String publicationNumber;

    @Column
    private String publicationDate;

    @Column
    private String enforcementDate;

    @Column
    private String statuteNumber;

}

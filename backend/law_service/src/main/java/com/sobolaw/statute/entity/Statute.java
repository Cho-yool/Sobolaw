package com.sobolaw.statute.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "statute")
public class Statute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "statute_id")
    private Long statuteId;

    @Column(name = "statute_name", length = 21845)
    private String statuteName;

    @Column(name = "statute_type", length = 255)
    private String statuteType;

    @Column(name = "department", length = 255)
    private String department;

    @Column(name = "amendment_type", length = 255)
    private String amendmentType;

    @Column(name = "publication_number", length = 255)
    private String publicationNumber;

    @Column(name = "publication_date", length = 255)
    private String publicationDate;

    @Column(name = "enforcement_date", length = 255)
    private String enforcementDate;

    @Column(name = "statute_number", length = 255)
    private String statuteNumber;

}

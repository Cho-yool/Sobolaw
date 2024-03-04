package com.sobolaw.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "legal_term")
public class LegalTerm {
    @Id
    @Column(name = "term_id")
    private Long termId;

    @Column(name = "term_name", length = 255)
    private String termName;

    @Column(name = "term_definition", length = 21845)
    private String termDefinition;
}

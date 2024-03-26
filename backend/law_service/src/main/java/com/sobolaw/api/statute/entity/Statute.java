package com.sobolaw.api.statute.entity;

import com.sobolaw.api.statute.document.StatuteTextDocument;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity(name = "statute")
public class Statute {

    @Id
    private Long sjqtatuteNumber;

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

    // 1:N 관계 설정
    // Statute : StatuteTextDocument
    @OneToMany(mappedBy = "statute", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<StatuteText> statuteTexts;

}


package com.sobolaw.api.statute.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "statute")
public class Statute {

    @Id
    private Long statuteNumber;

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
    @OneToMany(mappedBy = "statute", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "statuteNumber")
    private List<StatuteText> statuteTexts = new ArrayList<>();

}


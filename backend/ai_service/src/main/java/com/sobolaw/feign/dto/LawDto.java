package com.sobolaw.feign.dto;

import lombok.Data;

@Data
public class LawDto {

    private Long id;
    private String lawName;
    private String lawType;
    private String department;
    private String amendmentType;
    private String publicationNumber;
    private String publicationDate;
    private String enforcementDate;
    private String lawNumber;

}

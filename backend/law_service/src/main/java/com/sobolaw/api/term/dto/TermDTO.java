package com.sobolaw.api.term.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TermDTO {

    private Long termId;
    private String termName;
    private String termDefinition;

}

package com.sobolaw.api.term.service;

import com.sobolaw.api.term.dto.LegalTermDTO;
import com.sobolaw.api.term.entity.LegalTerm;
import com.sobolaw.api.term.repository.LegalTermRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LegalTermService {

    private final LegalTermRepository legalTermRepository;

    public List<LegalTermDTO> searchByKeyword(String searchKeyword) {

        List<LegalTerm> legalTerms = legalTermRepository.findByTermNameContaining(searchKeyword);

        return legalTerms.stream()
            .map(this::convertToLegalTermDTO)
            .collect(Collectors.toList());
    }

    private LegalTermDTO convertToLegalTermDTO(LegalTerm legalTerm) {
        return new LegalTermDTO(
            legalTerm.getTermId(),
            legalTerm.getTermName(),
            legalTerm.getTermDefinition()
        );
    }

}
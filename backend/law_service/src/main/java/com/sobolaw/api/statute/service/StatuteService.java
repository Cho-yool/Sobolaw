package com.sobolaw.api.statute.service;

import com.sobolaw.api.statute.dto.StatuteSearchDTO;
import com.sobolaw.api.statute.entity.Statute;
import com.sobolaw.api.statute.repository.StatuteRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StatuteService {

    private final StatuteRepository statuteRepository;

    public List<StatuteSearchDTO> searchByKeyword(String searchKeyword) {

        List<Statute> statutes = statuteRepository.findByStatuteNameContaining(searchKeyword);

        if (statutes.isEmpty()) {
            throw new IllegalArgumentException("해당 키워드 관련 법령이 없습니다. searchKeyword=" + searchKeyword);
        }

        return statutes.stream()
            .map(this::convertToStatuteSearchDTO)
            .collect(Collectors.toList());
    }

    private StatuteSearchDTO convertToStatuteSearchDTO(Statute statute) {
        return new StatuteSearchDTO(
            statute.getStatuteId(),
            statute.getAmendmentType(),
            statute.getDepartment(),
            statute.getEnforcementDate(),
            statute.getPublicationDate(),
            statute.getPublicationNumber(),
            statute.getStatuteName(),
            statute.getStatuteNumber(),
            statute.getStatuteType()
        );
    }

}
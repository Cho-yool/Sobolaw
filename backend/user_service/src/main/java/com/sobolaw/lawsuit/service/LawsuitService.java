package com.sobolaw.lawsuit.service;

import com.sobolaw.lawsuit.dto.LawsuitDefamationDTO;
import com.sobolaw.lawsuit.entity.LawsuitDefamation;
import com.sobolaw.lawsuit.repository.LawsuitDefamationRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 소장 Service.
 */
@Service
@AllArgsConstructor
public class LawsuitService {

    private LawsuitDefamationRepository lawsuitDefamationRepository;

    public List<LawsuitDefamationDTO> getLawsuitsByMemberId(Long memberId) {
        List<LawsuitDefamation> lawsuits = lawsuitDefamationRepository.findByMember_memberId(memberId);
        return lawsuits.stream()
            .map(LawsuitDefamationDTO::from)
            .collect(Collectors.toList());
    }

    public LawsuitDefamationDTO getLawsuit(Long memberId, Long lawsuitId) {
        LawsuitDefamation lawsuit = lawsuitDefamationRepository.findByMember_memberIdAndLawsuitDefamationId(memberId, lawsuitId);
        return LawsuitDefamationDTO.from(lawsuit);
    }

    public List<LawsuitDefamationDTO> getAllLawsuits() {
        List<LawsuitDefamation> lawsuits = lawsuitDefamationRepository.findAll();
        return lawsuits.stream()
            .map(LawsuitDefamationDTO::from)
            .collect(Collectors.toList());
    }
}

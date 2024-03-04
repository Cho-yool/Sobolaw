package com.sobolaw.api.statute.service;

import com.sobolaw.api.statute.repository.StatuteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatuteService {

    private final StatuteRepository statuteRepository;

    public StatuteService(StatuteRepository statuteRepository) {
        this.statuteRepository = statuteRepository;
    }

    public List<Object[]> getSearchStatute(String searchKeyword) {
        return statuteRepository.getSearchStatute(searchKeyword);
    }
}
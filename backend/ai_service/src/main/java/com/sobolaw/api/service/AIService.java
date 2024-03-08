package com.sobolaw.api.service;

import com.sobolaw.api.entity.PrecedentSummary;
import com.sobolaw.api.repository.PrecedentSummaryRepository;
import com.sobolaw.feign.dto.PrecedentDto;
import com.sobolaw.feign.service.LawServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AIService {

    private final PrecedentSummaryRepository precedentSummaryRepository;
    private final LawServiceClient lawServiceClient;

    public PrecedentSummary getSummary(Long precedentId){
        PrecedentSummary precedentSummary = precedentSummaryRepository.findById(precedentId).orElse(null);
        if (precedentSummary == null){
            PrecedentDto precedentDto = lawServiceClient.getPrecedent(precedentId).getData();
            precedentSummary = new PrecedentSummary();
            precedentSummary.setPrecedentId(precedentDto.getPrecedentId());
            precedentSummary.setSummary(summary(precedentDto.getCaseContent()));
        }
        return precedentSummary;
    }

    public String chat(String question){
        // GPT 호출
        return "[GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변" +
                "GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변GPT답변]";
    }


    public String summary(String content){
        // GPT 호출
        // PrecedentSummary 저장
        return "[요약내용요약내용요약내용요약내용요약내용요약내용요약내용요약내용요약내용요약내용요약내용" +
                "요약내용요약내용요약내용요약내용요약내용요약내용요약내용요약내용요약내용요약내용요약내용]";
    }
    

}

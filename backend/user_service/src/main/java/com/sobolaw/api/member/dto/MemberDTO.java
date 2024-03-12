package com.sobolaw.api.member.dto;

import com.sobolaw.api.lawsuit.dto.LawsuitDefamationDTO;
import com.sobolaw.api.lawsuit.dto.LawsuitFraudDTO;
import com.sobolaw.api.lawsuit.dto.LawsuitInsultDTO;
import com.sobolaw.api.member.entity.Member;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * DTO for {@link Member}.
 */
public record MemberDTO(Long memberId, String name, String email, LocalDate birthday, List<MemberKeywordDTO> memberKeyword, List<MemberRecentDTO> memberRecents,
                        List<MemberPrecedentDTO> memberPrecedents, List<LawsuitFraudDTO> lawsuitFrauds, List<LawsuitInsultDTO> lawsuitInsults, List<LawsuitDefamationDTO> lawsuitDefamations) implements
    Serializable {

    public static MemberDTO of(Long memberId, String name, String email, LocalDate birthday, List<MemberKeywordDTO> memberKeyword, List<MemberRecentDTO> memberRecents,
        List<MemberPrecedentDTO> memberPrecedents, List<LawsuitFraudDTO> lawsuitFrauds, List<LawsuitInsultDTO> lawsuitInsults, List<LawsuitDefamationDTO> lawsuitDefamations) {
        return new MemberDTO(memberId, name, email, birthday, memberKeyword, memberRecents, memberPrecedents, lawsuitFrauds, lawsuitInsults, lawsuitDefamations);
    }

    /**
     * Member 엔티티를 MemberDto로 변환하는 메소드.
     */
    public static MemberDTO from(Member entity) {
        List<MemberKeywordDTO> memberKeywordDTOs = entity.getMemberKeyword().stream().map(MemberKeywordDTO::from).collect(Collectors.toList());

        List<MemberRecentDTO> memberRecentDTOs = entity.getMemberRecents().stream().map(MemberRecentDTO::from).collect(Collectors.toList());

        List<MemberPrecedentDTO> memberPrecedentDTOs = entity.getMemberPrecedents().stream().map(MemberPrecedentDTO::from).collect(Collectors.toList());

        List<LawsuitFraudDTO> lawsuitFraudDTOS = entity.getLawsuitFrauds().stream().map(LawsuitFraudDTO::from).toList();

        List<LawsuitInsultDTO> lawsuitInsultDTOS = entity.getLawsuitInsults().stream().map(LawsuitInsultDTO::from).toList();

        List<LawsuitDefamationDTO> lawsuitDefamationDTOS = entity.getLawsuitDefamations().stream().map(LawsuitDefamationDTO::from).toList();

        return new MemberDTO(entity.getMemberId(), entity.getName(), entity.getEmail(), entity.getBirthday(), memberKeywordDTOs, memberRecentDTOs, memberPrecedentDTOs, lawsuitFraudDTOS,
            lawsuitInsultDTOS, lawsuitDefamationDTOS);
    }

    /**
     * MemberDto를 Member로 변환하는 메소드.
     */
    public static Member toEntity(MemberDTO dto) {
        return Member.of(dto.name(), dto.email(), dto.birthday());
    }

}
package com.sobolaw.api.member.dto.response;

import com.sobolaw.api.lawsuit.dto.response.LawsuitDefamationListResponseDTO;
import com.sobolaw.api.lawsuit.dto.response.LawsuitFraudListResponseDTO;
import com.sobolaw.api.lawsuit.dto.response.LawsuitInsultListResponseDTO;
import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.entity.Type.RoleType;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 멤버 조회 ResponseDTO.
 */
public record MemberResponseDTO(Long memberId, String name, String email, RoleType role, LocalDate birthday, List<MemberKeywordResponseDTO> memberKeyword, List<MemberRecentResponseDTO> memberRecents,
                                List<MemberPrecedentResponseDTO> memberPrecedents, List<LawsuitDefamationListResponseDTO> lawsuitDefamationListResponseDTOList,
                                List<LawsuitFraudListResponseDTO> lawsuitFraudListResponseDTOList, List<LawsuitInsultListResponseDTO> lawsuitInsultListResponseDTOList) {

    /**
     * Member 엔티티를 MemberResponseDTO 로 변환하는 메소드.
     */
    public static MemberResponseDTO from(Member entity) {
        List<MemberKeywordResponseDTO> memberKeywordDTOs = entity.getMemberKeyword().stream().map(MemberKeywordResponseDTO::from).collect(Collectors.toList());
        System.out.println("1 = " + memberKeywordDTOs);
        List<MemberRecentResponseDTO> memberRecentDTOs = entity.getMemberRecents().stream().map(MemberRecentResponseDTO::from).collect(Collectors.toList());
        System.out.println("2" + memberRecentDTOs);
        List<MemberPrecedentResponseDTO> memberPrecedentDTOs = entity.getMemberPrecedents().stream().map(MemberPrecedentResponseDTO::from).collect(Collectors.toList());
        System.out.println("3" + memberPrecedentDTOs);
        List<LawsuitDefamationListResponseDTO> lawsuitDefamationListResponseDTOS = entity.getLawsuitDefamations().stream().map(LawsuitDefamationListResponseDTO::from).toList();
        List<LawsuitFraudListResponseDTO> lawsuitFraudListResponseDTOS = entity.getLawsuitFrauds().stream().map(LawsuitFraudListResponseDTO::from).toList();
        List<LawsuitInsultListResponseDTO> LawsuitInsultListResponseDTOs = entity.getLawsuitInsults().stream().map(LawsuitInsultListResponseDTO::from).toList();
        return new MemberResponseDTO(entity.getMemberId(), entity.getName(), entity.getEmail(), entity.getRole(), entity.getBirthday(), memberKeywordDTOs, memberRecentDTOs, memberPrecedentDTOs,
            lawsuitDefamationListResponseDTOS, lawsuitFraudListResponseDTOS, LawsuitInsultListResponseDTOs);
    }
}

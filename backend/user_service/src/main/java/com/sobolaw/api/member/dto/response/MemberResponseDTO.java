package com.sobolaw.api.member.dto.response;

import com.sobolaw.api.member.dto.MemberKeywordDTO;
import com.sobolaw.api.member.dto.MemberRecentDTO;
import com.sobolaw.api.member.entity.Member;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 멤버 조회 ResponseDTO.
 */
public record MemberResponseDTO(Long memberId, String name, String email, LocalDate birthday, List<MemberKeywordDTO> memberKeyword, List<MemberRecentDTO> memberRecents) {

    /**
     * Member 엔티티를 MemberResponseDTO 로 변환하는 메소드.
     */
    public static MemberResponseDTO from(Member entity) {
        List<MemberKeywordDTO> memberKeywordDTOs = entity.getMemberKeyword().stream().map(MemberKeywordDTO::from).collect(Collectors.toList());
        List<MemberRecentDTO> memberRecentDTOs = entity.getMemberRecents().stream().map(MemberRecentDTO::from).collect(Collectors.toList());
        return new MemberResponseDTO(entity.getMemberId(), entity.getName(), entity.getEmail(), entity.getBirthday(), memberKeywordDTOs, memberRecentDTOs);
    }
}

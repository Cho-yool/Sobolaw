package com.sobolaw.member.dto;

import com.sobolaw.member.entity.Member;
import com.sobolaw.member.entity.MemberKeyword;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;

/**
 * DTO for {@link Member}.
 */
public record MemberDTO(Long memberId, String name, String email, LocalDate birthday,
                        List<MemberKeywordDTO> memberKeyword, List<MemberRecentDTO> memberRecents,
                        List<MemberPrecedentDTO> memberPrecedents) implements Serializable {

    public static MemberDTO of(Long memberId, String name, String email, LocalDate birthday,
        List<MemberKeywordDTO> memberKeyword, List<MemberRecentDTO> memberRecents,
        List<MemberPrecedentDTO> memberPrecedents) {
        return new MemberDTO(memberId, name, email, birthday, memberKeyword, memberRecents,
            memberPrecedents);
    }

    /**
     * Member 엔티티를 MemberDto로 변환하는 메소드.
     */
    public static MemberDTO from(Member entity) {
        List<MemberKeywordDTO> memberKeywordDTOs = entity.getMemberKeyword()
            .stream()
            .map(MemberKeywordDTO::from)
            .collect(Collectors.toList());

        List<MemberRecentDTO> memberRecentDTOs = entity.getMemberRecents()
            .stream()
            .map(MemberRecentDTO::from)
            .collect(Collectors.toList());

        List<MemberPrecedentDTO> memberPrecedentDTOs = entity.getMemberPrecedents()
            .stream()
            .map(MemberPrecedentDTO::from)
            .collect(Collectors.toList());

        return new MemberDTO(
            entity.getMemberId(),
            entity.getName(),
            entity.getEmail(),
            entity.getBirthday(),
            memberKeywordDTOs,
            memberRecentDTOs,
            memberPrecedentDTOs
        );
    }

    /**
     * MemberDto를 Member로 변환하는 메소드.
     */
    public static Member toEntity(MemberDTO dto) {
        return Member.of(
            dto.name(),
            dto.email(),
            dto.birthday()
        );
    }

}
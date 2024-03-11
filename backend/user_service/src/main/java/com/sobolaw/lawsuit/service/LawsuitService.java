package com.sobolaw.lawsuit.service;

import com.sobolaw.lawsuit.dto.LawsuitDefamationDTO;
import com.sobolaw.lawsuit.dto.LawsuitFraudDTO;
import com.sobolaw.lawsuit.dto.LawsuitInsultDTO;
import com.sobolaw.lawsuit.dto.request.LawsuitDefamationCreateUpdateRequestDTO;
import com.sobolaw.lawsuit.dto.request.LawsuitFraudCreateUpdateRequestDTO;
import com.sobolaw.lawsuit.dto.request.LawsuitInsultCreateUpdateRequestDTO;
import com.sobolaw.lawsuit.dto.response.LawsuitDefamationListResponseDTO;
import com.sobolaw.lawsuit.dto.response.LawsuitFraudListResponseDTO;
import com.sobolaw.lawsuit.dto.response.LawsuitInsultListResponseDTO;
import com.sobolaw.lawsuit.dto.response.LawsuitListResponseDTO;
import com.sobolaw.lawsuit.entity.LawsuitDefamation;
import com.sobolaw.lawsuit.entity.LawsuitFraud;
import com.sobolaw.lawsuit.entity.LawsuitInsult;
import com.sobolaw.lawsuit.exception.LawsuitErrorCode;
import com.sobolaw.lawsuit.exception.LawsuitException;
import com.sobolaw.lawsuit.repository.LawsuitDefamationRepository;
import com.sobolaw.lawsuit.repository.LawsuitFraudRepository;
import com.sobolaw.lawsuit.repository.LawsuitInsultRepository;
import com.sobolaw.member.entity.Member;
import com.sobolaw.member.exception.MemberErrorCode;
import com.sobolaw.member.exception.MemberException;
import com.sobolaw.member.repository.MemberRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 소장 Service.
 */
@Service
@AllArgsConstructor
public class LawsuitService {

    private MemberRepository memberRepository;
    private LawsuitDefamationRepository lawsuitDefamationRepository;
    private LawsuitInsultRepository lawsuitInsultRepository;
    private LawsuitFraudRepository lawsuitFraudRepository;

    /**
     * 멤버 전체 소장 리스트 조회.
     */
    public List<LawsuitListResponseDTO> getAllLawsuits(Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        List<LawsuitListResponseDTO> lawsuits = new ArrayList<>();

        List<LawsuitDefamation> defamations = lawsuitDefamationRepository.findByMember(member);
        lawsuits.addAll(defamations.stream()
            .map(LawsuitDefamationListResponseDTO::from)
            .toList());

        List<LawsuitInsult> insults = lawsuitInsultRepository.findByMember(member);
        lawsuits.addAll(insults.stream()
            .map(LawsuitInsultListResponseDTO::from)
            .toList());

        List<LawsuitFraud> frauds = lawsuitFraudRepository.findByMember(member);
        lawsuits.addAll(frauds.stream()
            .map(LawsuitFraudListResponseDTO::from)
            .toList());

        return lawsuits;
    }
    /**
     * 멤버의 명예훼손 소장 리스트 조회.
     *
     * @param memberId 멤버 아이디.
     * @return 멤버의 명예훼손 소장 리스트.
     */
    public List<LawsuitDefamationListResponseDTO> getDefamations(Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        List<LawsuitDefamation> defamations = lawsuitDefamationRepository.findByMember(member);
        return defamations.stream()
            .map(LawsuitDefamationListResponseDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 멤버의 명예훼손 소장 중 특정 소장.
     *
     * @param memberId     멤버 아이디.
     * @param defamationId 소장아이디.
     * @return 특정 명예훼손 소장.
     */
    public LawsuitDefamationDTO getDefamtion(Long memberId, Long defamationId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        LawsuitDefamation lawsuit = lawsuitDefamationRepository.findByMemberAndLawsuitDefamationId(member, defamationId)
            .orElseThrow(() -> new LawsuitException(LawsuitErrorCode.NOT_FOUND_LAWSUIT));

        return LawsuitDefamationDTO.from(lawsuit);
    }

    /**
     * 전체 명예훼손 소장 리스트.
     *
     * @return 체 명예훼손 소장 리스트.
     */
    public List<LawsuitDefamationDTO> getAllDefamations() {
        List<LawsuitDefamation> lawsuits = lawsuitDefamationRepository.findAll();
        return lawsuits.stream()
            .map(LawsuitDefamationDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 멤버의 모욕 소장 목록 조회.
     *
     * @param memberId 회원 ID.
     * @return 회원과 연관된 모욕 소장 목록.
     */
    public List<LawsuitInsultListResponseDTO> getInsults(Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        List<LawsuitInsult> insults = lawsuitInsultRepository.findByMember(member);
        return insults.stream()
            .map(LawsuitInsultListResponseDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 멤버의 특정 모욕 소장 조회.
     *
     * @param memberId 회원 ID.
     * @param insultId 모욕 소장 ID.
     * @return 특정 모욕 소장의 상세 정보.
     */
    public LawsuitInsultDTO getInsult(Long memberId, Long insultId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        LawsuitInsult insult = lawsuitInsultRepository.findByMemberAndLawsuitInsultId(member, insultId)
            .orElseThrow(() -> new LawsuitException(LawsuitErrorCode.NOT_FOUND_LAWSUIT));
        return LawsuitInsultDTO.from(insult);
    }

    /**
     * 모든 모욕 소장 목록 조회.
     *
     * @return 모든 모욕 소장 목록.
     */
    public List<LawsuitInsultDTO> getAllInsults() {
        List<LawsuitInsult> insults = lawsuitInsultRepository.findAll();
        return insults.stream()
            .map(LawsuitInsultDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 멤버의 사기 소장 목록 조회.
     *
     * @param memberId 회원 ID.
     * @return 회원과 연관된 사기 소장 목록.
     */
    public List<LawsuitFraudListResponseDTO> getFrauds(Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        List<LawsuitFraud> frauds = lawsuitFraudRepository.findByMember(member);
        return frauds.stream()
            .map(LawsuitFraudListResponseDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 멤버의 특정 사기 소장 조회.
     *
     * @param memberId 회원 ID.
     * @param fraudId  사기 소장 ID.
     * @return 특정 사기 소장의 상세 정보.
     */
    public LawsuitFraudDTO getFraud(Long memberId, Long fraudId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        LawsuitFraud fraud = lawsuitFraudRepository.findByMemberAndLawsuitFraudId(member, fraudId)
            .orElseThrow(() -> new LawsuitException(LawsuitErrorCode.NOT_FOUND_LAWSUIT));

        return LawsuitFraudDTO.from(fraud);
    }

    /**
     * 모든 사기 소장 목록 조회.
     *
     * @return 모든 사기 소장 목록.
     */
    public List<LawsuitFraudDTO> getAllFrauds() {
        List<LawsuitFraud> frauds = lawsuitFraudRepository.findAll();
        return frauds.stream()
            .map(LawsuitFraudDTO::from)
            .collect(Collectors.toList());
    }

    /**
     * 새로운 명예훼손 소장 추가.
     *
     * @param memberId 멤버 ID.
     * @param request  새로운 명예훼손 소장 정보.
     * @return 추가된 명예훼손 소장 정보.
     */
    @Transactional
    public LawsuitDefamationDTO createDefamation(Long memberId, LawsuitDefamationCreateUpdateRequestDTO request) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        LawsuitDefamation newDefamation = LawsuitDefamation.of(
            request.title(),
            request.plaintiffName(),
            request.plaintiffResidentRegistrationNumber(),
            request.plaintiffAddress(),
            request.plaintiffPhoneNumber(),
            request.defendantName(),
            request.defendantAddress(),
            request.defendantPhoneNumber(),
            request.defendantIdentificationDetails(),
            request.incidentDate(),
            request.incidentTime(),
            request.location(),
            request.defamationContent(),
            request.isFalseAccusation(),
            request.relatedPeople(),
            request.evidence(),
            request.submissionDate(),
            request.policeStationTeam()
        );

        // Member와 연결
        newDefamation.setMember(member);

        // Repository를 사용하여 저장
        LawsuitDefamation savedDefamation = lawsuitDefamationRepository.save(newDefamation);

        // 저장된 Entity를 DTO로 변환하여 반환
        return LawsuitDefamationDTO.from(savedDefamation);
    }

    /**
     * 새로운 사기죄 소장 추가.
     *
     * @param memberId 멤버 ID.
     * @param request  새로운 사기죄 소장 정보.
     * @return 추가된 사기죄 소장 정보.
     */
    @Transactional
    public LawsuitFraudDTO createFraud(Long memberId, LawsuitFraudCreateUpdateRequestDTO request) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        LawsuitFraud newFraud = LawsuitFraud.of(
            request.title(),
            request.plaintiffName(),
            request.plaintiffResidentRegistrationNumber(),
            request.plaintiffAddress(),
            request.plaintiffPhoneNumber(),
            request.defendantName(),
            request.defendantAddress(),
            request.defendantPhoneNumber(),
            request.contactDate(),
            request.contactTime(),
            request.tradeSite(),
            request.tradedItem(),
            request.depositDate(),
            request.depositTime(),
            request.depositAmount(),
            request.contactMethod(),
            request.isCashDeposit(),
            request.bankName(),
            request.accountNumber(),
            request.evidence(),
            request.policeStationTeam()
        );
        newFraud.setMember(member);

        LawsuitFraud savedFraud = lawsuitFraudRepository.save(newFraud);

        return LawsuitFraudDTO.from(savedFraud);
    }

    /**
     * 새로운 모욕죄 소장 추가.
     *
     * @param memberId 멤버 ID.
     * @param request  새로운 모욕죄 소장 정보.
     * @return 추가된 모욕죄 소장 정보.
     */
    @Transactional
    public LawsuitInsultDTO createInsult(Long memberId, LawsuitInsultCreateUpdateRequestDTO request) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        LawsuitInsult newInsult = LawsuitInsult.of(
            request.title(),
            request.plaintiffName(),
            request.plaintiffResidentRegistrationNumber(),
            request.plaintiffAddress(),
            request.plaintiffPhoneNumber(),
            request.plaintiffNickname(),
            request.defendantName(),
            request.defendantNickname(),
            request.defendantAddress(),
            request.defendantPhoneNumber(),
            request.incidentDate(),
            request.incidentTime(),
            request.onlineServiceType(),
            request.webServiceDetails(),
            request.problemSpeech(),
            request.reasonsForInsult(),
            request.relatedPeopleCount(),
            request.witness1(),
            request.witness2(),
            request.witness3(),
            request.insultDuration(),
            request.insultFrequency(),
            request.circumstancesForIdentification(),
            request.evidence(),
            request.submissionDate(),
            request.policeStationTeam()
        );

        // Member와 연결
        newInsult.setMember(member);

        // Repository를 사용하여 저장
        LawsuitInsult savedInsult = lawsuitInsultRepository.save(newInsult);

        // 저장된 Entity를 DTO로 변환하여 반환
        return LawsuitInsultDTO.from(savedInsult);
    }

    /**
     * 멤버의 모욕죄 소장 소프트 삭제.
     *
     * @param memberId 멤버 ID.
     * @param insultId 삭제할 모욕죄 소장 ID.
     */
    @Transactional
    public void deleteInsult(Long memberId, Long insultId) {
        // 멤버 찾기
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 멤버의 소송 중에서 소장 찾기
        LawsuitInsult insult = lawsuitInsultRepository.findByMemberAndLawsuitInsultId(member, insultId)
            .orElseThrow(() -> new LawsuitException(LawsuitErrorCode.NOT_FOUND_LAWSUIT));

        // 필요한 경우 추가 권한 확인 등의 로직 수행

        // 소장을 소프트 삭제 처리
        insult.softDelete();

        // 업데이트된 소장 엔티티를 저장하여 삭제되었음을 표시
        lawsuitInsultRepository.save(insult);
    }

    /**
     * 멤버의 사기죄 소장 소프트 삭제.
     *
     * @param memberId 멤버 ID.
     * @param fraudId  삭제할 사기죄 소장 ID.
     */
    @Transactional
    public void deleteFraud(Long memberId, Long fraudId) {
        // 멤버 찾기
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 멤버의 소송 중에서 소장 찾기
        LawsuitFraud fraud = lawsuitFraudRepository.findByMemberAndLawsuitFraudId(member, fraudId)
            .orElseThrow(() -> new LawsuitException(LawsuitErrorCode.NOT_FOUND_LAWSUIT));

        // 필요한 경우 추가 권한 확인 등의 로직 수행

        // 소장을 소프트 삭제 처리
        fraud.softDelete();

        // 업데이트된 소장 엔티티를 저장하여 삭제되었음을 표시
        lawsuitFraudRepository.save(fraud);
    }

    /**
     * 멤버의 명예훼손 소장 소프트 삭제.
     *
     * @param memberId     멤버 ID.
     * @param defamationId 삭제할 명예훼손 소장 ID.
     */
    @Transactional
    public void deleteDefamation(Long memberId, Long defamationId) {
        // 멤버 찾기
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 멤버의 소송 중에서 소장 찾기
        LawsuitDefamation defamation = lawsuitDefamationRepository.findByMemberAndLawsuitDefamationId(member, defamationId)
            .orElseThrow(() -> new LawsuitException(LawsuitErrorCode.NOT_FOUND_LAWSUIT));

        // 필요한 경우 추가 권한 확인 등의 로직 수행

        // 소장을 소프트 삭제 처리
        defamation.softDelete();

        // 업데이트된 소장 엔티티를 저장하여 삭제되었음을 표시
        lawsuitDefamationRepository.save(defamation);
    }

    /**
     * 멤버의 명예훼손 소장 수정.
     *
     * @param memberId     멤버 ID.
     * @param defamationId 수정할 명예훼손 소장 ID.
     * @param request      수정할 명예훼손 소장 정보.
     * @return 수정된 명예훼손 소장 정보.
     */
    @Transactional
    public LawsuitDefamationDTO updateDefamation(Long memberId, Long defamationId, LawsuitDefamationCreateUpdateRequestDTO request) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        LawsuitDefamation defamation = lawsuitDefamationRepository.findByMemberAndLawsuitDefamationId(member, defamationId)
            .orElseThrow(() -> new LawsuitException(LawsuitErrorCode.NOT_FOUND_LAWSUIT));

        if (request.title() != null) {
            defamation.setTitle(request.title());
        }
        if (request.plaintiffName() != null) {
            defamation.setPlaintiffName(request.plaintiffName());
        }
        if (request.plaintiffResidentRegistrationNumber() != null) {
            defamation.setPlaintiffResidentRegistrationNumber(request.plaintiffResidentRegistrationNumber());
        }
        if (request.plaintiffAddress() != null) {
            defamation.setPlaintiffAddress(request.plaintiffAddress());
        }
        if (request.plaintiffPhoneNumber() != null) {
            defamation.setPlaintiffPhoneNumber(request.plaintiffPhoneNumber());
        }
        if (request.defendantName() != null) {
            defamation.setDefendantName(request.defendantName());
        }
        if (request.defendantAddress() != null) {
            defamation.setDefendantAddress(request.defendantAddress());
        }
        if (request.defendantPhoneNumber() != null) {
            defamation.setDefendantPhoneNumber(request.defendantPhoneNumber());
        }
        if (request.defendantIdentificationDetails() != null) {
            defamation.setDefendantIdentificationDetails(request.defendantIdentificationDetails());
        }
        if (request.incidentDate() != null) {
            defamation.setIncidentDate(request.incidentDate());
        }
        if (request.incidentTime() != null) {
            defamation.setIncidentTime(request.incidentTime());
        }
        if (request.location() != null) {
            defamation.setLocation(request.location());
        }
        if (request.defamationContent() != null) {
            defamation.setDefamationContent(request.defamationContent());
        }
        if (request.isFalseAccusation()) {
            defamation.setFalseAccusation(request.isFalseAccusation());
        }
        if (request.relatedPeople() != null) {
            defamation.setRelatedPeople(request.relatedPeople());
        }
        if (request.evidence() != null) {
            defamation.setEvidence(request.evidence());
        }
        if (request.submissionDate() != null) {
            defamation.setSubmissionDate(request.submissionDate());
        }
        if (request.policeStationTeam() != null) {
            defamation.setPoliceStationTeam(request.policeStationTeam());
        }

        // 업데이트된 defamation 엔터티를 저장합니다.
        LawsuitDefamation updatedDefamation = lawsuitDefamationRepository.save(defamation);

        return LawsuitDefamationDTO.from(updatedDefamation);
    }

    /**
     * 멤버의 모욕죄 소장 수정.
     *
     * @param memberId 멤버 ID.
     * @param insultId 수정할 모욕죄 소장 ID.
     * @param request  수정할 모욕죄 소장 정보.
     * @return 수정된 모욕죄 소장 정보.
     */
    @Transactional
    public LawsuitInsultDTO updateInsult(Long memberId, Long insultId, LawsuitInsultCreateUpdateRequestDTO request) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        LawsuitInsult insult = lawsuitInsultRepository.findByMemberAndLawsuitInsultId(member, insultId)
            .orElseThrow(() -> new LawsuitException(LawsuitErrorCode.NOT_FOUND_LAWSUIT));

        if (request.title() != null) {
            insult.setTitle(request.title());
        }
        if (request.plaintiffName() != null) {
            insult.setPlaintiffName(request.plaintiffName());
        }
        if (request.plaintiffResidentRegistrationNumber() != null) {
            insult.setPlaintiffResidentRegistrationNumber(request.plaintiffResidentRegistrationNumber());
        }
        if (request.plaintiffAddress() != null) {
            insult.setPlaintiffAddress(request.plaintiffAddress());
        }
        if (request.plaintiffPhoneNumber() != null) {
            insult.setPlaintiffPhoneNumber(request.plaintiffPhoneNumber());
        }
        if (request.plaintiffNickname() != null) {
            insult.setPlaintiffNickname(request.plaintiffNickname());
        }
        if (request.defendantName() != null) {
            insult.setDefendantName(request.defendantName());
        }
        if (request.defendantNickname() != null) {
            insult.setDefendantName(request.defendantNickname());
        }
        if (request.defendantAddress() != null) {
            insult.setDefendantAddress(request.defendantAddress());
        }
        if (request.defendantPhoneNumber() != null) {
            insult.setDefendantPhoneNumber(request.defendantPhoneNumber());
        }
        if (request.incidentDate() != null) {
            insult.setIncidentDate(request.incidentDate());
        }
        if (request.onlineServiceType() != null) {
            insult.setOnlineServiceType(request.onlineServiceType());
        }
        if (request.webServiceDetails() != null) {
            insult.setWebServiceDetails(request.webServiceDetails());
        }
        if (request.problemSpeech() != null) {
            insult.setProblemSpeech(request.problemSpeech());
        }
        if (request.reasonsForInsult() != null) {
            insult.setReasonsForInsult(request.reasonsForInsult());
        }
        if (request.relatedPeopleCount() != null) {
            insult.setRelatedPeopleCount(request.relatedPeopleCount());
        }
        if (request.witness1() != null) {
            insult.setWitness1(request.witness1());
        }
        if (request.witness2() != null) {
            insult.setWitness2(request.witness2());
        }
        if (request.witness3() != null) {
            insult.setWitness3(request.witness3());
        }
        if (request.insultDuration() != null) {
            insult.setInsultDuration(request.insultDuration());
        }
        if (request.insultFrequency() != null) {
            insult.setInsultFrequency(request.insultFrequency());
        }
        if (request.circumstancesForIdentification() != null) {
            insult.setCircumstancesForIdentification(request.circumstancesForIdentification());
        }
        if (request.evidence() != null) {
            insult.setEvidence(request.evidence());
        }
        if (request.submissionDate() != null) {
            insult.setSubmissionDate(request.submissionDate());
        }
        if (request.policeStationTeam() != null) {
            insult.setPoliceStationTeam(request.policeStationTeam());
        }

        LawsuitInsult updatedInsult = lawsuitInsultRepository.save(insult);

        return LawsuitInsultDTO.from(updatedInsult);
    }

    /**
     * 멤버의 사기죄 소장 수정.
     *
     * @param memberId 멤버 ID.
     * @param fraudId  수정할 사기죄 소장 ID.
     * @param request  수정할 사기죄 소장 정보.
     * @return 수정된 사기죄 소장 정보.
     */
    @Transactional
    public LawsuitFraudDTO updateFraud(Long memberId, Long fraudId, LawsuitFraudCreateUpdateRequestDTO request) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        LawsuitFraud fraud = lawsuitFraudRepository.findByMemberAndLawsuitFraudId(member, fraudId)
            .orElseThrow(() -> new LawsuitException(LawsuitErrorCode.NOT_FOUND_LAWSUIT));

        if (request.title() != null) {
            fraud.setTitle(request.title());
        }
        if (request.plaintiffName() != null) {
            fraud.setPlaintiffName(request.plaintiffName());
        }
        if (request.plaintiffResidentRegistrationNumber() != null) {
            fraud.setPlaintiffResidentRegistrationNumber(request.plaintiffResidentRegistrationNumber());
        }
        if (request.plaintiffAddress() != null) {
            fraud.setPlaintiffAddress(request.plaintiffAddress());
        }
        if (request.plaintiffPhoneNumber() != null) {
            fraud.setPlaintiffPhoneNumber(request.plaintiffPhoneNumber());
        }
        if (request.defendantName() != null) {
            fraud.setDefendantName(request.defendantName());
        }
        if (request.defendantAddress() != null) {
            fraud.setDefendantAddress(request.defendantAddress());
        }
        if (request.defendantPhoneNumber() != null) {
            fraud.setDefendantPhoneNumber(request.defendantPhoneNumber());
        }
        if (request.contactDate() != null) {
            fraud.setContactDate(request.contactDate());
        }
        if (request.contactTime() != null) {
            fraud.setContactTime(request.contactTime());
        }
        if (request.tradeSite() != null) {
            fraud.setTradeSite(request.tradeSite());
        }
        if (request.tradedItem() != null) {
            fraud.setTradedItem(request.tradedItem());
        }
        if (request.depositDate() != null) {
            fraud.setDepositDate(request.depositDate());
        }
        if (request.depositTime() != null) {
            fraud.setDepositTime(request.depositTime());
        }
        if (request.depositAmount() != 0) {
            fraud.setDepositAmount(request.depositAmount());
        }
        if (request.contactMethod() != null) {
            fraud.setContactMethod(request.contactMethod());
        }
        if (request.isCashDeposit()) {
            fraud.setCashDeposit(request.isCashDeposit());
        }
        if (request.bankName() != null) {
            fraud.setBankName(request.bankName());
        }
        if (request.accountNumber() != null) {
            fraud.setAccountNumber(request.accountNumber());
        }
        if (request.evidence() != null) {
            fraud.setEvidence(request.evidence());
        }
        if (request.policeStationTeam() != null) {
            fraud.setPoliceStationTeam(request.policeStationTeam());
        }

        LawsuitFraud updatedFraud = lawsuitFraudRepository.save(fraud);

        return LawsuitFraudDTO.from(updatedFraud);
    }


}

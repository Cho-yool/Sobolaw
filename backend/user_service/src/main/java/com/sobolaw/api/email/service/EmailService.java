package com.sobolaw.api.email.service;

import com.sobolaw.api.email.exception.EmailErrorCode;
import com.sobolaw.api.email.exception.EmailException;
import com.sobolaw.api.member.entity.Member;
import com.sobolaw.api.member.exception.MemberErrorCode;
import com.sobolaw.api.member.exception.MemberException;
import com.sobolaw.api.member.repository.MemberRepository;
import com.sobolaw.global.security.jwt.JwtProvider;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    private final MemberRepository memberRepository;
    private final JavaMailSender emailSender;
    private final JwtProvider jwtProvider;

    @Value("${spring.mail.username}")
    private String fromUser;

    /**
     * 메일 전송.
     */
    public void sendEmail(MultipartFile file) throws MessagingException, IOException, EmailException {
        Long currentMemberId = jwtProvider.getMemberId();
        Member member = memberRepository.findById(currentMemberId)
            .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));
        log.info("메일 받을 유저 찾기 " + member);

        String subject = "[SOBOLAW] 작성된 소장이 발송되었습니다.";
        String content = "안녕하세요 " + member.getName() + "님.\n\n";
        content += "고객님께서 작성하신 소장을 보내드렸습니다.\n\n";
        content += "저희 서비스를 이용해주셔서 감사합니다.";

        // 파일을 ByteArray로 변환하여 리소스로 설정
        ByteArrayResource resource = new ByteArrayResource(file.getBytes());

        // 메일 내용 넣을 객체와, 이를 도와주는 Helper 객체 생성
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        // 메일 내용을 채워줌
        helper.setFrom(fromUser, "SOBOLAW");
        log.info("발신자 이메일 : " + member.getEmail());
        helper.setTo(member.getEmail());
        helper.setSubject(subject);
        helper.setText(content);

        // 파일 첨부
        helper.addAttachment(file.getOriginalFilename(), resource);

        // 이메일 전송
        try {
            emailSender.send(message);
        } catch (MailException e) {
            log.error("메일 전송 중 에러 발생", e);
            throw new EmailException(EmailErrorCode.FAIL_SEND_MAIL);
        }
    }




}

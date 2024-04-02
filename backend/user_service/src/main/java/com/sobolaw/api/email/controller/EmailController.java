package com.sobolaw.api.email.controller;

import com.sobolaw.api.email.exception.EmailException;
import com.sobolaw.api.email.service.EmailService;
import com.sobolaw.global.common.response.BaseResponse;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.mail.MessagingException;
import java.io.IOException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * 메일 전송 controller.
 */
@Slf4j
@RequestMapping("/mail")
@RestController
@AllArgsConstructor
public class EmailController {

    private EmailService emailService;

    /**
     * 작성된 소장 메일 전송.
     */
    @PostMapping("/lawsuits")
    @Operation(summary = "유저에게 소장 메일 전송", description = "유저에게 소장 메일을 전송합니다.", tags = {"메일"})
    public BaseResponse<?> sendEmail(@RequestPart("file") MultipartFile file) throws MessagingException, IOException, EmailException {
        log.info("메일 발송 시작");
        emailService.sendEmail(file);
        log.info("메일 발송 완");
        return BaseResponse.success(HttpStatus.OK.value(), "메일 전송을 완료했습니다.", null);
    }




}

package com.sobolaw.global.common.exception;

import com.sobolaw.api.lawsuit.exception.LawsuitException;
import com.sobolaw.api.mail.exception.MailException;
import com.sobolaw.global.common.response.BaseResponse;
import com.sobolaw.api.member.exception.MemberException;
import com.sobolaw.global.security.jwt.exception.TokenException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


/**
 * 전체 Exception Handler.
 */
@Slf4j
@RestControllerAdvice
public class GlobalControllerAdvice {

    /**
     * Member Exception Handler.
     */
    @ExceptionHandler(MemberException.class)
    public ResponseEntity<?> applicationHandler(MemberException e) {
        log.error("Member Error occurs {}", e.toString());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
            .body(BaseResponse.error(e.getErrorCode().getHttpStatus().value(), e.getMessage()));
    }

    /**
     * Lawsuit Exception Handler.
     */
    @ExceptionHandler(LawsuitException.class)
    public ResponseEntity<?> applicationHandler(LawsuitException e) {
        log.error("Lawsuit Error occurs {}", e.toString());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
            .body(BaseResponse.error(e.getErrorCode().getHttpStatus().value(), e.getMessage()));
    }

    /**
     * Token Exception Handler.
     */
    @ExceptionHandler(TokenException.class)
    public ResponseEntity<?> applicationHandler(TokenException e) {
        log.error("Token Error occurs {}", e.toString());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
            .body(BaseResponse.error(e.getErrorCode().getHttpStatus().value(), e.getMessage()));
    }

    /**
     * Mail Exception Handler.
     */
    @ExceptionHandler(MailException.class)
    public ResponseEntity<?> applicationHandler(MailException e) {
        log.error("Mail Error occurs {}", e.toString());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
            .body(BaseResponse.error(e.getErrorCode().getHttpStatus().value(), e.getMessage()));
    }

}

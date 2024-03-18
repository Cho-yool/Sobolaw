package com.sobolaw.global.security.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.token.Token;
import org.springframework.stereotype.Service;

@Setter
@Getter
public class CustomToken implements Token {
    private String accessToken;
    private String refreshToken;

    @Override
    public String getKey() {
        return null;
    }

    @Override
    public long getKeyCreationTime() {
        return 0;
    }

    @Override
    public String getExtendedInformation() {
        return null;
    }
}

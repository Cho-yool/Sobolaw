package com.sobolaw.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.OAuthFlow;
import io.swagger.v3.oas.annotations.security.OAuthFlows;
import io.swagger.v3.oas.annotations.security.OAuthScope;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
    info = @Info(title = "SoBoLaw API 명세서",
        description = "SoBoLaw API 명세서 입니다.",
        version = "v1.0.0"))
@Configuration
@SecurityScheme(
    name = "OAuth2",
    type = SecuritySchemeType.OAUTH2,
    flows = @OAuthFlows(
        implicit = @OAuthFlow(authorizationUrl = "http://localhost:8001.com/auth",
            scopes = {
                @OAuthScope(name = "read", description = "Read access"),
                @OAuthScope(name = "write", description = "Write access")
            }
        )
    )
)
@RequiredArgsConstructor
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi customTestOpenAPi() {
        String[] paths = {"/**"};

        return GroupedOpenApi
            .builder()
            .group("SoBoLaw API")
            .pathsToMatch(paths)
            .build();
    }

    @Operation(summary = "Naver OAuth2 Authorization Endpoint", description = "Endpoint for initiating OAuth2 authorization with Naver.")
    public void naverOAuth2Authorization() {}

    @Operation(summary = "Kakao OAuth2 Authorization Endpoint", description = "Endpoint for initiating OAuth2 authorization with Kakao.")
    public void kakaoOAuth2Authorization() {}
}

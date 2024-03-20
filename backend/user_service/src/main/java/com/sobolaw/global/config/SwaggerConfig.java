package com.sobolaw.global.config;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.OAuthFlow;
import io.swagger.v3.oas.annotations.security.OAuthFlows;
import io.swagger.v3.oas.annotations.security.OAuthScope;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


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
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .addServersItem(new Server().url("https://j10a604.p.ssafy.io/api/user-service").description("요청 서버"))
            .info(new io.swagger.v3.oas.models.info.Info()
                .title("User-Service")
                .version("1.0")
                .description("User 기능 당당")
                .contact(new Contact().name("장재성").email("")));
    }

    @Operation(summary = "Naver OAuth2 Authorization Endpoint", description = "Endpoint for initiating OAuth2 authorization with Naver.")
    public void naverOAuth2Authorization() {
    }

    @Operation(summary = "Kakao OAuth2 Authorization Endpoint", description = "Endpoint for initiating OAuth2 authorization with Kakao.")
    public void kakaoOAuth2Authorization() {
    }

}

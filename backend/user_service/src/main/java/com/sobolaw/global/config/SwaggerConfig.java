package com.sobolaw.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
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
}

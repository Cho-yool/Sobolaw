package com.sobolaw.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
    info = @Info(title = "SoBoLaw API 명세서",
        description = "SoBoLaw API 명세서 입니다.",
        version = "v1.0.0"))
@Configuration
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
}

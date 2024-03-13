package com.sobolaw;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@EnableDiscoveryClient
@EnableFeignClients
public class SobolawApplication {

    public static void main(String[] args) {
        SpringApplication.run(SobolawApplication.class, args);
    }

    // swagger config (http://localhost:8002/api/ai-service/swagger-ui.html)
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .addServersItem(new Server().url("https://j10a604.p.ssafy.io/api/ai-service").description("요청 서버"))
                .info(new Info()
                        .title("AI-Service")
                        .version("1.0")
                        .description("GPT4를 이용한 기능 담당")
                        .contact(new Contact().name("김종범").email("")));
    }
	
}

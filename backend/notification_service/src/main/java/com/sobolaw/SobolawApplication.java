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

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class SobolawApplication {

    public static void main(String[] args) {
        SpringApplication.run(SobolawApplication.class, args);
    }
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .addServersItem(new Server().url("https://j10a604.p.ssafy.io/api/notification-service").description("요청 서버"))
                .info(new Info()
                        .title("Notification-Service")
                        .version("1.0")
                        .description("FCM을 이용한 알림 기능")
                        .contact(new Contact().name("김종범").email("")));
    }

}

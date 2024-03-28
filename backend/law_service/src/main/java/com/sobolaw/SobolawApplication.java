package com.sobolaw;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
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
//    public class SobolawApplication implements CommandLineRunner {
//
//    @Autowired
//    private StatuteDatabaseIndexer statuteDatabaseIndexer;
//    @Autowired
//    private StatuteTextDatabaseIndexer statuteTextDatabaseIndexer;
//    @Autowired
//    private PrecedentDatabaseIndexer precedentDatabaseIndexer;
//    @Autowired
//    private TermDatabaseIndexer termDatabaseIndexer;

    public static void main(String[] args) {
        SpringApplication.run(SobolawApplication.class, args);
    }

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .addServersItem(new Server().url("https://j10a604.p.ssafy.io/api/law-service").description("요청 서버"))
                .info(new io.swagger.v3.oas.models.info.Info()
                        .title("Law-Service")
                        .version("1.0")
                        .description("법률 기능 당당")
                        .contact(new Contact().name("정소영").email("")));
    }
	
//    @Override
//    public void run(String... args) throws Exception {
        // Elasticsearch에 데이터 색인하기
//        statuteDatabaseIndexer.indexDataFromDatabase();
//        statuteTextDatabaseIndexer.indexDataFromDatabase();
//        precedentDatabaseIndexer.indexDataFromDatabase();
//        termDatabaseIndexer.indexDataFromDatabase();
//    }
}

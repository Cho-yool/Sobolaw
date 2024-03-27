package com.sobolaw;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.beans.factory.annotation.Autowired;
import com.sobolaw.api.precedent.index.PrecedentDatabaseIndexer;
import com.sobolaw.api.statute.index.StatuteDatabaseIndexer;
import com.sobolaw.api.statute.index.StatuteTextDatabaseIndexer;
import com.sobolaw.api.term.index.TermDatabaseIndexer;
import org.springframework.boot.CommandLineRunner;

@SpringBootApplication
@EnableJpaAuditing
@EnableDiscoveryClient
@EnableFeignClients
//public class SobolawApplication {
    public class SobolawApplication implements CommandLineRunner {

    @Autowired
    private StatuteDatabaseIndexer statuteDatabaseIndexer;
    @Autowired
    private StatuteTextDatabaseIndexer statuteTextDatabaseIndexer;
    @Autowired
    private PrecedentDatabaseIndexer precedentDatabaseIndexer;
    @Autowired
    private TermDatabaseIndexer termDatabaseIndexer;

    public static void main(String[] args) {
        SpringApplication.run(SobolawApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Elasticsearch에 데이터 색인하기
//        statuteDatabaseIndexer.indexDataFromDatabase();
//        statuteTextDatabaseIndexer.indexDataFromDatabase();
        precedentDatabaseIndexer.indexDataFromDatabase();
        termDatabaseIndexer.indexDataFromDatabase();
    }
}

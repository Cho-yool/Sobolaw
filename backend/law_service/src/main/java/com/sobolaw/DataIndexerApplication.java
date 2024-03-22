package com.sobolaw;

import com.sobolaw.api.precedent.index.PrecedentDatabaseIndexer;
import com.sobolaw.api.statute.index.StatuteDatabaseIndexer;
import com.sobolaw.api.statute.index.StatuteTextDatabaseIndexer;
import com.sobolaw.api.term.index.TermDatabaseIndexer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DataIndexerApplication implements CommandLineRunner {

    @Autowired
    private StatuteDatabaseIndexer statuteDatabaseIndexer;
    @Autowired
    private StatuteTextDatabaseIndexer statuteTextDatabaseIndexer;
    @Autowired
    private PrecedentDatabaseIndexer precedentDatabaseIndexer;
    @Autowired
    private TermDatabaseIndexer termDatabaseIndexer;


    public static void main(String[] args) {
        SpringApplication.run(DataIndexerApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Elasticsearch에 데이터 색인하기
//        statuteDatabaseIndexer.indexDataFromDatabase();
//        statuteTextDatabaseIndexer.indexDataFromDatabase();
//        precedentDatabaseIndexer.indexDataFromDatabase();
//        termDatabaseIndexer.indexDataFromDatabase();
    }
}

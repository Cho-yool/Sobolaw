package com.sobolaw.api.dataIndex.service;

import com.sobolaw.api.dataIndex.index.PrecedentDatabaseIndexer;
import com.sobolaw.api.dataIndex.index.StatuteDatabaseIndexer;
import com.sobolaw.api.dataIndex.index.StatuteTextDatabaseIndexer;
import com.sobolaw.api.dataIndex.index.TermDatabaseIndexer;
import com.sobolaw.api.dataIndex.ilm.ElasticsearchILM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataIndexService {

    @Autowired
    private StatuteDatabaseIndexer statuteDatabaseIndexer;
    @Autowired
    private StatuteTextDatabaseIndexer statuteTextDatabaseIndexer;
    @Autowired
    private PrecedentDatabaseIndexer precedentDatabaseIndexer;
    @Autowired
    private TermDatabaseIndexer termDatabaseIndexer;
    @Autowired
    private ElasticsearchILM elasticsearchILM;

    public void indexAllData() throws Exception {
        statuteDatabaseIndexer.indexDataFromDatabase();
        statuteTextDatabaseIndexer.indexDataFromDatabase();
        precedentDatabaseIndexer.indexDataFromDatabase();
        termDatabaseIndexer.indexDataFromDatabase();
        elasticsearchILM.applyILMPolicy();
    }

}

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { List, Skeleton, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from '../../styles/search/SearchResultList.module.css';
import { postRecentPrecedents } from '../../api/members';
import { searchPrecedent, searchStatute } from '../../api/lawsearch';

export interface SearchResult {
  precedentId?: number;
  caseName: string;
  caseContent: string;
  courtName?: string;
  instance?: string;
  judgmentDate?: string;
  court?: string;
  period?: string;
  statuteNumber: number;
  statuteName: string;
  statuteType: string;
  department: string;
  publicationNumber?: number;
  publicationDate: string;
  enforcementDate: string;
  amendmentType: string;
  total?: number;
  statuteTexts?: Article[];
}

interface Article {
  statute_id: number;
  statute_number: number;
  article_content: string;
  article_content_sub: string;
  article_effective_date: string;
  article_number: string;
  article_number_sub: string;
  article_title: string;
  article_type: string;
}
interface SearchResultListProps {
  searchTerm: string;
  activeTab: string;
  pageNumber: number;
}

const SearchResultList: React.FC<SearchResultListProps> = ({ searchTerm, activeTab, pageNumber }) => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pageSize, setPageSize] = useState(10); // 한 페이지에 표시할 항목 수
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0); // 전체 검색 결과 수

  useEffect(() => {
    fetchSearchResults(searchTerm, activeTab, currentPage);
  }, [searchTerm, activeTab, currentPage]);

  const fetchSearchResults = async (searchQuery: string, activeTab: string, pageNumber: number) => {
    // 검색 쿼리가 비어 있는지 확인
    if (!searchQuery.trim()) {
      console.error('Search query is empty.');
      setLoading(false); // 로딩 상태 업데이트
      return; // 함수 실행을 여기서 중단
    }
  
    setLoading(true);
  
    try {
      if (activeTab === '1') {
        const precedentResponse = await searchPrecedent(searchQuery, pageNumber);
        if (precedentResponse?.data && Array.isArray(precedentResponse.data)) {
          setSearchResults(precedentResponse.data);
          const total = precedentResponse.data[0]?.total || 0;
          console.log('판례 검색 결과:', precedentResponse.data, total)
          setTotalResults(total);
        }
      } else if (activeTab === '2') {
        const statuteResponse = await searchStatute(searchQuery, pageNumber);
        if (statuteResponse?.data && Array.isArray(statuteResponse.data)) {
          setSearchResults(statuteResponse.data);
          const total = statuteResponse.data[0]?.total || 0;
          setTotalResults(total);
        }
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = async (item: SearchResult, type: string) => {
    try {
      if (accessToken && type === 'precedent' && item.precedentId) {
        await postRecentPrecedents(accessToken, item.precedentId);
      }
      navigate(`/${type === 'precedent' ? 'laws' : 'statutes'}/${type === 'precedent' ? item.precedentId : item.statuteNumber}`, { state: item });
    } catch (error) {
      navigate(`/${type === 'precedent' ? 'laws' : 'statutes'}/${type === 'precedent' ? item.precedentId : item.statuteNumber}`, { state: item });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchSearchResults(searchTerm, activeTab, page);
  };

  const cleanHtmlTags = (html: string): string => {
    return html ? html.replace(/<[^>]*>?/gm, '') : '';
  };

  return (
    <>
      {loading ? (
        <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              active
              avatar
              title={{ width: '100%' }}
              paragraph={{ rows: 3, width: '400px' }}
              style={{ marginBottom: 20 }}
            />
          ))}
        </div>
      ) : (
        <List
          className={style.searchResultList}
          itemLayout="vertical"
          dataSource={searchResults}
          loading={loading}
          renderItem={item => (
            <List.Item
              key={activeTab === '1' ? item.precedentId : item.statuteNumber}
              className={style.item}
              onClick={() => handleItemClick(item, activeTab === '1' ? 'precedent' : 'statute')}
            >
              <List.Item.Meta
                title={<span className={style.itemTitle} onClick={() => handleItemClick(item, activeTab === '1' ? 'precedent' : 'statute')}>
                  {activeTab === '1' ? item.caseName : item.statuteName}
                </span>}
                description={
                  <div>
                    {activeTab === '1' ? (
                      <>
                        <p className={style.itemContent}>{item.caseContent ? cleanHtmlTags(item.caseContent) : ''}</p>
                        <div className={style.itemMeta}>
                          {item.courtName && <span className={style.metaItem}>{item.courtName}&nbsp;</span>}
                          {item.instance && <span className={style.metaItem}>{item.instance}</span>}
                          {item.judgmentDate && <span className={style.metaItem}>
                            {item.judgmentDate.slice(0,4)}.{item.judgmentDate.slice(4,6)}.{item.judgmentDate.slice(6,8)}</span>}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className={style.itemContent}>
                          법률 제 {item.publicationNumber}호,
                          공포일 {item.enforcementDate ? item.enforcementDate.slice(0, 4) : ''}.{''}
                          {item.enforcementDate ? item.enforcementDate.slice(4, 6) : ''}.{''}
                          {item.enforcementDate ? item.enforcementDate.slice(6, 8) : ''},
                          시행일 {item.publicationDate ? item.publicationDate.slice(0, 4) : ''}.{''}
                          {item.publicationDate ? item.publicationDate.slice(4, 6) : ''}.{''}
                          {item.publicationDate ? item.publicationDate.slice(6, 8) : ''}
                        </p>
                        <div className={style.itemMeta}>
                          {item.department && <span className={style.metaItem}>{item.department}</span>}
                        </div>
                      </>
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
      <Pagination
        current={currentPage}
        total={totalResults}
        pageSize={pageSize} // 한 페이지에 표시할 항목 수
        onChange={handlePageChange}
        onShowSizeChange={(currentPage, size) => setPageSize(size)}
        style={{ marginTop: 50, textAlign: 'center'}}
      />
    </>
  );
};

export default SearchResultList;

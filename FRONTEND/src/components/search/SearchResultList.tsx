// src/components/search/SearchResultList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from '../../styles/search/SearchResultList.module.css';
import { postRecentPrecedents } from '../../api/members';

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
  searchResults: SearchResult[];
  loading: boolean;
  activeTab: string;
}

const SearchResultList: React.FC<SearchResultListProps> = ({ searchResults, loading, activeTab }) => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const handleItemClick = async (item: SearchResult, type: string) => {
    console.log("Navigating with item:", item);
    try {
      if (accessToken && type === 'precedent' && item.precedentId) {
        await postRecentPrecedents(accessToken, item.precedentId);
      }
      // navigate(`/${type === 'precedent' ? 'laws' : 'statutes'}/${type === 'precedent' ? item.precedentId : item.statuteNumber}`, { state: item });
      navigate(`/details/${item.statuteNumber}`, { state: { statute: item } });
    } catch (error) {
      navigate(`/${type === 'precedent' ? 'laws' : 'statutes'}/${type === 'precedent' ? item.precedentId : item.statuteNumber}`, { state: item });
    }
  };



  // HTML 태그 지우고 텍스트만 반환
  const cleanHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>?/gm, '');
  };

  searchResults.forEach(item => console.log(item.statuteTexts));

  return (
    <>
      <List
        className={style.searchResultList}
        itemLayout="vertical"
        dataSource={searchResults}
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
                      <p className={style.itemContent}>{cleanHtmlTags(item.caseContent)}</p>
                      <div className={style.itemMeta}>
                        {item.courtName && <span className={style.metaItem}>{item.courtName}&nbsp;</span>}
                        {item.instance && <span className={style.metaItem}>{item.instance}</span>}
                        {item.judgmentDate && <span className={style.metaItem}>{item.judgmentDate}</span>}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className={style.itemContent}>
                        법률 제 {item.publicationNumber}호, 공포일 {item.enforcementDate}, 시행일 {item.publicationDate}
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
    </>
  );
};

export default SearchResultList;
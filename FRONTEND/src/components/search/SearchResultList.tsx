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
  statuteNumber?: number;
  statuteName?: string;
  statuteType?: string;
  department?: string;
  publicationNumber?: number;
  publicationDate: string;
  enforcementDate: string;
}

interface SearchResultListProps {
  searchResults: SearchResult[];
  loading: boolean;
  activeTab: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

const SearchResultList: React.FC<SearchResultListProps> = ({ searchResults, loading, activeTab }) => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  // list 아이템 클릭 시 호출되는 함수
  const handleItemClick = async (item: SearchResult, type: string) => {
    // console.log('handleItemClick', precedentId, accessToken)
    try {
      const id = type === 'precedent' ? item.precedentId : item.statuteNumber;
      if (accessToken && type === 'precedent' && item.precedentId) {
        await postRecentPrecedents(accessToken, item.precedentId);
      }
      navigate(`/${type === 'precedent' ? 'laws' : 'statutes'}/${id}`);
    } catch (error) {
      const id = type === 'precedent' ? item.precedentId : item.statuteNumber;
      // console.error('최근 본 판례 등록 오류:', error);
      navigate(`/${type === 'precedent' ? 'laws' : 'statutes'}/${id}`);
    }
  };


  // HTML 태그 지우고 텍스트만 반환
  const cleanHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>?/gm, '');
  };


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
                        법률 제 {item.publicationNumber}호, 공포일 {formatDate(item.enforcementDate)}, 시행일 {formatDate(item.publicationDate)}
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
// src/components/search/SearchResultList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { List } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from '../../styles/search/SearchResultList.module.css';
import { postRecentPrecedents } from '../../api/members';


export interface SearchResult {
  precedentId: number;
  caseName: string;
  caseContent: string;
  courtName?: string;
  instance?: string;
  judgmentDate?: string;
  court?: string;
  period?: string;
}

interface SearchResultListProps {
  searchResults: SearchResult[];
  loading: boolean;
}

const SearchResultList: React.FC<SearchResultListProps> = ({ searchResults, loading }) => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  // list 아이템 클릭 시 호출되는 함수
  const handleItemClick = async (precedentId: number) => {
    console.log('handleItemClick', precedentId, accessToken)
    try {
      if (accessToken) {
        await postRecentPrecedents(accessToken, precedentId);
        // console.log('최근 본 판례 등록 완료', precedentId, accessToken);
      }
      navigate(`/laws/${precedentId}`);
    } catch (error) {
      // console.error('최근 본 판례 등록 오류:', error);
      navigate(`/laws/${precedentId}`);
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
            key={item.precedentId}
            className={style.item}
            onClick={() => handleItemClick(item.precedentId)}
          >
            <List.Item.Meta
              title={<span className={style.itemTitle} onClick={() => handleItemClick(item.precedentId)}>{item.caseName} </span>}
              description={
                <div>
                  <p className={style.itemContent}>{cleanHtmlTags(item.caseContent)}</p>
                  <div className={style.itemMeta}>
                    {item.courtName && <span className={style.metaItem}>{item.courtName}&nbsp;</span>}
                    {item.instance && <span className={style.metaItem}>{item.instance}</span>}
                    {item.judgmentDate && <span className={style.metaItem}>{item.judgmentDate}</span>}
                  </div>
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
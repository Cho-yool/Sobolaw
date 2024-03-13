import React from 'react';
import { Select, Input } from 'antd';
import style from '../../styles/recommend/RecommendSearch.module.css';

const { Option } = Select;

const RecommendSearch: React.FC = () => {
  const handleCaseTypeChange = (value: string) => {
    console.log(`Selected: ${value}`);
  };
  return (
    <div className={style.searchContainer}>
      <div className={style.searchItem}>
        <h4>사건분류를 입력해주세요.</h4>
        <Select 
          showSearch
          placeholder="사건분류를 선택하세요"
          optionFilterProp="children"
          onChange={handleCaseTypeChange}
          filterOption={(input, option) =>
            (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
          }
          style={{ width: '20%', height: '50%', fontSize: '3rem' }}
        >
          <Option value="살인">살인</Option>
          <Option value="사기">사기</Option>
          <Option value="상해">상해</Option>
          <Option value="명예훼손">명예훼손</Option>
          <Option value="폭행">폭행</Option>
          <Option value="강제추행">강제추행</Option>
          <Option value="모욕">모욕</Option>
        </Select>
      </div>
      <div className={style.searchItem}>
        <h4>사건 번호</h4>
        <Input placeholder="사건 번호를 입력하세요" />
      </div>
      <div className={style.searchItem}>
        <h4>관련 법률</h4>
        <Input placeholder="관련 법률을 입력하세요" />
      </div>
      <div className={style.searchItem}>
        <h4>판결 날짜</h4>
        <Input placeholder="YYYY-MM-DD" />
      </div>
    </div>
  );
};

export default RecommendSearch;

// SearchInput.tsx
import React, { useState } from 'react';
import { Input } from 'antd';
import style from '../../styles/SearchInput.module.css';

const SearchInput: React.FC<{ onSearch: (value: string) => void }> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className={style.customSearchInput}>
      <Input.Search
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="키워드를 검색하세요"
        onSearch={onSearch} // 'onSearch' 콜백은 사용자가 검색 버튼을 클릭하거나 엔터 키를 눌렀을 때 호출됩니다.
      />
    </div>
  );
};

export default SearchInput;

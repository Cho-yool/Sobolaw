import { useState, useEffect } from "react";
import type { BoardList } from "../../types/DataTypes";
import { getBoardList } from "../../api/board";
import { Input, Select, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "../../styles/mypage/Mypaper.module.css";
import "../../App.css";
import BoardTable from "../../components/board/BoardTable";

export default function BoardList() {
  const [boardList, setBoardList] = useState<BoardList[]>([]);
  const [searchedData, setSearchedData] = useState<BoardList[]>([]);
  const [searchField, setSearchField] = useState("name");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBoardList();
      // console.log(response);
      const data = response.map((item: any, index: any) => ({
        key: index.toString(),
        boardId: item.boardId,
        title: item.title,
        hit: item.hit,
        memberId: item.member.memberId,
        name: item.member.name,
        createdTime: item.createdTime,
        public: item.public,
      }));
      setBoardList(data);
      setSearchedData(data);
    };
    fetchData();
  }, []);

  const handleSearch = (value: any) => {
    setSearchText(value);
    const filteredData = boardList.filter((entry: any) =>
      entry[searchField]?.toString().toLowerCase().includes(value.toLowerCase())
    );
    setSearchedData(filteredData);
  };
  return (
    <div className="pages">
      <div className={style["mypaper-box"]}>
        <div
          style={{
            borderRadius: "0rem",
            margin: "10%",
            padding: "5%",
            paddingBottom: "0%",
            backgroundColor: "#FCFCFC",
          }}
        >
          <Row style={{ justifyContent: "flex-end", margin: `0rem` }}>
            <Col>
              <SearchOutlined style={{ fontSize: `1.1rem` }} /> &nbsp;
              <Select
                defaultValue="name"
                style={{ width: 90, marginRight: 8 }}
                onChange={setSearchField}
              >
                <Select.Option value="name">작성자</Select.Option>
                <Select.Option value="title">제목</Select.Option>
              </Select>
            </Col>
            <Col>
              <Input
                placeholder="검색어"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginBottom: 20 }}
              />
            </Col>
          </Row>
          <Col>
            <BoardTable boardList={searchedData} />
          </Col>
        </div>
      </div>
    </div>
  );
}

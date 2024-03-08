import { useNavigate } from "react-router-dom";
import { Space, Table, Tag, Button, Divider, Row, Col } from "antd";
import type { TableProps } from "antd";
import { MypaperWide, MypaperNarrow } from "../../types/DataTypes";
import style from "../../styles/mypage/Mypaper.module.css";
import "../../App.css";

export default function Mypaper() {
  const navigate = useNavigate();

  const columnsWide: TableProps<MypaperWide>["columns"] = [
    {
      title: "임시저장명",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "피고소인",
      dataIndex: "target",
      key: "target",
    },
    {
      title: "작성일자",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "소장분류",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "설정",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>수정</a>
          <a>삭제</a>
        </Space>
      ),
    },
  ];

  const columnsNarrow: TableProps<MypaperNarrow>["columns"] = [
    {
      title: "임시저장명",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "설정",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>수정</a>
          <a>삭제</a>
        </Space>
      ),
    },
  ];

  const data: MypaperWide[] = [
    {
      key: "1",
      name: "정의란무엇인가",
      target: "김종범",
      date: "2024-03-06",
      tags: ["명예훼손"],
    },
    {
      key: "2",
      name: "정의란무엇인가",
      target: "김종범",
      date: "2024-03-06",
      tags: ["명예훼손"],
    },
    {
      key: "3",
      name: "정의란무엇인가",
      target: "김종범",
      date: "2024-03-06",
      tags: ["명예훼손"],
    },
    {
      key: "4",
      name: "정의란무엇인가",
      target: "김종범",
      date: "2024-03-06",
      tags: ["명예훼손"],
    },
    {
      key: "5",
      name: "정의란무엇인가",
      target: "김종범",
      date: "2024-03-06",
      tags: ["명예훼손"],
    },
    {
      key: "6",
      name: "정의란무엇인가",
      target: "김종범",
      date: "2024-03-06",
      tags: ["명예훼손"],
    },
    {
      key: "7",
      name: "정의란무엇인가",
      target: "김종범",
      date: "2024-03-06",
      tags: ["명예훼손"],
    },
    {
      key: "8",
      name: "정의란무엇인가",
      target: "김종범",
      date: "2024-03-06",
      tags: ["명예훼손"],
    },
    {
      key: "9",
      name: "정의란무엇인가",
      target: "김종범",
      date: "2024-03-06",
      tags: ["명예훼손"],
    },
    {
      key: "10",
      name: "정의란무엇인가",
      target: "김종범",
      date: "2024-03-06",
      tags: ["명예훼손"],
    },
    {
      key: "11",
      name: "정의란무엇인가",
      target: "김종범",
      date: "2024-03-06",
      tags: ["명예훼손"],
    },
    {
      key: "12",
      name: "정의란무엇인가",
      target: "김종범",
      date: "2024-03-06",
      tags: ["명예훼손"],
    },
  ];

  return (
    <div className="pages">
      <div className={style["mypaper-box"]}>
        <div className={style["button-box"]}>
          <Button
            shape="round"
            type="primary"
            className={style["mypaper-button"]}
            onClick={() => {
              navigate("/plaint");
            }}
          >
            새로작성하기
          </Button>
        </div>
        <Divider />
        <Row>
          <Col xs={0} sm={0} md={24} lg={24}>
            <div className={style["table"]}>
              <Table columns={columnsWide} dataSource={data} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={0}>
            <Table columns={columnsNarrow} dataSource={data} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

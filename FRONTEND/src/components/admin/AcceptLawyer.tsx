import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse, theme, Button } from "antd";
import {
  getLawyerList,
  getLawyerDetail,
  postApproveLawyer,
  postDenyLawyer,
} from "../../api/members";
import { RootState } from "../../redux/store/store";

type LawyerApplication = {
  articleId: number;
  name: string;
};

type detailApplication = {
  articleId: number;
  name: string;
  belongDocumentPath: string;
};

function AcceptLawyer() {
  const user = useSelector((state: RootState) => state.user);
  const [memberList, setMemberList] = useState<LawyerApplication[]>([]);
  const [detailData, setDetailData] = useState<detailApplication>(); // State to store detail data
  const [handleUpdate, setHandleUpdate] = useState(false);
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLawyerList(user.accessToken);
      setMemberList(response);
    };
    fetchData();
  }, [handleUpdate]);

  const handlePanelExpand = async (articleId: number) => {
    try {
      const detail = await getLawyerDetail(user.accessToken, articleId);
      setDetailData(detail);
    } catch (error) {
      console.error("Error fetching lawyer detail:", error);
    }
  };

  const handleApply = (articleId: number): void => {
    postApproveLawyer(user.accessToken, articleId)
      .then(() => {
        setHandleUpdate(!handleUpdate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeny = (articleId: number) => {
    postDenyLawyer(user.accessToken, articleId)
      .then(() => {
        setHandleUpdate(!handleUpdate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getItems: (
    panelStyle: CSSProperties,
    memberList: LawyerApplication[]
  ) => CollapseProps["items"] = (panelStyle, memberList) => {
    return memberList.map((item) => ({
      key: item.articleId.toString(),
      label: item.name,
      children: (
        <div>
          <p>articleId: {item.articleId}</p>
          <p>name: {item.name}</p>
          {detailData && detailData.articleId === item.articleId && (
            <div>
              <p>증거물:</p>
              <img src={detailData.belongDocumentPath} alt="" width="300px" />
              <p></p>
              <Button
                type="primary"
                onClick={() => handleApply(detailData.articleId)}
              >
                승인하기
              </Button>
              <Button onClick={() => handleDeny(detailData.articleId)}>
                거절하기
              </Button>
            </div>
          )}
        </div>
      ),
      style: panelStyle,
      onClick: () => handlePanelExpand(item.articleId),
    }));
  };

  return (
    <div style={{ flexDirection: "column", width: "90%", height: "100%" }}>
      {memberList.length > 0 ? (
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={getItems(panelStyle, memberList)}
        />
      ) : (
        <div
          style={{
            color: "#bcbcbc",
          }}
        >
          변호사 승인 요청이 없습니다
        </div>
      )}
    </div>
  );
}

export default AcceptLawyer;

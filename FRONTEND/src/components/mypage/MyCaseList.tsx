import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { List, Space, Modal, Button } from "antd";
import { GoLaw } from "react-icons/go";
import { FieldTimeOutlined, DeleteFilled } from "@ant-design/icons";
import { updatePrecedents } from "../../redux/reducers/user/userSlice";
import { RootState, AppDispatch } from "../../redux/store/store";
import { delPrecedents } from "../../api/members";
import { MemberPrecedent } from "../../types/DataTypes";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function MyCaseList({
  cases,
  onUpdate,
}: {
  cases: MemberPrecedent[];
  onUpdate: (updatedList: MemberPrecedent[]) => void;
}) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedPrecedentId, setSelectedPrecedentId] = useState<number | null>(
    null
  );
  const precedentIds = cases.map(
    (precedent: MemberPrecedent) => precedent?.precedentId
  );
  const removeBreakTags = (text: string) => {
    return text.replace(/<br\s*\/?>/gi, "");
  };

  const showModal = (memberPrecedentId: number, precedentId: number) => {
    setSelectedItemId(memberPrecedentId);
    setSelectedPrecedentId(precedentId);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (selectedItemId !== null) {
      try {
        const newPrecedentIds = precedentIds.filter(
          (id) => id !== selectedPrecedentId
        );
        const newPrecednetsList = cases.filter(
          (item) => item.precedentId !== selectedPrecedentId
        );
        // console.log(selectedItemId);
        await delPrecedents(accessToken, selectedItemId);
        // console.log(newPrecedentIds);
        dispatch(updatePrecedents(newPrecedentIds));
        onUpdate(newPrecednetsList);
        setIsModalOpen(false);
        setSelectedItemId(null);
      } catch (error) {
        console.error("Error deleting insult:", error);
      }
    }
  };

  return (
    <>
      <Space
        direction="vertical"
        style={{ marginBottom: "20px" }}
        size="middle"
      />
      <List
        itemLayout="vertical"
        pagination={{ position: "bottom", align: "center", pageSize: 3 }}
        dataSource={cases}
        renderItem={(item) => (
          <List.Item
            actions={[
              <IconText
                icon={FieldTimeOutlined}
                text={`판례번호 ${item.caseNumber}`}
                key="list-vertical-star-o"
              />,
            ]}
            extra={
              <div
                style={{ cursor: "pointer" }}
                onClick={() =>
                  showModal(item.memberPrecedentId, item.precedentId)
                }
                onMouseEnter={(e) => (e.currentTarget.style.color = "red")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "inherit")}
              >
                <IconText
                  icon={DeleteFilled}
                  text={"삭제하기"}
                  key="list-vertical-star-o"
                />
              </div>
            }
          >
            <List.Item.Meta
              avatar={<GoLaw />}
              title={
                <Link to={`/laws/${item.precedentId}`}>
                  {item.courtName} {item.judgmentDate} {item.judgment}{" "}
                  {item.caseName}
                </Link>
              }
              description={removeBreakTags(item.judicialNotice)}
            />
          </List.Item>
        )}
      />
      <Modal
        title="삭제 시 복구되지 않습니다"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            확인
          </Button>,
        ]}
      >
        <br />
        정말 삭제하시겠습니까?
      </Modal>
    </>
  );
}

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Alert, Space, Button } from "antd";
import Title from "antd/es/typography/Title";
import {
  getNotifications,
  patchNotification,
  delNotification,
} from "../api/notification";
import { NoticationAlert } from "../types/DataTypes";
import style from "../styles/board/BoardTabs.module.css";
import { RootState } from "../redux/store/store";

export default function Notifications() {
  const [boxHeight, setBoxHeight] = useState("85vh");
  const [tab, setTab] = useState(0);

  const categoryTabs = [
    {
      id: 0,
      isSelected: tab === 0,
      name: "받은 알림함",
      onClick: () => setTab(0),
    },
    {
      id: 1,
      isSelected: tab === 1,
      name: "보낸 알림함",
      onClick: () => setTab(1),
    },
  ];

  useEffect(() => {
    setBoxHeight("80vh"); // 탭 변경 시 초기 높이로 리셋
  }, [tab]);

  return (
    <>
      <div className={style["tab-box"]}>
        <div className={style["tab-title"]}>
          <Title level={2} style={{ color: "#644419", textAlign: "center" }}>
            알림함
          </Title>
        </div>
        <div className={style["tab-categories"]}>
          {categoryTabs.map((tab) => (
            <div
              key={tab.id}
              className={`${style["nav-link"]} ${tab.isSelected ? style["nav-link.active"] : ""}`}
              onClick={tab.onClick}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>
      <div style={{ minHeight: `${boxHeight}` }}>
        <div className={style["mypaper-box"]}>
          {tab === 0 ? <NotificationList /> : <SendList />}
        </div>
      </div>
    </>
  );
}

function NotificationList() {
  const user = useSelector((state: RootState) => state.user);
  const [notiList, setNotiList] = useState<NoticationAlert[]>([]);
  const [newNotiCount, setNewNotiCount] = useState<number>(0);
  const [handleUpdate, setHandleUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getNotifications(user.memberId);
      // const response = await getNotifications(28);
      response.sort(
        (a: NoticationAlert, b: NoticationAlert) => a.state - b.state
      );
      setNotiList(response);
      // console.log(response);
      const newNotis = response.filter(
        (item: NoticationAlert) => item.state === 0
      );
      setNewNotiCount(newNotis.length);
    };
    fetchData();
  }, [handleUpdate]);

  const handleApply = (notificationId: number): void => {
    patchNotification(notificationId)
      .then(() => {
        setHandleUpdate(!handleUpdate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeny = (notificationId: number) => {
    delNotification(notificationId)
      .then(() => {
        setHandleUpdate(!handleUpdate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ flexDirection: "column", width: "100%", height: "100%" }}>
      <div
        style={{
          margin: "1rem",
          width: "95%",
          textAlign: "center",
          fontWeight: "bold",
          color: "gray",
        }}
      >
        새 알림이
        <span style={{ color: "#BF8438" }}> {newNotiCount} </span>개 있습니다.
      </div>
      <Space direction="vertical" style={{ width: "100%" }}>
        {notiList.length > 0 ? (
          notiList.map((item) => (
            <Alert
              key={item.notificationId}
              message={item.title}
              description={item.body}
              type={item.state === 0 ? "warning" : "success"}
              showIcon
              action={
                <Space>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => handleApply(item.notificationId)}
                  >
                    읽음
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleDeny(item.notificationId)}
                  >
                    삭제
                  </Button>
                </Space>
              }
            />
          ))
        ) : (
          <div
            style={{
              color: "#bcbcbc",
              textAlign: "center",
            }}
          >
            받은 알람이 없습니다!
          </div>
        )}
      </Space>
    </div>
  );
}

function SendList() {
  return (
    <div
      style={{
        color: "#bcbcbc",
        textAlign: "center",
      }}
    >
      보낸 알림이 없습니다
    </div>
  );
}

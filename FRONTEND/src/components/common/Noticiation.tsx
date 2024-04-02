import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button, Avatar } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { getMessaging, onMessage } from "firebase/messaging";
import avatar from "/images/soboro_color.png";

const Notification = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  // react-hot-toast를 사용하여 알림을 표시하는 함수
  const notify = () =>
    toast.custom((t) => (
      <div
        style={{
          maxWidth: "calc(100vw - 2rem)",
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          pointerEvents: "auto",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          display: "flex",
        }}
      >
        <div style={{ flex: "1", width: "0", padding: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "0.5rem", paddingTop: "0.125rem" }}>
              <Avatar size={40} src={avatar} />
            </div>
            <div style={{ flex: "1" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#000",
                }}
              >
                {notification?.title}
              </p>
              <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>
                {notification?.body}
              </p>
            </div>
          </div>
        </div>
        <div style={{ borderLeft: "1px solid rgba(0, 0, 0, 0.05)" }}>
          <Button
            type="text"
            onClick={() => toast.dismiss(t.id)}
            style={{
              width: "100%",
              border: "none",
              borderRadius: "0",
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              color: "#4F46E5",
              cursor: "pointer",
            }}
            icon={<CloseOutlined />}
          />
        </div>
      </div>
    ));

  useEffect(() => {
    // Firebase messaging 객체 생성
    const messaging = getMessaging();
    // 알림 메시지 수신 시 실행될 콜백 등록
    onMessage(messaging, (payload) => {
      // 수신한 알림을 상태에 저장
      setNotification({
        title: payload?.notification?.title || "",
        body: payload?.notification?.body || "",
      });
      // 화면에 알림 표시
      notify();
    });
  }, []);

  return <Toaster />;
};

export default Notification;

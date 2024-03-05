import { Button, Badge } from "antd";

export default function MainPage() {
  return (
    <div style={{ backgroundColor: "#FEEFB3", minHeight: "100vh" }}>
      <header style={{ textAlign: "center", padding: "32px 0" }}>
        <h1 style={{ fontSize: "3xl", fontWeight: "bold" }}>
          소소한 조력들로 여기로!
        </h1>
        <p style={{ marginTop: "1rem" }}>
          고소장 작성을 어디서 어떻게 해야할지 내 상황과 유사한 판례가 있는지
          궁금하시다면 소소로
        </p>
      </header>
      <section
        style={{
          maxWidth: "4xl",
          margin: "0 auto",
          padding: "16px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "xl", fontWeight: "bold" }}>
              내 상황에 맞는 판례를 알고싶나요?
            </h2>
            <p style={{ marginTop: "0.5rem" }}>주차관계상 이득</p>
          </div>
          <div>
            <Button
              style={{
                borderRadius: "999px",
                position: "fixed",
                bottom: "2rem",
                right: "2rem",
                backgroundColor: "#FFD600",
                color: "black",
              }}
            >
              도움받기
            </Button>
            <h2 style={{ fontSize: "xl", fontWeight: "bold" }}>
              소장 작성해보기
            </h2>
            <p style={{ marginTop: "0.5rem" }}>주차관계상 이득</p>
          </div>
        </div>
      </section>
      <section style={{ margin: "2rem 0" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2xl", fontWeight: "bold" }}>
            내 주변에서 일어나는 다양한 사건들의 해결을 모르시겠을 때,
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
              gap: "0.5rem",
            }}
          >
            <Badge color="secondary">이웃집의 분쟁</Badge>
            <Badge color="secondary">가족 문제</Badge>
            <Badge color="secondary">부동산</Badge>
          </div>
          <p style={{ marginTop: "1rem" }}>
            고객이 어떻게 해결했는지 확인해보세요.
          </p>
        </div>
      </section>
      <section style={{ backgroundColor: "white", padding: "2rem 0" }}>
        <h2
          style={{ textAlign: "center", fontSize: "2xl", fontWeight: "bold" }}
        >
          현명이 되어 어려움 같은 기능을 사용할 수 있습니다
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              alt="Arctic Fox"
              style={{
                borderRadius: "8px",
                height: "200px",
                width: "200px",
                objectFit: "cover",
              }}
              src="/placeholder.svg"
            />
            <h3 style={{ marginTop: "1rem", fontWeight: "bold" }}>
              내 상황에 맞는 판례
            </h3>
            <a href="#" style={{ fontSize: "sm" }}>
              www.instagram.com
            </a>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              alt="Arctic Fox"
              style={{
                borderRadius: "8px",
                height: "200px",
                width: "200px",
                objectFit: "cover",
              }}
              src="/placeholder.svg"
            />
            <h3 style={{ marginTop: "1rem", fontWeight: "bold" }}>
              판례 맞춤 법안
            </h3>
            <a href="#" style={{ fontSize: "sm" }}>
              www.instagram.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

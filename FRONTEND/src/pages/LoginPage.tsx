import { Button } from "antd";
import backImg from "/images/loginBg.jpg";

function LoginPage() {
  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${backImg})`,
        backgroundSize: "cover", // 이미지를 화면에 최대한 맞추기
        backgroundPosition: "center", // 이미지를 가운데 정렬
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white", // 텍스트 색상을 흰색으로 지정
      }}
    >
      <div>
        <p>소송 준비의 첫걸음</p>
        <p>소보로와 함께</p>
      </div>
      <Button>카카오로 계속하기</Button>
    </div>
  );
}

export default LoginPage;

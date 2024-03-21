import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { saveToken, loadInfo } from "../redux/reducers/user/userSlice";
import { getUserInfo } from "../api/members";
import { tempgetUserInfo } from "../api/members";
import backImg from "/images/loginBg.jpg";
import LoginBtnKaKao from "/images/KAKAO_LOGIN.png";
import LoginBtnNaver from "/images/NAVER_LOGIN.png";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const userId = useSelector((state: RootState) => state.user.userId);
  const kakaoURL = `https://j10a604.p.ssafy.io/api/user-service/oauth2/authorization/kakao`;
  const naverURL = `https://j10a604.p.ssafy.io/api/user-service/oauth2/authorization/naver`;

  useEffect(() => {
    const aT = new URL(window.location.href).searchParams.get("accessToken");
    const rT = new URL(window.location.href).searchParams.get("refreshToken");
    console.log(accessToken);
    console.log(aT);
    console.log(rT);
    if (aT) {
      // 세션에 accessToken을 저장해주자
      dispatch(saveToken({ accessToken: aT, refreshToken: rT }));
      console.log(aT);
    }
    if (accessToken) {
      tempgetUserInfo(accessToken)
        .then((res) => {
          console.log(res);
          dispatch(loadInfo({ userId: res.memberId, nickname: res.name }));
        })
        .catch((err) => {
          console.log(err);
        });
      // navigate("/");
    }
  }, [accessToken]);

  console.log(userId);

  const kakaoLogin = function () {
    // 로그인버튼을 누르면 카카오 로그인 창으로 간다
    window.location.href =
      "http://70.12.247.27:8001/api/user-service/oauth2/authorization/kakao";
  };

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
        fontSize: "3rem",
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <p>소송 준비의 첫걸음</p>
        <p>소보로와 함께</p>
      </div>
      <img
        src={LoginBtnKaKao}
        onClick={kakaoLogin}
        style={{ cursor: "pointer" }}
      />
      <img
        src={LoginBtnNaver}
        onClick={() => (window.location.href = naverURL)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default LoginPage;

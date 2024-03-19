import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
import { saveAccessToken } from "../redux/reducers/user/userSlice";
import backImg from "/images/loginBg.jpg";
import LoginBtnKaKao from "/images/KAKAO_LOGIN.png";
import LoginBtnNaver from "/images/NAVER_LOGIN.png";

// // 토큰을 통해 회원가입이 되어있는지 / 아닌지 판단하고 load해오는 함수
// const loadUserInfo = () => {
//   // 토큰이 있는지 확인하고, 서버에 user info를 확인하자
//   if (accessToken) {
//     axios
//       .get("링크링크링크", {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//       .then((res) => {
//         // 불러온 유저정보에서 job이 null이라면 -> 추가 정보 입력이 필요함
//         let tmpUser = res.data.result;
//         // 회원가입
//         if (tmpUser.job == null) {
//           dispatch(login());
//           dispatch(saveUser(tmpUser));
//           navigate("/additionalinfo");
//         } else {
//           // console.log(res.data)
//           dispatch(saveUser(tmpUser));
//           dispatch(login());
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// };

function LoginPage() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const kakaoURL = `https://j10a604.p.ssafy.io/api/user-service/oauth2/authorization/kakao`;
  const naverURL = `https://j10a604.p.ssafy.io/api/user-service/oauth2/authorization/naver`;

  const kakaoLogin = function () {
    // 로그인버튼을 누르면 카카오 로그인 창으로 간다
    window.location.href = kakaoURL;
  };

  // 토큰 가져오는 useEffect
  useEffect(() => {
    // 현재 url에서 토큰을 가져와서 저장하자
    const token = new URL(window.location.href).searchParams.get("accessToken");
    // const token = new URL(window.location.href).searchParams.get("Authorization");
    if (token) {
      // 세션에 accessToken을 저장해주자
      dispatch(saveAccessToken(token));
    }
    if (accessToken) {
      // loadUserInfo();
      navigate("/");
    }
  }, [accessToken]);

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

// 추후 백엔드 연결되면 사용예정
// import { useEffect } from "react";
// import axios from "axios"

// const KakaoCallback = () => {
//     useEffect(() => {
//         const params= new URL(document.location.toString()).searchParams;
//         const code = params.get('code');
//         const grantType = "authorization_code";
//         const REST_API_KEY = `${process.env.REACT_APP_REST_API_KEY}`;
//         const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;

//         axios.post(
//             `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
//             {},
//             { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
//         )
//         .then((res: any) => {
//             console.log(res);
//             const { access_token } = res.data;
//             axios.post(
//                 `https://kapi.kakao.com/v2/user/me`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${access_token}`,
//                         "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//                     }
//                 }
//             )
//             .then((res: any) => {
//                 console.log('2번쨰', res);
//             })
//         })
//         .catch((Error: any) => {
//             console.log(Error)
//         })
//     }, [])

//     return(
//         <>
//         </>
//     )
// }
// export default KakaoCallback;

import backImg from "/images/loginBg.jpg";
import LoginBtn from "/images/KAKAO_LOGIN.png";

function LoginPage() {
  const CLIENT_ID = `${import.meta.env.VITE_KAKAO_REST_API_KEY}`;
  const REDIRECT_URI = `${import.meta.env.VITE_KAKAO_REDIRECT_UR}`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
        src={LoginBtn}
        onClick={() => (window.location.href = kakaoURL)}
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

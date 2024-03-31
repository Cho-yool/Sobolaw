import { useNavigate } from "react-router";
import style from "../styles/common/Notfound.module.css";
import backImg from "/images/notfound/notfound.png";
import one from "/images/notfound/jam_jb.gif";
import two from "/images/notfound/jam_jb2.gif";
import three from "/images/notfound/zoom-out.gif";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
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
        <div
          className={style["select-box"]}
          onClick={() => {
            navigate("/");
          }}
        >
          <h1
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "brown" }}
          >
            앗!! 없는 페이지에요(ToT)/~~~
          </h1>
          <div className={style["box3-cards"]}>
            <div className={style["box3-cards-content"]}>
              <div className={style["image-card"]}>
                <img src={one} alt="" className={style["image-detail"]} />
                <div className={style["image-card-text"]}>
                  <div id={style["image-card-title"]}>
                    <strong>메인</strong>
                  </div>
                </div>
              </div>

              <div className={style["image-card"]}>
                <img src={two} alt="" className={style["image-detail"]} />
                <div className={style["image-card-text"]}>
                  <div id={style["image-card-title"]}>
                    <strong>으로</strong>
                  </div>
                </div>
              </div>

              <div className={style["image-card"]}>
                <img src={three} alt="" className={style["image-detail"]} />
                <div className={style["image-card-text"]}>
                  <div id={style["image-card-title"]}>
                    <strong>가기</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

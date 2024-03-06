import { Flex, Divider } from "antd";
import { GoLaw } from "react-icons/go";
import { FaPencil } from "react-icons/fa6";
import mainImg from "/images/mainLawyer.png";
import tempImg from "/images/Group 74 (1).png";
import style from "../styles/Main.module.css";
import "../App.css";

export default function MainPage() {
  return (
    <div className="pages">
      <div className={style["box1"]}>
        <div className={style["box1-content"]}>
          <Flex className={style["box1-content-title"]}>
            <div className={style["box1-content-title-left"]}>
              <p>
                <strong>소</strong>송 초<strong>보</strong>들은 여기
                <strong>로</strong>
              </p>
              <span>
                고소장 작성을 어디서 어떻게 해야될지, 내 상황과 유사한 판례가
                있는지 궁금하시다면 <strong>소.보.로</strong>
              </span>
            </div>
            <div className={style["box1-content-title-right"]}>
              <img src={mainImg} alt="" />
            </div>
          </Flex>
          <Flex className={style["box1-content-whitebox"]}>
            <div className={style["whitebox-content"]}>
              <div className={style["point-icon"]}>
                <GoLaw size="80" />
                <div className={style["point-circle"]} />
              </div>
              <p>
                과거에 유사한 상황에서는 어떤 결론이 내려졌는지 찾고 계신가요?
              </p>
              <p>
                소보로는 일반 판례 검색은 물론, 내 상황과 사건에 맞는 판례를
                찾아 도움을 드립니다
              </p>
            </div>
            <Divider type="vertical" />
            <div className={style["whitebox-content"]}>
              <div className={style["point-icon"]}>
                <FaPencil size="80" />
                <div className={style["point-circle"]} />
              </div>

              <p>혼자 고소장을 작성하기 어려우신가요?</p>
              <p>
                사건 별 고소장 양식을 확인하시고, 간단한 정보 기입으로 바로 제출
                가능한 고소장을 완성해보세요!
              </p>
            </div>
          </Flex>
        </div>
      </div>
      <div className={style["box2"]}>
        <img src={tempImg} alt="" />
      </div>
      <div className={style["box3"]}>
        <p className={style["box3-title"]}>
          회원이 되면 아래와 같은 기능을 사용할 수 있습니다
        </p>
        <div className={style["box3-cards"]}>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}

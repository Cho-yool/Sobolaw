import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { GoLaw } from "react-icons/go";
import { FaPencil } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import mainImg from "/images/mainLawyer.png";
import sosongjunbi from "/images/checking-contract-terms.jpg";
import jaryojiwon from "/images/hand-using.jpg";
import yongeo from "/images/close-up-hands-holding-open-book.jpg";
import LawWordModal from "../components/lawword/LawWordModal";
import style from "../styles/common/Main.module.css";
import "../App.css";

export default function MainPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function modalHandler() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    AOS.init({
      useClassNames: true,
    });
  }, []);

  return (
    <div className="pages">
      <div className={style["box1"]}>
        <div className={style["box1-content"]}>
          <div className={style["box1-content-title"]}>
            <div className={style["box1-content-title-left"]}>
              <div>
                <div className={style["box1-content-title-left-title"]}>
                  <div
                    data-aos="flip-up"
                    data-aos-delay="0"
                    className={style["box1-content-title-left-title-a"]}
                  >
                    소
                  </div>
                  <div
                    data-aos="flip-down"
                    data-aos-delay="100"
                    className={style["box1-content-title-left-title-b"]}
                  >
                    송
                  </div>
                  <div
                    data-aos="flip-up"
                    data-aos-delay="200"
                    className={style["box1-content-title-left-title-b"]}
                  >
                    초
                  </div>
                  <div
                    data-aos="flip-down"
                    data-aos-delay="0"
                    className={style["box1-content-title-left-title-a"]}
                  >
                    보
                  </div>
                  <div
                    data-aos="flip-up"
                    data-aos-delay="100"
                    className={style["box1-content-title-left-title-b"]}
                  >
                    들
                  </div>
                  <div
                    data-aos="flip-down"
                    data-aos-delay="200"
                    className={style["box1-content-title-left-title-b"]}
                  >
                    은
                  </div>
                  <div
                    data-aos="flip-up"
                    data-aos-delay="0"
                    className={style["box1-content-title-left-title-b"]}
                  >
                    여
                  </div>
                  <div
                    data-aos="flip-down"
                    data-aos-delay="100"
                    className={style["box1-content-title-left-title-b"]}
                  >
                    기
                  </div>
                  <div
                    data-aos="flip-up"
                    data-aos-delay="200"
                    className={style["box1-content-title-left-title-a"]}
                  >
                    로
                  </div>
                </div>
                <div
                  data-aos="flip-down"
                  data-aos-delay="350"
                  className={style["box1-content-title-left-content"]}
                >
                  <p>고소장 작성을 어디서 어떻게 해야될지</p>
                  <p>
                    내 상황과 유사한 판례가 있는지 궁금하시x다면{" "}
                    <strong>소.보.로</strong>
                  </p>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className={style["box1-content-title-right"]}
            >
              <img src={mainImg} alt="" />
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="350"
            className={style["box1-content-whitebox"]}
          >
            <div
              data-aos="fade-up"
              data-aos-delay="600"
              className={style["whitebox-content"]}
              onClick={() => {
                navigate("/recommend");
              }}
            >
              <div className={style["point-icon"]}>
                <GoLaw size="80" />
                <div className={style["point-circle"]} />
              </div>
              <strong className={style["whitebox-content__strong"]}>
                내 상황과 딱 맞는 사건의 판례가 궁금하신가요?
              </strong>
              <p>
                소보로는 일반 판례 검색은 물론, 내 상황과 사건에 맞는 판례를
                찾아 도움을 드립니다
              </p>
            </div>

            <div className={style["whitebox-dashed"]} />
            <div
              data-aos="fade-up"
              data-aos-delay="600"
              className={style["whitebox-content"]}
              onClick={() => {
                navigate("/plaint");
              }}
            >
              <div className={style["point-icon"]}>
                <FaPencil size="80" />
                <div className={style["point-circle"]} />
              </div>

              <strong className={style["whitebox-content__strong"]}>
                혼자 고소장을 작성하기 어려우신가요?
              </strong>
              <p>
                사건 별 고소장 양식을 확인하시고, 간단한 정보 기입으로 바로 제출
                가능한 고소장을 완성해보세요!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={style["box2"]}>
        <div className={style["box3-title"]}>
          <strong>내 주변에서 일어나는 사건의 답을 모르겠을 때</strong>
        </div>
        <div className={style["box2-img"]} data-aos="fade-up" />
        <div className={style["box3-title"]} data-aos="fade-up">
          <strong>과거에는 어떻게 해결했는지 알아보세요</strong>
        </div>
      </div>

      <div className={style["box3"]}>
        <div className={style["box3-title"]} data-aos="fade-up">
          <p>법률제도도 이해가 쏙쏙</p>
          <div className={style["point-green"]} data-aos="fade-up">
            <strong>지금 바로 시작해보세요!</strong>
          </div>
        </div>

        <div className={style["box3-cards"]} data-aos="fade-up">
          <div className={style["box3-cards-content"]}>
            <div
              className={style["image-card"]}
              onClick={() => {
                navigate("/cal");
              }}
            >
              <img src={sosongjunbi} alt="" className={style["image-detail"]} />
              <div className={style["image-card-text"]}>
                <div id={style["image-card-title"]}>
                  <strong>소송준비</strong>
                </div>
                <span id={style["image-card-content"]}>
                  본격적인 싸움 전에, 얼마나 받을 수 있을지 확인해보세요
                </span>
                <Button shape="round" type="primary">
                  소송 비용 계산
                </Button>
              </div>
            </div>

            <div
              className={style["image-card"]}
              onClick={() => {
                navigate("/search");
              }}
            >
              <img src={jaryojiwon} alt="" className={style["image-detail"]} />
              <div className={style["image-card-text"]}>
                <div id={style["image-card-title"]}>
                  <strong>법률 자료 지원</strong>
                </div>
                <span id={style["image-card-content"]}>
                  다양한 판례 정보를 제공하여 자신의 권리와 의무를 이해하고
                  적용할 수 있도록 돕습니다.
                </span>
                <Button type="primary" shape="round">
                  판례 검색하기
                </Button>
              </div>
            </div>

            <div
              className={style["image-card"]}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <img src={yongeo} alt="" className={style["image-detail"]} />
              <div className={style["image-card-text"]}>
                <div id={style["image-card-title"]}>
                  <strong>어려운 용어 해석</strong>
                </div>
                <span id={style["image-card-content"]}>
                  갑호증, 을호증, 병호증... 어려운 단어를 판례보며 검색하고,
                  어려운 건 챗봇에게 해석을 요청해보세요
                </span>
                <Button type="primary" shape="round">
                  사전 챗봇 확인
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      {isOpen ? (
        <LawWordModal modalHandler={modalHandler}></LawWordModal>
      ) : null}
    </div>
  );
}

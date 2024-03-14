import { Layout, Row, Col } from "antd";
import Logo from "/images/footer/logo.png";
import KY from "/images/footer/keunyoung.png";
import HJ from "/images/footer/HyeonJi.png";
import JB from "/images/footer/JongBum.png";
import JS from "/images/footer/jaesung.png";
import SH from "/images/footer/seongho.png";
import SY from "/images/footer/SoYoung.png";
import style from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <Layout.Footer
        style={{
          color: "white",
          backgroundColor: "#644419",
          padding: "28px 0",
        }}
      >
        <Row justify="center">
          <Col span={0} md={0} lg={20}>
            <div className={style["footer-content"]}>
              <div className={style["footer-content-left"]}>
                <div>
                  <img src={Logo} alt="" className={style["logo-image"]} />
                </div>
                <div className={style["footer-inner"]}>
                  <p>SSAFY 특화 프로젝트 육사시미 | 대표 : 김종범</p>
                  <p
                    style={{
                      fontSize: "12px",
                      padding: "20px 0 10px",
                      marginBottom: "10px",
                      color: "gray",
                    }}
                  >
                    본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재,
                    복사, 배포 등을 금합니다.
                  </p>
                  <p style={{ fontSize: "13px", color: "darkgray" }}>
                    Copyright @ SAMSUNG All Rights Reserved.
                  </p>
                </div>
              </div>

              <div>
                <div className={style["name-title"]}>Trusted by:</div>
                <Row gutter={[24, 16]} className={style["name-group"]}>
                  <Col span={12}>
                    <img src={JB} alt="" className={style["name-image"]} />
                  </Col>
                  <Col span={12}>
                    <img src={SY} alt="" className={style["name-image"]} />
                  </Col>
                  <Col span={12}>
                    <img src={SH} alt="" className={style["name-image"]} />
                  </Col>
                  <Col span={12}>
                    <img src={JS} alt="" className={style["name-image"]} />
                  </Col>
                  <Col span={12}>
                    <img src={KY} alt="" className={style["name-image"]} />
                  </Col>
                  <Col span={12}>
                    <img src={HJ} alt="" className={style["name-image"]} />
                  </Col>
                </Row>
              </div>
            </div>
          </Col>

          <Col span={0} md={22} lg={0}>
            <div className={style["footer-content"]}>
              <div className={style["footer-content-left"]}>
                <div className={style["footer-inner"]}>
                  <p>SSAFY 특화 프로젝트 육사시미 | 대표 : 김종범</p>
                  <p
                    style={{
                      fontSize: "12px",
                      padding: "20px 0 10px",
                      marginBottom: "10px",
                      color: "gray",
                    }}
                  >
                    본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재,
                    복사, 배포 등을 금합니다.
                  </p>
                  <p style={{ fontSize: "13px", color: "darkgray" }}>
                    Copyright @ SAMSUNG All Rights Reserved.
                  </p>
                </div>
              </div>

              <div>
                <div className={style["name-title"]}>Trusted by:</div>
                <Row gutter={[24, 16]} className={style["name-group"]}>
                  <Col span={12}>
                    <img src={JB} alt="" className={style["name-image"]} />
                  </Col>
                  <Col span={12}>
                    <img src={SY} alt="" className={style["name-image"]} />
                  </Col>
                  <Col span={12}>
                    <img src={SH} alt="" className={style["name-image"]} />
                  </Col>
                  <Col span={12}>
                    <img src={JS} alt="" className={style["name-image"]} />
                  </Col>
                  <Col span={12}>
                    <img src={KY} alt="" className={style["name-image"]} />
                  </Col>
                  <Col span={12}>
                    <img src={HJ} alt="" className={style["name-image"]} />
                  </Col>
                </Row>
              </div>
            </div>
          </Col>

          <Col span={20} md={0} lg={0}>
            <div className={style["footer-inner-sm"]}>
              <p className={style["name-title"]}>
                SSAFY 특화 프로젝트 육사시미 | 대표 : 김종범
              </p>
              <p
                style={{
                  fontSize: "12px",
                  padding: "20px 0 10px",
                  marginBottom: "10px",
                  color: "gray",
                }}
              >
                본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사,
                배포 등을 금합니다.
              </p>
              <p style={{ fontSize: "13px", color: "darkgray" }}>
                Copyright @ SAMSUNG All Rights Reserved.
              </p>
            </div>

            <div className={style["name-title-sm"]}>Trusted by:</div>
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <img src={JB} alt="" className={style["name-image"]} />
              </Col>
              <Col span={8}>
                <img src={SY} alt="" className={style["name-image"]} />
              </Col>
              <Col span={8}>
                <img src={SH} alt="" className={style["name-image"]} />
              </Col>
              <Col span={8}>
                <img src={JS} alt="" className={style["name-image"]} />
              </Col>
              <Col span={8}>
                <img src={KY} alt="" className={style["name-image"]} />
              </Col>
              <Col span={8}>
                <img src={HJ} alt="" className={style["name-image"]} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout.Footer>
    </footer>
  );
}

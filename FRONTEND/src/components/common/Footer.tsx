import { Layout, Row, Col } from "antd";

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
          <Col span={24} md={16} lg={12}>
            <Row justify="space-between">
              <Col flex="1">
                <div>
                  <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
                    소보로: 이쁘게 꾸밀게요 ㄱㄷㄱㄷ
                  </h2>
                  <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                    SSAFY 특화 프로젝트 육사시미 | 대표 : 김종범
                  </p>
                  <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                    본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재,
                    복사, 배포 등을 금합니다.
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    Copyright @ SAMSUNG All Rights Reserved.
                  </p>
                </div>
              </Col>
              {/* <Col flex="1">
                <div>
                  <p style={{ fontSize: "14px" }}>
                    <a href="#">소개</a> | <a href="#">고객센터</a> |{" "}
                    <a href="#">이용약관</a> | <a href="#">투자정보</a> |{" "}
                    <a href="#">이용안내</a>
                  </p>
                </div>
              </Col> */}
            </Row>
          </Col>
        </Row>
      </Layout.Footer>
    </footer>
  );
}

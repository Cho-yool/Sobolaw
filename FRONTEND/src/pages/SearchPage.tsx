import { Layout, Typography, Row, Col } from "antd";

const { Content } = Layout;
const { Title } = Typography;

export default function SearchPage() {
  return (
    <Layout style={{ minHeight: "80vh" }}>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12} xl={8}>
            <div style={{ textAlign: "center" }}>
              <Title level={2} style={{ color: "#644419" }}>
                법령/판례
              </Title>
              w
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

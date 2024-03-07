import {
  Select,
  InputNumber,
  Input,
  Button,
  Radio,
  Collapse,
  Divider,
  Form,
} from "antd";
import Title from "antd/es/typography/Title";
import "../App.css";
import style from "../styles/calculator/Calculator.module.css";

const { Option } = Select;

export default function CalculatorPage() {
  // antd에서 form 설정코드 긁어온 것
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const onFinish = () => {
    console.log("Received values of form: ");
  };
  //  여기까지

  return (
    <div className="pages">
      {/* 페이지 타이틀 */}
      <Title level={2} style={{ color: "#644419", textAlign: "center" }}>
        소송 비용 계산
      </Title>
      <div style={{ display: "flex", gap: "16px" }}></div>

      {/* 상위 버튼 */}
      <div style={{ borderBottom: "1px solid #e8e8e8" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <Button
              onClick={() =>
                window.open(
                  "https://ecfs.scourt.go.kr/ecf/ecf300/ECF304.jsp?msgIdx=&soga=&sogaInput="
                )
              }
            >
              소가/인지/송달료
            </Button>
            <Button style={{ backgroundColor: "#dbe4f0", color: "#0047ba" }}>
              인지규칙
            </Button>
          </div>
          <Button style={{ backgroundColor: "#dbe4f0", color: "#0047ba" }}>
            도움말
          </Button>
        </div>
      </div>

      {/* 계산 박스 */}
      <div className={style["calculator"]}>
        {/* antd Form 예제 갖고왔어요 */}
        <Form
          className={style["calculator-box"]}
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item name="radio-group" label="소송 구분">
            <Radio.Group>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="select" label="사건 구분">
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="소가"
            hasFeedback
            rules={[{ required: true, message: "필수 입력해주세요" }]}
          >
            <Form.Item name="input-number" noStyle>
              <div className={style["calculator-box__money"]}>
                <span>금</span>
                <input type="text" />
                <span>원</span>
              </div>
            </Form.Item>
          </Form.Item>
          <Form.Item name="select" label="심급">
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="select"
            label="사건종류"
            hasFeedback
            rules={[{ required: true, message: "필수 입력해주세요" }]}
          >
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
            <Input />
          </Form.Item>
          <Form.Item
            label="피고/상대방수"
            hasFeedback
            rules={[{ required: true, message: "필수 입력해주세요" }]}
          >
            <Form.Item name="input-number" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text" style={{ marginLeft: 8 }}>
              원
            </span>
          </Form.Item>
          <Form.Item label="변호사/보수 약정액">
            <Form.Item name="input-number" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text" style={{ marginLeft: 8 }}>
              원
            </span>
          </Form.Item>
        </Form>
      </div>
      <p style={{ fontSize: "0.875rem", marginBottom: "16px" }}>
        ※ 변호사 부담금의 변동이 있을 경우, 실제 소송비용은 결과와 상이할 수
        있습니다.
      </p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <Button style={{ border: "1px solid #0047ba", color: "#0047ba" }}>
          초기화
        </Button>
        <Button style={{ backgroundColor: "#0047ba", color: "white" }}>
          제출하기
        </Button>
      </div>

      {/* 제출했을 때 뜨는 박스, 일단 pages에 같이 적어둠 */}
      <div>
        <Title level={2} style={{ color: "#644419", textAlign: "center" }}>
          결과
        </Title>

        <div className={style["result-box"]}>
          <div style={{ padding: "24px" }}>
            <div
              style={{
                marginBottom: "16px",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              계산결과
            </div>
            <p>인지액:</p>
            <p>송달료:</p>
            <p>법정 보수액 한도:</p>
            <Divider />
            <p>합계:</p>
          </div>
        </div>
      </div>

      {/* 하위에 떠있을 주의사항 */}
      <Collapse
        size="small"
        items={[
          {
            key: "1",
            label: "인지액 계산 방법",
            children: (
              <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow rounded">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold">미적에 실시방법</h2>
                  <p className="text-sm">
                    2011. 7. 18. 부터 전자소송으로 소송을 제출하는 경우에는
                    별도의 송달료가 부과되지 않습니다.
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-md font-semibold">소장</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <div className="font-medium">소송물의 가액</div>
                      <div>1,000만원 이하</div>
                      <div>1,000만원 이상 ~ 1억원 이하</div>
                      <div>1억원 이상 ~ 10억원 이하</div>
                      <div>10억원 이상</div>
                    </div>
                    <div className="col-span-1">
                      <div className="font-medium">인지액 계산방법</div>
                      <div>(소송물가액 가액 x 0.50% x 0.9)</div>
                      <div>(소송물가액 가액 x 0.45% + 5,000원) x 0.9</div>
                      <div>(소송물가액 가액 x 0.40% + 55,000원) x 0.9</div>
                      <div>(소송물가액 가액 x 0.35% + 555,000원) x 0.9</div>
                    </div>
                  </div>
                  <p className="text-sm mt-2">
                    예시: 소송물가액 2억이 3,000만원일 경우, (3,000만원 x 0.45%
                    + 5,000원) x 0.9 = 126,000원 입니다.
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-md font-semibold">소송수수료</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <div>변론수수료 : 통상소송 인지액의 1.5배에 0.9배</div>
                      <div>심결수수료 : 통상소송 인지액의 2배에 0.9배</div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-md font-semibold">공탁금반환신청</h3>
                  <table className="min-w-full table-fixed border-collapse border">
                    <thead>
                      <tr>
                        <th className="w-1/2 border p-2">신고</th>
                        <th className="w-1/2 border p-2">
                          공탁금반환신청 인지액 계산법
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">제1신고</td>
                        <td className="border p-2">
                          (변론 중 종국에 갈음한 인지액 - 변론 중 종국에 갈음한
                          인지액) x 0.9
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">제2신고</td>
                        <td className="border p-2">
                          (변론 중 종국에 갈음한 인지액 x 1.5 - 변론 중 종국에
                          갈음한 인지액) x 0.9
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mb-4">
                  <h3 className="text-md font-semibold">유의사항</h3>
                  <p className="text-sm">
                    민사소송 등 이외의 제도로 갈 때에 따라 인지액(변론 중, 변론
                    전 또는 종국 등)를 다시 계산할 수 있도록 유의해야 하며
                    공탁금 반환신청시 인지액이 달라집니다.
                  </p>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

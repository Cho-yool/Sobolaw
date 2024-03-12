import { Select, Button, Radio, Collapse, Divider, Form } from "antd";
import Title from "antd/es/typography/Title";
import "../App.css";
import style from "../styles/calculator/Calculator.module.css";
import { useEffect, useRef, useState } from "react";

const { Option } = Select;

export default function CalculatorPage() {
  // antd에서 form 설정코드 긁어온 것
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const onSubmit = () => {
    if (
      litigationType &&
      caseClassification &&
      litigationMoney &&
      trial &&
      caseType &&
      person &&
      lawyerPay
    ) {
      const numLitigationMoney = Number(litigationMoney.split(",").join(""));
      const numLawyerPay = Number(lawyerPay.split(",").join(""));

      if (numLitigationMoney <= 10000000) {
        const checkValue = numLitigationMoney * 0.005 * 0.9;
        if (checkValue <= 1000) {
          setRenderRecognition(1000);
        } else {
          setRenderRecognition(Math.round(checkValue));
        }
      } else if (numLitigationMoney <= 100000000) {
        const checkValue = (numLitigationMoney * 0.0045 + 5000) * 0.9;
        setRenderRecognition(Math.round(checkValue));
      } else if (numLitigationMoney <= 1000000000) {
        const checkValue = (numLitigationMoney * 0.004 + 55000) * 0.9;
        setRenderRecognition(Math.round(checkValue));
      } else if (numLitigationMoney > 1000000000) {
        const checkValue = (numLitigationMoney * 0.0035 + 555000) * 0.9;
        setRenderRecognition(Math.round(checkValue));
      }

      if (numLawyerPay <= 3000000) {
        setRenderLawyerPay(300000);
      } else if (numLawyerPay <= 20000000) {
        setRenderLawyerPay(Math.round(300000 + (numLawyerPay - 3000000) * 0.1));
      } else if (numLawyerPay <= 50000000) {
        setRenderLawyerPay(
          Math.round(2000000 + (numLawyerPay - 20000000) * 0.08)
        );
      } else if (numLawyerPay <= 100000000) {
        setRenderLawyerPay(
          Math.round(4400000 + (numLawyerPay - 50000000) * 0.06)
        );
      } else if (numLawyerPay <= 150000000) {
        setRenderLawyerPay(
          Math.round(7400000 + (numLawyerPay - 100000000) * 0.04)
        );
      } else if (numLawyerPay <= 200000000) {
        setRenderLawyerPay(
          Math.round(9400000 + (numLawyerPay - 150000000) * 0.02)
        );
      } else if (numLawyerPay <= 500000000) {
        setRenderLawyerPay(
          Math.round(10400000 + (numLawyerPay - 200000000) * 0.01)
        );
      } else {
        setRenderLawyerPay(
          Math.round(13400000 + (numLawyerPay - 500000000) * 0.005)
        );
      }

      if (caseType === "0") {
        setRenderDelivery(Math.round(5200 * Number(person) * 10));
      } else if (caseType === "1") {
        setRenderDelivery(Math.round(5200 * Number(person) * 15));
      } else if (caseType === "2") {
        setRenderDelivery(Math.round(5200 * Number(person) * 15));
      } else if (caseType === "3") {
        setRenderDelivery(Math.round(5200 * Number(person) * 12));
      } else if (caseType === "4") {
        setRenderDelivery(Math.round(5200 * Number(person) * 8));
      } else if (caseType === "5") {
        setRenderDelivery(Math.round(5200 * Number(person) * 5));
      }
      setIsResults(true);
    } else {
      alert("입력 값이 누락됐습니다.");
    }
  };

  const onReset = () => {
    setLitigationType("");
    setCaseClassification(null);
    setLitigationMoney("");
    setTrial(null);
    setCaseType(null);
    setPerson("");
    setLawyerPay("");
    setIsResults(false);
  };

  function handleLitigationChange(e: string) {
    const value = e.replace(/[^0-9]/g, "");
    const test = changeNumber(value);
    setLitigationMoney(test);
  }

  function handleLawyerChange(e: string) {
    const value = e.replace(/[^0-9]/g, "");
    const test = changeNumber(value);
    setLawyerPay(test);
  }

  function changeNumber(num: string) {
    const newNum = Number(num.split(",").join());
    return newNum.toLocaleString("ko-KR");
  }

  const [litigationType, setLitigationType] = useState<string>("");
  const [caseClassification, setCaseClassification] = useState<string | null>(
    null
  );
  const [litigationMoney, setLitigationMoney] = useState<string>("");
  const [trial, setTrial] = useState<string | null>(null);
  const [caseType, setCaseType] = useState<string | null>(null);
  const [person, setPerson] = useState<string>("");
  const [lawyerPay, setLawyerPay] = useState<string>("");
  const [renderRecognition, setRenderRecognition] = useState<number>();
  const [renderDelivery, setRenderDelivery] = useState<number>();
  const [renderLawyerPay, setRenderLawyerPay] = useState<number>();
  const [renderTotal, setRenderTotal] = useState<string>();
  const [reRenderRecognition, setReRenderRecognition] = useState<string>("");
  const [reRenderDelivery, setReRenderDelivery] = useState<string>("");
  const [reRenderLawyerPay, setReRenderLawyerPay] = useState<string>("");
  const [isResults, setIsResults] = useState<boolean>(false);

  useEffect(() => {
    if (renderLawyerPay && renderDelivery && renderRecognition) {
      const changeValue = changeNumber(
        String(renderLawyerPay + renderDelivery + renderRecognition)
      );
      setReRenderRecognition(changeNumber(String(renderRecognition)));
      setReRenderDelivery(changeNumber(String(renderDelivery)));
      setReRenderLawyerPay(changeNumber(String(renderLawyerPay)));
      setRenderTotal(changeValue);
    }
  }, [renderRecognition, renderLawyerPay, renderDelivery]);

  return (
    <div className={style["pages"]}>
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

      <div className={style["calculator"]}>
        <Form
          className={style["calculator-box"]}
          name="validate_other"
          {...formItemLayout}
          size="large"
        >
          <Form.Item label="소송 구분">
            <Radio.Group
              onChange={(e) => setLitigationType(e.target.value)}
              value={litigationType}
            >
              <Radio value="전자소송">전자소송</Radio>
              <Radio value="종이소송">종이소송</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="사건 구분">
            <Select
              placeholder="소송을 선택하세요"
              onSelect={(e) => setCaseClassification(e)}
              value={caseClassification}
            >
              <Option value="소송">소송</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="소가"
            name="litigation"
            hasFeedback
            rules={[{ required: true, message: "필수 입력해주세요" }]}
          >
            <Form.Item noStyle={true}>
              <div className={style["calculator-box__money"]}>
                <span>금</span>
                <input
                  type="text"
                  value={litigationMoney}
                  onChange={(e) => handleLitigationChange(e.target.value)}
                />
                <span>원</span>
              </div>
            </Form.Item>
          </Form.Item>
          <Form.Item label="심급">
            <Select
              placeholder="심을 선택하세요."
              onSelect={(e) => setTrial(e)}
              value={trial}
            >
              <Option value="1">1심</Option>
              <Option value="2">2심</Option>
            </Select>
          </Form.Item>
          <Form.Item label="사건종류" hasFeedback>
            <Select
              placeholder="사건 종류를 선택하세요."
              onSelect={(e) => setCaseType(e)}
              value={caseType}
            >
              <Option value="0">민사 제1심 소액사건</Option>
              <Option value="1">민사 제1심 단독사건</Option>
              <Option value="2">민사 제1심 합의사건</Option>
              <Option value="3">민사항소사건</Option>
              <Option value="4">민사 상고사건(다)</Option>
              <Option value="5">민사 조정사건(머)</Option>
            </Select>
          </Form.Item>
          <Form.Item label="피고/상대방수" hasFeedback>
            <Form.Item noStyle={true}>
              <div className={style["calculator-box__money"]}>
                <input
                  type="number"
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                />
                <span>명</span>
              </div>
            </Form.Item>
          </Form.Item>
          <Form.Item label="변호사보수 약정액">
            <Form.Item noStyle={true}>
              <div className={style["calculator-box__money"]}>
                <span>금</span>
                <input
                  type="text"
                  value={lawyerPay}
                  onChange={(e) => handleLawyerChange(e.target.value)}
                />
                <span>원</span>
              </div>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
      <div className={style["detail-info"]}>
        <p style={{ fontSize: "1rem", marginBottom: "16px" }}>
          ※ 변호사 부담금의 변동이 있을 경우, 실제 소송비용은 결과와 상이할 수
          있습니다.
        </p>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
        >
          <Button
            style={{ border: "1px solid #0047ba", color: "#0047ba" }}
            onClick={onReset}
          >
            초기화
          </Button>
          <Button
            style={{ backgroundColor: "#0047ba", color: "white" }}
            onClick={onSubmit}
          >
            제출하기
          </Button>
        </div>
      </div>

      {/* 제출했을 때 뜨는 박스, 일단 pages에 같이 적어둠 */}
      {isResults ? (
        <div>
          <Title level={2} style={{ color: "#644419", textAlign: "center" }}>
            결과
          </Title>

          <div className={style["result-box"]}>
            <div style={{ padding: "24px" }}>
              <p
                style={{
                  marginBottom: "16px",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                계산결과
              </p>
              <p>
                인지액:
                {reRenderRecognition ? (
                  <span>{reRenderRecognition} 원</span>
                ) : null}
              </p>
              <p>
                송달료:
                {reRenderDelivery ? <span>{reRenderDelivery} 원</span> : null}
              </p>
              <p>
                법정 변호사보수액 한도:
                {reRenderLawyerPay ? <span>{reRenderLawyerPay} 원</span> : null}
              </p>
              <Divider />
              <p>합계: {renderTotal ? <span>{renderTotal} 원</span> : null}</p>
            </div>
          </div>
        </div>
      ) : null}

      {/* 하위에 떠있을 주의사항 */}
      <Collapse
        className={style["notice"]}
        size="large"
        items={[
          {
            key: "1",
            label: "인지액 계산 방법",
            children: (
              <div className={style["notice-header"]}>
                <div className={style["notice-header-box"]}>
                  <h2 className={style["notice-header-title"]}>
                    인지액 계산방법
                  </h2>

                  <p className={style["notice-header-content"]}>
                    2011. 7. 18. 부터 전자소송으로 소장을 제출하는 경우에는
                    종이소송에 비하여 10% 할인된 인지액을 납부하시면 됩니다.
                  </p>
                </div>
                <div className={style["notice-content"]}>
                  <h3 className={style["notice-content-title"]}>소장</h3>
                  <div className={style["notice-content-table"]}>
                    <div className={style["notice-content-row"]}>
                      <div className={style["notice-content-header"]}>
                        소송물의 가액
                      </div>
                      <div className={style["notice-content-header"]}>
                        인지액 계산방법
                      </div>
                    </div>
                    <div className={style["notice-content-row"]}>
                      <div className={style["notice-content-column"]}>
                        <li>1,000만원 이하</li>
                        <li>1,000만원 이상 ~ 1억원 이하</li>
                        <li>1억원 이상 ~ 10억원 이하</li>
                        <li className={style["notice-content-column_left"]}>
                          10억원 이상
                        </li>
                      </div>
                      <div className={style["notice-content-column"]}>
                        <li>(소송물가액 가액 x 0.50% x 0.9)</li>
                        <li>(소송물가액 가액 x 0.45% + 5,000원) x 0.9</li>
                        <li>(소송물가액 가액 x 0.40% + 55,000원) x 0.9</li>
                        <li className={style["notice-content-column_right"]}>
                          (소송물가액 가액 x 0.35% + 555,000원) x 0.9
                        </li>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mt-2">
                    예시: 소송물가액이 3,000만원일 경우, (3,000만원 x 0.45% +
                    5,000원) x 0.9 = 126,000원 입니다.
                  </p>
                </div>

                <h3 className={style["notice-content-title"]}>상소장</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <li className={style["notice-content-list"]}>
                      항소장 : 종이소장 인지액의 1.5배의 0.9액
                    </li>
                    <li className={style["notice-content-list"]}>
                      상소장 : 종이소장 인지액의 2배의 0.9액
                    </li>
                  </div>
                </div>

                <h3 className={style["notice-content-title"]}>청구변경신청</h3>
                <div className={style["notice-content-table"]}>
                  <div className={style["notice-content-row"]}>
                    <div className={style["notice-content-header"]}>신고</div>
                    <th className={style["notice-content-header"]}>
                      공탁금반환신청 인지액 계산법
                    </th>
                  </div>
                  <div className={style["notice-content-row"]}>
                    <div className={style["notice-content-column"]}>
                      <li>제1심</li>
                      <li className={style["notice-content-column_left"]}>
                        제2심
                      </li>
                    </div>
                    <div className={style["notice-content-column"]}>
                      <li>
                        (변경 후 청구에 관한 인지액 - 변경 전 청구에 관한
                        인지액) x 0.9
                      </li>
                      <li className={style["notice-content-column_right"]}>
                        (변경 후 청구에 관한 인지액 x 1.5 - 변경 전 청구에 관한
                        인지액) x 0.9
                      </li>
                    </div>
                  </div>
                </div>
                <p className="text-sm">
                  *민사소송 등 인지법 제5조 각 호에 따라 인지액(변경 후, 변경 전
                  모두 종이소송 기준)을 먼저 계산한 후 최종적으로 0.9를 곱한
                  금액이 청구변경신청서의 인지액이 됩니다
                </p>
                <h3 className={style["notice-content-title"]}>
                  변호사 보수 비용
                </h3>
                <div className={style["notice-content-table"]}>
                  <div className={style["notice-content-row"]}>
                    <div className={style["notice-content-header"]}>
                      소송목적 또는 피보전권리의 값
                    </div>
                    <div className={style["notice-content-header"]}>
                      소송비용에 산입되는 비율 또는 산입액
                    </div>
                  </div>
                  <div className={style["notice-content-row"]}>
                    <div className={style["notice-content-column"]}>
                      <li>300만원</li>
                      <li>300 ~ 2,000만원</li>
                      <li>2,000 ~ 5,000만원</li>
                      <li>5,000 ~ 1억원</li>
                      <li>1 ~ 1.5억원</li>
                      <li>1.5 ~ 2억원</li>
                      <li>2 ~ 5억원</li>
                      <li className={style["notice-content-column_left"]}>
                        5억 초과
                      </li>
                    </div>
                    <div className={style["notice-content-column"]}>
                      <li>30만원</li>
                      <li>30만원 + (소송목적의 값 - 300만원) * 0.1</li>
                      <li>200만원 + (소송목적의 값 - 2,000만원) * 0.08</li>
                      <li>440만원 + (소송목적의 값 - 5,000만원) * 0.06</li>
                      <li>740만원 + (소송목적의 값 - 1억원) * 0.04</li>
                      <li>940만원 + (소송목적의 값 - 1.5억원) * 0.02</li>
                      <li>1,040만원 + (소송목적의 값 - 2억원) * 0.01</li>
                      <li className={style["notice-content-column_right"]}>
                        1,340만원 + (소송목적의 값 - 5억원) * 0.005
                      </li>
                    </div>
                  </div>
                </div>
                <h3 className={style["notice-content-title"]}>
                  송달료 계산방법
                </h3>
                <div className={style["notice-content-table"]}>
                  <div className={style["notice-content-row"]}>
                    <div className={style["notice-content-header"]}>
                      소송물의 가액
                    </div>
                    <div className={style["notice-content-header"]}>
                      인지액 계산방법
                    </div>
                  </div>
                  <div className={style["notice-content-row"]}>
                    <div className={style["notice-content-column"]}>
                      <li>민사 제1심 소액사건</li>
                      <li>민사 제1심 단독사건</li>
                      <li>민사 제1심 합의사건</li>
                      <li>민사항소사건</li>
                      <li>민사 상고사건(다)</li>
                      <li>민사 조정사건(머)</li>
                      <li>(재)항고사건</li>
                      <li className={style["notice-content-column_left"]}>
                        신청사건
                      </li>
                    </div>
                    <div className={style["notice-content-column"]}>
                      <li>5,200원 x 피고수 x 10회분</li>
                      <li>5,200원 x 피고수 x 15회분</li>
                      <li>5,200원 x 피고수 x 15회분</li>
                      <li>5,200원 x 피항소인수 x 12회분</li>
                      <li>5,200원 x 피상고인수 x 8회분</li>
                      <li>5,200원 x (신청인수 + 피신청인수) x 5회분</li>
                      <li>((재)항고인 + 상대방수) X 송달료 2~5회분</li>
                      <li className={style["notice-content-column_right"]}>
                        (신청인수 + 피신청인수) X 송달료 1~5회분 또는 피신청인수
                        X 송달료 6~8회분
                      </li>
                    </div>
                  </div>
                </div>
                <p className="text-sm mt-2">
                  예시 : 민사 제1심 소액 사건 피고가 2명인 경우, 5,200원 x 2명 x
                  10회분 = 104,000원입니다. 민사 조정사건의 신청인이 2명,
                  피신청인이 1명인 경우, 5,200원 x 3명 x 5회분 = 78,000원입니다.
                </p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

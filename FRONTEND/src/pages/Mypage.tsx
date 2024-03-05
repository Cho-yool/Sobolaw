import { Checkbox, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function MyPage() {
  return (
    <div style={{ backgroundColor: "#f3e9d2", minHeight: "80vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          backgroundColor: "#a68b60",
          color: "white",
        }}
      >
        <div>회원정보</div>
        <div>고소장 작성</div>
        <div>파트너 조회</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem",
          backgroundColor: "#f3e9d2",
        }}
      >
        <div style={{ color: "#a68b60" }}>회원정보</div>
        <div style={{ color: "#a68b60" }}>고소장 작성</div>
        <div style={{ color: "#a68b60" }}>파트너 조회</div>
      </div>
      <div style={{ padding: "1rem" }}>
        <div style={{ backgroundColor: "white", padding: "1rem" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            OOO 님 안녕하세요
          </h1>
          <p style={{ marginTop: "1rem", fontSize: "1rem" }}>
            회원정보를 무들어오지? 무들어오지? 무들어오지?
          </p>
          <p style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
            고소장기안도 쉽게하기
          </p>
        </div>
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem",
                backgroundColor: "#a68b60",
                color: "white",
              }}
            >
              <span>기안도 검색</span>
              <span style={{ fontSize: "0.75rem" }}>1/14 items</span>
            </div>
            <div style={{ backgroundColor: "white", padding: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <SearchOutlined style={{ color: "#ccc" }} />
                <Input placeholder="Search here" />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {[...Array(7).keys()].map((index) => (
                  <div
                    key={index}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>content{index + 1}</span>
                    <CheckIcon style={{ color: "blue" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem",
                backgroundColor: "#a68b60",
                color: "white",
              }}
            >
              <span>기안도 검색</span>
              <span style={{ fontSize: "0.75rem" }}>9 items</span>
            </div>
            <div style={{ backgroundColor: "white", padding: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <SearchOutlined style={{ color: "#ccc" }} />
                <Input placeholder="Search here" />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {[...Array(7).keys()].map((index) => (
                  <div
                    key={index}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Checkbox id={`content${index + 8}`} />
                    <label
                      htmlFor={`content${index + 8}`}
                      style={{ flex: 1, cursor: "pointer" }}
                    >
                      content{index + 8}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            padding: "0.5rem",
            backgroundColor: "#a68b60",
            color: "white",
          }}
        >
          <span>회원탈퇴</span>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

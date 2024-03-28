import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { List } from "antd";
// import { RootState } from "../redux/store/store";
import AcceptLawyer from "../components/admin/AcceptLawyer";
import LawsuitAll from "../components/admin/LawsuitAll";
import MemberAll from "../components/admin/MemberAll";
import PrecedentAll from "../components/admin/PrecedentsAll";

export default function AdminPage() {
  // const user = useSelector((state: RootState) => state.user);
  const [boxHeight, setBoxHeight] = useState("85vh");
  const [tab, setTab] = useState(0);
  const [categoryTabs, setCategoryTabs] = useState([
    {
      id: 0,
      isSelected: true,
      name: "변호사 전환 신청 조회",
      component: <AcceptLawyer />,
    },
    {
      id: 1,
      isSelected: false,
      name: "회원 전체 조회",
      component: <MemberAll />,
    },
    {
      id: 2,
      isSelected: false,
      name: "작성된 소장 전체 조회",
      component: <LawsuitAll />,
    },
    {
      id: 2,
      isSelected: false,
      name: "저장된 판례 전체 조회",
      component: <PrecedentAll />,
    },
  ]);

  const changeSelect = (selectedIndex: number) => {
    setTab(selectedIndex);
    setCategoryTabs((prevTabs) =>
      prevTabs.map((item, index) => ({
        ...item,
        isSelected: index === selectedIndex,
      }))
    );
  };

  useEffect(() => {
    setBoxHeight("80vh"); // 탭 변경 시 초기 높이로 리셋
  }, [tab]);

  return (
    <div
      style={{ minHeight: "100vh", marginBottom: "10px", paddingBlock: "6rem" }}
    >
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <div
          style={{
            border: "2px solid purple",
            borderRadius: "10px",
            overflow: "hidden",
            width: "85vw",
            maxHeight: boxHeight,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              paddingTop: "2rem",
            }}
          >
            <div
              style={{ width: "100%", marginTop: "2rem", paddingTop: "2rem" }}
            >
              <List
                dataSource={categoryTabs}
                renderItem={(category) => (
                  <List.Item
                    key={category.id}
                    className={category.isSelected ? "active" : ""}
                    onClick={() => changeSelect(category.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {category.name}
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            width: "75%",
            backgroundColor: "white",
            borderRadius: "10px",
            marginLeft: "1rem",
          }}
        >
          <div style={{ textAlign: "center", padding: "2rem" }}>
            {categoryTabs[tab].component}
          </div>
        </div>
      </div>
    </div>
  );
}

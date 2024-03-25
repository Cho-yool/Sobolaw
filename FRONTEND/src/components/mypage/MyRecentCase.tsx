import { useNavigate } from "react-router-dom";
import { LuChefHat } from "react-icons/lu";
import { Divider } from "antd";
import { MemberRecent } from "../../types/DataTypes";

interface MyRecentCaseProps {
  cases: MemberRecent[] | undefined;
}

export default function MyRecentCase({ cases }: MyRecentCaseProps) {
  const navigate = useNavigate();

  return cases?.map((item) => (
    <div
      key={item.recentPrecedentId}
      onClick={() => {
        navigate(`/laws/${item.precedentId}`);
      }}
      style={{
        cursor: "pointer",
        color: "#de9159",
      }}
    >
      <LuChefHat color="#de9159" /> 판례제목
      <Divider />
    </div>
  ));
}
// precedentId

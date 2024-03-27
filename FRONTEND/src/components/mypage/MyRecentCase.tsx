import { useNavigate } from "react-router-dom";
import { LuChefHat } from "react-icons/lu";
import { Divider } from "antd";
import { MemberRecent } from "../../types/DataTypes";

interface MyRecentCaseProps {
  cases: MemberRecent[] | undefined;
}

export default function MyRecentCase({ cases }: MyRecentCaseProps) {
  const navigate = useNavigate();

  // cases가 없거나 빈 배열인 경우 빈 배열 반환
  if (!cases || cases.length === 0) {
    return null;
  }

  // cases 배열의 길이가 3보다 작은 경우 전체 배열을 사용
  const displayCases = cases.length <= 3 ? cases : cases.slice(-3);

  return displayCases.map((item) => (
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
      <LuChefHat color="#de9159" /> {item.precedentId}
      <Divider />
    </div>
  ));
}

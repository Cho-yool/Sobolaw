import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { getLawsuitAll } from "../../api/lawsuit";
// import { RootState } from "../../redux/store/store";
import { MemberList } from "../../types/DataTypes";

export default function LawsuitAll() {
  // const user = useSelector((state: RootState) => state.user);
  const [lawsuitList, setLawsuitList] = useState<MemberList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLawsuitAll();
      setLawsuitList(response);
    };
    fetchData();
  }, []);

  return (
    <div style={{ flexDirection: "column", width: "90%", height: "100%" }}>
      {lawsuitList.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
}

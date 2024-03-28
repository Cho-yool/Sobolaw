import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { getPrecedentsList } from "../../api/members";
// import { RootState } from "../../redux/store/store";
import { MemberList } from "../../types/DataTypes";

export default function PrecedentsAll() {
  // const user = useSelector((state: RootState) => state.user);
  const [precedentsList, setPrecedentsList] = useState<MemberList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPrecedentsList();
      setPrecedentsList(response);
    };
    fetchData();
  }, []);

  return (
    <div style={{ flexDirection: "column", width: "90%", height: "100%" }}>
      {precedentsList.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
}

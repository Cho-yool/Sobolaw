import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMemberList } from "../../api/members";
import { RootState } from "../../redux/store/store";
import { MemberList } from "../../types/DataTypes";

export default function MemberAll() {
  const user = useSelector((state: RootState) => state.user);
  const [memberList, setMemberList] = useState<MemberList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMemberList(user.accessToken);
      setMemberList(response);
    };
    fetchData();
  }, []);

  return (
    <div style={{ flexDirection: "column", width: "90%", height: "100%" }}>
      {memberList.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
}

// function UserList({ allUserData }: { allUserData: AcceptSeller[] }) {
//   const user = useSelector((state: RootState) => state.user);

//   const approvefunction = (sellerid: number, at: string) => {
//     try {
//       approveSellerApplicationAPI(sellerid, at).then((res) => {
//         console.log(res);
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <Accordion accordion>
//         {allUserData.map((item, index) => (
//           <Accordion.Panel
//             key={index}
//             header={
//               <div style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span
//                   style={{
//                     color: "gray",
//                     fontWeight: "bold",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   {item.approvalStatus ? (
//                     <Badge status="success">승인완료</Badge>
//                   ) : (
//                     <Badge status="error">새요청</Badge>
//                   )}
//                   {item.userId} : {item.loginId} / {item.nickname}
//                 </span>
//                 <CaretDownOutlined />
//               </div>
//             }
//           >
//             <List>
//               <List.Item>
//                 {item.sellerInfoId}
//                 <Button
//                   onClick={() => {
//                     approvefunction(item.sellerInfoId, user.accessToken);
//                   }}
//                 >
//                   승인
//                 </Button>
//               </List.Item>
//             </List>
//           </Accordion.Panel>
//         ))}
//       </Accordion>
//     </>
//   );
// }

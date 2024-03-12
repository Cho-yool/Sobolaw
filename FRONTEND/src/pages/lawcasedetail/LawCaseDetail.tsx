import { Flex, Typography } from "antd";
import style from "../../styles/lawcasedetail/LawCaseDetail.module.css";
import LawCaseTabs from "../../components/lawcasedetail/LawCaseTabs";
import Sidebar from "../../components/lawcasedetail/Sidebar";
import { getLawDetail } from "../../api/lawdetail";
import { useQuery } from "react-query";
import { useEffect } from "react";

const LawCaseDetail = () => {
  const { Title } = Typography;
  const { data, isLoading, status, error, isFetching } = useQuery(
    "lawDetail",
    () => getLawDetail()
  );
  useEffect(() => {
    console.log(data, isLoading, status, error, isFetching);
  }, [data]);
  return (
    <Flex className={style["detail-page"]} justify="center">
      <Sidebar></Sidebar>
      <Flex className={style["container"]} vertical>
        <Title className={style["container__title"]}>손해배상(의)</Title>
        <br />
        <Flex className={style["content-box"]}>
          <LawCaseTabs />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LawCaseDetail;

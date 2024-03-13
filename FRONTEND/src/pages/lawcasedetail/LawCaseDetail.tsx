import { Flex, Typography } from "antd";
import style from "../../styles/lawcasedetail/LawCaseDetail.module.css";
import LawCaseTabs from "../../components/lawcasedetail/LawCaseTabs";
import Sidebar from "../../components/lawcasedetail/Sidebar";
import { getLawDetail } from "../../api/lawdetail";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

interface getDataProps {
  caseContent: string;
  caseName: string;
  caseNumber: string;
  caseType: string;
  courtName: string;
  judgment: string;
  judgmentDate: string;
  judicialNotice: string;
  referencedCase: string;
  referencedStatute: string;
  verdictSummary: string;
  verdictType: string;
}

const LawCaseDetail = () => {
  const { Title } = Typography;
  const [getData, setGetData] = useState<getDataProps>();

  useQuery("lawDetail", () => getLawDetail(), {
    onSuccess: (response) => {
      setGetData(response.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Flex className={style["detail-page"]} justify="center">
      <Sidebar></Sidebar>
      <Flex className={style["container"]} vertical>
        <Title className={style["container__title"]}>
          {getData ? getData.caseName : null}
        </Title>
        <br />
        <Flex className={style["content-box"]}>
          {getData ? <LawCaseTabs getData={getData} /> : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LawCaseDetail;

import { Flex, Typography } from "antd";
import style from "../../styles/lawcasedetail/LawCaseDetail.module.css";
import LawCaseTabs from "../../components/lawcasedetail/LawCaseTabs";
import Sidebar from "../../components/lawcasedetail/Sidebar";
import { getLawDetail } from "../../api/lawdetail";
import { useQuery } from "react-query";
import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";

interface getDataProps {
  precedentId: number;
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
  const [getData, setGetData] = useState<getDataProps>(Object());
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentColor, setCurrentColor] = useState<string>("");
  const location = useLocation();
  const currentLocation = Number(location.pathname.split("/")[2]);

  useQuery("lawDetail", () => getLawDetail(currentLocation), {
    onSuccess: (response) => {
      setGetData(response.data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const editHandler = () => {
    setIsEditMode(false);
    setCurrentColor("");
  };
  return (
    <Fragment>
      {isEditMode ? (
        <button className={style["edit-control"]} onClick={editHandler}>
          종료
        </button>
      ) : null}
      <Flex className={style["detail-page"]} justify="center">
        <Sidebar
          referencedStatute={getData.referencedStatute}
          referencedCase={getData.referencedCase}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          setCurrentColor={setCurrentColor}
        ></Sidebar>
        <Flex className={style["container"]} vertical>
          <Title className={style["container__title"]}>
            {getData ? getData.caseName : null}
          </Title>
          <br />
          <Flex className={style["content-box"]}>
            {getData ? (
              <LawCaseTabs
                getData={getData}
                currentLocation={currentLocation}
                isEditMode={isEditMode}
                currentColor={currentColor}
              />
            ) : null}
          </Flex>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default LawCaseDetail;

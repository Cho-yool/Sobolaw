import { Flex, Typography } from "antd";
import style from "../../styles/lawcasedetail/LawCaseDetail.module.css";
import LawCaseTabs from "../../components/lawcasedetail/LawCaseTabs";
import Sidebar from "../../components/lawcasedetail/Sidebar";

const LawCaseDetail = () => {
  const { Title } = Typography;
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

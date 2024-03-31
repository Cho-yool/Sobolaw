import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Button from "antd/lib/button";
import {
  FormOutlined,
  SaveOutlined,
  CloseOutlined,
  MailOutlined,
} from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import style from "../../styles/papers/Tab.module.css";
import { RootState } from "../../redux/store/store";
import { getInsult, postMail } from "../../api/lawsuit";
import { InsultForm } from "../../types/DataTypes";
import InsultPrint from "../../components/lawsuit/insult/InsultPrint";

const PrintLawsuit = () => {
  const navigate = useNavigate();
  const componentRef = useRef<HTMLDivElement>(null);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const { type, id } = useParams<{ type: string; id: string }>();
  const insultId = id ? parseInt(id) : 0;
  const [insultData, setInsultData] = useState<InsultForm>();
  const [loading, setLoading] = useState<boolean>(true);
  const [lawsuitType, setLawsuitType] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInsult(insultId, accessToken);
        setInsultData(response);
        setFileName(response.title);
      } catch (error) {
        console.error("Error fetching insult data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [insultId, accessToken]);

  useEffect(() => {
    if (type === "Insult") {
      setLawsuitType("모욕");
    } else if (type === "Defamations") {
      setLawsuitType("명예훼손");
    } else if (type === "Fraud") {
      setLawsuitType("사기");
    }
  }, [type]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${lawsuitType}죄 고소장_${fileName}`,
    onAfterPrint: () => alert("파일 다운로드가 완료되었습니다"),
  });

  const convertToPdf = async (element: HTMLElement) => {
    // canvas를 이용해 html을 이미지로 변환
    const canvas = await html2canvas(element);
    const imageFile = canvas.toDataURL("image/png");
    // jsPDF를 통해 이미지를 pdf로 변환
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.addImage(imageFile, "JPEG", 0, 0, pageWidth, pageHeight);
    // 저장 및 미리보기
    // doc.save("test.pdf")
    // window.open(doc.output("bloburl"));
    console.log(doc.output("bloburl"));
    const pdf = new File(
      [doc.output("blob")],
      `${lawsuitType}죄 고소장_${fileName}`,
      {
        type: "application/pdf",
      }
    );
    console.log(typeof pdf);
    console.log(pdf);
    const formData = new FormData();
    formData.append("file", pdf);
    formData.append("type", "pdf");
    // formData.append("name", "test");
    console.log(typeof formData);
    return formData;
  };

  const handleSendEmail = async () => {
    if (componentRef.current) {
      try {
        const formData = await convertToPdf(componentRef.current);
        console.log(formData);
        for (const key of formData.keys()) {
          console.log(key, ":", formData.get(key));
        }
        await postMail(formData, accessToken);
        console.log("전송 완료!");
      } catch (error) {
        console.error("이메일 전송 실패:", error);
      }
    }
  };

  return (
    <div>
      <div className={style["container"]}>
        <div className={style["container-mini"]}>
          <div className={style["container-title"]}>
            <FormOutlined /> {lawsuitType}죄 고소장:{fileName}
          </div>
          <Button className={style["container-button"]} onClick={handlePrint}>
            <SaveOutlined /> 프린트하기
          </Button>
          <Button
            className={style["container-button"]}
            onClick={handleSendEmail}
          >
            <MailOutlined /> 이메일로 보내기
          </Button>
        </div>
        <div className={style["container-mini"]}>
          <Button
            onClick={() => {
              navigate("/mypage/papers");
            }}
          >
            <CloseOutlined /> 나가기
          </Button>
        </div>
      </div>

      <div className={style["print-background"]}>
        <div className={style["print-a4"]}>
          {!loading && insultData && (
            <div ref={componentRef}>
              <InsultPrint insultData={insultData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrintLawsuit;

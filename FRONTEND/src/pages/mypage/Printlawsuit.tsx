import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Button from "antd/lib/button";
import { RootState } from "../../redux/store/store";
import { getInsult } from "../../api/lawsuit";
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

  useEffect(() => {
    if (insultData) {
      setFileName(insultData.title);
    }
  }, [insultData]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${lawsuitType}죄 고소장_${fileName}`,
    onAfterPrint: () => alert("파일 다운로드가 완료되었습니다"),
  });

  return (
    <>
      <div>
        <Button type="primary" onClick={handlePrint}>
          프린트하기
        </Button>
        <Button
          onClick={() => {
            navigate("/mypage/papers");
          }}
        >
          나가기
        </Button>
      </div>
      {!loading && insultData && (
        <div ref={componentRef}>
          <InsultPrint insultData={insultData} />
        </div>
      )}
    </>
  );
};

export default PrintLawsuit;

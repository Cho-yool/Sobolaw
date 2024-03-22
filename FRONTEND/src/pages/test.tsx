import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Print = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "파일 다운로드 시 저장되는 이름 작성",
    onAfterPrint: () => alert("파일 다운로드 후 알림창 생성 가능"),
  });

  return (
    <>
      <div>
        <button onClick={handlePrint}>Print this out!</button>
      </div>
      <div ref={componentRef}>
        <h2>Print this out</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
    </>
  );
};

export default Print;

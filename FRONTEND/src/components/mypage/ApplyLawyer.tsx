import { useState, useEffect } from "react";
import { Button } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import style from "../../styles/mypage/ApplyLawyer.module.css";

export default function ApplyLawyer() {
  const [fileName, setFileName] = useState<UploadImage | undefined>();
  const [previewURL, setPreviewUrl] = useState<string | null>("dd");

  useEffect(() => {
    if (fileName?.file) {
      const fileURL = URL.createObjectURL(fileName.file);
      setPreviewUrl(fileURL);

      return () => {
        URL.revokeObjectURL(fileURL);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [fileName]);

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFileName({
        file: files[0],
        type: files[0].name,
      });
    }
  };

  const clearFile = () => {
    setFileName(undefined);
  };

  return (
    <div className={style["container"]}>
      <div className={style["title"]}>변호사 신청하기</div>
      <div className={style["semi-title"]}>자격증 사진 등록</div>
      {fileName ? (
        <div className={style["input-photo"]}>
          <div>
            {previewURL && (
              <div className={style["image-box"]}>
                <img
                  src={previewURL}
                  alt="Preview"
                  className={style["image-ratio"]}
                />
              </div>
            )}
            <div>
              <input
                className="Input"
                type="file"
                id="file"
                disabled={fileName ? false : true}
                style={{ display: "none" }}
                onChange={fileInputHandler}
              />

              <label htmlFor="file" style={{ marginLeft: "1rem" }}>
                <EditOutlined />
              </label>

              <CloseOutlined
                style={{ marginLeft: "1rem" }}
                onClick={clearFile}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={style["input-photo"]}>
            <div>
              <input
                className="Input"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                id="file"
                onChange={fileInputHandler}
                disabled={fileName ? true : false}
                style={{ display: "none" }}
              />

              <label htmlFor="file" className="AttachmentButton">
                🔗 사진 업로드하기
              </label>
            </div>
          </div>
        </>
      )}

      <Button type="primary">제출하기</Button>
    </div>
  );
}

// 순서:
// 1. 사진 업로드시 백에 요청보내서 DB에 저장하는 동시에 그 저장된 url 받기
// 2. url로 다시 저장 날려주기

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { RootState } from "../../redux/store/store";
import style from "../../styles/mypage/ApplyLawyer.module.css";
import { postImage, postApplyLawyer } from "../../api/members";

type UploadImage = {
  file: File;
  type: string;
};

export default function ApplyLawyer({ onUpdate }: { onUpdate: () => void }) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
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

  const formData = new FormData();
  const onSubmit = async () => {
    if (fileName !== undefined) {
      formData.append("image", fileName.file);
      // for (const key of formData.keys()) {
      //   console.log(key, ":", formData.get(key));
      // }
      try {
        const res = await postImage(accessToken, formData);
        const imgUrl = res;
        formData.append("belongDocumentPath", imgUrl);
        await postApplyLawyer(accessToken, formData);
        onUpdate;
      } catch (error) {
        alert("사진을 다시 확인해주세요");
      }
    } else {
      alert("사진을 등록해주세요ㅠㅠ");
    }
  };

  return (
    <div className={style["container"]}>
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
                style={{ display: "none", cursor: "pointer" }}
              />
              <label
                htmlFor="file"
                className="AttachmentButton"
                style={{ cursor: "pointer", margin: "auto" }}
              >
                🔗 사진 업로드하기
              </label>
            </div>
          </div>
        </>
      )}

      <Button type="primary" onClick={onSubmit} style={{ marginTop: "2rem" }}>
        제출하기
      </Button>
    </div>
  );
}

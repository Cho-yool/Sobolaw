import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { Input, Radio, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import locale from "antd/es/date-picker/locale/ko_KR";
import style from "../../styles/papers/Insult.module.css";

export default function DefamationMenu() {
  const [offender, setOffender] = useState<string>("확실함");
  const [evidence, setEvidence] = useState<string>("없음");

  const defaultValue = dayjs("2024-01-01");
  const onChange: DatePickerProps["onChange"] = (_, dateStr) => {
    console.log("onChange:", dateStr);
  };

  const handleoffenderChange = (value: string) => {
    setOffender(value);
  };

  return (
    <div>
      <div className={style["menu-mini"]}>
        <div className={style["menu-title"]}>당사자 정보</div>
        <div className={style["menu-content"]}>
          <Input placeholder="김종범" prefix="성명   " />
        </div>
      </div>

      <div className={style["menu-mini"]}>
        <div className={style["menu-title"]}>고소인(본인) 상세정보</div>
        <div className={style["menu-content"]}>
          <div>성명</div>
          <Input />
          <div>주민등록번호</div>
          <Input />
          <div>주소</div>
          <Input placeholder="클릭해서 주소 검색하기" />
          <Input placeholder="상세주소" />
          <div>전화번호</div>
          <Input placeholder="010-0000-0000" />
        </div>
      </div>

      <div className={style["menu-mini"]}>
        <div className={style["menu-title"]}>피고소인(가해자) 정보</div>
        <div className={style["menu-content"]}>
          <div>명예훼손을 한 사람</div>
          <Radio.Group
            value={offender}
            onChange={(e) => handleoffenderChange(e.target.value)}
          >
            <Radio.Button value="확실함">확실함</Radio.Button>
            <Radio.Button value="일부알고있음">일부알고있음</Radio.Button>
            <Radio.Button value="모름">모름</Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className={style["menu-mini"]}>
        <div className={style["menu-title"]}>고소인(본인) 상세정보</div>
        <div className={style["menu-content"]}>
          <Input placeholder="이름" />
          <Input placeholder="주소" />
          <Input placeholder="전화번호" />
          <Input placeholder="기타(피고소인을 특정할 수 있는 증거나 사항" />
        </div>
      </div>

      <div className={style["menu-mini"]}>
        <div className={style["menu-title"]}>사건 경위</div>
        <div className={style["menu-content"]}>
          <DatePicker
            defaultValue={defaultValue}
            showTime
            locale={locale}
            onChange={onChange}
            style={{ width: "100%" }}
          />
          <Input placeholder="장소" />
          <Input placeholder="명예훼손 내용" />
          <Input placeholder="허위여부" />
          <Input placeholder="관련인원" />
        </div>
      </div>

      <div className={style["menu-mini"]}>
        <div className={style["menu-title"]}>증거자료</div>
        <div className={style["menu-content"]}>
          <Radio.Group
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
          >
            <Radio.Button value="사건이 촬영된 CCTV 혹은 영상파일">
              사건이 촬영된 CCTV 혹은 영상파일
            </Radio.Button>
            <Radio.Button value="목격자의 진술서">목격자의 진술서</Radio.Button>
            <Radio.Button value="없음">없음</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      <div className={style["menu-mini"]}>
        <div className={style["menu-title"]}>제출정보</div>
        <div className={style["menu-content"]}>
          <Input placeholder="제출날짜" />
          <Input placeholder="해당경찰서" />
        </div>
      </div>
    </div>
  );
}

// 원고(고소인)
// 성명:
// 주민등록번호:
// 주소:
// 전화번호:

// 피고(피고소인)
// 이름:
// 주소:
// 전화번호:
// 기타(피고소인을 특정할 수 있는 증거나 사항):

// 사건 일자:
// 사건 시간:
// 장소:
// 명예훼손 내용:
// 허위 인지 아닌지 여부:
// 관련 인원:
// 증거자료:
// 제출날짜:
// 해당 경찰서 팀: ~~경찰서 @@

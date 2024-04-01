import { Flex } from "antd";
import style from "../../styles/papers/CheckBox.module.css";
import { useState } from "react";

interface CheckBoxProps {
  boxList: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ boxList, onChange }: CheckBoxProps) => {
  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    Array(boxList.length).fill(false)
  );

  const checkHandler = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    setCheckedStates(newCheckedStates);
    onChange(e); // 이 부분에서 개별 체크박스의 변경 상태를 부모 컴포넌트로 전달할 수 있습니다.
  };

  const newLists = boxList.map((list, index) => {
    return (
      <Flex
        key={list}
        gap={5}
        style={{ fontSize: "14px", lineHeight: "1rem" }}
        align="center"
      >
        <input
          type="checkbox"
          id={list}
          name={list}
          onChange={(e) => checkHandler(index, e)}
          checked={checkedStates[index]}
          className={style["check-btn"]}
        />
        <label htmlFor={list} style={{ width: "100%" }}>
          <span></span>
          <strong>{list}</strong>
        </label>
      </Flex>
    );
  });

  return (
    <Flex vertical gap={10}>
      {newLists.length ? newLists : <p>없다</p>}
    </Flex>
  );
};

export default CheckBox;

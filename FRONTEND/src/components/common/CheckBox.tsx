import { Flex } from "antd";
import { useState } from "react";

interface CheckBoxProps {
  boxList: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ boxList, onChange }: CheckBoxProps) => {
  const [renderBox, setRenderBox] = useState<string[]>([]);

  const newLists = boxList.map((list) => {
    return (
      <Flex>
        <input
          type="checkbox"
          id={list}
          name={list}
          onChange={(e) => onChange(e)}
        />
        <label htmlFor={list}>{list}</label>
      </Flex>
    );
  });

  return <Flex vertical>{newLists ? newLists : <p>없다</p>}</Flex>;
};

export default CheckBox;

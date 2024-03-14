import { useState } from "react";

interface CheckBoxProps {
  boxList: string[];
  onChange: () => void;
}

const CheckBox = ({ boxList, onChange }: CheckBoxProps) => {
  const [renderBox, setRenderBox] = useState<string[]>([]);

  const newLists = boxList.map((list) => {
    return (
      <>
        <input type="checkbox" id={list} name={list} onChange={onChange} />
        <label htmlFor={list}>{list}</label>
      </>
    );
  });

  return <div>{newLists ? newLists : <p>없다</p>}</div>;
};

export default CheckBox;

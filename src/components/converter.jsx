import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import "./converter.css";

export default function Converter() {
  const [kurses, setKurses] = useState([]);
  const [list, setList] = useState([]);
  const [options, setOptions] = useState([]);
  const [firstKurs, setFirstKurs] = useState(1);
  const [secKurs, setSecKurs] = useState(1);
  const [count, setCount] = useState(1);
  const [finalNumber, setFinalNumber] = useState(0);

  useEffect(() => {
    async function getKurs() {
      const url = "https://www.nbrb.by/api/exrates/rates?periodicity=0";
      return (await fetch(url)).json();
    }

    getKurs().then((res) => {
      setKurses((prev) => [prev, ...res]);
    });
  }, []);

  useEffect(() => {
    let map = kurses.map((item, index) => {
      return (
        <tr className={index % 2 === 0 ? "stroke" : null} key={nanoid()}>
          <td>{item.Cur_Abbreviation}</td>
          <td>{item.Cur_OfficialRate}</td>
        </tr>
      );
    });
    setList(map);

    let opts = kurses.map((item, index) => {
      if (index !== 0) {
        return (
          <option key={nanoid()} value={index}>
            {item.Cur_Abbreviation}
          </option>
        );
      } else {
        return null;
      }
    });
    setOptions(opts);
  }, [kurses]);

  useEffect(() => {
    setFinalNumber(((firstKurs / secKurs) * count).toFixed(2));
  }, [secKurs, firstKurs, count]);

  function handleChange(e) {
    setCount(e.target.value);
  }

  function firstValue(e) {
    if (e.target.value === "0") {
      setFirstKurs(1);
    } else {
      setFirstKurs(
        kurses[e.target.value].Cur_OfficialRate /
          kurses[e.target.value].Cur_Scale
      );
    }
  }

  function secondValue(e) {
    if (e.target.value === "0") {
      setSecKurs(1);
    } else {
      setSecKurs(
        kurses[e.target.value].Cur_OfficialRate /
          kurses[e.target.value].Cur_Scale
      );
    }
  }

  return (
    <div className="cont">
      <div className="items">
        <div className="item">
          <input type="number" onChange={handleChange} value={count}></input>
          <select onChange={firstValue}>
            <option value="0">BYN</option>
            {options}
          </select>
        </div>
        <div className="item">
          <input type="number" placeholder={finalNumber} disabled></input>
          <select onChange={secondValue}>
            <option value="0">BYN</option>
            {options}
          </select>
        </div>
      </div>
      <table className="elems">
        <tbody>{list}</tbody>
      </table>
    </div>
  );
}

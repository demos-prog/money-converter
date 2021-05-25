import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import "./converter.css";

export default function Converter() {
  const [kurses, setKurses] = useState([]);
  const [list, setList] = useState([]);
  const [firstKurs, setFirstKurs] = useState(1);
  const [secKurs, setSecKurs] = useState(1);
  const [count, setCount] = useState(0);
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
    let map = kurses.map((item) => {
      return (
        <div key={nanoid()}>
          {item.Cur_Abbreviation} {item.Cur_OfficialRate}
        </div>
      );
    });
    setList(map);
  }, [kurses]);

  useEffect(() => {
    setFinalNumber(((firstKurs / secKurs) * count).toFixed(2));
  }, [secKurs, firstKurs, count]);

  function handleChange(e) {
    setCount(e.target.value);
  }

  function firstValue(e) {
    setFirstKurs(kurses[e.target.value].Cur_OfficialRate);
  }

  function secondValue(e) {
    setSecKurs(kurses[e.target.value].Cur_OfficialRate);
  }

  return (
    <>
      <div>
        <input type="number" onChange={handleChange}></input>
        <select onChange={firstValue}>
          <option>choose</option>
          <option value="5">USD</option>
          <option value="6">EUR</option>
          <option value="17">RUB</option>
        </select>
      </div>
      <div>
        <input type="number" placeholder={finalNumber} disabled></input>
        <select onChange={secondValue}>
          <option>choose</option>
          <option value="5">USD</option>
          <option value="6">EUR</option>
          <option value="17">RUB</option>
        </select>
      </div>
      {list}
    </>
  );
}

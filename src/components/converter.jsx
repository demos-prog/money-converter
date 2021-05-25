import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import "./converter.css";

export default function Converter() {
  const [kurses, setKurses] = useState([]);
  const [list, setList] = useState([]);
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
            <option value="1">AUD</option>
            <option value="2">BGN</option>
            <option value="3">UAH</option>
            <option value="4">DKK</option>
            <option value="5">USD</option>
            <option value="6">EUR</option>
            <option value="7">PLN</option>
            <option value="8">JPY</option>
            <option value="9">IRR</option>
            <option value="10">ISK</option>
            <option value="11">CAD</option>
            <option value="12">CNY</option>
            <option value="13">KWD</option>
            <option value="14">MDL</option>
            <option value="15">NZD</option>
            <option value="16">NOK</option>
            <option value="17">RUB</option>
            <option value="18">XDR</option>
            <option value="19">SGD</option>
            <option value="20">KGS</option>
            <option value="21">KZT</option>
            <option value="22">TRY</option>
            <option value="23">GBP</option>
            <option value="24">CZT</option>
            <option value="25">SEK</option>
            <option value="26">CHF</option>
          </select>
        </div>
        <div className="item">
          <input type="number" placeholder={finalNumber} disabled></input>
          <select onChange={secondValue}>
            <option value="0">BYN</option>
            <option value="1">AUD</option>
            <option value="2">BGN</option>
            <option value="3">UAH</option>
            <option value="4">DKK</option>
            <option value="5">USD</option>
            <option value="6">EUR</option>
            <option value="7">PLN</option>
            <option value="8">JPY</option>
            <option value="9">IRR</option>
            <option value="10">ISK</option>
            <option value="11">CAD</option>
            <option value="12">CNY</option>
            <option value="13">KWD</option>
            <option value="14">MDL</option>
            <option value="15">NZD</option>
            <option value="16">NOK</option>
            <option value="17">RUB</option>
            <option value="18">XDR</option>
            <option value="19">SGD</option>
            <option value="20">KGS</option>
            <option value="21">KZT</option>
            <option value="22">TRY</option>
            <option value="23">GBP</option>
            <option value="24">CZT</option>
            <option value="25">SEK</option>
            <option value="26">CHF</option>
          </select>
        </div>
      </div>
      <table className="elems">
        <tbody>{list}</tbody>
      </table>
    </div>
  );
}

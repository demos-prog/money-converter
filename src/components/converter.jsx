import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import "./converter.css";

export default function Converter() {
  // const [curValuta, setCurValuta] = useState(4);
  const [kurses, setKurses] = useState([]);
  const [list, setList] = useState ([]);
  // Cur_ID: 292 - 5 -  EUR
  // Cur_ID: 298 - 16 - RUB
  // Cur_ID: 145 - 4 - USD
  
  useEffect(() => {
    async function getKurs() {
      const url = "https://www.nbrb.by/api/exrates/rates?periodicity=0";
      return (await fetch(url)).json();
    }

    getKurs().then((res) => {
      setKurses(prev => [prev, ...res]);
    });
  }, []);

  useEffect(()=>{
    let map = kurses.map((item) => {
      return <div key={nanoid()}>{item.Cur_OfficialRate}</div>;
    });
    setList(map)
  }, [kurses])

  function handleChange(e) {
    console.log(e.target.value);
  }

  return (
    <>
      <select onChange={handleChange}>
        <option value="4">USD</option>
        <option value="5">EUR</option>
        <option value="16">RUB</option>
      </select>
      {list}
    </>
  );
}

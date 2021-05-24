import React, { useState } from "react";
import "./converter.css";

export default function Converter() {
  const [usdIn, setUSDin] = useState("");

  async function getKurs() {
    const fch = await fetch("https://belarusbank.by/api/kursExchange?city=Минск");
    return fch.json();
  }

  getKurs().then((res) => {
    console.log(res[0]);
  });
  return <>{usdIn}</>;
}

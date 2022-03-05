import React, { useState } from "react";
import InfoModal from "./InfoModal";

export default function Header(props) {
  const [infoVisible, setInfoVisible] = useState(false);
  return (
    <div className="header">
      <p>WORD UNLIMITED</p>
      <InfoModal close={() => setInfoVisible(false)} visible={infoVisible} />
      <button onClick={() => setInfoVisible(true)}>ABOUT</button>
    </div>
  );
}

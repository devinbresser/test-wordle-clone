import React, { useState } from "react";

export default function InfoModal(props) {
  return (
    props.visible && (
      <div>
        <p>some bullshit</p>
        <button onClick={props.close}>close</button>
      </div>
    )
  );
}

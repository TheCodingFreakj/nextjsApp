import React from "react";
import "../../../static/styles.css";
const BackDrop = (props) => {
  return props.show ? (
    <div className="backdrop" onClick={props.closeModal}></div>
  ) : null;
};

export default BackDrop;

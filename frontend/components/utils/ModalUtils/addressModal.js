import React from "react";
import BackDrop from "../ModalUtils/backdrop";
import "../../../static/styles.css";

const Modal = (props) => {
  
  return (
    <React.Fragment>
      <BackDrop show={props.show} closeModal={props.closeModal} />
      <div
        style={{
          transform: props.show ? "skewY(0)" : "skewY(25deg)",
          opacity: props.show ? "1" : "0",
          position: "absolute",
          zIndex: "1000",
          left: "20rem",
          top: "30rem",
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default Modal;

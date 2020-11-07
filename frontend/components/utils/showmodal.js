import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../static/styles.css";
import Popup from "../../components/utils/popup";

//bring components

const ShowModal = ({ serviceSlug, scroller }) => {
  const [popUpPosition, setPopupPosition] = useState(0);
  const [closeModal, setcloseModal] = useState("");
  scroller.then(function (result) {
    setPopupPosition(result);
  });

  const custData = (loggedincustomer) => {
    setcloseModal(loggedincustomer);
  };

  return (
    <React.Fragment>
      {!closeModal &&
      popUpPosition.Yposition > 1000 &&
      popUpPosition.Yposition < 4000 ? (
        <Popup serviceSlug={serviceSlug} showPopUp={true} custData={custData} />
      ) : null}
    </React.Fragment>
  );
};

export default ShowModal;

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../static/styles.css";
import Popup from "../../components/utils/popup";

//bring components

const ShowModal = ({ serviceSlug, scroller }) => {
  //reate a slider of tools to be choosen

  const [popUpPosition, setPopupPosition] = useState(0);
  const [closeModal, setcloseModal] = useState("");

  scroller.then(function (result) {
    setPopupPosition(result);
  });

  //closePopup={() => togglePopup(showPopUp)}
  const custData = (loggedincustomer) => {
    setcloseModal(loggedincustomer);
  };

  //get the user data from backend
  //e\if exists then put that condition that dont trigger the modal

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

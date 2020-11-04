import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../static/styles.css";
import Popup from "../../components/utils/popup";
import { getBusinessDetails } from "../../actions/user";
//bring components

const ShowModal = ({ scroller }) => {
  //reate a slider of tools to be choosen

  const [popUpPosition, setPopupPosition] = useState(0);
  const [showPopUp, setshowPop] = useState(false);
  scroller.then(function (result) {
    setPopupPosition(result);
  });

  const togglePopup = () => {
    setshowPop(!showPopUp);
  };

  return (
    <React.Fragment>
      {popUpPosition.Yposition > 1000 ? (
        <Popup closePopup={() => togglePopup(showPopUp)} />
      ) : null}
    </React.Fragment>
  );
};

export default ShowModal;

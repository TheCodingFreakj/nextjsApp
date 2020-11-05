import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../static/styles.css";
import Popup from "../../components/utils/popup";
import { getBusinessDetails } from "../../actions/user";
//bring components

const ShowModal = ({ serviceSlug, scroller }) => {
  //reate a slider of tools to be choosen

  const [popUpPosition, setPopupPosition] = useState(0);

  scroller.then(function (result) {
    setPopupPosition(result);
  });

  //closePopup={() => togglePopup(showPopUp)}
  const custData = (data) => {
    console.log(data);
  };
  return (
    <React.Fragment>
      {popUpPosition.Yposition > 1000 && popUpPosition.Yposition < 4000 ? (
        <Popup
          serviceSlug={serviceSlug}
          showPopUp={true}
          custData={() => custData()}
        />
      ) : null}
    </React.Fragment>
  );
};

export default ShowModal;

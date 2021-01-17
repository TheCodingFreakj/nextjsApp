import React, { useState } from "react";
import "../../../static/styles.css";
import Popup from "../../../components/utils/ModalUtils/popup";
const ShowModal = ({ serviceSlug, scrollPosition }) => {
  const [showModal, setshowModal] = useState(true);

  const custData = (loggedincustomer) => {
    loggedincustomer ? setshowModal(false) : setshowModal(true);
  };

  return (
    <React.Fragment>
      {showModal &&
      scrollPosition.Yposition > 1000 &&
      scrollPosition.Yposition < 4000 ? (
        <Popup serviceSlug={serviceSlug} showPopUp={true} custData={custData} />
      ) : null}
    </React.Fragment>
  );
};

export default ShowModal;

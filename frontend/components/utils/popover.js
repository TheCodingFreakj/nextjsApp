import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import Popup from "../../components/utils/popup";
import "../../static/styles.css";
const PopOver = ({ loggedinUser }) => {
  //console.log(loggedinUser);

  const [showPopUp, setshowPop] = useState(false);

  const togglePopup = () => {
    setshowPop(!showPopUp);
  };

  return (
    <React.Fragment>
      <Button onClick={togglePopup}>Click Here</Button>

      {showPopUp ? (
        <Popup
          loggedinUser={loggedinUser}
          closePopup={() => togglePopup(showPopUp)}
        />
      ) : null}
    </React.Fragment>
  );
};

//https://codepen.io/bastianalbers/pen/PWBYvz
export default PopOver;

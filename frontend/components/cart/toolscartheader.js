import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Header,
  Button,
  Segment,
  Icon,
  Item,
  Divider,
} from "semantic-ui-react";
import AddToolButton from "./cartutils/addToolsButton";

const Toolscartheader = ({ toolcartlist, handleRemoveToolFromCart }) => {
  return (
    <React.Fragment>
      <h2>Tools Picks</h2>
      <Divider />
      {toolcartlist ? <>tools</> : null}
    </React.Fragment>
  );
};

export default Toolscartheader;

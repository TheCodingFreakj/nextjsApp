import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";
const Footer = () => {
  const socialsharebutton = () => {
    <div>
      <Button circular color="facebook" icon="facebook" />
      <Button circular color="twitter" icon="twitter" />
      <Button circular color="linkedin" icon="linkedin" />
      <Button circular color="google plus" icon="google plus" />
    </div>;
  };

  return (
    <React.Fragment>
      <>Build the footer here{socialsharebutton()}</>
    </React.Fragment>
  );
};

export default Footer;

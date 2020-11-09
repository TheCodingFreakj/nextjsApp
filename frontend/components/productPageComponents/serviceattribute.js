import React from "react";
import { Header, Button } from "semantic-ui-react";

const ServiceAttribute = ({ summary }) => {
  //console.log(product);

  return (
    <>
      <Header as="h3">About This Product</Header>
      <p>{summary}</p>
      <Button
        icon="trash alternate outline"
        color="orange"
        content="Delete Product"
      />
    </>
  );
};

export default ServiceAttribute;

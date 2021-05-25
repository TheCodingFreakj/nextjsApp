import React from "react";
import Button from "../utils/button";

const ServiceAttribute = ({ summary }) => {
  //console.log(product);
  return (
    <>
      <h1 verticalalign="middle" as="h3">
        About This Product
      </h1>
      <p>{summary}</p>
      <Button btnColor="#962d2d" children="delete" labelColor="#fcc97b" />
    </>
  );
};

export default ServiceAttribute;

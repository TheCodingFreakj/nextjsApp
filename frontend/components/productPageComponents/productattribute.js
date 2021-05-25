import React from "react";
import { Header, Button } from "semantic-ui-react";

const ProductAttribute = ({ summary }) => {
  //console.log(product);

  return (
    <p>
      <h1> About This Product</h1>

      <p>{summary}</p>
      <Button
        icon="trash alternate outline"
        color="orange"
        content="Delete Product"
      />
    </p>
  );
};

export default ProductAttribute;

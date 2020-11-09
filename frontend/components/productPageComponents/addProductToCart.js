import React from "react";
import { Input } from "semantic-ui-react";

const AddProductToCart = () => {
  //console.log(product);

  return (
    <>
      <Input
        type="number"
        min="1"
        placeholder="Quantity"
        value={1}
        action={{
          color: "orange",
          content: "Add To Cart",
          icon: "plus cart",
        }}
      />
    </>
  );
};

export default AddProductToCart;

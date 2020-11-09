import React from "react";
import { Item } from "semantic-ui-react";
import AddProductToCart from "./addProductToCart";

const ProductSummary = ({
  tool,
  clientPrice,
  totalPrice,
  serviceChargeRate,
  _id,
}) => {
  //console.log(product);
  return (
    <Item.Group>
      <Item>
        <Item.Image
          size="medium"
          src="/static/images/marketingsolutions.jpg"
        ></Item.Image>
        <Item.Content>
          <Item.Header>{tool}</Item.Header>
          <Item.Description>
            <p>
              Mrp: ${totalPrice} Plus serviceCharge {serviceChargeRate}%
            </p>
            <p>${clientPrice}</p>
          </Item.Description>
          <Item.Extra>
            <AddProductToCart productId={_id} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default ProductSummary;

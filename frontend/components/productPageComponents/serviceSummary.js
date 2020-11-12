import React from "react";
import { Item } from "semantic-ui-react";
import AddProductToCart from "./addProductToCart";

const ServiceSummary = ({ duration, title, _id, discountedServiceCharges }) => {
  //console.log(product);
  return (
    <Item.Group>
      <Item>
        <Item.Content>
          <Item.Header>{title}</Item.Header>
          <Item.Description>
            <p>
              Discounted Price $
              {discountedServiceCharges[0].discountedServiceCharges}
            </p>
            <p>{duration}Days</p>
          </Item.Description>
          <Item.Extra>
            <AddProductToCart serviceId={_id} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default ServiceSummary;

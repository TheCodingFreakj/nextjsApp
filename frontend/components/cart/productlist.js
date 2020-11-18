import React from "react";
import { Header, Button, Segment, Icon, Item } from "semantic-ui-react";
import { isAuth } from "../../actions/setAuthToken";
import { useRouter } from "next/router";
const ShowProducts = ({ products, handleRemoveFromCart }) => {
  const mapCartProductsToItems = (products) => {
    return products.map((p) => ({
      header: (
        <Item.Header
          as="a"
          onClick={() =>
            router.push(`/services/service?serviceId=${p.product[0]._id}`)
          }
        >
          {p.product[0].title}
        </Item.Header>
      ),
      childKey: p.product[0]._id,
      meta: `${p.quantity} x   $ ${p.product[0].discountedServiceCharges[0].discountedServiceCharges}`,
      fluid: "true",
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          onClick={() => handleRemoveFromServiceCart(p.product[0]._id)}
        />
      ),
    }));
  };
  return (
    <Item.Group divided items={mapCartProductsToItems(products)}></Item.Group>
  );
};

export default ShowProducts;
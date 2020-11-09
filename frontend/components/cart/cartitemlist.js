import React from "react";
import { Header, Button, Segment, Icon } from "semantic-ui-react";

const CartItemList = () => {
  //console.log(product);
  const user = false;
  return (
    <Segment secondary color="yellow" inverted textAlign="center" placeholder>
      <Header icon>
        <Icon name="shopping basket" color="black" />
        No Products In Your Cart Add Some
      </Header>
      <div>
        {user ? (
          <Button color="orange">View Products</Button>
        ) : (
          <Button color="green">Login To Add Products</Button>
        )}
      </div>
    </Segment>
  );
};

export default CartItemList;

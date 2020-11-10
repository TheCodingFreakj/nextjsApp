import React from "react";
import { Header, Button, Segment, Icon, Item } from "semantic-ui-react";
import { isAuth, getCookie } from "../../actions/setAuthToken";
import { useRouter } from "next/router";
const CartItemList = ({ products, handleRemoveFromCart }) => {
  //console.log(product);

  const router = useRouter();

  const user = isAuth();
  const mapCartProductsToItems = (products) => {
    return products.map((p) => ({
      header: (
        <Item.Header
          as="a"
          onClick={() => router.push(`/products?id=${p.product[0]._id}`)}
        >
          {p.product[0].tool}
        </Item.Header>
      ),
      childKey: p.product[0]._id,
      meta: `${p.quantity} x   $ ${p.product[0].clientPrice}`,
      fluid: "true",
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          onClick={() => handleRemoveFromCart(p.product[0]._id)}
        />
      ),
    }));
  };
  if (products.length === 0) {
    return (
      <Segment secondary color="yellow" inverted textAlign="center" placeholder>
        <Header icon>
          <Icon name="shopping basket" color="black" />
          No Products In Your Cart Add Some
        </Header>
        <div>
          {user ? (
            <Button color="orange" onClick={() => router.push("/services")}>
              View Products
            </Button>
          ) : (
            <Button
              color="green"
              onClick={() => router.push("/customerSignup")}
            >
              Login To Add Products
            </Button>
          )}
        </div>
      </Segment>
    );
  }

  return (
    <Item.Group divided items={mapCartProductsToItems(products)}></Item.Group>
  );
};

export default CartItemList;

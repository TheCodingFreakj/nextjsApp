import React from "react";
import { Segment } from "semantic-ui-react";
import Layout from "../../components/Layout";
import CartItemList from "../../components/cart/cartitemlist";
import CartSummary from "../../components/cart/cartsummary";

//bring components

const Cart = () => {
  return (
    <Layout>
      <Segment>
        <CartItemList />
        <CartSummary />
      </Segment>
    </Layout>
  );
};

export default Cart;

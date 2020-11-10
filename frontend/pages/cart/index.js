import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import CartItemList from "../../components/cart/cartitemlist";
import CartSummary from "../../components/cart/cartsummary";
import { getCookie } from "../../actions/setAuthToken";
import { fetchToolsCart } from "../../actions/shoppingcart";

//bring components

const Cart = ({ router }) => {
  const [error, seterror] = useState("");
  const [products, setProducts] = useState([]);
  const token = getCookie("token");

  //see if you can use fetchCart depending on whether the user is authenticated or not
  useEffect(() => {
    fetchThisUserCart();
  }, [router]);

  const fetchThisUserCart = async () => {
    await fetchToolsCart(token).then((data) => {
      if (data.error) {
        seterror({ ...error, error: data.error });
      } else {
        setProducts(data);
      }
    });
  };

  // console.log(products);
  return (
    <Layout>
      <Segment>
        <CartItemList />
        <CartSummary />
      </Segment>
    </Layout>
  );
};

export default withRouter(Cart);

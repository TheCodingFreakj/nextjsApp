import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Header,
  Icon,
  Button,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import Layout from "../../components/Layout";
import { isAuth, getCookie } from "../../actions/setAuthToken";
import withSoftReload from "../../components/hoc/cartreload";
import CartHeader from "../../components/cart/cartheader";
import CartFooter from "../../components/cart/cartfooter";
import { fetchCarts } from "../../actions/shoppingcart";
import { withRouter } from "next/router";
import { API } from "../../config";
import axios from "axios";
const Cart = ({ router }) => {
  //get both the carts

  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const user = isAuth();
  useEffect(() => {
    const mounted = { current: true };

    if (mounted.current) {
      getProductsFromCarts();
    }

    return () => {
      mounted.current = false;
    };
  }, [router]); //render only when the data changes that we will get from serverside

  const getProductsFromCarts = async () => {
    setLoading(true);
    await fetchCarts(getCookie("token")).then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        setCart(data);
      }
    });
  };

  const handleRemoveToolFromCart = async (productId) => {
    console.log(productId);
    const token = getCookie("token");
    const url = `${API}/api/delete-cart`;
    const payload = {
      params: { productId },
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    };
    const response = await axios.delete(url, payload);
    setMessage(response.data.msg);
    getProductsFromCarts();
  };

  const handleRemoveServiceFromCart = async (serviceId) => {
    const token = getCookie("token");

    const url3 = `${API}/api/delete-cart`;
    const payload3 = {
      params: { serviceId },
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    };
    const response = await axios.delete(url3, payload3);
    setMessage(response.data.msg);
    getProductsFromCarts();
  };

  return (
    <Layout>
      <React.Fragment>
        {loading ? (
          <Segment>
            <Dimmer active size="medium">
              <Loader>Loading</Loader>
            </Dimmer>
          </Segment>
        ) : (
          <div>
            {cart ? (
              <Segment>
                <CartHeader
                  carlist={cart}
                  user={user}
                  handleRemoveToolFromCart={handleRemoveToolFromCart}
                  handleRemoveServiceFromCart={handleRemoveServiceFromCart}
                />
                <CartFooter carlist={cart} />
              </Segment>
            ) : (
              <Segment>
                <Button color="orange" onClick={() => router.push("/services")}>
                  View Products
                </Button>
              </Segment>
            )}
          </div>
        )}
      </React.Fragment>
    </Layout>
  );
};

export default withRouter(Cart);

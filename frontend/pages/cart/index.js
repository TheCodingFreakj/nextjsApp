import React, { useState, useEffect } from "react";
import { Button, Segment, Dimmer, Loader } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { getCookie } from "../../actions/setAuthToken";
import ServiceCartHeader from "../../components/cart/servicecartheader";
import { fetchCarts } from "../../actions/shoppingcart";
import { API } from "../../config";
import axios from "axios";
const Cart = () => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //const mounted = { current: true };

    // if (mounted.current) {
    getProductsFromCarts();
    //}

    // return () => {
    //   mounted.current = false;
    // };
  }, [cart]);

  const getProductsFromCarts = async () => {
    setLoading(true);
    await fetchCarts(getCookie("token")).then((data) => {
      //console.log("this is data fetched", data);
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        let newcart = {
          ...cart,
          data,
        };
        setCart(newcart);
      }
    });
  };
  //console.log("thsi is cart contente", cart);
  const handleRemoveToolFromCart = async (productId) => {
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
          <div className="loader">
            <h2>...Loading</h2>
          </div>
        ) : (
          <div>
            {cart ? (
              <div>
                <ServiceCartHeader
                  products={cart}
                  handleRemoveServiceFromCart={handleRemoveServiceFromCart}
                  handleRemoveToolFromCart={handleRemoveToolFromCart}
                />
              </div>
            ) : (
              <div>
                <>
                  <p>You got No Product Now! Would You want to Buyt</p>
                  <Button
                    icon="cart"
                    color="yellow"
                    floated="right"
                    content="Buy Services"
                    onClick={() => router.push(`/services `)}
                  />
                </>
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    </Layout>
  );
};

export default Cart;

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import ShowCartItems from "../../components/cart/showCartItems";
import { getCookie } from "../../actions/setAuthToken";
import { fetchCarts } from "../../actions/shoppingcart";
import { API } from "../../config";
import axios from "axios";
import "../../static/cart.css";

const Cart = () => {
  const [cart, setCart] = useState({
    tools: "",
    services: "",
    isFetching: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getProductsFromCarts = async () => {
      try {
        setCart({
          tools: cart.tools,
          services: cart.services,
          isFetching: true,
        });
        const response = await fetchCarts(getCookie("token"));
        console.log("this is response from backend", response);
        setLoading(false);
        setCart({
          tools: response.toolsCart,
          services: response.serviceCart,
          isFetching: false,
        });
      } catch (exception) {
        setLoading(false);
        console.log(exception);
        setCart({
          tools: cart.tools,
          services: cart.services,
          isFetching: false,
        });
      }
    };
    getProductsFromCarts();
  }, []);

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
            <h2>
              .......................................................Loading.................................................
            </h2>
          </div>
        ) : (
          <div>
            {cart ? (
              <div>
                <ShowCartItems
                  products={cart}
                  handleRemoveServiceFromCart={handleRemoveServiceFromCart}
                  handleRemoveToolFromCart={handleRemoveToolFromCart}
                />
              </div>
            ) : (
              <div>
                <>
                  <p>You got No Product Now! Would You want to Buyt</p>
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

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Segment, Dimmer, Loader } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { isAuth, getCookie } from "../../actions/setAuthToken";
import withSoftReload from "../../components/hoc/cartreload";
import CartHeader from "../../components/cart/cartheader";
import CartFooter from "../../components/cart/cartfooter";
import { fetchCarts } from "../../actions/shoppingcart";
import { withRouter } from "next/router";

const Cart = ({ router }) => {
  //get both the carts

  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(false);

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
                <CartHeader carlist={cart} />
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
//https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar

export default withRouter(Cart);
// {loading ? (
//   <Segment>...Data Loading.....</Segment>
// ) : (
//   <div>
//     {cart ? (
//       <Segment>
//         <CartHeader carlist={cart} />
//         {/* <CartFooter carlist={cart} /> */}
//       </Segment>
//     ) : null}
//   </div>
// )}

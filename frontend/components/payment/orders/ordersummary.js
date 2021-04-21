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
import Layout from "../../../components/Layout";
import { isAuth, getCookie } from "../../../actions/setAuthToken";
import { useRouter } from "next/router";
import { parsedataUrl } from "../../../components/utils/parseUrl";
import { fetchCarts } from "../../../actions/shoppingcart";
import Modal from "../../../components/utils/ModalUtils/addressModal";
import AddressConfirmationSwitch from "../../utils/switches/addressswitch";
import Wrapper from "../../hoc/wrapper";
const OrderSummary = () => {
  const [paymentData, setpaymentData] = useState({});
  const [cart, setCart] = useState({
    tool: "",
    services: "",
  });
  const [loading, setLoading] = useState(false);
  const [displayAddressInputs, setdisplayAddressInputs] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const { tool, services } = cart;
  const router = useRouter();

  if (typeof window !== "undefined") {
    useEffect(() => {
      if (window.location.search) {
        const response = parsedataUrl(
          decodeURIComponent(window.location.search)
        );

        setpaymentData(response.params.general);
        // console.log("This is running3333");
      }
    }, [window.location.search]);
  }

  useEffect(() => {
    const mounted = { current: true };

    if (mounted.current) {
      getProductsFromCarts();
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  const getProductsFromCarts = async () => {
    await fetchCarts(getCookie("token")).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        let fetchedcart = {
          ...cart,
          tool: data.toolsCart,
          services: data.serviceCart,
          message: data.msg,
        };

        setCart(fetchedcart);
      }
    });
  };

  const showtools = (tools) => {
    return tools.map((t, i) => {
      return (
        <div key={i}>
          <table>
            <tr>
              <th>ToolName</th>

              <th>Quantity</th>

              <th>Duration</th>

              <th>TotalPrice</th>
            </tr>

            <tr>
              <td>{t.product[0].tool}</td>

              <td>{t.quantity}</td>

              <td>30 days</td>

              <td>{t.product[0].totalPrice}</td>
            </tr>
          </table>
        </div>
      );
    });
  };

  const showservices = (services) => {
    //console.log(services.product);
    return services.map((s, i) => {
      return (
        <div className="table-container" key={i}>
          <table>
            <tr>
              <th>ServiceName</th>

              <th>Quantity</th>

              <th>Duration</th>

              <th>Rate</th>
              <th>TotalPrice</th>
            </tr>

            <tr>
              <td>{s.product[0].title}</td>

              <td>{s.quantity}</td>

              <td>{s.product[0].duration}</td>

              <td>
                {s.product[0].discountedServiceCharges[0].servicedDiscountPrice}{" "}
                %
              </td>

              <td>
                {
                  s.product[0].discountedServiceCharges[0]
                    .discountedServiceCharges
                }
              </td>
            </tr>
          </table>
        </div>
      );
    });
  };

  let calTotalTools = tool ? (
    tool.products
      .map((t) => {
        let price = t.product[0].totalPrice;
        return price;
      })
      .reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0)
  ) : (
    <p>no tools</p>
  );

  let calcTotalServices = services ? (
    services.products.map((t) => {
      const totalpriceProducts =
        t.product[0].discountedServiceCharges[0].discountedServiceCharges;
      const totalpricequantityorders = totalpriceProducts * t.quantity;
      const totalduration = parseInt(t.product[0].duration);
      // let totalprice
      let pricetoshow = totalpricequantityorders;

      return { pricetoshow, totalduration };
    })
  ) : (
    <p>no services</p>
  );

  //////////////////////Services and Durations////////////////////////
  let the_days = [];
  services
    ? (the_days = Object.keys(calcTotalServices).map((item, i) => {
        return Math.round(calcTotalServices[item].totalduration);
      }))
    : null;

  let arraytot = [];
  services
    ? (arraytot = services.products
        .map((p, i) => {
          let duration = p.product[0].duration;
          let service = p.product[0].title;
          let arr = [];
          arr.push({ service: duration });
          return arr;
        })
        .map((arr) => {
          return arr[0];
        }))
    : null;

  //////////////////////TOtal Price////////////////////////
  let prices = [];
  services
    ? (prices = Object.keys(calcTotalServices).map((item, i) => {
        return Math.round(calcTotalServices[item].pricetoshow);
      }))
    : null;

  let totalprice = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  services ? (totalprice = prices.reduce(reducer)) : null;

  const styles = {
    background: "turquoise",
    padding: "2%",
    borderRadius: "4rem",
    position: "relative",
    marginTop: "5%",
  };

  const purchaseNow = () => {
    setPurchasing(true);
  };

  const closeModal = () => {
    setPurchasing(false);
  };

  let checkoutparamsinitial = encodeURIComponent(
    `${paymentData[0]}  & ${paymentData[1]}  & ${paymentData[2]}  & ${services.active}`
  );

  return (
    <div>
      {tool ? (
        <div className="order-container">
          <p>Tools Summary</p>
          <div>{showtools(tool.products)}</div>
          <p>Total Tools per month {Math.round(calTotalTools)}</p>

          {/* pass the status monthly subscrtion upto how many months 
money value */}
          {/* after total payment done empty the cart
show the products in the orders section and remove when  the status as false based on duration*/}
          <Button
            icon="cart"
            color="yellow"
            floated="right"
            content="Subscribe"
            onClick={() => router.push(`/payment/subscribe`)}
          />
        </div>
      ) : (
        <p>you got to wait while we fetch your tools shopping cart data</p>
      )}
      {services ? (
        <div className="order-container">
          <p>Services Summary</p>
          <div>
            {showservices(services.products)}
            <button style={styles} onClick={purchaseNow}>
              Confirm address
            </button>
          </div>

          <h3>Pricing Summary</h3>
          <div className="pricing-summary-1">
            <p>Total Services as First Emi: $ {totalprice} </p>
            <p>1st emi: ${paymentData[1]} </p>
            <Button
              icon="cart"
              color="teal"
              floated="right"
              content="Checkout-EMI-1"
              onClick={() =>
                router.push(
                  `/payment/checkout/?q=${checkoutparamsinitial}&durationlists=${the_days}`
                )
              }
            />
          </div>
          <div className="pricing-summary-2">
            <p>Residual: {paymentData[1]}</p>
            <Button
              icon="cart"
              color="teal"
              floated="left"
              content="Checkout-EMI-2"
              className="btn"
            />
          </div>

          {/* send the status and emi amount also 
break the second emi and set when to pay the next Emi
last emi after work done
empty the cart only once the payment 
transform the details to order sections and empty order only when status is false after the duration */}
        </div>
      ) : (
        <p>you got to wait while we fetch your service shopping cart data</p>
      )}

      <Modal show={purchasing} closeModal={closeModal}>
        <AddressConfirmationSwitch closeModal={closeModal} />
      </Modal>

      <button style={styles} onClick={purchaseNow}>
        Confirm address
      </button>
    </div>
  );
};

export default OrderSummary;
//use the error handling part
//https://www.robinwieruch.de/react-hooks-fetch-data
//https://dmitripavlutin.com/7-tips-to-handle-undefined-in-javascript/
//https://freeplaymusic.com/#
//https://flaviocopes.com/file-upload-using-ajax/

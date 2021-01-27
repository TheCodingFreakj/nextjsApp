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

const OrderSummary = () => {
  const [paymentData, setpaymentData] = useState({});
  const [cart, setCart] = useState({
    tool: "",
    services: "",
  });
  const [loading, setLoading] = useState(false);
  const { tool, services } = cart;
  const router = useRouter();
  //runs only when url changes
  useEffect(() => {
    if (window.location.search) {
      const response = parsedataUrl(decodeURIComponent(window.location.search));

      setpaymentData(response.params.general);
      console.log("This is running3333");
    }
  }, [window.location.search]);

  useEffect(() => {
    console.log("This is running");

    //we set state of mounted to true.
    const mounted = { current: true };

    if (mounted.current) {
      getProductsFromCarts();
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  const getProductsFromCarts = async () => {
    //setLoading(true);
    await fetchCarts(getCookie("token")).then((data) => {
      //console.log("The cart data render1 fetched from backend ", data);
      if (data.error) {
        console.log(data.error);
        //setLoading(false);
      } else {
        //setLoading(false);

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
    //console.log(tools.product);
    return tools.map((t, i) => {
      return (
        <div key={i}>
          <table>
            <tr>
              <th>
                ToolName: <br />
              </th>
              <hr />
              <th>
                Quantity:
                <br />
              </th>
              <hr />
              <th>
                Duration :<br />
              </th>
              <hr />
              <th>
                TotalPrice:
                <br />
              </th>
            </tr>

            <tr>
              <td>
                {t.product[0].tool} <hr />
              </td>
              <hr />
              <td>
                {t.quantity} <hr />
              </td>
              <hr />
              <td>
                30 days <hr />
              </td>
              <hr />
              <td>
                {t.product[0].totalPrice} <hr />
              </td>
              <hr />
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
        <div key={i}>
          <table>
            <tr>
              <th>
                ServiceName: <br />
              </th>
              <hr />
              <th>
                Quantity:
                <br />
              </th>
              <hr />
              <th>
                Duration :<br />
              </th>
              <hr />

              <th>
                Rate:
                <br />
              </th>
              <th>
                TotalPrice:
                <br />
              </th>
            </tr>

            <tr>
              <td>
                {s.product[0].title} <hr />
              </td>
              <hr />
              <td>
                {s.quantity} <hr />
              </td>
              <hr />
              <td>
                {s.product[0].duration}
                <hr />
              </td>
              <hr />
              <td>
                {s.product[0].discountedServiceCharges[0].servicedDiscountPrice}{" "}
                %
                <hr />
              </td>
              <hr />
              <td>
                {
                  s.product[0].discountedServiceCharges[0]
                    .discountedServiceCharges
                }{" "}
                <hr />
              </td>
              <hr />
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

  let calcTotalServices = tool ? (
    services.products
      .map((t) => {
        let price =
          t.product[0].discountedServiceCharges[0].discountedServiceCharges;
        return price;
      })
      .reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0)
  ) : (
    <p>no tools</p>
  );

  return (
    <div>
      {tool ? (
        <div>
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
            onClick={() => router.push(`/payment/subscribe `)}
          />
        </div>
      ) : (
        <p>you got to wait while we fetch your data</p>
      )}
      {services ? (
        <div>
          <p>Services Summary</p>
          <div>{showservices(services.products)}</div>
          <p>Total Services as First Emi{Math.round(calcTotalServices)}</p>

          {/* send the status and emi amount also 
break the second emi and set when to pay the next Emi
last emi after work done
empty the cart only once the payment 
transform the details to order sections and empty order only when status is false after the duration */}
          <Button
            icon="cart"
            color="yellow"
            floated="right"
            content="Subscribe"
            onClick={() => router.push(`/payment/checkout `)}
          />
        </div>
      ) : (
        <p>you got to wait while we fetch your data</p>
      )}
    </div>
  );
};

export default OrderSummary;
//use the error handling part
//https://www.robinwieruch.de/react-hooks-fetch-data

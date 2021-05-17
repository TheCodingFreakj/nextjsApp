import React, { useState, useEffect } from "react";
import { Divider, Button, Segment } from "semantic-ui-react";
import ServiceTotal from "./servicetotal";
import EmiPlanPricing from "../emiplanpricing";
import { useRouter } from "next/router";
import "../../../static/styles.css";
import { isAuth } from "../../../actions/setAuthToken";
const AddServiceButton = ({ servicecart = [], active, cat }) => {
  const [serviceAmount, setServiceAmount] = useState(0);
  const [formattedData, setformattedData] = useState();
  const router = useRouter();

  useEffect(() => {
    const mounted = { current: true };

    if (mounted.current) {
      if (servicecart) {
        const { servicetotal } = ServiceTotal(servicecart);
        setServiceAmount(servicetotal);
        const arrayToObject = (servicecart, key) =>
          servicecart.reduce((obj, item) => {
            return {
              ...obj,
              [item[key]]: item,
            };
          }, {});
        const transformedcart = arrayToObject(servicecart, "_id");
        let chooseproducts = Object.keys(transformedcart)
          .map((product) => {
            return transformedcart[product];
          })
          .map((prod) => {
            const quantity = prod.quantity;
            const title = prod.product[0].title;
            const duration = prod.product[0].duration;
            const tools = prod.product[0].tools;
            return {
              quantity,
              title,
              duration,
              tools,
            };
          });

        let productquery = chooseproducts.map((p) => {
          let query = new URLSearchParams(p);
          return decodeURIComponent(query.toString());
        });

        let form_values = {};
        productquery.forEach((productquery, i) => {
          let splitdata = productquery.split("&");
          splitdata.forEach(function (value) {
            let this_item = value.split("=");
            form_values[this_item[0]] = unescape(this_item[1]);
          });
        });
      }
    }

    return () => {
      mounted.current = false;
    };
  }, [servicecart]);

  const user = isAuth();

  let serviceQueryparams = encodeURIComponent(
    `${user._id}  & ${serviceAmount}  & ${user.email}`
  );

  return (
    <React.Fragment>
      <>
        <Divider />
        <Segment clearing size="large">
          <Button
            icon="shop"
            onClick={() => router.back()}
            color="green"
            floated="right"
            content="Add More"
          />
        </Segment>

        <Divider />

        <div className="emi-plan-extend">
          {serviceQueryparams === "" ? (
            <div>...Loading</div>
          ) : (
            <EmiPlanPricing
              serviceAmount={serviceAmount}
              serviceQueryparams={serviceQueryparams}
              servicecart={servicecart}
            />
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default AddServiceButton;

import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";

import ServiceTotal from "./servicetotal";
import EmiPlanPricing from "../emiplanpricing";
import { useRouter } from "next/router";
import "../../../static/styles.css";
import { API } from "../../../config";
import { isAuth } from "../../../actions/setAuthToken";
//import { dataExtracter, servicedatatranform } from "../../utils/parseUrl";
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
        // turn the array of objects to usual objects based on id of the product in the cart
        //console.log(transformedcart);
        //extracting all the id which are keys of transformedcart
        //iterating theorugh it accessing the value of key which is the object itself
        //again iterating through the objects to pack values and return
        let chooseproducts = Object.keys(transformedcart)
          .map((product) => {
            return transformedcart[product];
          })
          .map((prod) => {
            //console.log(prod);
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
          //console.log(splitdata);
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
    `${user._id}  & $${serviceAmount}  & ${user.email}`
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
          {servicecart == [] ? (
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

//https://dev.to/shalvah/fun-stuff-representing-arrays-and-objects-in-query-strings-36bn
// #programmerhumor
// #webdevelopers #womenwhocode
// #dev_girls #codegirl #girldeveloper
// #programmerhumor
// #workhardanywhere #educateyourself #lifeofadeveloper #workplace #freelancers
// #programmerrepublic #computerengineering
//create object out of url
//https://mburnette.com/blog/create-a-javascript-object-array-from-url-parameters/
//convert array like objects to arrays
//https://riptutorial.com/javascript/example/2333/converting-array-like-objects-to-arrays
//https://dmitripavlutin.com/foreach-iterate-array-javascript/

//you can use every() product in orders collections and decide if its actibe or not if not active (activr ===!true) return true

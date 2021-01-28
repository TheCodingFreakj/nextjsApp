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
  // console.log("the cart in service, render 5", servicecart);
  // console.log(active, "", cat);

  const [serviceAmount, setServiceAmount] = useState(0);
  const [formattedData, setformattedData] = useState();

  const router = useRouter();
  //console.log(router);
  // console.log("toolscart essentials", toolscart);
  console.log("servicecart essentials", servicecart);

  useEffect(() => {
    const mounted = { current: true };

    if (mounted.current) {
      if (servicecart) {
        const { servicetotal } = ServiceTotal(servicecart);
        console.log("servicetotal", servicetotal);
        // console.log("is this running");
        setServiceAmount(servicetotal);
        //const productinfo = dataExtracter(servicecart);
        // const productinfo = servicedatatranform(servicecart);
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
          }); //got the objects separately
        //console.log("all the data about product in the carts", chooseproducts);

        let productquery = chooseproducts.map((p) => {
          let query = new URLSearchParams(p);
          return decodeURIComponent(query.toString());
        });
        //console.log(productquery);
        let form_values = {};
        productquery.forEach((productquery, i) => {
          let splitdata = productquery.split("&");
          //console.log(splitdata);
          splitdata.forEach(function (value) {
            let this_item = value.split("=");
            form_values[this_item[0]] = unescape(this_item[1]);
          });

          //Method 1

          // let keys = Object.keys(form_values).map((pro) => {
          //   return form_values[pro];
          // });

          // let queryString = ""; // console.log(keys);
          // // //console.log(keys.join("&"));

          // queryString = Object.keys(form_values)
          //   .map((key) => key + "=" + form_values[key])
          //   .join("&");

          // console.log(queryString);

          // let parms = encodeURIComponent(`${keys} `.join(&));

          // if (typeof chooseproducts == "undefined") {
          //   <p>...Loading</p>;
          // } else {
          //   chooseproducts ? setformattedData(queryString) : <p>No data Yet</p>;
          // }
        });
      }
    }

    return () => {
      mounted.current = false;
    };
  }, [servicecart]);

  const user = isAuth();
  // console.log(typeof formattedData);
  //console.log("all the data about product in the carts", formattedData); //this is in array format

  //how to pass array to url
  // let splitdata = "";
  // console.log(splitdata);
  let serviceQueryparams = encodeURIComponent(
    `${user._id}  & $${serviceAmount}  & ${user.email}`
  );

  // pass these two as well : active, cat

  //pass the array dynamically
  // let serviceinfo = "";
  // formattedData
  //   ? (serviceinfo = encodeURIComponent(
  //       `${formattedData[0]}  & ${formattedData[1]} &${active}& ${cat} `
  //     ))
  //   : console.log("no data");
  // // console.log("This is service data", serviceinfo);
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
//how to implement error handle in react js
// var myArray = ['aaa', 'bbb', 'ccc', ];

// var myArrayQry = myArray.map(function(el, idx) {
//     return 'myArray[' + idx + ']=' + el;
// }).join('&');

// // myArray[0]=aaa&myArray[1]=bbb&myArray[2]=ccc

// let params = {
//   dog: {
//     name: 'John',
//     age: 12
//   },
//   user_ids: [1, 3]
// };
// let query = new URLSearchParams(params);
// decodeURIComponent(query.toString());
// // Gives you: "dog=[object+Object]&user_ids=1,3"

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

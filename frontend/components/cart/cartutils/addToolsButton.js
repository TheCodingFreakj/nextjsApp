import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";
import Toolstotal from "./toolstotal";
import { useRouter } from "next/router";
import "../../../static/styles.css";
import { isAuth } from "../../../actions/setAuthToken";
const AddToolButton = ({ toolscart = [], active, cat }) => {
  // console.log("the cart in tool, render 6", toolscart);
  // console.log(active, "", cat);
  const [toolsAmount, setToolsAmount] = useState(0);
  const [formattedData, setformattedData] = useState();
  const router = useRouter();
  //console.log(router);
  // console.log("toolscart essentials", toolscart);
  // console.log("servicecart essentials", servicecart);
  useEffect(() => {
    if (toolscart) {
      const { toolstotal } = Toolstotal(toolscart);
      //console.log("toolstotal", toolstotal);
      setToolsAmount(toolstotal);
    }
    //console.log(toolscart);
    const arrayToObject = (toolscart, key) =>
      toolscart.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item,
        };
      }, {});
    const transformedtoolscart = arrayToObject(toolscart, "_id");
    //console.log(transformedtoolscart);

    let choosetools = Object.keys(transformedtoolscart)
      .map((product) => {
        return transformedtoolscart[product];
      })
      .map((prod) => {
        //console.log(prod);
        const quantity = prod.quantity;
        const title = prod.product[0].tool;
        const duration = "30 days";

        return {
          quantity,
          title,
          duration,
        };
      });

    let productquery = choosetools.map((p) => {
      let query = new URLSearchParams(p);

      return decodeURIComponent(query.toString());
    });

    if (typeof choosetools == "undefined") {
      <p>...Loading</p>;
    } else {
      choosetools ? setformattedData(productquery) : <p>No data Yet</p>;
    }
  }, [toolscart]);

  const user = isAuth();
  let queryparams = encodeURIComponent(
    `${user._id}  & $${toolsAmount}  & ${user.email}`
  );

  // let toolsinfo = "";
  // formattedData
  //   ? (toolsinfo = encodeURIComponent(
  //       `${formattedData[0]}  & ${formattedData[1]}  `
  //     ))
  //   : console.log("no data");
  // //console.log("This is service data", toolsinfo);

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
          {toolscart !== [] ? (
            <div>
              <p>
                <strong>Sub-Total:</strong>${toolsAmount}
              </p>
              <Button
                icon="cart"
                color="red"
                floated="right"
                content="Subscribe|Tools"
                onClick={() => router.push(`/payment/orders?q=${queryparams} `)}
              />
            </div>
          ) : (
            <div>...Loading</div>
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default AddToolButton;
//https://blog.logrocket.com/conditional-rendering-in-react-c6b0e5af381e/
//https://www.digitalocean.com/community/tutorials/7-ways-to-implement-conditional-rendering-in-react-applications
//https://linguinecode.com/post/4-techniques-conditional-render-react-props-state

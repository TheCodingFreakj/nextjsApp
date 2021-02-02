import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";
import Toolstotal from "./toolstotal";
import { useRouter } from "next/router";
import "../../../static/styles.css";
import { isAuth } from "../../../actions/setAuthToken";
const AddToolButton = ({ toolscart = [], active, cat }) => {
  const [toolsAmount, setToolsAmount] = useState(0);
  const [formattedData, setformattedData] = useState();
  const router = useRouter();

  useEffect(() => {
    if (toolscart) {
      const { toolstotal } = Toolstotal(toolscart);
      setToolsAmount(toolstotal);
    }
    const arrayToObject = (toolscart, key) =>
      toolscart.reduce((obj, item) => {
        return {
          ...obj,
          [item[key]]: item,
        };
      }, {});
    const transformedtoolscart = arrayToObject(toolscart, "_id");

    let choosetools = Object.keys(transformedtoolscart)
      .map((product) => {
        return transformedtoolscart[product];
      })
      .map((prod) => {
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

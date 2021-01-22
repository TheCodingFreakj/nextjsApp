import React, { useState, useEffect } from "react";
import { Divider, Button, Segment, Icon } from "semantic-ui-react";
import Toolstotal from "./toolstotal";
import { useRouter } from "next/router";
import "../../../static/styles.css";
import { isAuth } from "../../../actions/setAuthToken";
const AddToolButton = ({ toolscart = [] }) => {
  console.log("the cart in tool, render 6", toolscart);

  const [toolsAmount, setToolsAmount] = useState(0);

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

    //setisCartEmpty(toolscart.length === 0 && servicecart.length === 0);
  }, [toolscart]);
  const user = isAuth();
  let queryparams = encodeURIComponent(
    `${user._id}  & $${toolsAmount}  & ${user.email}`
  );
  let toolsinfo = "";
  if (toolscart) {
    toolsinfo = encodeURIComponent(
      `${toolscart[0].quantity}  & ${toolscart[0].product[0].tool}  & ${toolscart[0].product[0].serviceChargeRate} `
    );
    // console.log(toolscart[0].quantity);
    // console.log(toolscart[0].product[0].tool);
    // console.log(toolscart[0].product[0].serviceChargeRate);
  }

  // let toolinfo = encodeURIComponent(

  //eminum
  //duration
  //   `${user._id}  & $${serviceAmount}  & ${user.email}`
  // );

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

        {/* you need to restrict this bl;ock uncessarily to run unless the context is that of service
          you need to block this if you are done sending servicecart data to the backend */}
        {/* this could stop creating undefined value for data already in backend */}
        {/* here the toolcart and servicecart is always available so this condition not working */}

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
                onClick={() =>
                  router.push(`/payment/orders?q=${queryparams} & ${toolsinfo}`)
                }
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

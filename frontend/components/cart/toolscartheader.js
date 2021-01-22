import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Header,
  Button,
  Segment,
  Icon,
  Item,
  Divider,
} from "semantic-ui-react";
import AddToolButton from "./cartutils/addToolsButton";

const Toolscartheader = ({ toolcartlist, handleRemoveToolFromCart }) => {
  console.log("This is tool cart,render 4", toolcartlist);
  // console.log(user);
  const showToolsList = (tools) => {
    return tools.map((tool) => ({
      header: (
        <Item.Header
          as="a"
          // onClick={() => router.push(`/products?productId=${p.product[0]._id}`)}
        >
          {tool.product[0].tool}
        </Item.Header>
      ),
      childKey: tool.product[0]._id,
      meta: `  ${tool.product[0].clientPrice} $ per 30 days for ${tool.quantity} months `,
      fluid: "true",
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          color="green"
          onClick={() => handleRemoveToolFromCart(tool.product[0]._id)}
        />
      ),
    }));
  };
  //() => handleRemoveServiceFromCart(tool.product[0]._id)

  return (
    <React.Fragment>
      {/* {console.log("This is render 3")} */}

      <h2>Tools Picks</h2>

      <Divider />

      {toolcartlist ? (
        <>
          <Item.Group divided items={showToolsList(toolcartlist)}></Item.Group>
          <Segment>
            {toolcartlist ? <AddToolButton toolscart={toolcartlist} /> : null}
          </Segment>
        </>
      ) : null}
    </React.Fragment>
  );
};

export default Toolscartheader;

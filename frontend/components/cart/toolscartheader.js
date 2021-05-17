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

  return (
    <React.Fragment>
      <h2>Tools Picks</h2>
      <Divider />
      {toolcartlist.products ? (
        <>
          <Item.Group
            divided
            items={showToolsList(toolcartlist.products)}
          ></Item.Group>
          <Segment>
            {toolcartlist.products ? (
              <AddToolButton
                active={toolcartlist.active}
                cat={toolcartlist.category}
                toolscart={toolcartlist.products}
              />
            ) : null}
          </Segment>
        </>
      ) : null}
    </React.Fragment>
  );
};

export default Toolscartheader;

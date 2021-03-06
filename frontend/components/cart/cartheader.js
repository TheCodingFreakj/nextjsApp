import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header, Button, Segment, Icon, Item } from "semantic-ui-react";

const CartHeader = ({
  carlist,
  user,
  handleRemoveToolFromCart,
  handleRemoveServiceFromCart,
}) => {
  //service.quantity
  //service.product[0].discountedServiceCharges[0].discountedServiceCharges
  //service.product[0].title
  //tool.product[0].clientPrice
  //tool.product[0].tool
  //tool.quantity

  // console.log("carlist", carlist);

  const showServiceCartList = (services) => {
    return services.map((service) => ({
      header: (
        <Item.Header
          as="a"
          // onClick={() => router.push(`/products?productId=${p.product[0]._id}`)}
        >
          {service.product[0].title}
        </Item.Header>
      ),
      childKey: service.product[0]._id,
      meta: `${service.quantity} unit productcount @ $ ${service.product[0].discountedServiceCharges[0].discountedServiceCharges} per ${service.product[0].duration}`,
      fluid: "true",
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          color="green"
          onClick={() => handleRemoveServiceFromCart(service.product[0]._id)}
        />
      ),
    }));
  };
  //() => handleRemoveToolFromCart(service.product[0]._id)
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
      <p>
        We encourage to couple marketing services with tools as per subscription
        policy
      </p>
      <p>
        You can check out web development services separarely as per invoicing
        policy
      </p>
      <Item.Group
        divided
        items={showServiceCartList(carlist.serviceCarts)}
      ></Item.Group>

      <Item.Group divided items={showToolsList(carlist.toolcarts)}></Item.Group>
    </React.Fragment>
  );
};

export default CartHeader;
//https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar

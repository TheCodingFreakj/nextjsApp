import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header, Button, Segment, Icon, Item } from "semantic-ui-react";
import AddServiceButton from "./cartutils/addServiceButton";

const ServiceCartHeader = ({
  servicescartlist,
  handleRemoveServiceFromCart,
}) => {
  // console.log("This is service cart,render 3", servicescartlist);

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

      {servicescartlist.products ? (
        <>
          <Item.Group
            divided
            items={showServiceCartList(servicescartlist.products)}
          ></Item.Group>
          <Segment>
            {servicescartlist.products ? (
              <AddServiceButton
                active={servicescartlist.active}
                cat={servicescartlist.category}
                servicecart={servicescartlist.products}
              />
            ) : null}
          </Segment>
        </>
      ) : null}
    </React.Fragment>
  );
};

export default ServiceCartHeader;

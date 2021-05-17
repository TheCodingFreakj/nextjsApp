import React from "react";
import { Button, Segment, Item } from "semantic-ui-react";
import AddServiceButton from "./cartutils/addServiceButton";

const ServiceCartHeader = ({
  servicescartlist,
  handleRemoveServiceFromCart,
}) => {
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
          className="button-cart"
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
      <h3>
        We encourage to couple marketing services with tools as per subscription
        policy
      </h3>
      <h3>
        You can check out web development services separarely as per invoicing
        policy
      </h3>

      {servicescartlist.products ? (
        <>
          <Segment.Group>
            <Item.Group
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
          </Segment.Group>
        </>
      ) : null}
    </React.Fragment>
  );
};

export default ServiceCartHeader;

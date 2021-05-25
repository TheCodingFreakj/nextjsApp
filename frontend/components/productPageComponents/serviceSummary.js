import React from "react";
import AddProductToCart from "./addProductToCart";
import { API } from "../../config";
import { useRouter } from "next/router";
import Button from "../utils/button";
const ServiceSummary = (props) => {
  // console.log(props);
  const router = useRouter();
  //{ duration, title, _id, discountedServiceCharges }
  return (
    <div className="page_wrapper">
      <div className="inner-3">
        <h3>
          You are ordering our <span>{props.title}</span> service
        </h3>
        <p>The service will be chargeable each {props.duration} days</p>
        <p>
          The charges per {props.duration} is
          {props.discountedServiceCharges[0].discountedServiceCharges} $
        </p>

        <p>Choose you number of month to add the service to cart</p>
      </div>
      <div className="inner-4">
        <AddProductToCart serviceId={props._id} />
      </div>
    </div>
  );
};

export default ServiceSummary;

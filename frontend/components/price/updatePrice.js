import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { updatePrice, SinglePrice } from "../../actions/price";

//bring components

const UpdatePriceForms = ({ router }) => {
  const [priceValues, setPriceValues] = useState({
    serviceName: "",
    realServicePrice: "",
    servicedDiscountPrice: "",
    serviceError: false,
    serviceSuccess: false,
  });

  const {
    serviceName,
    realServicePrice,
    servicedDiscountPrice,
    serviceError,
    serviceSuccess,
  } = priceValues;

  useEffect(() => {
    initPrices();
  }, [router]);

  const initPrices = () => {
    //grab the slug from router props

    if (router.query.slug) {
      SinglePrice(router.query.slug).then((data) => {
        console.log("This is single price data for the slug", data);
        if (data.error) {
          setPriceValues({ ...priceValues, error: data.serviceError });
        } else {
          setPriceValues({
            ...priceValues,
            serviceName: data[0].serviceName,
            realServicePrice: data[0].realServicePrice,
            servicedDiscountPrice: data[0].servicedDiscountPrice,
          }); //storing the initial price in the state
        }
      });
    }
  };

  const token = getCookie("token");
  //Need to alter the valuues in the state and again send to replace the value
  const onChange = (name) => (e) => {
    const value = e.target.value;
    console.log(value);
    setPriceValues({
      ...priceValues,
      [name]: value, //keping the target values in state
      serviceError: false,
    });
  };

  const editPrice = (e) => {
    e.preventDefault();

    console.log("This is onSubmit");
    const formData = {
      serviceName,
      realServicePrice,
      servicedDiscountPrice,
    };
    updatePrice(formData, token, router.query.slug).then((data) => {
      console.log("This is getting from backend", data);
      if (data.error) {
        setPriceValues({
          ...priceValues,
          serviceSuccess: false,
          serviceError: data.error,
        });
      } else {
        setPriceValues({
          ...priceValues,
          serviceName: "",
          realServicePrice: "",
          servicedDiscountPrice: "",
          serviceError: "",
          serviceSuccess: `A new service :"${data.serviceName}" is created `,
        });
        Router.replace(`/admin`);
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: serviceError ? "" : "none" }}
    >
      {serviceError}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: serviceSuccess ? "" : "none" }}
    >
      {serviceSuccess}
    </div>
  );
  const updateServicePricingForm = () => {
    return (
      <form className="text-center" onSubmit={(e) => editPrice(e)}>
        <label className="text-muted">
          <h4>Service Name </h4>
        </label>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="serviceName"
            value={serviceName}
            onChange={onChange("serviceName")}
            required
          />
        </div>

        <label className="text-muted">
          <h4>Service Price </h4>
        </label>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="realServicePrice"
            value={realServicePrice} // This value should be coming from the state
            onChange={onChange("realServicePrice")} //setFormData
            required
          />
        </div>

        <label className="text-muted">
          <h4>Discount Price </h4>
        </label>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="servicedDiscountPrice"
            value={servicedDiscountPrice} // This value should be coming from the state
            onChange={onChange("servicedDiscountPrice")} //setFormData
            required
          />
        </div>

        <div>
          <input type="submit" className="btn btn-success" value="Update" />
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 pt-5 pb-5">
            {updateServicePricingForm()}

            {JSON.stringify(priceValues)}
            <div className="pb-5">
              {showError()}
              {showSuccess()}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UpdatePriceForms);

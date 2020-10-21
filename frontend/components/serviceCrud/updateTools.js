import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { getSingleTool, updateToolPrice } from "../../actions/tools";

const UpdateTools = ({ router }) => {
  const [priceValues, setPriceValues] = useState({
    summary: "",
    totalPrice: "",
    serviceChargeRate: "",
    error: false,
    success: false,
  });

  const {
    summary,
    totalPrice,
    serviceChargeRate,
    success,
    error,
  } = priceValues;

  useEffect(() => {
    initPrices();
  }, [router]);

  const initPrices = () => {
    //grab the slug from router props

    if (router.query.slug) {
      getSingleTool(router.query.slug).then((data) => {
        //console.log(router.query.slug);
        console.log("This is single price data for the slug", data);
        if (data.error) {
          setPriceValues({ ...priceValues, error: data[0].error });
        } else {
          setPriceValues({
            ...priceValues,
            summary: data[0].summary,
            totalPrice: data[0].totalPrice,
            serviceChargeRate: data[0].serviceChargeRate,
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
      error: false,
    });
  };

  const editPrice = (e) => {
    e.preventDefault();

    console.log("This is onSubmit");
    const formData = {
      summary,
      totalPrice,
      serviceChargeRate,
    };
    updateToolPrice(formData, token, router.query.slug).then((data) => {
      console.log("This is getting from backend", data);
      if (data.error) {
        setPriceValues({
          ...priceValues,
          success: false,
          error: data.error,
        });
      } else {
        setPriceValues({
          ...priceValues,
          summary: "",
          totalPrice: "",
          discountPrice: "",
          error: "",
          success: `A new tool is updated `,
        });
        Router.replace(`/admin`);
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const updateToolPricingForm = () => {
    return (
      <form onSubmit={(e) => editPrice(e)}>
        <div className="form-group">
          <label className="text-muted">Real Package Price </label>
          <input
            type="text"
            className="form-control"
            placeholder="totalPrice"
            onChange={onChange("totalPrice")}
            value={totalPrice}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted"> Service Charges </label>
          <input
            type="text"
            className="form-control"
            placeholder="serviceChargeRate"
            onChange={onChange("serviceChargeRate")}
            value={serviceChargeRate}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Summary </label>
          <input
            type="text"
            className="form-control"
            placeholder="summary"
            onChange={onChange("summary")}
            value={summary}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    );
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 pt-5 pb-5">
            {updateToolPricingForm()}

            {/* {JSON.stringify(priceValues)} */}
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

export default withRouter(UpdateTools);

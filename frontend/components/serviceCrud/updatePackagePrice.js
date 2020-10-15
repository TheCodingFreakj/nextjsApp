import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import {
  SinglePackagePrice,
  updatePackagePriceObject,
} from "../../actions/comboPackage";

const UpdatePackagePriceForms = ({ router }) => {
  const [priceValues, setPriceValues] = useState({
    realPackagePrice: "",
    packageDiscountPrice: "",
    packageName: "",
    error: false,
    success: false,
  });

  const {
    realPackagePrice,
    packageDiscountPrice,
    packageName,
    error,
    success,
  } = priceValues;

  useEffect(() => {
    initPrices();
  }, [router]);

  const initPrices = () => {
    //grab the slug from router props

    if (router.query.slug) {
      SinglePackagePrice(router.query.slug).then((data) => {
        //console.log(router.query.slug);
        console.log("This is single price data for the slug", data);
        // if (data.error) {
        //   setPriceValues({ ...priceValues, error: data.error });
        // } else {
        //   setPriceValues({
        //     ...priceValues,
        //     packageName: data[0].packageName,
        //     realPackagePrice: data[0].realPackagePrice,
        //     packageDiscountPrice: data[0].packageDiscountPrice,
        //   }); //storing the initial price in the state
        // }
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
      realPackagePrice,
      packageDiscountPrice,
      packageName,
    };
    updatePackagePriceObject(formData, token, router.query.slug).then(
      (data) => {
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

            realPackagePrice: "",
            packageDiscountPrice: "",
            packageName: "",
            error: "",
            success: `A new service :"${data.packageName}" is created `,
          });
          Router.replace(`/admin`);
        }
      }
    );
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
  const updatePackagePricingForm = () => {
    return (
      <form onSubmit={(e) => editPrice(e)}>
        <div className="form-group">
          <label className="text-muted">Real Package Price </label>
          <input
            type="text"
            className="form-control"
            placeholder="realPackagePrice"
            onChange={onChange("realPackagePrice")}
            value={realPackagePrice}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted"> Discount Package Charges </label>
          <input
            type="text"
            className="form-control"
            placeholder="packageDiscountPrice"
            onChange={onChange("packageDiscountPrice")}
            value={packageDiscountPrice}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Package Name </label>
          <input
            type="text"
            className="form-control"
            placeholder="packageName"
            onChange={onChange("packageName")}
            value={packageName}
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
            {updatePackagePricingForm()}

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

export default withRouter(UpdatePackagePriceForms);

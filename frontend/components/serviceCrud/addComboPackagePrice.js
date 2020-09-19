import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie } from "../../actions/setAuthToken";
import { createNewComboPackagePrice } from "../../actions/comboPackage";

const AddPackagePrice = () => {
  const [packagePrice, setpackagePrice] = useState({
    realPackagePrice: "",
    packageDiscountPrice: "",
    packageName: "",
    error: false,
    success: false,
    loading: false,
    reload: false,
  });

  //const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    realPackagePrice,
    packageDiscountPrice,
    packageName,
    error,
    success,
    loading,
    reload,
  } = packagePrice;
  const token = getCookie("token");
  const onChange = (name) => (e) => {
    setpackagePrice({
      ...packagePrice,
      [name]: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("The Form Is Submitted");

    const newComboPackagePrice = {
      realPackagePrice,
      packageDiscountPrice,
      packageName,
    };

    createNewComboPackagePrice(newComboPackagePrice, token).then((data) => {
      //console.log(data);
      if (data.error) {
        setpackagePrice({ ...values, error: data.error, success: false });
      } else {
        setpackagePrice({
          ...packagePrice,
          realPackagePrice: "",
          packageDiscountPrice: "",
          discountedPackageCharges: "",
          error: false,
          success: true,
          loading: false,
          reload: true,
        });
      }
    });
  };

  const comboPackagesPriceForm = () => {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
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
          Create
        </button>
      </form>
    );
  };

  return <React.Fragment>{comboPackagesPriceForm()}</React.Fragment>;
};

export default AddPackagePrice;

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie } from "../../actions/setAuthToken";

const AddPackagePrice = () => {
  const [packagePrice, setpackagePrice] = useState({
    realPackagePrice: "",
    packageDiscountPrice: "",
    discountedPackageCharges: "",
  });

  //const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    realPackagePrice,
    packageDiscountPrice,
    discountedPackageCharges,
  } = packagePrice;

  const onChange = (name) => (e) => {
    setpackagePrice({ ...packagePrice, [name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("The Form Is Submitted");

    //   setValues({ ...values, loading: true, error: false });

    //   //sending the value stored in state as input value from form
    //   createNewBrand({ brandName }, token).then((data) => {
    //     console.log(data);
    //     // if (data.error) {
    //     //   //setvalues fill the error variable and turn off the success

    //     //   setValues({ ...values, error: data.error, success: false });
    //     // } else {
    //     //   //turn all off and make the success true

    //     //   setValues({
    //     //     ...values,
    //     //     error: false,
    //     //     success: true,
    //     //     name: "",
    //     //     removed: false,
    //     //     reload: true,
    //     //   });
    //     // }
    //   });
  };

  const comboPackagesPriceForm = () => {
    return (
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Package Price </label>
          <input
            type="text"
            className="form-control"
            placeholder="Give The Package Price"
            onChange={onChange("realPackagePrice")}
            value={realPackagePrice}
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Give the Package Description </label>
          <input
            type="text"
            className="form-control"
            placeholder="Give the Package Description"
            onChange={onChange("packageDiscountPrice")}
            value={packageDiscountPrice}
            required
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Discount Charges</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="discountedPackageCharges"
            onChange={onChange("discountedPackageCharges")}
            value={discountedPackageCharges}
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
